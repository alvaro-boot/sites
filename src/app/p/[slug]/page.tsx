import DeckViewer from '@/components/DeckViewer';
import { apiFetchServer } from '@/lib/api';
import type { Proposal } from '@/lib/types';
import { notFound } from 'next/navigation';

export default async function PublicPresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let proposal: Proposal;
  try {
    proposal = await apiFetchServer<Proposal>(`/proposals/by-slug/${slug}`);
  } catch {
    notFound();
  }

  return (
    <DeckViewer
      slug={slug}
      slides={proposal.slides}
      title={`${proposal.title} — ${proposal.clientName}`}
      themeConfig={proposal.themeConfig}
      mapContext={{
        proposalId: proposal.id,
        mapConfig: proposal.mapConfig,
        mapConfigIsSet: proposal.mapConfig != null,
      }}
    />
  );
}
