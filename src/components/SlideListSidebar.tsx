'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authFetch } from '@/lib/client-api';
import type { Slide } from '@/lib/types';

interface SlideListSidebarProps {
  proposalId: string;
  slides: Slide[];
  currentSlideId: string;
}

export default function SlideListSidebar({
  proposalId,
  slides,
  currentSlideId,
}: SlideListSidebarProps) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [template, setTemplate] = useState<'blank' | 'section' | 'portada'>('section');

  async function addSlide() {
    const res = await authFetch(`/proposals/${proposalId}/slides`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        key: key.toLowerCase().replace(/\s+/g, '_'),
        template,
      }),
    });
    if (!res.ok) {
      alert('No se pudo crear la diapositiva');
      return;
    }
    const created = (await res.json()) as Slide;
    setShowAdd(false);
    setTitle('');
    setKey('');
    router.push(`/propuestas/${proposalId}/editar?slide=${created.key}`);
    router.refresh();
  }

  async function deleteSlide(slideId: string, slideTitle: string) {
    if (!confirm(`¿Eliminar "${slideTitle}"?`)) return;
    await authFetch(`/proposals/${proposalId}/slides/${slideId}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <aside className="w-56 shrink-0 border-r border-slate-800 p-3 overflow-y-auto flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 uppercase">Diapositivas</p>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="text-xs text-[#4a6fa5] hover:underline"
          title="Añadir diapositiva"
        >
          + Nueva
        </button>
      </div>

      {showAdd && (
        <div className="p-2 rounded border border-slate-700 space-y-2 text-xs bg-slate-900/50">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600"
          />
          <input
            placeholder="clave_ej: extra_1"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600"
          />
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as typeof template)}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600"
          >
            <option value="section">Sección COOTRAVIR</option>
            <option value="portada">Portada</option>
            <option value="blank">En blanco</option>
          </select>
          <button
            type="button"
            onClick={addSlide}
            className="w-full py-1 rounded bg-[#0e2455] hover:bg-[#4a6fa5]"
          >
            Crear
          </button>
        </div>
      )}

      <ul className="space-y-1 flex-1">
        {slides.map((s) => (
          <li key={s.id} className="group flex items-center gap-1">
            <Link
              href={`/propuestas/${proposalId}/editar?slide=${s.key}`}
              className={`flex-1 block text-sm px-2 py-1.5 rounded ${
                s.id === currentSlideId
                  ? 'bg-[#0e2455] text-white'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {s.order + 1}. {s.title}
            </Link>
            <button
              type="button"
              title="Eliminar"
              onClick={() => deleteSlide(s.id, s.title)}
              className="opacity-0 group-hover:opacity-100 text-red-400 text-xs px-1"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
