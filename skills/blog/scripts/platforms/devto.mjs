import { field } from '../lib/post.mjs';

export const name = 'devto';
export const label = 'dev.to';
export const kind = 'api';

const normTag = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '');

export async function publish(post, { dryRun }) {
  const key = process.env.DEVTO_API_KEY;
  if (!key && !dryRun) throw new Error('DEVTO_API_KEY is not set in ~/.config/blog-agent/.env');

  const article = {
    title: field(post, 'devto', 'title', post.data.title),
    body_markdown: field(post, 'devto', 'body', post.content),
    published: !post.data.draft,
    tags: (field(post, 'devto', 'tags', post.data.tags) || []).map(normTag).filter(Boolean).slice(0, 4),
    description: post.data.subtitle || undefined,
    canonical_url: post.data.canonical_url || undefined,
    series: field(post, 'devto', 'series', undefined),
  };
  if (dryRun) return { url: '(dry-run) dev.to' + (key ? '' : '  ⚠ DEVTO_API_KEY not set'), preview: { ...article, body_markdown: `${article.body_markdown.length} chars` } };

  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/vnd.forem.api-v1+json' },
    body: JSON.stringify({ article }),
  });
  if (!res.ok) throw new Error(`dev.to responded ${res.status}: ${await res.text()}`);
  const j = await res.json();
  return { url: j.url, id: j.id };
}
