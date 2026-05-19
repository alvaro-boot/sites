'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/lib/client-api';
import { isApiUnavailable, isAuthError } from '@/lib/api-errors';
import type { Proposal } from '@/lib/types';

export default function PlantillasPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Proposal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    authFetch('/templates')
      .then((r) => r.json())
      .then((data) => {
        setTemplates(data);
        setLoadError('');
      })
      .catch((err: unknown) => {
        if (isAuthError(err)) {
          router.push('/login');
          return;
        }
        setLoadError(
          isApiUnavailable(err)
            ? 'No se pudo conectar con el servidor. Inicie el backend en el puerto 3001.'
            : err instanceof Error
              ? err.message
              : 'No se pudieron cargar las plantillas',
        );
      });
  }, [router]);

  async function createTemplate(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authFetch('/templates', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug: slug.toLowerCase().replace(/\s+/g, '-'),
          includeStarterSlides: true,
          includeMap: false,
        }),
      });
      setShowForm(false);
      setTitle('');
      setSlug('');
      router.refresh();
      const resList = await authFetch('/templates');
      setTemplates(await resList.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  async function reseedMaster() {
    if (!confirm('¿Reinstalar la plantilla maestra desde el sistema? Se perderán cambios en esa plantilla.')) {
      return;
    }
    setLoading(true);
    try {
      await authFetch('/templates/seed-system', { method: 'POST' });
      router.refresh();
      const resList = await authFetch('/templates');
      setTemplates(await resList.json());
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
            ← Propuestas
          </Link>
          <h1 className="text-2xl font-bold mt-1">Plantillas del sistema</h1>
          <p className="text-slate-400 text-sm">
            Base reutilizable para crear propuestas por cliente. Use componentes COOTRAVIR en el editor.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="px-4 py-2 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-sm"
          >
            Nueva plantilla
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={reseedMaster}
            className="px-4 py-2 rounded-lg border border-amber-500/40 text-amber-300 text-sm hover:bg-amber-500/10 disabled:opacity-50"
          >
            Reinstalar plantilla maestra
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {loadError && (
          <p className="text-amber-300 text-sm bg-amber-950/40 border border-amber-800 rounded-lg p-3">
            {loadError}
          </p>
        )}
        {showForm && (
          <form
            onSubmit={createTemplate}
            className="p-4 rounded-xl border border-slate-700 bg-[#0c1428] space-y-3"
          >
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Nombre de la plantilla</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Slug</span>
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#4a6fa5] text-sm disabled:opacity-50"
            >
              Crear con diapositivas de la plantilla maestra
            </button>
          </form>
        )}

        <ul className="space-y-3">
          {templates.map((t) => (
            <li
              key={t.id}
              className="p-4 rounded-xl border border-slate-800 bg-[#0c1428] flex flex-wrap justify-between gap-4"
            >
              <div>
                <h2 className="font-semibold">{t.title}</h2>
                <p className="text-sm text-slate-400">
                  {t.slug} · {t.slides?.length ?? 0} diapositivas
                </p>
              </div>
              <Link
                href={`/propuestas/${t.id}/editar`}
                className="px-3 py-1.5 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-sm self-center"
              >
                Editar plantilla
              </Link>
            </li>
          ))}
        </ul>

        {templates.length === 0 && !loading && (
          <p className="text-slate-400 text-center py-8">
            No hay plantillas. Reinicie el backend para cargar la plantilla maestra automáticamente.
          </p>
        )}
      </main>
    </div>
  );
}
