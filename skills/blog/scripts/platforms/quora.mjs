import { field, toHtml } from '../lib/post.mjs';
import { step, pasteHtml, manualAssist, requireLogin } from '../lib/browser.mjs';

export const name = 'quora';
export const label = 'Quora';
export const kind = 'browser';

// Quora has no API and its editor is the most fragile of the set; every step has a manual fallback.
export async function publish(post, { browser, dryRun, assist, headless }) {
  if (dryRun) return { url: '(dry-run) quora' };
  const ctx = await browser();
  const page = await ctx.newPage();
  await requireLogin(ctx, page, 'quora', 'Quora');

  const title = field(post, 'quora', 'title', post.data.title);
  const body = field(post, 'quora', 'body', post.content);
  const html = `<p><b>${escapeHtml(title)}</b></p>\n` + toHtml(body);
  const plain = `${title}\n\n${body}`;
  const opts = { headless };

  await page.goto('https://www.quora.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  await step(page, 'Open post composer', async () => {
    await page.getByText(/What do you want to ask or share\?/i).first().click();
    await page.waitForTimeout(1500);
    await page.getByText(/^Create Post$/i).first().click();
    await page.waitForTimeout(1000);
  }, { ...opts, fallback: 'Open the "Create Post" composer (click the box at the top of the feed, then "Create Post").' });

  await step(page, 'Paste body', async () => {
    const dialog = page.locator('[role="dialog"]').last();
    const ed = dialog.locator('[contenteditable="true"]').first();
    await ed.waitFor({ timeout: 10000 });
    await pasteHtml(page, ed, html, plain);
    await page.waitForTimeout(2000);
  }, { ...opts, fallback: 'Paste the post (title + body) into the composer.' });

  if (assist) {
    await manualAssist(page, 'Quora: review the post, click Post, then click Done.');
  } else {
    await step(page, 'Post', async () => {
      await page.locator('[role="dialog"]').last().getByRole('button', { name: /^Post$/ }).first().click();
      await page.waitForTimeout(3000);
    }, { ...opts, fallback: 'Click "Post".' });
  }

  let url = 'https://www.quora.com/';
  await step(page, 'Find profile URL', async () => {
    const href = await page.locator('a[href^="/profile/"]').first().getAttribute('href', { timeout: 8000 });
    if (href) url = 'https://www.quora.com' + href.split('?')[0].replace(/\/$/, '') + '/posts';
  }, { ...opts, fallback: 'Open your profile posts page so its URL is in the address bar.' });
  if (url === 'https://www.quora.com/') url = page.url().split('?')[0];

  await page.close();
  return { url };
}

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
