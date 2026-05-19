/** Mensaje legible desde respuestas Nest / fetch. */
export function messageFromApiBody(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback;
  const msg = (body as { message?: string | string[] }).message;
  if (Array.isArray(msg)) return msg.join(', ');
  if (typeof msg === 'string' && msg.trim()) return msg;
  return fallback;
}

/** true si el error indica sesión inválida (sí redirigir a login). */
export function isAuthError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const m = err.message.toLowerCase();
  return (
    m.includes('no autenticado') ||
    m.includes('unauthorized') ||
    m.includes('401')
  );
}

/** true si falló la conexión con el backend. */
export function isApiUnavailable(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const m = err.message.toLowerCase();
  return (
    m.includes('no se pudo conectar') ||
    m.includes('failed to fetch') ||
    m.includes('network') ||
    m.includes('503')
  );
}
