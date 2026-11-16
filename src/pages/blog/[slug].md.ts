import type { APIRoute } from 'astro';
import { markdownResponse } from '../../lib/ai-content';

// Plain-Markdown twin of /blog/[slug] for AI engines.
export const GET: APIRoute = ({ params }) => markdownResponse('women', params.slug);
