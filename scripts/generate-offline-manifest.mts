#!/usr/bin/env tsx
// Generate a list of routes and assets to prefetch and cache for offline usage.
// Outputs public/offline-manifest.json

import fs from 'fs';
import path from 'path';
import type { MDFullTextMeta } from '../src/types/MDFullTextMeta';
import { collectDocsRoutes } from '../src/utils/parseMarkdownSections';

const root = process.cwd();
const appDir = path.join(root, 'src', 'app');
const docsDir = path.join(root, 'docs');
const publicDir = path.join(root, 'public');
const nextDir = path.join(root, '.next');
const outputFile = path.join(publicDir, 'offline-manifest.json');

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

function collectPublicAssets(): string[] {
  const assets = new Set<string>();
  function walk(dir: string, base = ''): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const rel = path.join(base, item.name).replace(/\\/g, '/');
      const full = path.join(dir, item.name);
      if (item.isDirectory() && item.name !== 'full-text-search') {
        walk(full, rel);
      } else if (item.isFile()) {
        if (rel === 'sw.js' || rel === 'offline-manifest.json') continue;
        assets.add('/' + rel);
      }
    }
  }
  if (exists(publicDir)) walk(publicDir);
  return Array.from(assets).sort();
}

function collectNextStatic(): string[] {
  const urls = new Set<string>();
  if (!exists(nextDir)) return [];
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
        urls.add(served);
      }
    }
  }
  if (exists(staticDir)) walk(staticDir);
  return Array.from(urls).sort();
}

interface OfflineManifest {
  generatedAt: string;
  routes: string[];
  assets: string[];
  fullTextMetas?: MDFullTextMeta[];
}

function writeManifest(data: OfflineManifest): void {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  if (data.fullTextMetas) {
    for (const docMetadata of data.fullTextMetas) {
      const filepath = path.join(publicDir, 'full-text-search', docMetadata.route + '.json');
      //const route = path.join('/', 'full-text-search', doc.route + '.json');
      //console.log(`Doc: ${route} (${doc.sections.length} sections)`);
      //console.log(filepath);
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
      fs.writeFileSync(filepath, JSON.stringify(docMetadata, null, 2));
    }
  }
  console.log(`Wrote ${outputFile} with ${data.routes.length} routes and ${data.assets.length} assets.`);
}

function main(): void {
  const appRoutes = collectAppRoutes();
  const docsData = collectDocsRoutes(docsDir);
  const publicAssets = collectPublicAssets();
  const nextStatic = collectNextStatic();

  // Merge and de-duplicate routes
  const routes = Array.from(new Set([ ...appRoutes, ...docsData.routes ]));
  const assets = Array.from(new Set([ ...publicAssets, ...nextStatic ]));

  writeManifest({
    generatedAt: new Date().toISOString(),
    routes,
    assets,
    fullTextMetas: docsData.docRoutes,
  });
}

main();
