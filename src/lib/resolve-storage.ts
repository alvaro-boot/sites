import { getApiUrl } from '@/lib/api';
import { authFetch } from '@/lib/client-api';

const STORAGE_PREFIX = '__STORAGE__:';

export function htmlUsesStorage(html: string): boolean {
  return html.includes(STORAGE_PREFIX);
}

export function storagePathFromRef(src: string): string | null {
  if (!src.startsWith(STORAGE_PREFIX)) return null;
  return decodeURIComponent(src.slice(STORAGE_PREFIX.length));
}

export function toStorageRef(path: string): string {
  return `${STORAGE_PREFIX}${path}`;
}

/**
 * Antes de guardar en BD: si el HTML trae URLs firmadas de Supabase (p. ej. copiadas
 * de la vista previa), las convierte de nuevo a __STORAGE__:ruta estable.
 */
export function sanitizeHtmlForStorage(html: string): string {
  if (!html.includes('/storage/v1/object/')) return html;

  return html.replace(
    /https?:\/\/[^"'\s>]+\/storage\/v1\/object\/(?:sign|public)\/[^/"'\s]+\/([^"'\s]+?)(?:\?[^"'\s>]*)?(?=["'\s>])/g,
    (_full, objectPath: string) => {
      try {
        return toStorageRef(decodeURIComponent(objectPath));
      } catch {
        return _full;
      }
    },
  );
}

/** Pide URLs firmadas nuevas al backend antes de mostrar la diapositiva. */
export async function resolveStorageInHtml(
  html: string,
  _token?: string,
): Promise<string> {
  if (!htmlUsesStorage(html)) return html;

  const res = await authFetch('/files/resolve-html', {
    method: 'POST',
    body: JSON.stringify({ html }),
  });

  if (!res.ok) {
    console.warn('No se pudieron resolver URLs de almacenamiento');
    return html;
  }

  const data = (await res.json()) as { html: string };
  return data.html;
}

/** Presentación pública: pide URLs firmadas nuevas por diapositiva. */
export async function resolveStorageInHtmlPublic(
  html: string,
  slug: string,
): Promise<string> {
  if (!htmlUsesStorage(html)) return html;

  const res = await fetch(
    `${getApiUrl()}/proposals/by-slug/${encodeURIComponent(slug)}/resolve-html`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    },
  );

  if (!res.ok) {
    console.warn('No se pudieron resolver URLs públicas de almacenamiento');
    return html;
  }

  const data = (await res.json()) as { html: string };
  return data.html;
}
