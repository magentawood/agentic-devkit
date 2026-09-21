#!/usr/bin/env node
// Usage: node doctor.mjs [--logins]   (--logins opens Chrome headlessly to check saved sessions)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONFIG_PATH, ENV_PATH, PROFILE_DIR, BROWSER_PLATFORMS, parseArgs, loadConfig, configExists, expandHome } from './lib/config.mjs';

const args = parseArgs(process.argv.slice(2));
const here = path.dirname(fileURLToPath(import.meta.url));
const report = { ok: true, checks: [] };
const check = (name, ok, detail, fatal = true) => { report.checks.push({ name, ok, detail }); if (!ok && fatal) report.ok = false; console.log(`  ${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`); };

console.log('blog-agent doctor\n');
check('node ≥ 18', Number(process.versions.node.split('.')[0]) >= 18, `node ${process.versions.node}`);
check('node_modules installed', fs.existsSync(path.join(here, 'node_modules', 'playwright')), fs.existsSync(path.join(here, 'node_modules', 'playwright')) ? '' : `run: npm install --prefix ${here}`);
check('Google Chrome present', process.platform !== 'darwin' || fs.existsSync('/Applications/Google Chrome.app'), 'used via Playwright channel "chrome"');
check('config.json', configExists(), configExists() ? CONFIG_PATH : `missing — run: node ${path.join(here, 'setup.mjs')} init`);

if (configExists()) {
  const cfg = loadConfig();
  check('posts dir', fs.existsSync(expandHome(cfg.postsDir)), expandHome(cfg.postsDir));
  check('.env file', fs.existsSync(ENV_PATH), ENV_PATH, false);
  check('DEVTO_API_KEY', !!process.env.DEVTO_API_KEY, process.env.DEVTO_API_KEY ? 'set' : 'not set — dev.to publishing will fail', false);
  const redditApi = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD'].every((k) => process.env[k]);
  check('Reddit route', true, redditApi ? 'API (script app)' : 'browser (no REDDIT_* creds)');
  check('Substack publication', !!cfg.substack.publication, cfg.substack.publication || 'not set — substack will fail', false);
  check('Chrome profile dir', fs.existsSync(PROFILE_DIR), PROFILE_DIR, false);

  if (args.logins) {
    const { openBrowser, isLoggedIn } = await import('./lib/browser.mjs');
    let ctx;
    try {
      ctx = await openBrowser({ headless: true });
      for (const p of [...BROWSER_PLATFORMS, 'reddit']) check(`login: ${p}`, await isLoggedIn(ctx, p), '', false);
    } catch (e) { check('login check', false, e.message.split('\n')[0], false); }
    finally { await ctx?.close().catch(() => {}); }
  }
}

console.log(`\n${report.ok ? 'Ready.' : 'Fix the ✗ items above.'}`);
console.log('DOCTOR ' + JSON.stringify(report));
process.exit(report.ok ? 0 : 1);
