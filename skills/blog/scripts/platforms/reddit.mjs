import { field, toHtml } from '../lib/post.mjs';
import { manualAssist, requireLogin, step, pasteHtml } from '../lib/browser.mjs';

export const name = 'reddit';
export const label = 'Reddit';
export const kind = 'api';

const UA = 'blog-agent/0.1 (cross-poster; by the account owner)';

export function targets(post, config) {
  const subs = field(post, 'reddit', 'subreddits', config.reddit.defaultSubreddits) || [];
  return subs.map((s) => String(s).replace(/^\/?r\//, '').trim()).filter(Boolean);
}

export function hasApiCreds() {
  return ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD'].every((k) => process.env[k]);
}

export async function publish(post, { config, dryRun, browser, headless }) {
  const subs = targets(post, config);
  if (!subs.length) throw new Error('no subreddits: set reddit.subreddits in the post frontmatter or reddit.defaultSubreddits in config');
  const title = field(post, 'reddit', 'title', post.data.title);
  const text = field(post, 'reddit', 'body', post.content);
  const via = hasApiCreds() ? 'api' : 'browser';
  if (dryRun) return { url: `(dry-run) ${subs.map((s) => 'r/' + s).join(', ')} via ${via}` };

  const urls = via === 'api'
    ? await viaApi(subs, title, text, field(post, 'reddit', 'flair_id', undefined))
    : await viaBrowser(await browser(), subs, title, text, headless);
  return { url: urls.join(' , '), urls, via };
}

async function viaApi(subs, title, text, flairId) {
  const basic = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
  const tokRes = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
    body: new URLSearchParams({ grant_type: 'password', username: process.env.REDDIT_USERNAME, password: process.env.REDDIT_PASSWORD }),
  });
  const tok = await tokRes.json();
  if (!tok.access_token) throw new Error(`Reddit auth failed: ${JSON.stringify(tok)} (2FA accounts must use the browser route: clear REDDIT_* in .env)`);

  const urls = [];
  for (const sr of subs) {
    const form = new URLSearchParams({ sr, kind: 'self', title, text, api_type: 'json', resubmit: 'true', sendreplies: 'true' });
    if (flairId) form.set('flair_id', flairId);
    const res = await fetch('https://oauth.reddit.com/api/submit', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tok.access_token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
      body: form,
    });
    const j = await res.json();
    const errs = j?.json?.errors;
    if (!res.ok || (errs && errs.length)) throw new Error(`r/${sr}: ${JSON.stringify(errs || j)}`);
    const url = j.json.data.url;
    console.log(`  · r/${sr} → ${url}`);
    urls.push(url);
  }
  return urls;
}

async function viaBrowser(ctx, subs, title, text, headless) {
  const page = await ctx.newPage();
  await requireLogin(ctx, page, 'reddit', 'Reddit');
  const urls = [];
  for (const sr of subs) {
    await page.goto(`https://www.reddit.com/r/${sr}/submit?type=TEXT&title=${encodeURIComponent(title)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    await step(page, `r/${sr}: paste body`, async () => {
      const body = page.locator('[contenteditable="true"]').last();
      await body.waitFor({ timeout: 15000 });
      await pasteHtml(page, body, toHtml(text), text);
      await page.waitForTimeout(1000);
    }, { headless, fallback: `r/${sr}: paste the post body into the text box.` });
    await manualAssist(page, `r/${sr}: check title, body and flair, click Post, then click Done once the post page has opened.`);
    urls.push(page.url().split('?')[0]);
  }
  await page.close();
  return urls;
}
