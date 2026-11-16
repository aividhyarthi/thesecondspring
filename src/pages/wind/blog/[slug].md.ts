import type { APIRoute } from 'astro';
import { markdownResponse } from '../../../lib/ai-content';

// Plain-Markdown twin of /wind/blog/[slug] for AI engines.
export const GET: APIRoute = ({ params }) => markdownResponse('men', params.slug);
