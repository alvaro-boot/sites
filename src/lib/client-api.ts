'use client';

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
