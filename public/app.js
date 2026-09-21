const MAX_LENGTH = 280;
const PAGE_SIZE = 20;

const form = document.getElementById('message-form');
const textArea = document.getElementById('message-text');
const counter = document.getElementById('char-counter');
const errorEl = document.getElementById('form-error');
const feedEl = document.getElementById('feed');
const loadMoreBtn = document.getElementById('load-more');

let offset = 0;

function updateCounter() {
  const remaining = MAX_LENGTH - textArea.value.length;
  counter.textContent = `${textArea.value.length} / ${MAX_LENGTH}`;
  counter.classList.toggle('warning', remaining <= 20);
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = '';
}

function formatDate(sqliteTimestamp) {
  // D1 stores UTC as "YYYY-MM-DD HH:MM:SS" with no timezone marker.
  const date = new Date(sqliteTimestamp.replace(' ', 'T') + 'Z');
  return date.toLocaleString();
}

function renderMessage(message) {
  const el = document.createElement('article');
  el.className = 'message';

  const text = document.createElement('p');
  text.className = 'message-text';
  text.textContent = message.text; // textContent, never innerHTML — no HTML injection

  const time = document.createElement('time');
  time.textContent = formatDate(message.created_at);

  el.append(text, time);
  return el;
}

async function loadFeed({ append = false } = {}) {
  const res = await fetch(`/api/messages?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!res.ok) return;

  const { messages } = await res.json();

  if (!append) feedEl.replaceChildren();
  for (const message of messages) {
    feedEl.append(renderMessage(message));
  }

  offset += messages.length;
  loadMoreBtn.hidden = messages.length < PAGE_SIZE;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();

  const text = textArea.value.trim();
  if (!text) {
    showError('Message can\'t be empty.');
    return;
  }

  const turnstileToken = document.querySelector('[name="cf-turnstile-response"]')?.value;
  if (!turnstileToken) {
    showError('Please complete the verification.');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, turnstileToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.error || 'Something went wrong. Please try again.');
      return;
    }

    textArea.value = '';
    updateCounter();
    offset = 0;
    await loadFeed();
  } catch {
    showError('Network error. Please try again.');
  } finally {
    submitButton.disabled = false;
    window.turnstile?.reset(); // tokens are single-use — get a fresh one for the next submit
  }
});

textArea.addEventListener('input', updateCounter);
loadMoreBtn.addEventListener('click', () => loadFeed({ append: true }));

updateCounter();
loadFeed();
