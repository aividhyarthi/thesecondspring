// Machine-readable surfaces for AI engines and answer engines:
//   /<journal>/<slug>.md one plain-Markdown twin per article
//   /rss.xml             latest articles feed
// Everything is generated from the same content collections as the HTML pages,
// and only includes posts whose pubDate has arrived (same gate as the sitemap).
import { getCollection } from 'astro:content';
import { SITE_URL, SITE_NAME } from './schema';

const PUBLISHER_NAME = SITE_NAME;

export type VerticalKey = 'women' | 'men' | 'longevity';

export interface Vertical {
  key: VerticalKey;
  collection: 'blog' | 'wind-blog' | 'longevity-blog';
  name: string;
  homePath: string;
  blogPath: string;
  summary: string;
}

export const VERTICALS: Vertical[] = [
  {
    key: 'women',
    collection: 'blog',
    name: 'Her Midlife',
    homePath: '/spring',
    blogPath: '/blog',
    summary: 'Perimenopause and menopause: symptoms, tests, treatment options and daily life for Indian women.',
  },
  {
    key: 'men',
    collection: 'wind-blog',
    name: 'His Midlife',
    homePath: '/wind',
    blogPath: '/wind/blog',
    summary: 'Andropause and midlife health for Indian men: testosterone, energy, mood, strength, sleep and sexual health.',
  },
  {
    key: 'longevity',
    collection: 'longevity-blog',
    name: 'Life Begins After 40',
    homePath: '/longevity',
    blogPath: '/longevity/blog',
    summary: 'Longevity for adults over 40: food, movement, sleep, stress and Ayurveda, rooted in Indian life.',
  },
];

export function verticalByKey(key: VerticalKey): Vertical {
  return VERTICALS.find((v) => v.key === key) as Vertical;
}

export interface LivePost {
  vertical: Vertical;
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate: Date;
  author: string | null;
  tags: string[];
  image: string | null;
  readTime: string;
  body: string;
  url: string;
  mdUrl: string;
  entry: any;
}

const TTL_MS = 10 * 60 * 1000;
const memo = new Map<string, { at: number; value: unknown }>();
async function cached<T>(key: string, build: () => Promise<T>): Promise<T> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as T;
  const value = await build();
  memo.set(key, { at: Date.now(), value });
  return value;
}

/** Live (already published) posts for one journal, newest first. */
export async function getLivePosts(key: VerticalKey): Promise<LivePost[]> {
  const vertical = verticalByKey(key);
  const now = new Date();
  const entries = (await getCollection(vertical.collection as any)) as any[];
  return entries
    .filter((e) => e.data.pubDate <= now)
    .map((e) => {
      const url = `${SITE_URL}${vertical.blogPath}/${e.slug}`;
      return {
        vertical,
        slug: e.slug as string,
        title: e.data.title as string,
        description: e.data.description as string,
        pubDate: e.data.pubDate as Date,
        updatedDate: (e.data.updatedDate ?? e.data.pubDate) as Date,
        author: e.data.author && e.data.author !== 'Journal Desk' ? (e.data.author as string) : null,
        tags: (e.data.tags ?? []) as string[],
        image: (e.data.image ?? null) as string | null,
        readTime: (e.data.readTime ?? '') as string,
        body: (e.body ?? '') as string,
        url,
        mdUrl: `${url}.md`,
        entry: e,
      } satisfies LivePost;
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export async function getAllLivePosts(): Promise<LivePost[]> {
  const groups = await Promise.all(VERTICALS.map((v) => getLivePosts(v.key)));
  return groups.flat().sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

// ───────────────────────── Markdown rendering ─────────────────────────

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

/**
 * Post bodies are Markdown with embedded HTML blocks (Quick Answer boxes,
 * infographic rows, CTA cards). AI engines get far cleaner text from plain
 * Markdown, so flatten the HTML while keeping its text, lists, bold and links.
 */
export function htmlToMarkdown(src: string): string {
  let s = src || '';
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<(svg|style|script)\b[\s\S]*?<\/\1>/gi, '');
  s = s.replace(
    /<p\b[^>]*class="[^"]*tldr-label[^"]*"[^>]*>([\s\S]*?)<\/p>/gi,
    (_m, t: string) => `\n\n**${t.replace(/<[^>]*>/g, '').trim()}**\n\n`,
  );
  s = s.replace(/<\/span>\s*<span\b[^>]*>/gi, ': ');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<li\b[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '');
  s = s.replace(/<\/?(ul|ol)\b[^>]*>/gi, '\n');
  s = s.replace(/<(strong|b)\b[^>]*>/gi, '**').replace(/<\/(strong|b)>/gi, '**');
  s = s.replace(/<(em|i)\b[^>]*>/gi, '_').replace(/<\/(em|i)>/gi, '_');
  s = s.replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  s = s.replace(/<\/?(p|div|section|article|header|footer|h[1-6]|table|thead|tbody|tr)\b[^>]*>/gi, '\n\n');
  s = s.replace(/<\/?(td|th)\b[^>]*>/gi, ' | ');
  s = s.replace(/<\/?[a-zA-Z][^>]*>/g, '');
  s = s.replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (m) => ENTITIES[m] ?? m);
  s = s.replace(/\*\*\s*\*\*/g, '');
  s = s
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  // Keep bullet lists tight (no blank line between consecutive items).
  s = s.replace(/^(- .*)\n\n(?=- )/gm, '$1\n');
  return s.trim();
}

/** Relative links become absolute so a model reading the .md can follow them. */
function absolutizeLinks(md: string): string {
  return md.replace(/\]\((\/[^)\s]*)\)/g, (_m, p: string) => `](${SITE_URL}${p})`);
}

