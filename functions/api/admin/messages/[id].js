import { jsonResponse } from '../../../_lib/http.js';

// 'pending' is included so the admin page can "undo" an approve/reject by
// sending a message back to the queue, not just move it forward.
const VALID_STATUSES = ['approved', 'pending', 'rejected'];

// POST /api/admin/messages/:id — set a message's status.
export async function onRequestPost(context) {
  const { request, env, params } = context;
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return jsonResponse({ error: 'Invalid message id' }, 400);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!VALID_STATUSES.includes(body.status)) {
    return jsonResponse({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, 400);
  }

  const message = await env.DB.prepare(
    `UPDATE messages SET status = ? WHERE id = ?
     RETURNING id, text, created_at, status, flag_reason`
  )
    .bind(body.status, id)
    .first();

  if (!message) {
    return jsonResponse({ error: 'Message not found' }, 404);
  }

  return jsonResponse(message);
}
