// Counts how many messages this IP hash has submitted recently, using the
// messages table itself — no separate rate-limit store needed. Counts all
// statuses (approved/pending/rejected): the point is to stop someone from
// hammering the endpoint, regardless of what happens to the content after.
export async function isRateLimited(db, ipHash, maxMessages, windowMinutes) {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as count FROM messages
       WHERE ip_hash = ? AND created_at > datetime('now', ?)`
    )
    .bind(ipHash, `-${windowMinutes} minutes`)
    .first();

  return row.count >= maxMessages;
}
