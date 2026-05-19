'use client';

import { useEffect, useRef, useState } from 'react';
import type { Slide } from '@/lib/types';
import { authFetch, authUpload } from '@/lib/client-api';
import { registerCootravirBlocks } from '@/lib/grapes-blocks';

import 'grapesjs/dist/css/grapes.min.css';

interface GrapesEditorProps {
  proposalId: string;
  slide: Slide;
  token: string;
  onSaved: (slide: Slide) => void;
}

export default function GrapesEditor({
  proposalId,
  slide,
  token,
  onSaved,
}: GrapesEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let destroyed = false;

    async function init() {
      const grapesjs = (await import('grapesjs')).default;
      const preset = (await import('grapesjs-preset-webpage')).default;

      if (!containerRef.current || destroyed) return;

      const editor = grapesjs.init({
        container: containerRef.current,
        height: '100%',
        fromElement: false,
        storageManager: false,
        plugins: [preset],
        pluginsOpts: {
          [preset as unknown as string]: {},
        },
        canvas: {
          styles: [
            '/legacy/slides-theme.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
          ],
          scripts: ['https://cdn.tailwindcss.com'],
        },
      });

      const wrapper = `<div class="slide-root">${slide.html}</div>`;
      editor.setComponents(wrapper);
      if (slide.css) {
        editor.setStyle(slide.css);
      }
      if (slide.grapesData) {
        editor.loadProjectData(slide.grapesData as never);
      }

      registerCootravirBlocks(editor as never);

      editorRef.current = editor;
    }

    init();
    return () => {
      destroyed = true;
      const ed = editorRef.current as { destroy?: () => void } | null;
      ed?.destroy?.();
      editorRef.current = null;
    };
  }, [slide.id, slide.html, slide.css, slide.grapesData]);

  async function save() {
    const editor = editorRef.current as {
      getHtml: () => string;
      getCss: () => string;
      getProjectData: () => Record<string, unknown>;
    } | null;
    if (!editor) return;

    setSaving(true);
    setMessage('');
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      const grapesData = editor.getProjectData();

      const res = await authFetch(`/proposals/${proposalId}/slides/${slide.id}`, {
        method: 'PUT',
        body: JSON.stringify({ html, css, grapesData }),
      });
      const updated = (await res.json()) as Slide;
      onSaved(updated);
      setMessage('Guardado correctamente');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function uploadAsset(file: File) {
    const form = new FormData();
    form.append('file', file);
    const res = await authUpload(`/files/upload/${proposalId}`, form);
    const data = (await res.json().catch(() => ({}))) as {
      storageRef?: string;
      message?: string | string[];
    };
    if (!data.storageRef) throw new Error('Respuesta inválida del servidor');
    return data.storageRef;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-3 border-b border-slate-700 bg-slate-900 shrink-0">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Guardar diapositiva'}
        </button>
        <label className="px-4 py-2 rounded-lg border border-slate-600 text-sm cursor-pointer hover:bg-slate-800">
          Subir imagen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadAsset(file);
                const editor = editorRef.current as {
                  addComponents: (html: string) => void;
                } | null;
                editor?.addComponents(`<img src="${url}" alt="" style="max-width:100%"/>`);
                setMessage('Imagen añadida al lienzo');
              } catch (err) {
                setMessage(err instanceof Error ? err.message : 'Error');
              }
            }}
          />
        </label>
        {message && <span className="text-sm text-slate-400">{message}</span>}
      </div>
      <div ref={containerRef} className="flex-1 min-h-0" />
    </div>
  );
}
