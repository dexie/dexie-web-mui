import Dexie, { Table } from 'dexie'
import { extractFullTextTokens } from './extractFullTextTokens'

export interface OfflineStatus {
  id: string
  isWarming: boolean
  isReady: boolean
  cached?: number
  total?: number
  progress?: number
  startedAt?: string
  completedAt?: string
  failedAt?: string
  error?: string
  updatedAt: string
}

// Dedicated database for offline status (shared between SW and GUI)
export class OfflineDB extends Dexie {
  status!: Table<OfflineStatus>
  fullTextIndex!: Table<
    {contentId: number, score: number}, // Value (contentId, score)
    [string, number] // Primary Key: [token, contentId]
  >
  fullTextContent!: Table<{ title: string, body: string, url: string }, number>

  constructor() {
    super('OfflineDB')
    this.version(1).stores({
      status: 'id',
      fullTextIndex: ',contentId', // outbound [token+contentId] -> {contentId, score}
      fullTextContent: '++,url'
    })
  }

  putFullTextDoc(routeAndSlug: string, title: string, body: string) {
    // Let all blocks of text be single lines
    title = title.toLowerCase();
    body = body.toLowerCase();
    const content = (title + ' ' + body);
    return this.transaction('rw', this.fullTextIndex, this.fullTextContent, async () => {
      // TODO:
      // * lunr-index content and generate tokens + scores
      const contentTokens = extractFullTextTokens(content);
      // * query the content id given the URL (primaryKeys() query on url)
      let contentIds = await this.fullTextContent.where({url: routeAndSlug}).primaryKeys();
      if (contentIds.length > 1) {
        // Should not happen, but if it does, delete all and start fresh
        await this.fullTextContent.where({url: routeAndSlug}).delete();
        contentIds = [];
      }
      if (contentIds.length === 0) {
        // Add new content entry
        const contentId = await this.fullTextContent.add({title, body, url: routeAndSlug});
        await this.fullTextIndex.bulkAdd(
          Array.from(contentTokens.values()).map((score) => ({contentId, score})),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore  // typings bug in dexie
          Array.from(contentTokens.keys()).map(token => [token, contentId])
        );
      } else {
        const contentId = contentIds[0];
        // Update entry
        // * query all fullTextIndex entries for this content id
        const existingEntries = new Map<string, number>(
          await this.fullTextIndex.where({0: contentId}).primaryKeys()
        );
        // * compare with our lunr-index. Delete missing ones, update changed ones and add new ones
        for (const [token, score] of contentTokens.entries()) {
          if (existingEntries.get(token) !== score) {
            // New or changed token
            await this.fullTextIndex.put({contentId, score}, [token, contentId]);
          }
        }
        for (const token of existingEntries.keys()) {
          if (!contentTokens.has(token)) {
            // Deleted token
            await this.fullTextIndex.delete([token, contentId]);
          }
        }
        // * update fullTextContent entry
        await this.fullTextContent.put({title, body, url: routeAndSlug}, contentId);
      }
    });
  }

  deleteFullTextDoc(route: string) {
    // Steps:
    // * query the content id given the URL (primaryKeys() query on url)
    // * delete all fullTextIndex entries for this content id
    // * delete fullTextContent entry
    return this.transaction('rw', this.fullTextIndex, this.fullTextContent, async () => {
      const contentIds = await this.fullTextContent
        .where('url')
        .startsWith(route) // Remove both main doc and all sections
        .primaryKeys();
      for (const contentId of contentIds) {
        // * delete all fullTextIndex entries for this content id
        await this.fullTextIndex.where({contentId}).delete();
        // * delete fullTextContent entry
        await this.fullTextContent.delete(contentId);
      }
    });
  }

  async findDocuments(searchText: string): Promise<{ url: string, title: string, score: number }[]> {
    searchText = searchText.trim().toLowerCase();
    if (searchText.length === 0) {
      return [];
    }
    // * lunr-index the query to get tokens
    const queryTokens = extractFullTextTokens(searchText).keys();
    // * For every token, query fullTextIndex for matching tokens to get contentIds and scores (toArray())
    const tokenResults = await Promise.all(
      Array.from(queryTokens).map(token => 
        this.fullTextIndex
          .where(':id')
          .between([token, Dexie.minKey], [token, Dexie.maxKey])
          .toArray()
      )
    );
    // * Aggregate scores per contentId
    const scoreMap = new Map<number, number>();
    for (const results of tokenResults) {
      for (const {contentId, score} of results) {
        const existingScore = scoreMap.get(contentId) || 0;
        if (existingScore > 0) {
          // Factor up score for each matching token found previously
          scoreMap.set(contentId, (existingScore + score) * 10); // Many search works match
        } else {
          scoreMap.set(contentId, score);
        }
      }
    }
    // Sort by score descending
    const top50Results = Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50); // Limit to top 50 results

    // * Fetch URLs from fullTextContent
    const resultContents = (await this.fullTextContent.bulkGet(
      top50Results.map(([contentId]) => contentId)
    )).map((c, i) => ({...c, id: top50Results[i][0], score: top50Results[i][1]}));

    // Give further score if searchText appears as a whole in title or body
    for (const content of resultContents) {
      if (content.title?.includes(searchText)) {
        // Boost score for title match
        content.score *= 100;
        content.score += 5000;
      }
      if (content.body?.includes(searchText)) {
        // Boost score for body match
        content.score *= 50;
        content.score += 2000;
      }
    }

    // Sort again by score descending
    resultContents.sort((a, b) => b.score - a.score);
    return resultContents
      .filter(c => c.url && c.title)
      .sort((a, b) => b.score - a.score)
      .map(c => ({
        url: c.url!,
        title: c.title!,
        score: c.score
      }));
  }
}

export const offlineDB = new OfflineDB()