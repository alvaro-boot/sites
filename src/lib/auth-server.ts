import { cookies } from 'next/headers';
import { User } from './types';
import { apiFetchServer } from './api';

export const AUTH_COOKIE = 'cootravir_token';

export async function getToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getToken();
  if (!token) return null;
  try {
    return await apiFetchServer<User>('/auth/me', token);
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<{ user: User; token: string }> {
  const token = await getToken();
  if (!token) throw new Error('UNAUTHORIZED');
  const user = await getCurrentUser();
  if (!user) throw new Error('UNAUTHORIZED');
  return { user, token };
}
