'use client';

import { getPublicApiUrl, isLocalApiUrl } from './api';
import { messageFromApiBody } from './api-errors';

/** Petición autenticada vía proxy Next (sin CORS al puerto 3001). */
export async function authFetch(path: string, init?: RequestInit) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`/api/backend${normalized}`, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init?.body &&
      !(init.headers as Record<string, string> | undefined)?.['Content-Type'] &&
      !(init.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(messageFromApiBody(err, res.statusText || `Error ${res.status}`));
  }
  return res;
}

/**
 * Subida multipart: en producción va directo al backend (evita límite del proxy en Vercel).
 * En local usa el proxy /api/backend.
 */
export async function authUpload(path: string, formData: FormData) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const publicApi = getPublicApiUrl();

  if (!isLocalApiUrl(publicApi)) {
    const tokenRes = await fetch('/api/auth/token', { credentials: 'same-origin' });
    if (!tokenRes.ok) {
      throw new Error('No autenticado');
    }
    const { token } = (await tokenRes.json()) as { token?: string };
    if (!token) throw new Error('No autenticado');

    const res = await fetch(`${publicApi}${normalized}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(messageFromApiBody(err, res.statusText || `Error ${res.status}`));
    }
    return res;
  }

  return authFetch(normalized, { method: 'POST', body: formData });
}
