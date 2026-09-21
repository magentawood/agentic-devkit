import { field, toHtml } from '../lib/post.mjs';
import { step, pasteHtml, manualAssist, requireLogin } from '../lib/browser.mjs';

export const name = 'linkedin';
export const label = 'LinkedIn';
export const kind = 'browser';

export async function publish(post, { config, browser, dryRun, assist, headless }) {
  const mode = field(post, 'linkedin', 'mode', config.linkedin.mode || 'article');
  if (dryRun) return { url: `(dry-run) linkedin ${mode}` };
  const ctx = await browser();
  const page = await ctx.newPage();
  await requireLogin(ctx, page, 'linkedin', 'LinkedIn');
  const opts = { headless };
  const r = mode === 'post' ? await feedPost(post, page, opts, assist) : await article(post, page, opts, assist);
  await page.close();
  return { ...r, mode };
}

async function article(post, page, opts, assist) {
  const title = field(post, 'linkedin', 'title', post.data.title);
  const body = field(post, 'linkedin', 'body', post.content);
  const html = toHtml(body);

  await page.goto('https://www.linkedin.com/article/new/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  await step(page, 'Write title', async () => {
    const t = page.locator('.article-editor-headline__textarea, textarea[placeholder="Title"], [data-placeholder="Title"]').first();
    await t.waitFor({ timeout: 15000 });
    await t.click();
    await t.fill(title);
  }, { ...opts, fallback: `Type the title: "${title}"` });

  await step(page, 'Paste body', async () => {
    const ed = page.locator('.article-editor-content__content[contenteditable="true"], .article-editor-content [contenteditable="true"], [contenteditable="true"]').last();
    await ed.waitFor({ timeout: 10000 });
    await pasteHtml(page, ed, html, body);
    await page.waitForTimeout(2000);
  }, { ...opts, fallback: 'Paste the article body into the editor.' });

  if (assist) {
    await manualAssist(page, 'LinkedIn: review the article, publish it, then click Done on the published article page.');
  } else {
    await step(page, 'Next', async () => {
      await page.getByRole('button', { name: /^Next$/ }).first().click();
      await page.waitForTimeout(2000);
    }, { ...opts, fallback: 'Click "Next" (top right).' });

    const teaser = field(post, 'linkedin', 'post_text', '');
    if (teaser) {
      await step(page, 'Add share text', async () => {
        const box = page.locator('[role="dialog"] [contenteditable="true"], .ql-editor[contenteditable="true"]').first();
        await box.waitFor({ timeout: 8000 });
        await box.fill(teaser);
      }, { ...opts, fallback: 'Add the share text in the publish dialog.' });
    }

    await step(page, 'Publish', async () => {
      await page.getByRole('button', { name: /^Publish$/ }).last().click();
      await page.waitForTimeout(1500);
      const confirm = page.getByRole('button', { name: /^Publish$/ }).last();
      if (await confirm.isVisible().catch(() => false)) await confirm.click().catch(() => {});
    }, { ...opts, fallback: 'Click "Publish" and confirm.' });
  }

  await step(page, 'Wait for article URL', async () => {
    await page.waitForURL(/\/pulse\//, { timeout: 90000 });
  }, { ...opts, fallback: 'Open the published article so its /pulse/ URL is in the address bar.' });

  return { url: page.url().split('?')[0] };
}

async function feedPost(post, page, opts, assist) {
  const text = field(post, 'linkedin', 'post_text', '');
  if (!text) throw new Error('linkedin.mode is "post" but linkedin.post_text is empty in the frontmatter');

  await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  await step(page, 'Open composer', async () => {
    await page.getByRole('button', { name: /Start a post/i }).first().click();
    await page.locator('.ql-editor[contenteditable="true"]').first().waitFor({ timeout: 10000 });
  }, { ...opts, fallback: 'Click "Start a post".' });

  await step(page, 'Write post', async () => {
    const ed = page.locator('.ql-editor[contenteditable="true"]').first();
    await ed.click();
    await page.keyboard.insertText(text);
    await page.waitForTimeout(1000);
  }, { ...opts, fallback: 'Paste the post text into the composer.' });

  if (assist) {
    await manualAssist(page, 'LinkedIn: review the post and click Post, then click Done.');
  } else {
    await step(page, 'Post', async () => {
      await page.getByRole('button', { name: /^Post$/ }).first().click();
      await page.waitForTimeout(3000);
    }, { ...opts, fallback: 'Click "Post".' });
  }
  return { url: 'https://www.linkedin.com/in/me/recent-activity/all/' };
}
