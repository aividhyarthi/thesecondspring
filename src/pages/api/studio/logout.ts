import type { APIRoute } from 'astro';
import { clearStudioSessionCookie } from '../../../lib/studio-auth';

export const POST: APIRoute = async () => new Response(JSON.stringify({ ok: true }), {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
    'Set-Cookie': clearStudioSessionCookie(),
    'Cache-Control': 'no-store',
  },
});
