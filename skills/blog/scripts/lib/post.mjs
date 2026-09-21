import fs from 'node:fs';
import matter from 'gray-matter';
import { marked } from 'marked';

export function readPost(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  if (!data.title) throw new Error(`${file}: frontmatter needs a "title"`);
  return { file, data, content: content.trim() };
}

export function writePost(post) {
  fs.writeFileSync(post.file, matter.stringify(post.content + '\n', post.data));
}

export function toHtml(md) {
  return marked.parse(md, { gfm: true, breaks: false });
}

export function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

/** Per-platform override: post.data.<platform>.<key>, else fallback. */
export function field(post, platform, key, fallback) {
  const section = post.data[platform];
  return section && section[key] !== undefined && section[key] !== null && section[key] !== '' ? section[key] : fallback;
}

export function recordResult(post, platform, result) {
  post.data.published = post.data.published || {};
  post.data.published[platform] = { ...result, at: new Date().toISOString() };
  writePost(post);
}
