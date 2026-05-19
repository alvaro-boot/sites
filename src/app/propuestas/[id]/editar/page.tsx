import { redirect } from 'next/navigation';
import EditProposalWorkspace from '@/components/EditProposalWorkspace';
import { apiFetchServer } from '@/lib/api';
import { requireAuth } from '@/lib/auth-server';
import type { Proposal } from '@/lib/types';

export default async function EditarPropuestaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ slide?: string }>;
}) {
  const { id } = await params;
  const { slide: slideKey } = await searchParams;

  let auth: Awaited<ReturnType<typeof requireAuth>>;
  try {
    auth = await requireAuth();
  } catch {
    redirect('/login');
  }

  const proposal = await apiFetchServer<Proposal>(`/proposals/${id}`, auth.token);

  return (
    <EditProposalWorkspace
      proposal={proposal}
      token={auth.token}
      userName={auth.user.name}
      currentSlideKey={slideKey ?? proposal.slides[0]?.key ?? ''}
    />
  );
}
