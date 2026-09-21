import { chromium } from 'playwright';
import { PROFILE_DIR } from './config.mjs';

export class SkipPlatform extends Error {
  constructor(msg = 'skipped by user') { super(msg); this.skipped = true; }
}

export async function openBrowser({ headless = false, slowMo = 0 } = {}) {
  const ctx = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless,
    slowMo,
    viewport: { width: 1280, height: 900 },
    args: ['--disable-blink-features=AutomationControlled'],
    ignoreDefaultArgs: ['--enable-automation'],
  });
  ctx.setDefaultTimeout(20000);
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  return ctx;
}

/** Login cookies per site: if the cookie is present, the profile is logged in. */
export const LOGIN_COOKIES = {
  medium:   { url: 'https://medium.com', cookie: 'sid',            loginUrl: 'https://medium.com/m/signin' },
  substack: { url: 'https://substack.com', cookie: 'substack.sid', loginUrl: 'https://substack.com/sign-in' },
  linkedin: { url: 'https://www.linkedin.com', cookie: 'li_at',    loginUrl: 'https://www.linkedin.com/login' },
  quora:    { url: 'https://www.quora.com', cookie: 'm-b',         loginUrl: 'https://www.quora.com/' },
  reddit:   { url: 'https://www.reddit.com', cookie: 'reddit_session', loginUrl: 'https://www.reddit.com/login' },
};

export async function isLoggedIn(ctx, platform) {
  const spec = LOGIN_COOKIES[platform];
  const cookies = await ctx.cookies(spec.url);
  return cookies.some((c) => c.name === spec.cookie && c.value);
}

/**
 * Pause and let the user finish a step in the Chrome window.
 * Shows a bar at the top of the page with Done / Skip buttons and waits for a click.
 * No terminal input is needed, so this works when driven by an agent.
 */
export async function manualAssist(page, message, { timeoutMs = 15 * 60 * 1000 } = {}) {
  console.log(`\n  ⚠  ${message}`);
  console.log(`     Finish it in the Chrome window, then click "Done" in the blue bar (or "Skip" to drop this platform).`);
  await page.bringToFront().catch(() => {});
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (page.isClosed()) throw new SkipPlatform('browser tab was closed');
    try {
      await injectBar(page, message);
      await page.waitForFunction(() => window.__blogAgent && window.__blogAgent.answer, null, { timeout: 4000, polling: 500 });
      const answer = await page.evaluate(() => window.__blogAgent.answer);
      await page.evaluate(() => document.getElementById('__blogAgentBar')?.remove()).catch(() => {});
      if (answer === 'skip') throw new SkipPlatform();
      console.log('     continuing.');
      return;
    } catch (e) {
      if (e.skipped) throw e;
      // timeout or navigation: loop and re-inject
    }
  }
  throw new Error('timed out waiting for you to click Done');
}

async function injectBar(page, message) {
  await page.evaluate((message) => {
    if (document.getElementById('__blogAgentBar')) return;
    window.__blogAgent = { answer: null };
    const bar = document.createElement('div');
    bar.id = '__blogAgentBar';
    bar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#1d4ed8;color:#fff;font:14px/1.4 -apple-system,system-ui,sans-serif;padding:10px 16px;display:flex;gap:12px;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,.3)';
    const txt = document.createElement('span');
    txt.style.flex = '1';
    txt.textContent = 'blog-agent: ' + message;
    const mk = (label, val, bg) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = `background:${bg};color:#fff;border:0;border-radius:6px;padding:6px 14px;font-weight:600;cursor:pointer`;
      b.onclick = () => { window.__blogAgent.answer = val; };
      return b;
    };
    bar.append(txt, mk('Done ✓', 'done', '#16a34a'), mk('Skip', 'skip', '#6b7280'));
    document.documentElement.appendChild(bar);
  }, message);
}

/**
 * Run an automated step; if it throws, fall back to asking the user to do it by hand.
 * In headless mode there is no user, so the error propagates.
 */
export async function step(page, label, fn, { fallback, headless = false } = {}) {
  process.stdout.write(`  · ${label} … `);
  try {
    const r = await fn();
    console.log('ok');
    return r;
  } catch (e) {
    if (e.skipped) throw e;
    console.log('failed');
    console.log(`    ${String(e.message).split('\n')[0]}`);
    if (headless) throw e;
    await manualAssist(page, fallback || `Couldn't "${label}" automatically. Please do it by hand.`);
    return null;
  }
}

/**
 * Paste rich HTML into a contenteditable editor.
 * Primary route: write to the real clipboard and press Cmd/Ctrl+V so the editor's own paste handler runs.
 * Fallback: dispatch a synthetic paste event.
 */
export async function pasteHtml(page, locator, html, plain) {
  await locator.click();
  await page.bringToFront().catch(() => {});
  const before = await locator.innerText().catch(() => '');
  const changed = async () => ((await locator.innerText().catch(() => '')) !== before);

  // 1. Real clipboard + Cmd/Ctrl+V: the editor's own paste handler runs.
  const wrote = await page.evaluate(async ({ html, plain }) => {
    try {
      const item = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
      return true;
    } catch { return false; }
  }, { html, plain });
  if (wrote) {
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    await page.waitForTimeout(800);
    if (await changed()) return 'clipboard';
  }

  // 2. Synthetic paste event (works for editors that read clipboardData in JS: ProseMirror, Medium, Quill…).
  await locator.evaluate((el, { html, plain }) => {
    const dt = new DataTransfer();
    dt.setData('text/html', html);
    dt.setData('text/plain', plain);
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, { html, plain });
  await page.waitForTimeout(800);
  if (await changed()) return 'synthetic';

  // 3. Last resort: type the plain markdown so at least the content lands.
  await locator.click();
  await page.keyboard.insertText(plain);
  return 'plaintext';
}

export async function requireLogin(ctx, page, platform, label) {
  if (await isLoggedIn(ctx, platform)) return;
  await page.goto(LOGIN_COOKIES[platform].loginUrl, { waitUntil: 'domcontentloaded' });
  await manualAssist(page, `${label}: you're not logged in. Log in, then click Done.`);
}
