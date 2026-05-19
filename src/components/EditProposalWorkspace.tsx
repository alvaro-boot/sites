'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import EditorClient from '@/components/EditorClient';
import ProposalToolbar from '@/components/ProposalToolbar';
import SlideListSidebar from '@/components/SlideListSidebar';
import type { Proposal, ThemeConfig } from '@/lib/types';

interface EditProposalWorkspaceProps {
  proposal: Proposal;
  token: string;
  userName: string | null;
  currentSlideKey: string;
}

export default function EditProposalWorkspace({
  proposal,
  token,
  userName,
  currentSlideKey,
}: EditProposalWorkspaceProps) {
  const slides = [...proposal.slides].sort((a, b) => a.order - b.order);
  const current = slides.find((s) => s.key === currentSlideKey) ?? slides[0];
  const [theme, setTheme] = useState<ThemeConfig | null>(proposal.themeConfig ?? null);
  const [mapConfig, setMapConfig] = useState<Record<string, unknown> | null>(
    proposal.mapConfig,
  );

  if (!current) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white p-8">
        <p>No hay diapositivas. Use + Nueva en la barra lateral o cree una plantilla.</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#070b14] text-white flex flex-col overflow-hidden">
      <AppHeader userName={userName} />
      <ProposalToolbar proposal={proposal} token={token} />
      <div className="flex flex-1 min-h-0 border-t border-slate-800">
        <SlideListSidebar
          proposalId={proposal.id}
          slides={slides}
          currentSlideId={current.id}
        />
        <div className="flex-1 min-h-0 min-w-0 flex flex-col">
          <EditorClient
            proposalId={proposal.id}
            slide={current}
            token={token}
            themeConfig={theme}
            mapContext={{
              proposalId: proposal.id,
              mapConfig,
              mapConfigIsSet: mapConfig != null,
              persist: true,
            }}
            onMapConfigSaved={setMapConfig}
            onThemeSaved={setTheme}
          />
        </div>
      </div>
    </div>
  );
}
