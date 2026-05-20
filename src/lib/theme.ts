import type { ThemeConfig } from '@/lib/types';

export const DEFAULT_THEME: Required<ThemeConfig> = {
  cootravirBlue: '#0e2455',
  cootravirBlueLight: '#4a6fa5',
  cootravirGold: '#d4af37',
  cootravirGoldLight: '#e8c96f',
  backgroundDeep: '#070b14',
  backgroundMid: '#0c1428',
  backgroundCard: '#101a2e',
  backgroundCardStrong: '#16243e',
  backgroundHeader: '#0e2455',
  text: '#e8edf5',
  textTitle: '#ffffff',
  textSubtitle: '#c8d4e8',
  textMuted: '#94a3b8',
  textAccent: '#e8c96f',
  iconColor: '#e8c96f',
  iconAccent: '#4a6fa5',
  borderPanel: '#d4af37',
  borderAccent: '#06b6d4',
  accentAnimation: '#06b6d4',
  accentAnimationAlt: '#e8c96f',
  accentGlow: '#4a6fa5',
  chartBarBlue: '#4a6fa5',
  chartBarMid: '#7ea2d8',
  chartBarGold: '#d4af37',
};

export type ThemeFieldKey = keyof ThemeConfig;

export interface ThemeFieldDef {
  key: ThemeFieldKey;
  label: string;
  hint?: string;
}

export interface ThemeFieldGroup {
  id: string;
  title: string;
  fields: ThemeFieldDef[];
}

export const THEME_FIELD_GROUPS: ThemeFieldGroup[] = [
  {
    id: 'brand',
    title: 'Marca corporativa',
    fields: [
      { key: 'cootravirBlue', label: 'Azul principal' },
      { key: 'cootravirBlueLight', label: 'Azul claro' },
      { key: 'cootravirGold', label: 'Dorado' },
      { key: 'cootravirGoldLight', label: 'Dorado claro' },
    ],
  },
  {
    id: 'backgrounds',
    title: 'Fondos',
    fields: [
      { key: 'backgroundDeep', label: 'Fondo diapositiva', hint: 'Fondo general de cada slide' },
      { key: 'backgroundMid', label: 'Fondo secundario', hint: 'Zonas intermedias y degradados' },
      { key: 'backgroundCard', label: 'Fondo tarjetas', hint: 'Paneles, cards y vidrio' },
      { key: 'backgroundCardStrong', label: 'Fondo tarjetas destacadas' },
      { key: 'backgroundHeader', label: 'Fondo barra superior', hint: 'Cabecera de cada diapositiva' },
    ],
  },
  {
    id: 'text',
    title: 'Textos',
    fields: [
      { key: 'textTitle', label: 'Títulos principales' },
      { key: 'textSubtitle', label: 'Subtítulos' },
      { key: 'text', label: 'Texto general' },
      { key: 'textMuted', label: 'Texto secundario', hint: 'Descripciones y pies' },
      { key: 'textAccent', label: 'Texto acento', hint: 'Chips, marca, etiquetas' },
    ],
  },
  {
    id: 'icons',
    title: 'Iconos',
    fields: [
      { key: 'iconColor', label: 'Iconos principales' },
      { key: 'iconAccent', label: 'Iconos secundarios' },
    ],
  },
  {
    id: 'borders',
    title: 'Bordes y líneas',
    fields: [
      { key: 'borderPanel', label: 'Borde paneles' },
      { key: 'borderAccent', label: 'Borde acento / animación' },
    ],
  },
  {
    id: 'animations',
    title: 'Animaciones y efectos',
    fields: [
      { key: 'accentAnimation', label: 'Acento animación (aurora)', hint: 'Barrido, partículas cyan' },
      { key: 'accentAnimationAlt', label: 'Acento animación alterno', hint: 'Partículas doradas' },
      { key: 'accentGlow', label: 'Resplandor / glow' },
    ],
  },
  {
    id: 'charts',
    title: 'Gráficos y barras',
    fields: [
      { key: 'chartBarBlue', label: 'Barra azul' },
      { key: 'chartBarMid', label: 'Barra intermedia' },
      { key: 'chartBarGold', label: 'Barra dorada' },
    ],
  },
];

