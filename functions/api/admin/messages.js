import { jsonResponse } from '../../_lib/http.js';

const VALID_STATUSES = ['approved', 'pending', 'rejected'];

// GET /api/admin/messages?status=pending — list messages by status, newest first.
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'pending';

  if (!VALID_STATUSES.includes(status)) {
    return jsonResponse({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, 400);
  }

  const { results } = await env.DB.prepare(
    `SELECT id, text, created_at, status, flag_reason FROM messages
     WHERE status = ?
     ORDER BY created_at DESC, id DESC`
  )
    .bind(status)
    .all();

  return jsonResponse({ messages: results });
}
