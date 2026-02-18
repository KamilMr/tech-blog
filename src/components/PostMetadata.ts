export interface PostMetadata {
  title: string;
  date: string;
  subtitle: string;
  slug: string;
  language: string;
  tags?: string[];
}

export interface SearchEntry {
  title: string;
  subtitle: string;
  slug: string;
  tags: string[];
  content: string;
}
