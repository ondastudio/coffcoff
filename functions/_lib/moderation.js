// Llama Guard 3's safety-category taxonomy (Meta's model card).
const CATEGORY_LABELS = {
  S1: 'Violent Crimes',
  S2: 'Non-Violent Crimes',
  S3: 'Sex-Related Crimes',
  S4: 'Child Sexual Exploitation',
  S5: 'Defamation',
  S6: 'Specialized Advice',
  S7: 'Privacy',
  S8: 'Intellectual Property',
  S9: 'Indiscriminate Weapons',
  S10: 'Hate',
  S11: 'Suicide & Self-Harm',
  S12: 'Sexual Content',
  S13: 'Elections',
  S14: 'Code Interpreter Abuse',
};

// Calls Workers AI's Llama Guard 3 model to classify message safety.
// It replies with plain text: "safe", or "unsafe" followed by a line of
// comma-separated category codes (e.g. "unsafe\nS10,S12"). Anything that
// doesn't clearly read as "safe" is treated as flagged — fail safe, never
// approve on an unrecognized reply.
export async function checkModerationApi(text, ai) {
  const result = await ai.run('@cf/meta/llama-guard-3-8b', {
    messages: [{ role: 'user', content: text }],
  });

  const reply = (result.response || '').trim();

  if (/^safe$/i.test(reply)) {
    return { flagged: false, categories: [] };
  }

  const codes = reply.match(/S\d+/g) || [];
  const categories = codes.length
    ? codes.map((code) => CATEGORY_LABELS[code] || code)
    : [`unrecognized moderation response: "${reply}"`];

  return { flagged: true, categories };
}
