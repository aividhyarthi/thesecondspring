import type { APIRoute } from 'astro';
import { hasStudioSession, isStudioConfigured } from '../../../lib/studio-auth';

export const GET: APIRoute = async ({ request }) => new Response(JSON.stringify({
  configured: isStudioConfigured(),
  authenticated: hasStudioSession(request),
}), {
  status: 200,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});