const yaml = (s: string) => JSON.stringify(s);

export function postFrontMatter(p: LivePost): string {
  const lines = [
    '---',
    `title: ${yaml(p.title)}`,
    `canonical_url: ${yaml(p.url)}`,
    `markdown_url: ${yaml(p.mdUrl)}`,
    `date_published: ${yaml(p.pubDate.toISOString())}`,
    `date_modified: ${yaml(p.updatedDate.toISOString())}`,
    `description: ${yaml(p.description)}`,
    `content_type: "article"`,
    `publisher: ${yaml(PUBLISHER_NAME)}`,
    `section: ${yaml(p.vertical.name)}`,
    `section_url: ${yaml(SITE_URL + p.vertical.blogPath)}`,
    `tags: ${JSON.stringify(p.tags)}`,
    `author: ${yaml(p.author ?? p.vertical.name)}`,
    `language: "en-IN"`,
    `region: "India"`,
    ...(p.readTime ? [`read_time: ${yaml(p.readTime)}`] : []),
    `image: ${p.image ? yaml(p.image) : 'null'}`,
    '---',
  ];
  return lines.join('\n');
}

export function postMarkdown(p: LivePost): string {
  const body = absolutizeLinks(htmlToMarkdown(p.body));
  return `${postFrontMatter(p)}\n\n# ${p.title}\n\n${body}\n\nCanonical page: ${p.url}\n`;
}

export async function markdownResponse(key: VerticalKey, slug: string | undefined): Promise<Response> {
  const posts = await getLivePosts(key);
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return new Response('Not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  return new Response(postMarkdown(post), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      // The HTML page stays the canonical document; the .md twin consolidates to it.
      Link: `<${post.url}>; rel="canonical"`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

// ───────────────────────── RSS ─────────────────────────

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function buildRss(posts: LivePost[]): string {
  const items = posts
    .map((p) => {
      const cats = [p.vertical.name, ...p.tags].map((c) => `      <category>${xmlEscape(c)}</category>`).join('\n');
      return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${xmlEscape(p.url)}</link>
      <guid isPermaLink="true">${xmlEscape(p.url)}</guid>
      <pubDate>${p.pubDate.toUTCString()}</pubDate>
      <dc:creator>${xmlEscape(p.author ?? p.vertical.name)}</dc:creator>
${cats}
      <description>${xmlEscape(p.description)}</description>
      <atom:link rel="alternate" type="text/markdown" href="${xmlEscape(p.mdUrl)}" />
    </item>`;
    })
    .join('\n');
  const last = posts.reduce((m, p) => (p.updatedDate > m ? p.updatedDate : m), new Date(0));
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${PUBLISHER_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>Evidence-aware health guidance for Indian adults in midlife: Her Midlife, His Midlife and Life Begins After 40.</description>
    <language>en-IN</language>
    <lastBuildDate>${last.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
