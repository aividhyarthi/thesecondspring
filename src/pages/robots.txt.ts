import type { APIRoute } from 'astro';

export const GET: APIRoute = () => new Response(
  'User-agent: *\nDisallow: /studio\nDisallow: /api/studio/\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } }
);
