// Starter list for local testing — replace with a real curated word list before going live.
const BLOCKED_WORDS = ['badword', 'testslur', 'spamlink'];

export function findBlockedWord(text) {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.find((word) => lower.includes(word)) || null;
}
