const listEl = document.getElementById('admin-list');
const tabButtons = document.querySelectorAll('.tab-button');
const pendingCountEl = document.getElementById('pending-count');

let activeStatus = 'pending';

function formatDate(sqliteTimestamp) {
  const date = new Date(sqliteTimestamp.replace(' ', 'T') + 'Z');
  return date.toLocaleString();
}

function actionLabel(fromStatus, toStatus) {
  if (toStatus === 'pending') return fromStatus === 'approved' ? 'Unapprove' : 'Restore';
  return toStatus === 'approved' ? 'Approve' : 'Reject';
}

function renderMessage(message) {
  const el = document.createElement('article');
  el.className = 'admin-message';

  const text = document.createElement('p');
  text.className = 'message-text';
  text.textContent = message.text; // textContent, never innerHTML

  const meta = document.createElement('div');
  meta.className = 'admin-meta';

  const time = document.createElement('time');
  time.textContent = formatDate(message.created_at);
  meta.append(time);

  if (message.flag_reason) {
    const reason = document.createElement('span');
    reason.className = 'flag-reason';
    reason.textContent = `flagged: ${message.flag_reason}`;
    meta.append(reason);
  }

  const actions = document.createElement('div');
  actions.className = 'admin-actions';

  const targets = message.status === 'pending' ? ['approved', 'rejected'] : ['pending'];
  for (const target of targets) {
    const button = document.createElement('button');
    button.textContent = actionLabel(message.status, target);
    button.addEventListener('click', () => updateStatus(message.id, target));
    actions.append(button);
  }

  el.append(text, meta, actions);
  return el;
}

async function updateStatus(id, status) {
  await fetch(`/api/admin/messages/${id}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  await loadPendingCount();
  await loadTab(activeStatus);
}

async function loadTab(status) {
  const res = await fetch(`/api/admin/messages?status=${status}`);
  const { messages } = await res.json();

  listEl.replaceChildren();
  if (messages.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Nothing here.';
    listEl.append(empty);
    return;
  }
  for (const message of messages) {
    listEl.append(renderMessage(message));
  }
}

async function loadPendingCount() {
  const res = await fetch('/api/admin/messages?status=pending');
  const { messages } = await res.json();
  pendingCountEl.textContent = messages.length ? `(${messages.length})` : '';
}

for (const button of tabButtons) {
  button.addEventListener('click', () => {
    activeStatus = button.dataset.status;
    for (const b of tabButtons) b.classList.toggle('active', b === button);
    loadTab(activeStatus);
  });
}

loadPendingCount();
loadTab(activeStatus);
