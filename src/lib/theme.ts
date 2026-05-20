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
  --cootravir-blue-lighter: color-mix(in srgb, var(--cootravir-blue-light) 75%, white);
  --cootravir-blue-darker: color-mix(in srgb, var(--cootravir-blue) 65%, black);
  --cootravir-gold: ${t.cootravirGold};
  --cootravir-gold-light: ${t.cootravirGoldLight};
  --cootravir-gold-lighter: color-mix(in srgb, var(--cootravir-gold-light) 70%, white);
  --cootravir-gold-darker: color-mix(in srgb, var(--cootravir-gold) 80%, black);
  --soc-bg-deep: ${t.backgroundDeep};
  --soc-bg-mid: ${t.backgroundMid};
  --soc-text: ${t.text};
}

body.prop-fill {
  background: var(--soc-bg-deep) !important;
}

.cover-slide:not(.cover-tech) {
  background:
    radial-gradient(1000px 520px at 50% -20%, color-mix(in srgb, var(--cootravir-blue-light) 25%, transparent), transparent 60%),
    linear-gradient(135deg, var(--cootravir-blue-darker) 0%, var(--cootravir-blue) 50%, var(--cootravir-blue-darker) 100%) !important;
}

.cover-slide.cover-tech,
.soc-slide.deck-tech,
.mapa-page.deck-tech {
  background:
    radial-gradient(ellipse 120% 80% at 50% 120%, color-mix(in srgb, var(--cootravir-blue-light) 12%, transparent), transparent 55%),
    radial-gradient(ellipse 90% 60% at 10% 20%, color-mix(in srgb, var(--cootravir-gold) 14%, transparent), transparent 45%),
    radial-gradient(ellipse 70% 50% at 92% 35%, color-mix(in srgb, var(--cootravir-blue-light) 35%, transparent), transparent 50%),
    linear-gradient(165deg, var(--soc-bg-deep) 0%, var(--cootravir-blue-darker) 38%, var(--cootravir-blue) 72%, var(--soc-bg-deep) 100%) !important;
}

.soc-slide:not(.deck-tech) {
  background:
    radial-gradient(900px 480px at 85% 10%, color-mix(in srgb, var(--cootravir-blue-light) 18%, transparent), transparent 55%),
    radial-gradient(700px 400px at 10% 90%, color-mix(in srgb, var(--cootravir-gold) 8%, transparent), transparent 50%),
    linear-gradient(168deg, var(--soc-bg-deep) 0%, var(--soc-bg-mid) 42%, var(--cootravir-blue) 88%) !important;
}`;
}
