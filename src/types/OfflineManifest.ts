import type { MDFullTextMeta } from './MDFullTextMeta';

export interface OfflineManifest {
  generatedAt: string;
  routes: string[]; // Simplified: just route paths, no hashes
  docRoutes: Record<string, string | null>;
  assets: Record<string, string | null>; // Keep asset hashes for cache validation  
  fullTextMetas?: MDFullTextMeta[];
}