#!/usr/bin/env node
// Bundle service worker with esbuild to create a monolithic sw.js

import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.dirname(__dirname)

async function buildServiceWorker() {
  try {
    await build({
      entryPoints: [path.join(root, 'src/sw/index.ts')],
      bundle: true,
      outfile: path.join(root, 'public/sw.js'),
      format: 'esm',
      target: ['chrome91', 'firefox114', 'safari15'], // ESM support
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      },
      external: [], // Bundle everything
      platform: 'browser',
      conditions: ['module', 'browser'],
      mainFields: ['module', 'main'],
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx']
    })

    console.log('✅ Service worker bundled to public/sw.js')
  } catch (error) {
    console.error('❌ Service worker build failed:', error)
    process.exit(1)
  }
}

buildServiceWorker()