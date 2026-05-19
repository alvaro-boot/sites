'use client';

import { useState } from 'react';
import { authFetch } from '@/lib/client-api';

interface MapConfigEditorProps {
  proposalId: string;
  token: string;
  initialConfig: Record<string, unknown> | null;
}

export default function MapConfigEditor({
  proposalId,
  token,
  initialConfig,
}: MapConfigEditorProps) {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(initialConfig ?? { puntos: { puntos: [] }, rutas: { rutas: [] } }, null, 2),
  );
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage('');
    try {
      const mapConfig = JSON.parse(jsonText) as Record<string, unknown>;
      await authFetch(`/proposals/${proposalId}/map`, {
        method: 'PATCH',
        body: JSON.stringify({ mapConfig }),
      });
      setMessage('Mapa guardado en la base de datos de esta propuesta (no afecta a otros clientes).');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'JSON inválido o error de red');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold text-white">Editor de mapa (JSON)</h1>
      <p className="text-sm text-slate-400">
        Edite puntos, rutas y estilos. Cada propuesta de cliente guarda su mapa en la columna{' '}
        <code className="text-amber-300/80">map_config</code> de la base de datos (ID{' '}
        <code className="text-amber-300/80">{proposalId}</code>
        {initialConfig != null ? ', ya tiene configuración propia' : ' — aún sin guardar'}). Si
        Supabase está activo, también se copia a{' '}
        <code className="text-amber-300/80">{proposalId}/mapa/config.json</code>. Los cambios en la
        diapositiva del mapa se sincronizan solos al editar.
      </p>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="w-full h-[min(60vh,520px)] font-mono text-sm p-4 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
        spellCheck={false}
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-white disabled:opacity-50"
        >
          {saving ? 'Guardando…' : 'Guardar mapa'}
        </button>
        {message && <span className="text-sm text-slate-400">{message}</span>}
      </div>
    </div>
  );
}
