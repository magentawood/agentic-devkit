#!/usr/bin/env node
// Usage: node publish.mjs <post.md> [--platforms devto,reddit,...] [--dry-run] [--assist] [--headless] [--force]
import path from 'node:path';
import { loadConfig, parseArgs, ALL_PLATFORMS } from './lib/config.mjs';
import { readPost, recordResult } from './lib/post.mjs';
import { openBrowser } from './lib/browser.mjs';
import * as devto from './platforms/devto.mjs';
import * as reddit from './platforms/reddit.mjs';
import * as medium from './platforms/medium.mjs';
import * as substack from './platforms/substack.mjs';
import * as linkedin from './platforms/linkedin.mjs';
import * as quora from './platforms/quora.mjs';

const ADAPTERS = { devto, reddit, medium, substack, linkedin, quora };

const args = parseArgs(process.argv.slice(2));
const file = args._[0];
if (!file || args.help) {
  console.log(`Usage: node publish.mjs <post.md> [options]
  --platforms a,b,c   subset of ${ALL_PLATFORMS.join(',')} (default: post frontmatter "platforms", else config)
  --dry-run           validate and show what would be sent, publish nothing
  --assist            fill each editor but let you press Publish yourself
  --headless          no visible browser (fails instead of asking you for help)
  --force             repost to platforms already listed under "published:"`);
  process.exit(file ? 0 : 1);
}

const config = loadConfig();
const post = readPost(path.resolve(file));
const dryRun = !!args.dryRun;
const assist = !!args.assist;
const headless = args.headless === true || (args.headless === undefined && config.browser.headless === true);

const requested = (typeof args.platforms === 'string' ? args.platforms.split(',') : post.data.platforms || config.platforms)
  .map((p) => String(p).trim().toLowerCase()).filter(Boolean);
const unknown = requested.filter((p) => !ADAPTERS[p]);
if (unknown.length) { console.error(`Unknown platform(s): ${unknown.join(', ')}. Known: ${ALL_PLATFORMS.join(', ')}`); process.exit(1); }
const order = ALL_PLATFORMS.filter((p) => requested.includes(p));

let ctx = null;
const browser = async () => (ctx ??= await openBrowser({ headless, slowMo: config.browser.slowMo }));

console.log(`Post: ${post.data.title}\nFile: ${post.file}\nPlatforms: ${order.join(', ')}${dryRun ? '\n(dry run)' : ''}${assist ? '\n(assist mode: you press Publish)' : ''}`);

const results = {};
for (const p of order) {
  const a = ADAPTERS[p];
  console.log(`\n▶ ${a.label}`);
  const prior = post.data.published?.[p];
  if (prior && !args.force && !dryRun) {
    console.log(`  – already published: ${prior.url}  (use --force to repost)`);
    results[p] = { status: 'already', url: prior.url };
    continue;
  }
  try {
    const r = await a.publish(post, { config, dryRun, assist, headless, browser });
    if (!dryRun) recordResult(post, p, r);
    results[p] = { status: dryRun ? 'dry-run' : 'ok', ...r };
    console.log(`  ✓ ${r.url}`);
    if (r.preview) console.log('  ' + JSON.stringify(r.preview));
  } catch (e) {
    results[p] = { status: e.skipped ? 'skipped' : 'error', error: e.message };
    console.log(`  ✗ ${e.skipped ? 'skipped' : e.message}`);
  }
}

if (ctx) await ctx.close().catch(() => {});

console.log('\nSummary');
for (const [p, r] of Object.entries(results)) {
  const mark = { ok: '✓', 'dry-run': '·', already: '=', skipped: '–', error: '✗' }[r.status];
  console.log(`  ${mark} ${ADAPTERS[p].label.padEnd(9)} ${r.url || r.error}`);
}
console.log('\nRESULT ' + JSON.stringify({ file: post.file, results }));
process.exit(Object.values(results).some((r) => r.status === 'error') ? 1 : 0);
