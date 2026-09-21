import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const CONFIG_DIR = process.env.BLOG_AGENT_HOME || path.join(os.homedir(), '.config', 'blog-agent');
export const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
export const ENV_PATH = path.join(CONFIG_DIR, '.env');
export const PROFILE_DIR = path.join(CONFIG_DIR, 'chrome-profile');

// Publish order: API platforms first (fast, no browser), then browser platforms.
export const ALL_PLATFORMS = ['devto', 'reddit', 'medium', 'substack', 'linkedin', 'quora'];
export const BROWSER_PLATFORMS = ['medium', 'substack', 'linkedin', 'quora'];

export const DEFAULT_CONFIG = {
  postsDir: '~/blog-posts',
  platforms: ALL_PLATFORMS,
  substack: { publication: '' },
  reddit: { defaultSubreddits: [] },
  linkedin: { mode: 'article' },
  browser: { headless: false, slowMo: 50 },
};

export const ENV_TEMPLATE = `# blog-agent secrets. Only the API platforms need keys; the rest use the logged-in Chrome profile.

# dev.to — generate at https://dev.to/settings/extensions ("DEV Community API Keys")
DEVTO_API_KEY=

# Reddit — create a "script" app at https://www.reddit.com/prefs/apps
# Leave these blank to post through the browser instead (needed if your account has 2FA).
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USERNAME=
REDDIT_PASSWORD=
`;

export function expandHome(p) {
  return p && p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p;
}

export function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
    if (line.trim().startsWith('#')) continue;
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined || process.env[m[1]] === '') process.env[m[1]] = v;
  }
}

export function configExists() {
  return fs.existsSync(CONFIG_PATH);
}

export function loadConfig() {
  loadEnv();
  let user = {};
  if (fs.existsSync(CONFIG_PATH)) user = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  return deepMerge(structuredClone(DEFAULT_CONFIG), user);
}

export function saveConfig(cfg) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + '\n');
}

function deepMerge(a, b) {
  for (const k of Object.keys(b)) {
    if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object') a[k] = deepMerge(a[k], b[k]);
    else a[k] = b[k];
  }
  return a;
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, inlineV] = a.slice(2).split('=');
      const key = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (inlineV !== undefined) args[key] = inlineV;
      else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) args[key] = argv[++i];
      else args[key] = true;
    } else args._.push(a);
  }
  return args;
}
