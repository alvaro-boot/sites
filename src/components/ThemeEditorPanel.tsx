'use client';

import { useEffect, useState } from 'react';
import type { ThemeConfig } from '@/lib/types';
import { DEFAULT_THEME } from '@/lib/theme';
import { authFetch } from '@/lib/client-api';

interface ThemeEditorPanelProps {
  proposalId: string;
  themeConfig: ThemeConfig | null | undefined;
  onChange?: (theme: ThemeConfig) => void;
  onSaved: (theme: ThemeConfig) => void;
}

const LABELS: { key: keyof ThemeConfig; label: string }[] = [
  { key: 'cootravirBlue', label: 'Azul principal' },
  { key: 'cootravirBlueLight', label: 'Azul claro' },
  { key: 'cootravirGold', label: 'Dorado' },
  { key: 'cootravirGoldLight', label: 'Dorado claro' },
  { key: 'backgroundDeep', label: 'Fondo oscuro' },
  { key: 'backgroundMid', label: 'Fondo paneles' },
  { key: 'text', label: 'Texto' },
];

export default function ThemeEditorPanel({
  proposalId,
  themeConfig,
  onChange,
  onSaved,
}: ThemeEditorPanelProps) {
  const [theme, setTheme] = useState<ThemeConfig>({ ...DEFAULT_THEME, ...themeConfig });
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTheme({ ...DEFAULT_THEME, ...themeConfig });
  }, [themeConfig]);

  async function save() {
    setSaving(true);
    setMsg('');
    try {
      const res = await authFetch(`/proposals/${proposalId}`, {
        method: 'PATCH',
        body: JSON.stringify({ themeConfig: theme }),
      });
      if (!res.ok) throw new Error('No se pudo guardar el tema');
      onSaved(theme);
      setMsg('Colores guardados para toda la presentación');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-3 space-y-3 border-b border-slate-800 bg-slate-950/80">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-amber-400/90 uppercase">Colores de la presentación</h3>
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="text-xs px-2 py-1 rounded bg-[#0e2455] hover:bg-[#4a6fa5] disabled:opacity-50"
        >
          {saving ? '…' : 'Aplicar colores'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {LABELS.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-xs">
            <input
              type="color"
              value={theme[key] ?? DEFAULT_THEME[key]}
              onChange={(e) =>
                setTheme((prev) => {
                  const next = { ...prev, [key]: e.target.value };
                  onChange?.(next);
                  return next;
                })
              }
              className="w-8 h-8 rounded border-0 cursor-pointer"
            />
            <span className="text-slate-400">{label}</span>
          </label>
        ))}
      </div>
      {msg && <p className="text-xs text-slate-400">{msg}</p>}
    </div>
  );
}
