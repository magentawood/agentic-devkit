import { field, toHtml } from '../lib/post.mjs';
import { step, pasteHtml, manualAssist, requireLogin } from '../lib/browser.mjs';

export const name = 'medium';
export const label = 'Medium';
export const kind = 'browser';

export async function publish(post, { browser, dryRun, assist, headless }) {
  if (dryRun) return { url: '(dry-run) medium' };
  const ctx = await browser();
  const page = await ctx.newPage();
  await requireLogin(ctx, page, 'medium', 'Medium');

  const title = field(post, 'medium', 'title', post.data.title);
  const body = field(post, 'medium', 'body', post.content);
  const html = (post.data.subtitle ? `<h2>${escapeHtml(post.data.subtitle)}</h2>\n` : '') + toHtml(body);
  const opts = { headless };

  await page.goto('https://medium.com/new-story', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  await step(page, 'Write title', async () => {
    const t = page.locator('[data-testid="editorTitleParagraph"], h3.graf--title, .graf--title').first();
    await t.waitFor({ timeout: 15000 });
    await t.click();
    await page.keyboard.type(title);
  }, { ...opts, fallback: `Type the title into the editor: "${title}"` });

  await step(page, 'Paste body', async () => {
    await page.keyboard.press('Enter');
    const p = page.locator('[data-testid="editorParagraphText"], p.graf--p, .graf--p').last();
    await p.waitFor({ timeout: 10000 });
    await pasteHtml(page, p, html, body);
    await page.waitForTimeout(2000);
  }, { ...opts, fallback: 'Paste the article body under the title.' });

  if (assist) {
    await manualAssist(page, 'Medium: review the draft, publish it, then click Done on the published story page.');
  } else {
    await step(page, 'Open publish dialog', async () => {
      await page.getByRole('button', { name: /^Publish$/ }).first().click();
      await page.waitForTimeout(2000);
    }, { ...opts, fallback: 'Click "Publish" (top right).' });

    const tags = (field(post, 'medium', 'tags', post.data.tags) || []).slice(0, 5);
    if (tags.length) {
      await step(page, 'Add topics', async () => {
        const input = page.locator('[data-testid="publishTopicsInput"], input[placeholder*="topic" i]').first();
        await input.waitFor({ timeout: 10000 });
        for (const tag of tags) {
          await input.fill(String(tag));
          await page.waitForTimeout(800);
          await page.keyboard.press('Enter');
          await page.waitForTimeout(300);
        }
      }, { ...opts, fallback: `Add topics: ${tags.join(', ')}` });
    }

    await step(page, 'Publish now', async () => {
      await page.getByRole('button', { name: /Publish now/i }).first().click();
    }, { ...opts, fallback: 'Click "Publish now".' });
  }

  await step(page, 'Wait for story URL', async () => {
    await page.waitForURL((u) => !/\/edit|new-story|\/p\/[a-f0-9]+$/.test(u.href), { timeout: 90000 });
    await page.waitForTimeout(1000);
  }, { ...opts, fallback: 'Open the published story so its URL is in the address bar.' });

  const url = page.url().split('?')[0];
  await page.close();
  return { url };
}

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
