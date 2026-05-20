'use client';

import dynamic from 'next/dynamic';
import type { MapSlideContext } from '@/lib/map-context';
import type { Slide, ThemeConfig } from '@/lib/types';

const SlideEditor = dynamic(() => import('./SlideEditor'), { ssr: false });

interface EditorClientProps {
  proposalId: string;
  slide: Slide;
  token: string;
  themeConfig?: ThemeConfig | null;
  mapContext?: MapSlideContext | null;
  onMapConfigSaved?: (mapConfig: Record<string, unknown>) => void;
  onThemeSaved?: (theme: Required<ThemeConfig>) => void;
}

export default function EditorClient({
  proposalId,
  slide,
  token,
  themeConfig,
  mapContext,
  onMapConfigSaved,
  onThemeSaved,
}: EditorClientProps) {
  return (
    <SlideEditor
      key={slide.id}
      proposalId={proposalId}
      slide={slide}
      token={token}
      themeConfig={themeConfig}
      mapContext={mapContext}
      onMapConfigSaved={onMapConfigSaved}
      onThemeSaved={onThemeSaved}
    />
  );
}
