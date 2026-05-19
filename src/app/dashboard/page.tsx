import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import DashboardActions from '@/components/DashboardActions';
import { apiFetchServer } from '@/lib/api';
import { requireAuth } from '@/lib/auth-server';
import type { Proposal } from '@/lib/types';

export default async function DashboardPage() {
  let auth: { user: { name: string | null; role: string }; token: string };
  try {
    auth = await requireAuth();
  } catch {
    redirect('/login');
  }

  let proposals: Proposal[] = [];
  let apiError: string | null = null;
  try {
    proposals = await apiFetchServer<Proposal[]>('/proposals', auth.token);
  } catch (e) {
    apiError =
      e instanceof Error
        ? e.message
        : 'No se pudo cargar las propuestas. Verifique que el backend esté en ejecución.';
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <AppHeader userName={auth.user.name} />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {apiError && (
          <p className="text-amber-300 text-sm bg-amber-950/40 border border-amber-800 rounded-lg p-3">
            {apiError}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Propuestas</h1>
            <p className="text-slate-400 text-sm">Gestione presentaciones por cliente</p>
          </div>
          <DashboardActions />
        </div>

        <div className="grid gap-4">
          {proposals.length === 0 ? (
            <p className="text-slate-400">
              No hay propuestas. Cree una nueva desde una plantilla del sistema.
            </p>
          ) : (
            proposals.map((p) => (
              <article
                key={p.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#0c1428] flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="text-sm text-slate-400">
                    Cliente: {p.clientName} · /p/{p.slug}
                  </p>
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                      p.status === 'PUBLISHED'
                        ? 'bg-green-900/50 text-green-300'
                        : p.status === 'ARCHIVED'
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-amber-900/40 text-amber-200'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Link
                    href={`/propuestas/${p.id}/editar`}
                    className="px-3 py-1.5 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5]"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/propuestas/${p.id}/mapa`}
                    className="px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-800"
                  >
                    Mapa
                  </Link>
                  {p.status === 'PUBLISHED' && (
                    <Link
                      href={`/p/${p.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37]"
                    >
                      Ver presentación
                    </Link>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
