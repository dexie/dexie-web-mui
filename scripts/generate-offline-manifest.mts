#!/usr/bin/env tsx
// Generate a list of routes and assets to prefetch and cache for offline usage.
// Outputs public/offline-manifest.json

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { OfflineManifest } from '../src/types/OfflineManifest';

const root = process.cwd();
const appDir = path.join(root, 'src', 'app');
const docsDir = path.join(root, 'docs');
const publicDir = path.join(root, 'public');
const nextDir = path.join(root, '.next');
const outputFile = path.join(publicDir, 'offline-manifest.json');

function generateHash(content: string | Buffer): string {
  // Generate SHA-256 hash for assets (stable file-based hashing)
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  return hash.substring(0, 16); // Use first 16 chars for compact storage
}

function getFileHash(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath);
    return generateHash(content);
  } catch {
    return null;
  }
}

function exists(p: string): boolean {
  return fs.existsSync(p);
}

function normalizeRoute(segments: string[]): string {
  // Skip special group segments e.g. (marketing)
  const cleaned = segments
    .filter(Boolean)
    .filter(s => !(s.startsWith('(') && s.endsWith(')')))
    .filter(s => !(s.startsWith('[') && s.endsWith(']')));
  const route = '/' + cleaned.join('/');
  return route === '/' ? '/' : route.replace(/\/+$/, '');
}

function collectAppRoutes(): string[] {
  const routes = new Set<string>(['/']);
  function walk(dir: string, rel: string[] = []): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        walk(path.join(dir, item.name), rel.concat(item.name));
      } else if (item.isFile() && item.name === 'page.tsx') {
        const route = normalizeRoute(rel);
        routes.add(route || '/');
      }
    }
  }
  if (exists(appDir)) walk(appDir, []);
  return Array.from(routes).sort();
}

function collectPublicAssets(): Record<string, string | null> {
  const assets: Record<string, string | null> = {};
  function walk(dir: string, base = ''): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const rel = path.join(base, item.name).replace(/\\/g, '/');
      const full = path.join(dir, item.name);
      if (item.isDirectory() && item.name !== 'full-text-search') {
        walk(full, rel);
      } else if (item.isFile()) {
        if (rel === 'sw.js' || rel === 'offline-manifest.json') continue;
        const url = '/' + rel;
        const hash = getFileHash(full);
        assets[url] = hash;
      }
    }
  }
  if (exists(publicDir)) walk(publicDir);
  return assets;
}

function collectNextStatic(): Record<string, string | null> {
  const assets: Record<string, string | null> = {};
  if (!exists(nextDir)) return {};
  const buildIdFile = path.join(nextDir, 'BUILD_ID');
  let buildId: string | null = null;
  try {
    buildId = fs.readFileSync(buildIdFile, 'utf8').trim();
  } catch {}

  const staticDir = path.join(nextDir, 'static');
  function walk(dir: string, base = ''): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const rel = path.join(base, item.name).replace(/\\/g, '/');
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        walk(full, rel);
      } else if (item.isFile()) {
        // Served under /_next/static/...; include buildId prefix when present
        const served = buildId && !rel.startsWith(buildId)
          ? '/_next/static/' + rel
          : '/_next/static/' + rel;
        const hash = getFileHash(full);
        assets[served] = hash;
      }
    }
  }
  if (exists(staticDir)) walk(staticDir);
  return assets;
}

function writeManifest(data: OfflineManifest): void {
  const {fullTextMetas, ...rest} = data;
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(rest, null, 2));
  if (data.fullTextMetas) {
    for (const docMetadata of data.fullTextMetas) {
      const filepath = path.join(publicDir, 'full-text-search', docMetadata.route + '.json');
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
      fs.writeFileSync(filepath, JSON.stringify(docMetadata, null, 2));
    }
  }
  console.log(`Wrote ${outputFile} with ${data.routes.length} routes and ${Object.keys(data.assets).length} assets.`);
}

async function main(): Promise<void> {
  // Dynamic import for better CI compatibility
  const { collectDocsRoutes } = await import('../src/utils/parseMarkdownSections');
  
  const appRoutes = collectAppRoutes();
  const docsData = collectDocsRoutes(docsDir);
  const publicAssets = collectPublicAssets();
  const nextStatic = collectNextStatic();

  // Create simplified routes array with no hashes  
  const routes = Array.from(new Set([...appRoutes])).sort();

  // Merge assets with file-based hashes for cache validity
  const assets: Record<string, string | null> = {
    ...publicAssets,
    ...nextStatic
  };

  writeManifest({
    generatedAt: new Date().toISOString(),
    routes,
    docRoutes: docsData.docRoutes.reduce((acc, doc) => {
      acc[doc.route] = doc.mdFileHash;
      return acc;
    }, {} as Record<string, string | null>),
    assets,
    fullTextMetas: docsData.docRoutes,
  });
}

main();
