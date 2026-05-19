'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authFetch } from '@/lib/client-api';
import { isApiUnavailable, isAuthError } from '@/lib/api-errors';
import type { Proposal } from '@/lib/types';

export default function NuevaPropuestaPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Proposal[]>([]);
  const [clientName, setClientName] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    authFetch('/templates')
      .then((r) => r.json())
      .then((data: Proposal[]) => {
        setTemplates(data);
        const master = data.find((p) => p.slug === 'plantilla-maestra');
        if (master) setTemplateId(master.id);
        setLoadError('');
      })
      .catch((err: unknown) => {
        if (isAuthError(err)) {
          router.push('/login');
          return;
        }
        setLoadError(
          isApiUnavailable(err)
            ? 'No se pudo conectar con el servidor. Inicie el backend (npm run start:dev en cootravir-backend).'
            : err instanceof Error
              ? err.message
              : 'No se pudieron cargar las plantillas',
        );
      });
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await authFetch('/proposals', {
        method: 'POST',
        body: JSON.stringify({
          clientName,
          title,
          slug: slug.toLowerCase().replace(/\s+/g, '-'),
          templateId: templateId || undefined,
        }),
      });
      const created = (await res.json()) as Proposal;
      router.push(`/propuestas/${created.id}/editar`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-6 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-6">Nueva propuesta</h1>
      {loadError && (
        <p className="text-amber-300 text-sm bg-amber-950/40 border border-amber-800 rounded-lg p-3 mb-4">
          {loadError}
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Cliente</span>
          <input
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Título</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Slug (URL)</span>
          <input
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ej: conjunto-almendros-2026"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Plantilla base</span>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700"
          >
            <option value="">Sin plantilla (solo título)</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] font-medium"
        >
          Crear propuesta
        </button>
      </form>
    </div>
  );
}
