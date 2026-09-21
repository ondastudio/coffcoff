// Verifies a Turnstile token with Cloudflare's siteverify endpoint.
// Returns false on any failure (invalid token, expired, network error) — never
// throws, so the caller can treat "not verified" uniformly.
export async function verifyTurnstileToken(token, secretKey, ip) {
  if (!token) return false;

  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);
  if (ip) formData.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
