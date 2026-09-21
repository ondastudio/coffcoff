-- Migration number: 0001 	 2026-09-21T16:04:02.981Z

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  flag_reason TEXT,
  ip_hash TEXT NOT NULL
);

-- Speeds up the two queries we'll run constantly: the public feed
-- (status = 'approved', newest first) and the admin queue (status = 'pending', etc).
CREATE INDEX idx_messages_status_created_at ON messages (status, created_at DESC);
