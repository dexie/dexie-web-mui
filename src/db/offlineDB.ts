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
  fullTextContent!: Table<{ title: string, body: string, url: string, parentTitle: string | undefined }, number>

  constructor() {
    super('OfflineDB')
    this.version(1).stores({
      status: 'id',
      fullTextIndex: ',contentId', // outbound [token+contentId] -> {contentId, score}
      fullTextContent: '++,url'
    })
  }

  putFullTextDoc(routeAndSlug: string, title: string, body: string, parentTitle?: string) {
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
        const contentId = await this.fullTextContent.add({title, body, url: routeAndSlug, parentTitle});
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
          await this.fullTextIndex.where({contentId}).primaryKeys()
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
        await this.fullTextContent.put({title, body, url: routeAndSlug, parentTitle}, contentId);
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

  async findDocuments(searchText: string): Promise<{ url: string, title: string, score: number, parentTitle: string | undefined }[]> {
    searchText = searchText.trim().toLowerCase();
    if (searchText.length === 0) {
      return [];
    }
    // * lunr-index the query to get tokens
    const queryTokens = extractFullTextTokens(searchText, 0).keys();
    // * For every token, query fullTextIndex for matching tokens to get contentIds and scores (toArray())
    const tokenResults = await Promise.all(
      Array.from(queryTokens).map(token => 
        this.fullTextIndex
          .where(':id')
          .between([token, Dexie.minKey], [token + '\uffff', Dexie.maxKey])
          .toArray()
      )
    );
    // * Aggregate scores per search token and contentId
    const intermediateScoreMap = new Map<number, {[resultId: number]: number}>();
    for (let resultId = 0; resultId < tokenResults.length; resultId++) {
      const results = tokenResults[resultId];
      for (const {contentId, score} of results) {
        let existingScore = intermediateScoreMap.get(contentId)!;
        if (!existingScore) {
          existingScore = {};
          intermediateScoreMap.set(contentId, existingScore);
        }
        existingScore[resultId] = (existingScore[resultId] || 0) + score;
      }
    }
    // * Combine scores: If a document matches multiple tokens, multiply their scores
    const scoreMap = new Map<number, number>();
    for (const [contentId, innerScoreMap] of intermediateScoreMap.entries()) {
      let totalScore = 0;
      for (const score of Object.values(innerScoreMap)) {
        totalScore += score;
      }
      scoreMap.set(contentId, totalScore);
    }
    // Sort by score descending
    const topResults = Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 200); // Limit to top 200 results

    // * Fetch URLs from fullTextContent
    const resultContents = (await this.fullTextContent.bulkGet(
      topResults.map(([contentId]) => contentId)
    )).map((c, i) => ({...c, id: topResults[i][0], score: topResults[i][1]}));

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
      .slice(0, 50) // Limit to top 50 results
      .map(c => ({
        url: c.url!,
        title: c.title!,
        score: c.score,
        parentTitle: c.parentTitle
      }));
  }
}

export const offlineDB = new OfflineDB()