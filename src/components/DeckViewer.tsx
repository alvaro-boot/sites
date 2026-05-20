'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MapSlideContext } from '@/lib/map-context';
import type { Slide, ThemeConfig } from '@/lib/types';
import { buildSlideDocument } from '@/lib/slide-document';
import { mergeTheme } from '@/lib/theme';
import { resolveStorageInHtmlPublic } from '@/lib/resolve-storage';

interface DeckViewerProps {
  slides: Slide[];
  slug?: string;
  title?: string;
  themeConfig?: ThemeConfig | null;
  mapContext?: MapSlideContext | null;
}

export default function DeckViewer({
  slides,
  slug,
  title,
  themeConfig,
  mapContext,
}: DeckViewerProps) {
  const activeSlides = useMemo(
    () => [...slides].filter((s) => s.enabled).sort((a, b) => a.order - b.order),
    [slides],
  );
  const [index, setIndex] = useState(0);
  const [resolvedHtml, setResolvedHtml] = useState('');

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(activeSlides.length - 1, next)));
    },
    [activeSlides.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(activeSlides.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, activeSlides.length]);

  const slide = activeSlides[index];

  useEffect(() => {
    if (!slide) return;
    let cancelled = false;
    const html = slide.html;
    if (!slug) {
      setResolvedHtml(html);
      return;
    }
    resolveStorageInHtmlPublic(html, slug).then((out) => {
      if (!cancelled) setResolvedHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [slide?.id, slide?.html, slug, index]);

  if (!activeSlides.length) {
    return (
      <p className="text-center text-slate-400 py-20">
        No hay diapositivas habilitadas.
      </p>
    );
  }

  const theme = mergeTheme(themeConfig);
  const srcDoc = buildSlideDocument(
    { ...slide, html: resolvedHtml || slide.html },
    'present',
    themeConfig ? theme : null,
    slide.key === 'mapa-pereira' ? mapContext ?? null : null,
  );
  const progress = ((index + 1) / activeSlides.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-[#070b14] text-white">
      {title ? (
        <div className="px-4 py-2 text-sm text-slate-400 border-b border-white/10 shrink-0">
          {title}
        </div>
      ) : null}
      <div className="h-0.5 bg-white/10 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-[#4a6fa5] to-[#d4af37] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex-1 min-h-0 relative">
        <iframe
          key={`${slide.id}-${resolvedHtml.length}`}
          title={slide.title}
          srcDoc={srcDoc}
          className="absolute inset-0 w-full h-full border-0 bg-[#070b14]"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <footer className="shrink-0 flex items-center justify-center gap-4 flex-wrap py-3 px-4 bg-[#0c1428]/95 border-t border-[#d4af37]/20">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          className="w-10 h-10 rounded-lg bg-[#0e2455] disabled:opacity-35 hover:bg-[#4a6fa5] transition-colors"
          aria-label="Anterior"
        >
          ←
        </button>
        <span className="text-sm font-semibold min-w-[8rem] text-center">
          {index + 1} / {activeSlides.length}
        </span>
        <button
          type="button"
          disabled={index === activeSlides.length - 1}
          onClick={() => go(index + 1)}
          className="w-10 h-10 rounded-lg bg-[#0e2455] disabled:opacity-35 hover:bg-[#4a6fa5] transition-colors"
          aria-label="Siguiente"
        >
          →
        </button>
      </footer>
    </div>
  );
}
