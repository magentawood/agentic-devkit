import { field, toHtml } from '../lib/post.mjs';
import { step, pasteHtml, manualAssist, requireLogin } from '../lib/browser.mjs';

export const name = 'substack';
export const label = 'Substack';
export const kind = 'browser';

export function baseUrl(config) {
  const pub = (config.substack.publication || '').trim();
  if (!pub) throw new Error('substack.publication is not set in config (e.g. "yourname" for yourname.substack.com, or a full custom-domain URL)');
  return pub.startsWith('http') ? pub.replace(/\/$/, '') : `https://${pub}.substack.com`;
}

export async function publish(post, { config, browser, dryRun, assist, headless }) {
  const base = baseUrl(config);
  if (dryRun) return { url: `(dry-run) ${base}` };
  const ctx = await browser();
  const page = await ctx.newPage();
  await requireLogin(ctx, page, 'substack', 'Substack');

  const title = field(post, 'substack', 'title', post.data.title);
  const subtitle = field(post, 'substack', 'subtitle', post.data.subtitle);
  const body = field(post, 'substack', 'body', post.content);
  const html = toHtml(body);
  const opts = { headless };

  await page.goto(`${base}/publish/post?type=newsletter`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  await step(page, 'Write title', async () => {
    const t = page.getByPlaceholder(/^Title$/i).first();
    await t.waitFor({ timeout: 15000 });
    await t.fill(title);
  }, { ...opts, fallback: `Type the title: "${title}"` });

  if (subtitle) {
    await step(page, 'Write subtitle', async () => {
      await page.getByPlaceholder(/subtitle/i).first().fill(subtitle);
    }, { ...opts, fallback: `Type the subtitle: "${subtitle}"` });
  }

  await step(page, 'Paste body', async () => {
    const ed = page.locator('.ProseMirror[contenteditable="true"]').first();
    await ed.waitFor({ timeout: 10000 });
    await pasteHtml(page, ed, html, body);
    await page.waitForTimeout(2000);
  }, { ...opts, fallback: 'Paste the article body into the editor.' });

  if (assist) {
    await manualAssist(page, 'Substack: review the draft, publish/send it, then click Done on the published post page.');
  } else {
    await step(page, 'Continue', async () => {
      await page.getByRole('button', { name: /^Continue$/ }).first().click();
      await page.waitForTimeout(2500);
    }, { ...opts, fallback: 'Click "Continue" (top right).' });

    await step(page, 'Send / publish', async () => {
      const btn = page.getByRole('button', { name: /Send to everyone now|Publish now|^Send now$|^Publish$/i }).first();
      await btn.waitFor({ timeout: 15000 });
      await btn.click();
      await page.waitForTimeout(1500);
      const confirm = page.getByRole('button', { name: /Send to everyone now|Publish now|Yes, send|Confirm/i }).first();
      if (await confirm.isVisible().catch(() => false)) await confirm.click();
    }, { ...opts, fallback: 'Click the send / publish button and confirm.' });
  }

  await step(page, 'Wait for post URL', async () => {
    await page.waitForURL(/\/p\/[^/?]+/, { timeout: 90000 });
  }, { ...opts, fallback: 'Open the published post so its URL is in the address bar.' });

  const url = page.url().split('?')[0];
  await page.close();
  return { url };
}
