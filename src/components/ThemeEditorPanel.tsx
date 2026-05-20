'use client';

import { useEffect, useState } from 'react';
import type { Proposal, ThemeConfig } from '@/lib/types';
import {
  DEFAULT_THEME,
  mergeTheme,
  THEME_FIELD_GROUPS,
  type ThemeFieldKey,
} from '@/lib/theme';
import { authFetch } from '@/lib/client-api';

interface ThemeEditorPanelProps {
  proposalId: string;
  themeConfig: ThemeConfig | null | undefined;
  onChange?: (theme: ThemeConfig) => void;
  onSaved: (theme: ThemeConfig) => void;
}

export default function ThemeEditorPanel({
  proposalId,
  themeConfig,
  onChange,
  onSaved,
}: ThemeEditorPanelProps) {
  const [theme, setTheme] = useState<Required<ThemeConfig>>(() => mergeTheme(themeConfig));
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTheme(mergeTheme(themeConfig));
  }, [themeConfig]);

  function updateKey(key: ThemeFieldKey, value: string) {
    setTheme((prev) => {
      const next = { ...prev, [key]: value };
      onChange?.(next);
      return next;
    });
  }

  function resetDefaults() {
    const next = mergeTheme(null);
    setTheme(next);
    onChange?.(next);
    setMsg('Colores restaurados (pulse Aplicar para guardar)');
  }

  async function save() {
    setSaving(true);
    setMsg('');
    try {
      const full = mergeTheme(theme);
      const res = await authFetch(`/proposals/${proposalId}`, {
        method: 'PATCH',
        body: JSON.stringify({ themeConfig: full }),
      });
      const saved = (await res.json()) as Proposal;
      const persisted = mergeTheme(saved.themeConfig ?? full);
      onSaved(persisted);
      setTheme(persisted);
      setMsg('Tema guardado en la base de datos de esta propuesta');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col max-h-[42vh] border-b border-slate-800 bg-slate-950/90 shrink-0">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-800 shrink-0">
        <div>
          <h3 className="text-xs font-semibold text-amber-400/90 uppercase">
            Colores de la presentación
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {THEME_FIELD_GROUPS.reduce((n, g) => n + g.fields.length, 0)} colores · por propuesta
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            type="button"
            onClick={resetDefaults}
            className="text-xs px-2 py-1 rounded border border-slate-600 text-slate-400 hover:bg-slate-800"
          >
            Restaurar
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={save}
            className="text-xs px-2 py-1 rounded bg-[#0e2455] hover:bg-[#4a6fa5] disabled:opacity-50 text-white"
          >
            {saving ? '…' : 'Aplicar colores'}
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0 px-3 py-2 space-y-3">
        {THEME_FIELD_GROUPS.map((group) => (
          <section key={group.id}>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              {group.title}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {group.fields.map(({ key, label, hint }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-xs rounded-lg border border-slate-800/80 bg-slate-900/50 px-2 py-1.5 hover:border-slate-700"
                  title={hint}
                >
                  <input
                    type="color"
                    value={theme[key] ?? DEFAULT_THEME[key]}
                    onChange={(e) => updateKey(key, e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer shrink-0"
                  />
                  <span className="text-slate-400 leading-tight min-w-0">{label}</span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>

      {msg && (
        <p className="text-xs text-slate-400 px-3 py-1.5 border-t border-slate-800 shrink-0">
          {msg}
        </p>
      )}
    </div>
  );
}
