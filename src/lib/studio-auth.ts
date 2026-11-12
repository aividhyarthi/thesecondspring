import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'hci_studio_session';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function passwordSecret(): string {
  return process.env.STUDIO_PASSWORD || '';
}

function sessionSecret(): string {
  return process.env.STUDIO_SESSION_SECRET || passwordSecret();
}

function signature(value: string): string {
  return createHmac('sha256', sessionSecret()).update(value).digest('hex');
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isStudioConfigured(): boolean {
  return passwordSecret().length >= 12;
}

export function verifyStudioPassword(candidate: string): boolean {
  const expected = passwordSecret();
  return Boolean(expected) && safeEqual(candidate, expected);
}

export function createStudioSession(): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = String(expires);
  return `${payload}.${signature(payload)}`;
}

export function studioSessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}`;
}

export function clearStudioSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export function hasStudioSession(request: Request): boolean {
  if (!isStudioConfigured() || !sessionSecret()) return false;

  const cookieHeader = request.headers.get('cookie') || '';
  const entry = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return false;

  const token = entry.slice(COOKIE_NAME.length + 1);
  const separator = token.indexOf('.');
  if (separator < 1) return false;

  const expires = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  const expiry = Number(expires);

  if (!Number.isFinite(expiry) || expiry <= Math.floor(Date.now() / 1000)) return false;
  if (expiry > Math.floor(Date.now() / 1000) + SESSION_SECONDS + 60) return false;

  return safeEqual(suppliedSignature, signature(expires));
}
