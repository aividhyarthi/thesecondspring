import Anthropic from '@anthropic-ai/sdk';
import type { APIRoute } from 'astro';
import { hasStudioSession } from '../../../lib/studio-auth';
import { buildStudioSystemPrompt, buildStudioUserPrompt, type StudioBrand, type StudioMode } from '../../../lib/studio-prompts';

const validBrands: StudioBrand[] = ['second-spring', 'rudra-kasturi', 'southwala', 'general'];
const validModes: StudioMode[] = ['create', 'humanise'];
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function parseJson(text: string): any | null {
  const cleaned = text.trim().replace(/^\uFEFF/, '').replace(/^\`\`\`(?:json)?\s*/i, '').replace(/\s*\`\`\`$/, '');
  try { return JSON.parse(cleaned); } catch { /* try the outermost JSON object */ }
  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');
  if (first >= 0 && last > first) {
    try { return JSON.parse(cleaned.slice(first, last + 1)); } catch { /* handled below */ }
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  if (!hasStudioSession(request)) return json({ error: 'Please sign in to the private studio again.' }, 401);
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: 'The AI service is not connected yet. The ANTHROPIC_API_KEY setting is missing.' }, 503);

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const prior = requestCounts.get(ip);
  if (prior && prior.resetAt > now && prior.count >= 12) {
    return json({ error: 'The studio has reached its temporary usage limit. Please try again later.' }, 429);
  }
  const current = prior && prior.resetAt > now ? prior : { count: 0, resetAt: now + 60 * 60 * 1000 };
  current.count += 1;
  requestCounts.set(ip, current);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'The request could not be read. Please try again.' }, 400);
  }

  const mode = String(body.mode || '') as StudioMode;
  const brand = String(body.brand || 'second-spring') as StudioBrand;
  const topic = String(body.topic || '').trim();
  const draft = String(body.draft || '').trim();
  const brief = String(body.brief || '').trim();
  const primaryKeyword = String(body.primaryKeyword || '').trim();
  const secondaryKeywords = String(body.secondaryKeywords || '').trim();
  const audience = String(body.audience || '').trim();
  const research = body.research !== false;
  const wordCount = Math.max(500, Math.min(3500, Number(body.wordCount) || 1500));

  if (!validModes.includes(mode)) return json({ error: 'Choose a valid content workflow.' }, 400);
  if (!validBrands.includes(brand)) return json({ error: 'Choose a valid brand profile.' }, 400);
  if (mode === 'create' && !topic) return json({ error: 'Enter a topic or working title.' }, 400);
  if (mode === 'humanise' && !draft) return json({ error: 'Paste the existing draft you want to improve.' }, 400);
  if (topic.length > 500 || draft.length > 90000 || brief.length > 8000) {
    return json({ error: 'The submitted content is too long. Please shorten it and try again.' }, 413);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
  const tools = research
    ? [{ type: 'web_search_20250305', name: 'web_search', max_uses: mode === 'create' ? 6 : 4 } as any]
    : undefined;

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 14000,
      system: buildStudioSystemPrompt(brand, mode),
      messages: [{
        role: 'user',
        content: buildStudioUserPrompt({
          mode,
          topic,
          draft,
          primaryKeyword,
          secondaryKeywords,
          audience,
          wordCount,
          brief,
          research,
        }),
      }],
      ...(tools ? { tools } : {}),
    });

    const textBlocks = response.content
      .filter((block: any) => block.type === 'text')
      .map((block: any) => block.text);
    const rawText = textBlocks.join('\n').trim();
    const parsed = parseJson(rawText);

    if (!parsed || typeof parsed.article_markdown !== 'string') {
      return json({
        error: 'The model returned an incomplete response. Please try again with a shorter brief or draft.',
        detail: rawText.slice(0, 1200),
      }, 502);
    }

    const citationSources: Array<{ title: string; url: string; publisher?: string }> = [];
    for (const block of response.content as any[]) {
      if (block.type === 'text' && Array.isArray(block.citations)) {
        for (const citation of block.citations) {
          if (citation.url) citationSources.push({
            title: citation.title || citation.url,
            url: citation.url,
            publisher: citation.cited_text || undefined,
          });
        }
      }
      if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
        for (const item of block.content) {
          if (item.type === 'web_search_result' && item.url) citationSources.push({
            title: item.title || item.url,
            url: item.url,
          });
        }
      }
    }

    const combinedSources = [...(Array.isArray(parsed.sources) ? parsed.sources : []), ...citationSources];
    const seen = new Set<string>();
    const sources = combinedSources.filter((source: any) => {
      const url = String(source.url || '').trim();
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });

    return json({
      ...parsed,
      sources,
      model,
      research_enabled: research,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });
  } catch (error: any) {
    console.error('[content-studio] generation failed:', error);
    const message = String(error?.message || '');
    if (message.toLowerCase().includes('credit balance is too low') || message.toLowerCase().includes('insufficient credits')) {
      return json({ error: 'Your Anthropic API account has run out of prepaid credits. Add API credits in Anthropic Console under Plans & Billing, then try again. This is separate from a Claude Pro or Max subscription.' }, 402);
    }
    if (message.includes('authentication') || message.includes('invalid x-api-key')) {
      return json({ error: 'The AI service rejected its API key. Please check the ANTHROPIC_API_KEY setting.' }, 502);
    }
    if (message.includes('model')) {
      return json({ error: 'The configured AI model is unavailable. Check the ANTHROPIC_MODEL setting.' }, 502);
    }
    return json({ error: 'The content workflow could not be completed. Please try again. If the problem continues, check the AI service connection.' }, 500);
  }
};
