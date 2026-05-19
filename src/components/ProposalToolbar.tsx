'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authFetch } from '@/lib/client-api';
import type { Proposal } from '@/lib/types';

interface ProposalToolbarProps {
  proposal: Proposal;
  token: string;
}

export default function ProposalToolbar({ proposal }: ProposalToolbarProps) {
  const router = useRouter();
  const [showDup, setShowDup] = useState(false);
  const [clientName, setClientName] = useState('');
  const [slug, setSlug] = useState('');
  const [msg, setMsg] = useState('');

  async function publish() {
    await authFetch(`/proposals/${proposal.id}/publish`, { method: 'PATCH' });
    setMsg('Publicada');
    router.refresh();
  }

  async function archive() {
    await authFetch(`/proposals/${proposal.id}/archive`, { method: 'PATCH' });
    setMsg('Archivada');
    router.refresh();
  }

  async function duplicate() {
    const res = await authFetch(`/proposals/${proposal.id}/duplicate`, {
      method: 'POST',
      body: JSON.stringify({ clientName, slug }),
    });
    const copy = (await res.json()) as Proposal;
    router.push(`/propuestas/${copy.id}/editar`);
  }

  return (
    <div className="px-4 py-2 border-b border-slate-800 flex flex-wrap items-center gap-3 text-sm bg-[#0c1428]">
      {proposal.isTemplate ? (
        <span className="text-xs px-2 py-0.5 rounded border border-amber-500/50 bg-amber-500/10 text-amber-200">
          Plantilla — el mapa de cada cliente se guarda aparte en la base de datos
        </span>
      ) : (
        <span className="text-xs px-2 py-0.5 rounded border border-slate-600 bg-slate-800/80 text-slate-300">
          Mapa propio en BD{proposal.mapConfig ? '' : ' (sin configurar aún)'}
        </span>
      )}
      <span className="text-slate-400">{proposal.clientName}</span>
      <span className="text-xs px-2 py-0.5 rounded bg-slate-800">{proposal.status}</span>
      {msg && <span className="text-green-400">{msg}</span>}
      <div className="flex-1" />
      <Link href={`/propuestas/${proposal.id}/mapa`} className="text-slate-300 hover:text-white">
        Mapa
      </Link>
      {proposal.status !== 'PUBLISHED' && (
        <button type="button" onClick={publish} className="text-green-400 hover:underline">
          Publicar
        </button>
      )}
      <button type="button" onClick={archive} className="text-slate-400 hover:underline">
        Archivar
      </button>
      <button
        type="button"
        onClick={() => setShowDup(!showDup)}
        className="text-[#d4af37] hover:underline"
      >
        Duplicar cliente
      </button>
      {proposal.status === 'PUBLISHED' && (
        <Link href={`/p/${proposal.slug}`} target="_blank" className="text-[#d4af37]">
          Ver /p/{proposal.slug}
        </Link>
      )}
      {showDup && (
        <div className="w-full flex flex-wrap gap-2 items-end pt-2 border-t border-slate-700 mt-2">
          <input
            placeholder="Nombre cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="px-2 py-1 rounded bg-slate-900 border border-slate-700"
          />
          <input
            placeholder="slug-nuevo-cliente"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-2 py-1 rounded bg-slate-900 border border-slate-700"
          />
          <button
            type="button"
            onClick={duplicate}
            className="px-3 py-1 rounded bg-[#0e2455] hover:bg-[#4a6fa5]"
          >
            Crear copia
          </button>
        </div>
      )}
    </div>
  );
}
