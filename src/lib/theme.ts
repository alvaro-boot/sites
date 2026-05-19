import type { ThemeConfig } from '@/lib/types';

export const DEFAULT_THEME: ThemeConfig = {
  cootravirBlue: '#0e2455',
  cootravirBlueLight: '#4a6fa5',
  cootravirGold: '#d4af37',
  cootravirGoldLight: '#e8c96f',
  backgroundDeep: '#070b14',
  backgroundMid: '#0c1428',
  text: '#e8edf5',
};

export function buildThemeOverrideCss(theme: ThemeConfig | null | undefined): string {
  if (!theme) return '';
  const t = { ...DEFAULT_THEME, ...theme };
  return `:root {
  --cootravir-blue: ${t.cootravirBlue};
  --cootravir-blue-light: ${t.cootravirBlueLight};
  --cootravir-gold: ${t.cootravirGold};
  --cootravir-gold-light: ${t.cootravirGoldLight};
  --soc-bg-deep: ${t.backgroundDeep};
  --soc-bg-mid: ${t.backgroundMid};
  --soc-text: ${t.text};
}`;
}
