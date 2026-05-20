'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MapSlideContext } from '@/lib/map-context';
import type { Slide, ThemeConfig } from '@/lib/types';
import { authFetch } from '@/lib/client-api';
import { buildSlideDocument } from '@/lib/slide-document';
import { normalizeSlideHtml } from '@/lib/html-editor';
import { resolveStorageInHtml, sanitizeHtmlForStorage } from '@/lib/resolve-storage';
import VisualEditorPanel from './VisualEditorPanel';
import ThemeEditorPanel from './ThemeEditorPanel';

type EditorTab = 'visual' | 'code' | 'theme';

interface SlideEditorProps {
  proposalId: string;
  slide: Slide;
  token: string;
  themeConfig?: ThemeConfig | null;
  mapContext?: MapSlideContext | null;
  onMapConfigSaved?: (mapConfig: Record<string, unknown>) => void;
  onThemeSaved?: (theme: ThemeConfig) => void;
  onSaved?: (slide: Slide) => void;
}

export default function SlideEditor({
  proposalId,
  slide,
  token,
  themeConfig,
  mapContext,
  onMapConfigSaved,
  onThemeSaved,
  onSaved,
}: SlideEditorProps) {
  const [html, setHtml] = useState(slide.html);
  const [css, setCss] = useState(slide.css ?? '');
  const [theme, setTheme] = useState(themeConfig);
  const [tab, setTab] = useState<EditorTab>('visual');
  const [codePanel, setCodePanel] = useState<'html' | 'css'>('html');
  const [saving, setSaving] = useState(false);
  const [mapSaving, setMapSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewHtml, setPreviewHtml] = useState(slide.html);

  useEffect(() => {
    setHtml(normalizeSlideHtml(slide.html));
    setCss(slide.css ?? '');
  }, [slide.id, slide.html, slide.css]);

  useEffect(() => {
    let cancelled = false;
    resolveStorageInHtml(html, token).then((resolved) => {
      if (!cancelled) {
        setPreviewHtml((prev) => (prev === resolved ? prev : resolved));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [html, token]);

  useEffect(() => {
    setTheme(themeConfig);
  }, [themeConfig]);

  useEffect(() => {
    if (slide.key !== 'mapa-pereira' || !token) return;

    let debounce: ReturnType<typeof setTimeout> | undefined;
    let inFlight = false;
    let pending: Record<string, unknown> | null = null;

    async function flushMap(cfg: Record<string, unknown>) {
      inFlight = true;
      setMapSaving(true);
      try {
        const res = await authFetch(`/proposals/${proposalId}/map`, {
          method: 'PATCH',
          body: JSON.stringify({ mapConfig: cfg }),
        });
        const data = (await res.json()) as { mapConfig: Record<string, unknown> };
        onMapConfigSaved?.(data.mapConfig);
      } catch {
        setMessage('No se pudo guardar el mapa en el servidor');
      } finally {
        inFlight = false;
        setMapSaving(false);
        if (pending) {
          const next = pending;
          pending = null;
          void flushMap(next);
        }
      }
    }

    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        type?: string;
        proposalId?: string;
        mapConfig?: Record<string, unknown>;
      };
      if (data?.type !== 'cootravir-map-changed') return;
      if (data.proposalId !== proposalId || !data.mapConfig) return;

      clearTimeout(debounce);
      debounce = setTimeout(() => {
        if (inFlight) {
          pending = data.mapConfig!;
          return;
        }
        void flushMap(data.mapConfig!);
      }, 1500);
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(debounce);
    };
  }, [slide.key, proposalId, token, onMapConfigSaved]);

  const srcDoc = useMemo(
    () =>
      buildSlideDocument(
        { ...slide, html: previewHtml, css: css || null },
        'edit',
        theme,
        slide.key === 'mapa-pereira' ? mapContext ?? null : null,
      ),
    [slide, previewHtml, css, theme, mapContext],
  );

  const save = useCallback(async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await authFetch(`/proposals/${proposalId}/slides/${slide.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          html: sanitizeHtmlForStorage(html),
          css: css || null,
          grapesData: null,
        }),
      });
      const updated = (await res.json()) as Slide;
      onSaved?.(updated);
      setMessage('Guardado correctamente');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }, [proposalId, slide.id, html, css, token, onSaved]);

  const isMapSlide = slide.key === 'mapa-pereira';

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#070b14]">
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-slate-700 bg-slate-900 shrink-0">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Guardar diapositiva'}
        </button>
        {isMapSlide && (
          <Link
            href={`/propuestas/${proposalId}/mapa`}
            className="px-3 py-2 rounded-lg border border-amber-500/40 text-amber-300 text-sm"
          >
            Editar mapa
          </Link>
        )}
        <div className="flex rounded-lg border border-slate-600 overflow-hidden text-xs">
          {(['visual', 'theme', 'code'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 capitalize ${
                tab === t ? 'bg-[#4a6fa5] text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t === 'visual' ? 'Contenido' : t === 'theme' ? 'Colores' : 'Código'}
            </button>
          ))}
        </div>
        {mapSaving && (
          <span className="text-sm text-amber-300/90">Guardando mapa en servidor…</span>
        )}
        {message && <span className="text-sm text-slate-400">{message}</span>}
      </div>

      {tab === 'theme' ? (
        <ThemeEditorPanel
          proposalId={proposalId}
          themeConfig={theme}
          onSaved={(t) => {
            setTheme(t);
            onThemeSaved?.(t);
          }}
        />
      ) : null}

      <div className="flex flex-1 min-h-0">
        <div className="flex-[1.2] min-w-0 min-h-0 flex flex-col border-r border-slate-800">
          <p className="text-xs text-slate-500 px-3 py-1.5 shrink-0 border-b border-slate-800">
            Vista previa (igual que la presentación)
          </p>
          <div className="flex-1 min-h-0 relative bg-[#070b14]">
            <iframe
              key={`${slide.id}-${previewHtml.length}-${css.length}-${JSON.stringify(theme)}`}
              title={`Vista previa: ${slide.title}`}
              srcDoc={srcDoc}
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              onLoad={(e) => {
                if (slide.key !== 'mapa-pereira') return;
                try {
                  const win = (e.target as HTMLIFrameElement).contentWindow;
                  win?.dispatchEvent(new Event('resize'));
                  win?.dispatchEvent(new Event('load'));
                } catch {
                  /* cross-origin guard */
                }
              }}
            />
          </div>
        </div>

        {tab === 'visual' && (
          <div className="flex-1 min-w-[300px] max-w-md min-h-0 flex flex-col bg-slate-950">
            <VisualEditorPanel
              slideKey={slide.key}
              html={html}
              onHtmlChange={setHtml}
              proposalId={proposalId}
              token={token}
            />
          </div>
        )}

        {tab === 'code' && (
          <div className="flex-1 min-w-[280px] max-w-md flex flex-col min-h-0 bg-slate-950">
            <div className="flex border-b border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setCodePanel('html')}
                className={`flex-1 px-3 py-2 text-sm ${
                  codePanel === 'html' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                HTML
              </button>
              <button
                type="button"
                onClick={() => setCodePanel('css')}
                className={`flex-1 px-3 py-2 text-sm ${
                  codePanel === 'css' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                CSS
              </button>
            </div>
            {codePanel === 'html' ? (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                spellCheck={false}
                className="flex-1 min-h-0 w-full p-3 text-xs font-mono bg-slate-900 text-slate-200 border-0 resize-none"
              />
            ) : (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                className="flex-1 min-h-0 w-full p-3 text-xs font-mono bg-slate-900 text-slate-200 border-0 resize-none"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