/** Combina tema guardado con valores por defecto (compatible con propuestas antiguas de 7 colores). */
export function mergeTheme(partial?: ThemeConfig | null): Required<ThemeConfig> {
  const p = partial ?? {};
  const merged: Required<ThemeConfig> = {
    ...DEFAULT_THEME,
    ...p,
    textTitle: p.textTitle ?? p.text ?? DEFAULT_THEME.textTitle,
    textSubtitle: p.textSubtitle ?? DEFAULT_THEME.textSubtitle,
    textMuted: p.textMuted ?? DEFAULT_THEME.textMuted,
    textAccent: p.textAccent ?? p.cootravirGoldLight ?? DEFAULT_THEME.textAccent,
    backgroundCard: p.backgroundCard ?? p.backgroundMid ?? DEFAULT_THEME.backgroundCard,
    backgroundCardStrong: p.backgroundCardStrong ?? p.backgroundMid ?? DEFAULT_THEME.backgroundCardStrong,
    backgroundHeader: p.backgroundHeader ?? p.cootravirBlue ?? DEFAULT_THEME.backgroundHeader,
    iconColor: p.iconColor ?? p.cootravirGoldLight ?? DEFAULT_THEME.iconColor,
    iconAccent: p.iconAccent ?? p.cootravirBlueLight ?? DEFAULT_THEME.iconAccent,
    borderPanel: p.borderPanel ?? p.cootravirGold ?? DEFAULT_THEME.borderPanel,
    borderAccent: p.borderAccent ?? DEFAULT_THEME.borderAccent,
    accentAnimationAlt: p.accentAnimationAlt ?? p.cootravirGoldLight ?? DEFAULT_THEME.accentAnimationAlt,
    accentGlow: p.accentGlow ?? p.cootravirBlueLight ?? DEFAULT_THEME.accentGlow,
    chartBarBlue: p.chartBarBlue ?? p.cootravirBlueLight ?? DEFAULT_THEME.chartBarBlue,
    chartBarMid: p.chartBarMid ?? p.cootravirBlueLight ?? DEFAULT_THEME.chartBarMid,
    chartBarGold: p.chartBarGold ?? p.cootravirGold ?? DEFAULT_THEME.chartBarGold,
  };
  return merged;
}

