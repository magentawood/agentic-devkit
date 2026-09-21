#!/usr/bin/env node
// Usage:
//   node setup.mjs init [--substack <pub>] [--posts-dir <dir>] [--subreddits a,b] [--linkedin-mode article|post]
//   node setup.mjs login [medium,substack,linkedin,quora,reddit]   (opens Chrome, waits until each site is logged in)
import fs from 'node:fs';
import { CONFIG_DIR, CONFIG_PATH, ENV_PATH, ENV_TEMPLATE, PROFILE_DIR, BROWSER_PLATFORMS, parseArgs, loadConfig, saveConfig, expandHome, configExists } from './lib/config.mjs';
import { openBrowser, isLoggedIn, LOGIN_COOKIES } from './lib/browser.mjs';
import { hasApiCreds } from './platforms/reddit.mjs';

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0] || 'init';

if (cmd === 'init') {
  const cfg = loadConfig();
  if (args.substack) cfg.substack.publication = String(args.substack);
  if (args.postsDir) cfg.postsDir = String(args.postsDir);
  if (args.subreddits) cfg.reddit.defaultSubreddits = String(args.subreddits).split(',').map((s) => s.trim()).filter(Boolean);
  if (args.linkedinMode) cfg.linkedin.mode = String(args.linkedinMode);
  if (typeof args.platforms === 'string') cfg.platforms = args.platforms.split(',').map((s) => s.trim());
  const existed = configExists();
  saveConfig(cfg);
  if (!fs.existsSync(ENV_PATH)) fs.writeFileSync(ENV_PATH, ENV_TEMPLATE, { mode: 0o600 });
  fs.mkdirSync(expandHome(cfg.postsDir), { recursive: true });
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  console.log(`${existed ? 'Updated' : 'Created'} ${CONFIG_PATH}`);
  console.log(JSON.stringify(cfg, null, 2));
  console.log(`\nSecrets file: ${ENV_PATH}  (fill DEVTO_API_KEY and, optionally, REDDIT_*)`);
  console.log(`Drafts dir:   ${expandHome(cfg.postsDir)}`);
  console.log(`Chrome profile: ${PROFILE_DIR}`);
  console.log(`\nNext: node setup.mjs login`);
  process.exit(0);
}

if (cmd === 'login') {
  const wanted = args._[1] ? args._[1].split(',') : [...BROWSER_PLATFORMS, ...(hasApiCreds() ? [] : ['reddit'])];
  const ctx = await openBrowser({ headless: false });
  const pending = new Set();
  for (const p of wanted) {
    if (await isLoggedIn(ctx, p)) { console.log(`  ✓ ${p}: already logged in`); continue; }
    pending.add(p);
    const page = await ctx.newPage();
    await page.goto(LOGIN_COOKIES[p].loginUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
  }
  // Close the blank first tab if we opened others.
  const pages = ctx.pages();
  if (pages.length > 1 && pages[0].url() === 'about:blank') await pages[0].close();

  if (!pending.size) { console.log('All requested platforms are logged in.'); await ctx.close(); process.exit(0); }
  console.log(`\nLog in to: ${[...pending].join(', ')} in the Chrome window (one tab each).`);
  console.log('Tip: if Google sign-in refuses this browser, use the email / magic-link option instead.');
  console.log('Waiting… (I detect each login automatically; close the window to stop.)\n');

  const deadline = Date.now() + 20 * 60 * 1000;
  let closed = false;
  ctx.on('close', () => { closed = true; });
  while (pending.size && Date.now() < deadline && !closed) {
    await new Promise((r) => setTimeout(r, 3000));
    for (const p of [...pending]) {
      if (closed) break;
      if (await isLoggedIn(ctx, p).catch(() => false)) { pending.delete(p); console.log(`  ✓ ${p}: logged in`); }
    }
  }
  for (const p of pending) console.log(`  ✗ ${p}: not logged in`);
  if (!closed) await ctx.close().catch(() => {});
  process.exit(pending.size ? 1 : 0);
}

console.error(`Unknown command "${cmd}". Use: init | login`);
process.exit(1);
