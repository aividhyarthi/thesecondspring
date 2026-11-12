import type { APIRoute } from 'astro';
import { createStudioSession, isStudioConfigured, studioSessionCookie, verifyStudioPassword } from '../../../lib/studio-auth';

const attempts = new Map<string, { count: number; resetAt: number }>();

export const POST: APIRoute = async ({ request }) => {
  if (!isStudioConfigured()) {
    return new Response(JSON.stringify({ error: 'The private studio has not been configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.resetAt > now && record.count >= 8) {
    return new Response(JSON.stringify({ error: 'Too many attempts. Please wait 15 minutes and try again.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 });
  }

  if (!verifyStudioPassword(String(body.password || ''))) {
    const current = record && record.resetAt > now ? record : { count: 0, resetAt: now + 15 * 60 * 1000 };
    current.count += 1;
    attempts.set(ip, current);
    return new Response(JSON.stringify({ error: 'That password is not correct.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  attempts.delete(ip);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': studioSessionCookie(createStudioSession()),
      'Cache-Control': 'no-store',
    },
  });
};
