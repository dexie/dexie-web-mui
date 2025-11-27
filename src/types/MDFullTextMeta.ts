export interface MarkdownSection {
  level: number;
  title: string;
  content: string;
  slug: string;
}

export interface MDFullTextMeta {
  route: string;
  title?: string;
  sections: MarkdownSection[];
  mdFileHash: string;
}
