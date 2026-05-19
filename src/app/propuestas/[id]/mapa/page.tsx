import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import MapConfigEditor from '@/components/MapConfigEditor';
import { apiFetchServer } from '@/lib/api';
import { requireAuth } from '@/lib/auth-server';
import type { Proposal } from '@/lib/types';

export default async function MapaPropuestaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let auth: Awaited<ReturnType<typeof requireAuth>>;
  try {
    auth = await requireAuth();
  } catch {
    redirect('/login');
  }

  const proposal = await apiFetchServer<Proposal>(`/proposals/${id}`, auth.token);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col">
      <AppHeader userName={auth.user.name} />
      <nav className="px-6 py-2 text-sm border-b border-slate-800">
        <Link href={`/propuestas/${id}/editar`} className="text-slate-400 hover:text-white">
          ← Editor de diapositivas
        </Link>
      </nav>
      <MapConfigEditor
        proposalId={id}
        token={auth.token}
        initialConfig={proposal.mapConfig}
      />
    </div>
  );
}
