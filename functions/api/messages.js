import { MAX_MESSAGE_LENGTH, RATE_LIMIT_MAX_MESSAGES, RATE_LIMIT_WINDOW_MINUTES } from '../_lib/config.js';
import { jsonResponse } from '../_lib/http.js';
import { hashIp } from '../_lib/hash.js';
import { verificar } from '../_lib/wordlist.js';
import { checkModerationApi } from '../_lib/moderation.js';
import { verifyTurnstileToken } from '../_lib/turnstile.js';
import { isRateLimited } from '../_lib/ratelimit.js';

// GET /api/messages — list approved messages, newest first, paginated.
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get('limit')) || 20, 50);
  const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);

  const { results } = await env.DB.prepare(
    `SELECT id, text, created_at FROM messages
     WHERE status = 'approved'
     ORDER BY created_at DESC, id DESC
     LIMIT ? OFFSET ?`
  )
    .bind(limit, offset)
    .all();

  return jsonResponse({ messages: results });
}

// POST /api/messages — submit a message.
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (!text) {
    return jsonResponse({ error: 'Message text is required' }, 400);
  }
  if (text.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashIp(ip);

  if (await isRateLimited(env.DB, ipHash, RATE_LIMIT_MAX_MESSAGES, RATE_LIMIT_WINDOW_MINUTES)) {
    return jsonResponse({ error: 'You are posting too quickly. Please wait a bit and try again.' }, 429);
  }

  const verified = await verifyTurnstileToken(body.turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
  if (!verified) {
    return jsonResponse({ error: 'Verification failed. Please try again.' }, 403);
  }

  const { status, flagReason } = await moderate(text, env);

  const message = await env.DB.prepare(
    `INSERT INTO messages (text, status, flag_reason, ip_hash) VALUES (?, ?, ?, ?)
     RETURNING id, text, created_at, status`
  )
    .bind(text, status, flagReason, ipHash)
    .first();

  return jsonResponse(message, 201);
}

// Word list first (cheap, no inference cost) — if it hits, skip the model call entirely.
// Otherwise call Llama Guard; on any failure, fail safe to 'pending' rather than publish unchecked.
async function moderate(text, env) {
  const hits = verificar(text);
  if (hits.length) {
    return { status: 'pending', flagReason: `wordlist: ${hits.join(', ')}` };
  }

  try {
    const result = await checkModerationApi(text, env.AI);
    if (result.flagged) {
      return { status: 'pending', flagReason: `llama-guard: ${result.categories.join(', ')}` };
    }
    return { status: 'approved', flagReason: null };
  } catch (err) {
    return { status: 'pending', flagReason: `moderation check failed: ${err.message}` };
  }
}
