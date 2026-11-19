import type { APIRoute } from 'astro';
import { getAllLivePosts } from '../lib/ai-content';
import { SITE_URL } from '../lib/schema';

// Paginated article directory for AI engines: /llms-full-1.txt, /llms-full-2.txt, ...
// llms-full.txt (the hand-written platform reference) links to page 1 as the
// entry point. Each page lists article titles, canonical URLs and their
// Markdown twins, newest first, split so no single file grows unbounded as
// the site publishes more articles.
const PAGE_SIZE = 200;

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export const GET: APIRoute = async ({ params }) => {
  const pageNum = Number(params.page);
  if (!Number.isInteger(pageNum) || pageNum < 1) {
    return new Response('Not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const posts = await getAllLivePosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  if (pageNum > totalPages) {
    return new Response('Not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const start = (pageNum - 1) * PAGE_SIZE;
  const slice = posts.slice(start, start + PAGE_SIZE);

  const lines: string[] = [];
  lines.push(`# The Second Spring: Article Directory (page ${pageNum} of ${totalPages})`);
  lines.push('');
  lines.push(`Total live articles across all programmes: ${posts.length}`);
  lines.push(`This page: articles ${start + 1}-${start + slice.length}, newest first.`);
  lines.push('');
  lines.push(`Platform reference and editorial rules: ${SITE_URL}/llms-full.txt`);
  if (pageNum > 1) lines.push(`Previous page: ${SITE_URL}/llms-full-${pageNum - 1}.txt`);
  if (pageNum < totalPages) lines.push(`Next page: ${SITE_URL}/llms-full-${pageNum + 1}.txt`);
  lines.push('');
  lines.push('Each entry: [Programme] Title — canonical URL — Markdown twin — publish date');
  lines.push('');

  for (const post of slice) {
    lines.push(
      `- [${post.vertical.name}] ${post.title} — ${post.url} — ${post.mdUrl} — ${formatDate(post.pubDate)}`,
    );
  }

  lines.push('');

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
