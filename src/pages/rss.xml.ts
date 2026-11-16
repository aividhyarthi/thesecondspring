import type { APIRoute } from 'astro';
import { getAllLivePosts, buildRss } from '../lib/ai-content';

const FEED_LIMIT = 100;

export const GET: APIRoute = async () => {
  const posts = (await getAllLivePosts()).slice(0, FEED_LIMIT);
  return new Response(buildRss(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
    },
  });
};
