import type { APIRoute } from 'astro';
import { getAllLivePosts } from '../lib/ai-content';
import { SITE_URL } from '../lib/schema';

// Index that points crawlers at the full sitemap and the news sitemap.
export const GET: APIRoute = async () => {
  const posts = await getAllLivePosts();
  const latest = posts.reduce((m, p) => (p.updatedDate > m ? p.updatedDate : m), new Date(0));
  const iso = (d: Date) => d.toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${iso(latest)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/news-sitemap.xml</loc>
    <lastmod>${iso(new Date())}</lastmod>
  </sitemap>
</sitemapindex>
`;
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
    },
  });
};
