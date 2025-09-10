const API_URL = 'https://kevals-first-api.onrender.com';

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, { method: 'GET', credentials: 'include' });
  if (!res.ok) throw new Error((await res.json()).detail || 'Request failed');
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Request failed');
  return res.json();
}