/** CSS del tema: se inyecta después del CSS de cada diapositiva. */
export function buildThemeOverrideCss(theme: ThemeConfig | null | undefined): string {
  if (!theme) return '';
  const t = mergeTheme(theme);

  return `:root {
  --cootravir-blue: ${t.cootravirBlue};
  --cootravir-blue-light: ${t.cootravirBlueLight};
  --cootravir-blue-lighter: color-mix(in srgb, ${t.cootravirBlueLight} 75%, white);
  --cootravir-blue-darker: color-mix(in srgb, ${t.cootravirBlue} 65%, black);
  --cootravir-gold: ${t.cootravirGold};
  --cootravir-gold-light: ${t.cootravirGoldLight};
  --cootravir-gold-lighter: color-mix(in srgb, ${t.cootravirGoldLight} 70%, white);
  --cootravir-gold-darker: color-mix(in srgb, ${t.cootravirGold} 80%, black);
  --soc-bg-deep: ${t.backgroundDeep};
  --soc-bg-mid: ${t.backgroundMid};
  --soc-text: ${t.text};
  --soc-text-muted: ${t.textMuted};
  --soc-panel: color-mix(in srgb, ${t.backgroundCard} 92%, transparent);
  --soc-panel-strong: color-mix(in srgb, ${t.backgroundCardStrong} 92%, transparent);
  --soc-panel-border: color-mix(in srgb, ${t.borderPanel} 28%, transparent);
  --soc-glow: color-mix(in srgb, ${t.accentGlow} 35%, transparent);
  --soc-grid-line: color-mix(in srgb, ${t.text} 5%, transparent);
  --theme-text-title: ${t.textTitle};
  --theme-text-subtitle: ${t.textSubtitle};
  --theme-text-muted: ${t.textMuted};
  --theme-text-accent: ${t.textAccent};
  --theme-icon: ${t.iconColor};
  --theme-icon-accent: ${t.iconAccent};
  --theme-bg-card: ${t.backgroundCard};
  --theme-bg-card-strong: ${t.backgroundCardStrong};
  --theme-bg-header: ${t.backgroundHeader};
  --theme-border-accent: ${t.borderAccent};
  --theme-accent-anim: ${t.accentAnimation};
  --theme-accent-anim-alt: ${t.accentAnimationAlt};
  --theme-chart-blue: ${t.chartBarBlue};
  --theme-chart-mid: ${t.chartBarMid};
  --theme-chart-gold: ${t.chartBarGold};
  --theme-accent-glow: ${t.accentGlow};
  --theme-border-panel: ${t.borderPanel};
}

body.prop-fill {
  background: var(--soc-bg-deep);
  color: var(--soc-text);
}

/* ——— Tipografía global ——— */
.prop-fill h1,
.prop-fill .soc-header h1,
.prop-fill .cover-main-title,
.prop-fill .tech-cc-title,
.prop-fill .p6-head-left h1,
.prop-fill .reinversion-title-dark,
.prop-fill .ben-scene-title {
  color: var(--theme-text-title);
}

.prop-fill h2,
.prop-fill h3,
.prop-fill .cover-sub,
.prop-fill .tech-cc-desc,
.prop-fill .soc-body p,
.prop-fill .apoyo-label {
  color: var(--theme-text-subtitle);
}

.prop-fill p,
.prop-fill li,
.prop-fill .tech-cc-flow span,
.prop-fill .bar-desc-dark,
.prop-fill .reinversion-intro-dark {
  color: var(--theme-text-muted);
}

.prop-fill .soc-header-brand span:first-child,
.prop-fill .soc-chip,
.prop-fill .tech-cc-badge,
.prop-fill .cover-client-name,
.prop-fill .text-amber-300,
.prop-fill .text-amber-400 {
  color: var(--theme-text-accent);
}

/* ——— Iconos ——— */
.prop-fill i.fas,
.prop-fill i.far,
.prop-fill i.fab,
.prop-fill i.fa-solid,
.prop-fill i.fa-regular,
.prop-fill i.fa-brands,
.prop-fill .apoyo-media--icon i,
.prop-fill .apoyo-icon-fa:not(:has(img)) i,
.prop-fill .ben-scene-placeholder i,
.prop-fill .ben-card-ico i,
.prop-fill .tech-cc-visual-fallback i,
.prop-fill .p2b-cert-photo .p2b-cert-fallback i {
  color: var(--theme-icon);
}

.prop-fill .tech-cc-badge i,
.prop-fill .tech-cc-flow i,
.prop-fill .soc-chip i {
  color: var(--theme-icon-accent);
}

/* ——— Cabeceras ——— */
.soc-header,
.soc-slide.deck-tech .soc-header,
.mapa-page.deck-tech .mapa-top {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--theme-bg-header) 95%, transparent),
    color-mix(in srgb, var(--cootravir-blue-darker) 88%, transparent)
  );
  border-bottom-color: var(--soc-panel-border);
}

/* ——— Paneles y tarjetas ——— */
.soc-glass,
.soc-glass-strong,
.ben-card,
.benefit-item-dark,
.service-item-dark,
.p2-carousel-slide,
.bars-wrap-dark,
.note-box-dark,
.reinv-card {
  background: var(--soc-panel);
  border-color: var(--soc-panel-border);
}

.soc-glass-strong,
.reinv-card {
  background: var(--soc-panel-strong);
}

.soc-glass:hover {
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.5),
    0 0 0 1px color-mix(in srgb, var(--soc-text) 6%, transparent) inset,
    0 0 60px var(--soc-glow);
}

.soc-slide.deck-tech .soc-glass {
  border-color: color-mix(in srgb, var(--theme-border-accent) 18%, transparent);
  box-shadow:
    var(--shadow-panel),
    0 0 0 1px color-mix(in srgb, var(--theme-border-accent) 8%, transparent) inset,
    0 0 48px var(--soc-glow);
}

/* ——— Fondos de diapositiva ——— */
.cover-slide:not(.cover-tech) {
  background:
    radial-gradient(1000px 520px at 50% -20%, color-mix(in srgb, var(--cootravir-blue-light) 25%, transparent), transparent 60%),
    linear-gradient(135deg, var(--cootravir-blue-darker) 0%, var(--cootravir-blue) 50%, var(--cootravir-blue-darker) 100%);
}

.cover-slide.cover-tech,
.soc-slide.deck-tech,
.mapa-page.deck-tech {
  background:
    radial-gradient(ellipse 120% 80% at 50% 120%, color-mix(in srgb, var(--theme-accent-anim) 12%, transparent), transparent 55%),
    radial-gradient(ellipse 90% 60% at 10% 20%, color-mix(in srgb, var(--cootravir-gold) 14%, transparent), transparent 45%),
    radial-gradient(ellipse 70% 50% at 92% 35%, color-mix(in srgb, var(--theme-accent-glow) 35%, transparent), transparent 50%),
    linear-gradient(165deg, var(--soc-bg-deep) 0%, var(--cootravir-blue-darker) 38%, var(--cootravir-blue) 72%, var(--soc-bg-deep) 100%);
}

.soc-slide:not(.deck-tech) {
  background:
    radial-gradient(900px 480px at 85% 10%, color-mix(in srgb, var(--cootravir-blue-light) 18%, transparent), transparent 55%),
    radial-gradient(700px 400px at 10% 90%, color-mix(in srgb, var(--cootravir-gold) 8%, transparent), transparent 50%),
    linear-gradient(168deg, var(--soc-bg-deep) 0%, var(--soc-bg-mid) 42%, var(--cootravir-blue) 88%);
}

/* ——— Animaciones fondo (portada / deck-tech) ——— */
.cover-tech-aurora,
.deck-tech-aurora {
  background: conic-gradient(
    from 210deg at 50% 50%,
    transparent 0deg,
    color-mix(in srgb, var(--theme-accent-anim) 8%, transparent) 60deg,
    transparent 120deg,
    color-mix(in srgb, var(--theme-accent-anim-alt) 10%, transparent) 200deg,
    transparent 280deg
  );
}

.cover-tech-grid,
.deck-tech-grid {
  background-image:
    linear-gradient(color-mix(in srgb, var(--soc-text) 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--soc-text) 4%, transparent) 1px, transparent 1px);
}

.cover-tech-scan,
.deck-tech-scan {
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in srgb, var(--theme-accent-anim) 6%, transparent) 40%,
    color-mix(in srgb, var(--soc-text) 4%, transparent) 50%,
    transparent 70%
  );
}

.cover-tech-particles span,
.deck-tech-particles span {
  background: color-mix(in srgb, var(--theme-accent-anim-alt) 55%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--theme-accent-anim) 60%, transparent);
}

.deck-tech-particles span:nth-child(2),
.deck-tech-particles span:nth-child(4),
.cover-tech-particles span:nth-child(2),
.cover-tech-particles span:nth-child(4) {
  background: color-mix(in srgb, var(--theme-accent-anim) 70%, transparent);
}

.soc-slide.deck-tech .soc-header {
  border-bottom-color: color-mix(in srgb, var(--theme-border-accent) 22%, transparent);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--theme-border-accent) 12%, transparent);
}

/* ——— Carrusel apoyos ——— */
.tech-cc::before {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--cootravir-blue) 35%, transparent) 0%, transparent 42%),
    linear-gradient(315deg, color-mix(in srgb, var(--cootravir-gold) 6%, transparent) 0%, transparent 38%),
    repeating-linear-gradient(-12deg, transparent, transparent 48px, color-mix(in srgb, var(--soc-text) 2%, transparent) 48px, color-mix(in srgb, var(--soc-text) 2%, transparent) 49px);
}

.tech-cc-visual {
  background:
    radial-gradient(ellipse 80% 70% at 50% 80%, color-mix(in srgb, var(--theme-accent-glow) 18%, transparent), transparent 70%),
    linear-gradient(180deg, color-mix(in srgb, var(--theme-bg-card-strong) 95%, transparent), color-mix(in srgb, var(--soc-bg-deep) 98%, transparent));
  border-color: color-mix(in srgb, var(--theme-border-panel) 12%, transparent);
}

.tech-cc-visual-frame {
  background: linear-gradient(135deg, color-mix(in srgb, var(--cootravir-gold) 55%, transparent), color-mix(in srgb, var(--cootravir-blue-light) 45%, transparent), color-mix(in srgb, var(--cootravir-blue) 80%, transparent));
}

.tech-cc-visual-inner {
  background: radial-gradient(120% 80% at 50% 100%, var(--soc-glow), var(--cootravir-blue-darker) 55%);
}

.tech-cc-scan {
  background: linear-gradient(transparent 0%, color-mix(in srgb, var(--theme-accent-anim) 7%, transparent) 48%, color-mix(in srgb, var(--cootravir-gold) 6%, transparent) 50%, transparent 52%);
}

.tech-cc-copy {
  background: color-mix(in srgb, var(--theme-bg-card) 88%, var(--soc-bg-mid) 12%);
}

.tech-cc-badge {
  color: var(--theme-text-accent);
  background: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  border-color: color-mix(in srgb, var(--theme-border-panel) 35%, transparent);
}

.tech-cc-nav {
  background: color-mix(in srgb, var(--theme-bg-card) 75%, transparent);
  color: var(--theme-text-title);
}

.tech-cc-nav:hover {
  background: color-mix(in srgb, var(--cootravir-blue-light) 45%, transparent);
  border-color: color-mix(in srgb, var(--theme-border-panel) 40%, transparent);
}

.tech-cc-dot[aria-current="true"] {
  background: linear-gradient(135deg, var(--cootravir-gold-light), var(--cootravir-blue-light));
}

.tech-cc-progress-bar {
  background: linear-gradient(90deg, var(--cootravir-blue-light), var(--cootravir-gold-light));
}

/* ——— Beneficios / apoyos ——— */
.ben-scene-media,
.apoyo-media,
.apoyo-icon-fa:not(:has(img)) {
  background: linear-gradient(165deg, color-mix(in srgb, var(--theme-bg-card) 95%, transparent), color-mix(in srgb, var(--soc-bg-deep) 98%, transparent));
  border-color: color-mix(in srgb, var(--theme-border-panel) 12%, transparent);
}

.apoyo-media--image img {
  background: var(--cootravir-blue-darker);
}

/* ——— Gráficos ——— */
.reinv-bar-fill--blue {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-chart-blue) 55%, white), var(--theme-chart-blue) 52%, color-mix(in srgb, var(--theme-chart-blue) 75%, black));
}

.reinv-bar-fill--mid {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-chart-mid) 70%, white), var(--theme-chart-mid) 48%, var(--theme-chart-blue));
}

.reinv-bar-fill--gold {
  background: linear-gradient(180deg, color-mix(in srgb, var(--theme-chart-gold) 40%, white), var(--theme-chart-gold) 42%, color-mix(in srgb, var(--theme-chart-gold) 65%, black));
  box-shadow: 0 0 22px color-mix(in srgb, var(--theme-chart-gold) 40%, transparent);
}

.bar-value-dark {
  color: var(--cootravir-gold-light);
}

/* ——— Carrusel page_2 ——— */
.p2-carousel-btn,
.p2-carousel-dot[aria-current="true"] {
  background: color-mix(in srgb, var(--cootravir-blue) 75%, transparent);
  border-color: color-mix(in srgb, var(--theme-border-panel) 30%, transparent);
  color: var(--theme-text-title);
}

.p2-carousel-dot[aria-current="true"] {
  background: linear-gradient(135deg, var(--cootravir-gold-light), var(--cootravir-blue-light));
}

/* Líneas decorativas */
.soc-chip {
  background: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  border-color: color-mix(in srgb, var(--theme-border-panel) 35%, transparent);
}

.cover-chip-line,
.cover-line-pulse,
.deck-tech-hud::before,
.deck-tech-hud::after {
  border-color: color-mix(in srgb, var(--theme-border-accent) 35%, transparent);
  background: linear-gradient(90deg, transparent, var(--cootravir-gold), color-mix(in srgb, var(--theme-accent-anim) 90%, transparent), transparent);
}`;
}
