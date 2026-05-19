const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3001';

const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:3001';

export function getApiUrl() {
  return API_URL.replace(/\/$/, '');
}

/** URL de la API visible en el navegador (subidas directas en producción). */
export function getPublicApiUrl() {
  return PUBLIC_API_URL.replace(/\/$/, '');
}

export function isLocalApiUrl(url: string) {
  return /localhost|127\.0\.0\.1/i.test(url);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${getApiUrl()}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `Error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function apiFetchServer<T>(
  path: string,
  token?: string,
): Promise<T> {
  return apiFetch<T>(path, { token });
}
