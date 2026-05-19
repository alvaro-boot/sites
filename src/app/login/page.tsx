'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';
  const [email, setEmail] = useState('admin@cootravir.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const msg = Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message;
      if (!res.ok) throw new Error(msg || 'Credenciales inválidas');
      router.push(from);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de inicio de sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 rounded-xl border border-[#d4af37]/20 bg-[#0c1428] space-y-5"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">COOTRAVIR Propuestas</h1>
          <p className="text-slate-400 text-sm mt-1">Inicie sesión para continuar</p>
        </div>
        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg p-3">
            {error}
          </p>
        )}
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#0e2455] to-[#4a6fa5] text-white font-medium disabled:opacity-50"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
