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

/** CSS del tema: se inyecta después del CSS de cada diapositiva para poder sobrescribir colores fijos. */
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
  --soc-text-muted: color-mix(in srgb, var(--soc-text) 62%, transparent);
  --soc-panel: color-mix(in srgb, var(--soc-bg-mid) 78%, transparent);
  --soc-panel-strong: color-mix(in srgb, var(--soc-bg-mid) 92%, var(--cootravir-blue) 8%);
  --soc-panel-border: color-mix(in srgb, var(--cootravir-gold) 28%, transparent);
  --soc-glow: color-mix(in srgb, var(--cootravir-blue-light) 35%, transparent);
}

body.prop-fill {
  background: var(--soc-bg-deep);
}

/* Cabeceras y barras superiores */
.soc-header,
.soc-slide.deck-tech .soc-header,
.mapa-page.deck-tech .mapa-top {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--cootravir-blue) 95%, transparent),
    color-mix(in srgb, var(--cootravir-blue-darker) 88%, transparent)
  );
  border-bottom-color: var(--soc-panel-border);
}

.soc-header h1,
.soc-header-brand span:first-child {
  color: var(--soc-text);
}

.soc-chip {
  color: var(--cootravir-gold-light);
  background: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 35%, transparent);
}

/* Paneles vidrio */
.soc-glass {
  background: var(--soc-panel);
  border-color: color-mix(in srgb, var(--soc-text) 8%, transparent);
}

.soc-glass:hover {
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.5),
    0 0 0 1px color-mix(in srgb, var(--soc-text) 6%, transparent) inset,
    0 0 60px var(--soc-glow);
}

.soc-glass-strong {
  background: var(--soc-panel-strong);
}

.soc-slide.deck-tech .soc-glass {
  border-color: color-mix(in srgb, var(--cootravir-blue-light) 10%, transparent);
  box-shadow:
    var(--shadow-panel),
    0 0 0 1px color-mix(in srgb, var(--cootravir-blue-light) 5%, transparent) inset,
    0 0 48px var(--soc-glow);
}

/* Fondos de diapositiva */
.cover-slide:not(.cover-tech) {
  background:
    radial-gradient(1000px 520px at 50% -20%, color-mix(in srgb, var(--cootravir-blue-light) 25%, transparent), transparent 60%),
    linear-gradient(135deg, var(--cootravir-blue-darker) 0%, var(--cootravir-blue) 50%, var(--cootravir-blue-darker) 100%);
}

.cover-slide.cover-tech,
.soc-slide.deck-tech,
.mapa-page.deck-tech {
  background:
    radial-gradient(ellipse 120% 80% at 50% 120%, color-mix(in srgb, var(--cootravir-blue-light) 12%, transparent), transparent 55%),
    radial-gradient(ellipse 90% 60% at 10% 20%, color-mix(in srgb, var(--cootravir-gold) 14%, transparent), transparent 45%),
    radial-gradient(ellipse 70% 50% at 92% 35%, color-mix(in srgb, var(--cootravir-blue-light) 35%, transparent), transparent 50%),
    linear-gradient(165deg, var(--soc-bg-deep) 0%, var(--cootravir-blue-darker) 38%, var(--cootravir-blue) 72%, var(--soc-bg-deep) 100%);
}

.soc-slide:not(.deck-tech) {
  background:
    radial-gradient(900px 480px at 85% 10%, color-mix(in srgb, var(--cootravir-blue-light) 18%, transparent), transparent 55%),
    radial-gradient(700px 400px at 10% 90%, color-mix(in srgb, var(--cootravir-gold) 8%, transparent), transparent 50%),
    linear-gradient(168deg, var(--soc-bg-deep) 0%, var(--soc-bg-mid) 42%, var(--cootravir-blue) 88%);
}

/* Carrusel apoyos (page_3 / page_3_operacional) */
.tech-cc::before {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--cootravir-blue) 35%, transparent) 0%, transparent 42%),
    linear-gradient(315deg, color-mix(in srgb, var(--cootravir-gold) 6%, transparent) 0%, transparent 38%),
    repeating-linear-gradient(
      -12deg,
      transparent,
      transparent 48px,
      color-mix(in srgb, var(--soc-text) 2%, transparent) 48px,
      color-mix(in srgb, var(--soc-text) 2%, transparent) 49px
    );
}

.tech-cc-visual {
  background:
    radial-gradient(ellipse 80% 70% at 50% 80%, color-mix(in srgb, var(--cootravir-blue-light) 18%, transparent), transparent 70%),
    linear-gradient(180deg, color-mix(in srgb, var(--cootravir-blue-darker) 95%, transparent), color-mix(in srgb, var(--soc-bg-deep) 98%, transparent));
  border-bottom-color: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
}

@media (min-width: 900px) {
  .tech-cc-visual {
    border-right-color: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  }
}

.tech-cc-visual-frame {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--cootravir-gold) 55%, transparent),
    color-mix(in srgb, var(--cootravir-blue-light) 45%, transparent),
    color-mix(in srgb, var(--cootravir-blue) 80%, transparent)
  );
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--soc-text) 6%, transparent) inset,
    0 20px 50px rgba(0, 0, 0, 0.55),
    0 40px 80px rgba(0, 0, 0, 0.25),
    0 0 80px var(--soc-glow);
}

.tech-cc-visual:hover .tech-cc-visual-frame {
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--soc-text) 10%, transparent) inset,
    0 28px 60px rgba(0, 0, 0, 0.5),
    0 50px 100px color-mix(in srgb, var(--cootravir-blue) 35%, transparent),
    0 0 100px color-mix(in srgb, var(--cootravir-gold) 15%, transparent);
}

.tech-cc-visual-inner {
  background: radial-gradient(120% 80% at 50% 100%, var(--soc-glow), var(--cootravir-blue-darker) 55%);
}

.tech-cc-scan {
  background: linear-gradient(
    transparent 0%,
    color-mix(in srgb, var(--cootravir-blue-light) 7%, transparent) 48%,
    color-mix(in srgb, var(--cootravir-gold) 6%, transparent) 50%,
    transparent 52%
  );
}

.tech-cc-copy {
  background: color-mix(in srgb, var(--soc-bg-mid) 55%, var(--soc-text) 8%);
}

.tech-cc-badge {
  color: var(--cootravir-gold-light);
  background: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 35%, transparent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--cootravir-gold) 8%, transparent);
}

.tech-cc-title,
.tech-cc-desc,
.tech-cc-pause-hint {
  color: var(--soc-text);
}

.tech-cc-desc,
.tech-cc-flow span {
  color: var(--soc-text-muted);
}

.tech-cc-flow span {
  background: color-mix(in srgb, var(--soc-text) 4%, transparent);
  border-color: color-mix(in srgb, var(--soc-text) 8%, transparent);
}

.tech-cc-nav {
  background: color-mix(in srgb, var(--soc-bg-mid) 75%, transparent);
  border-color: color-mix(in srgb, var(--soc-text) 12%, transparent);
  color: var(--soc-text);
}

.tech-cc-nav:hover {
  background: color-mix(in srgb, var(--cootravir-blue-light) 45%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 40%, transparent);
}

.tech-cc-dot[aria-current="true"] {
  background: linear-gradient(135deg, var(--cootravir-gold-light), var(--cootravir-blue-light));
  box-shadow: 0 0 16px color-mix(in srgb, var(--cootravir-gold) 45%, transparent);
}

.tech-cc-progress-bar {
  background: linear-gradient(90deg, var(--cootravir-blue-light), var(--cootravir-gold-light));
}

/* Panel lateral beneficios */
.ben-scene-media {
  background:
    radial-gradient(ellipse 70% 60% at 50% 40%, color-mix(in srgb, var(--cootravir-blue-light) 10%, transparent), transparent 62%),
    linear-gradient(165deg, color-mix(in srgb, var(--cootravir-blue-darker) 90%, transparent) 0%, color-mix(in srgb, var(--soc-bg-deep) 95%, transparent) 100%);
  border-color: color-mix(in srgb, var(--soc-text) 10%, transparent);
}

/* Tarjetas apoyos (page_5) */
.apoyo-media,
.apoyo-icon-fa:not(:has(img)) {
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--cootravir-blue) 95%, transparent),
    color-mix(in srgb, var(--soc-bg-deep) 98%, transparent)
  );
  border-color: color-mix(in srgb, var(--soc-text) 12%, transparent);
}

.apoyo-media--image img,
.apoyo-icon-fa img {
  background: var(--cootravir-blue-darker);
}

/* Diagramas y barras (reinversión) */
.bars-wrap-dark {
  background: color-mix(in srgb, var(--soc-bg-deep) 35%, black);
  border-color: color-mix(in srgb, var(--soc-text) 10%, transparent);
}

.note-box-dark {
  background: color-mix(in srgb, var(--cootravir-gold) 12%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 35%, transparent);
  color: var(--soc-text);
}

.benefit-item-dark,
.service-item-dark {
  border-color: color-mix(in srgb, var(--soc-text) 8%, transparent);
  background: color-mix(in srgb, var(--soc-text) 4%, transparent);
}

/* Carrusel page_2 */
.p2-carousel-slide {
  background: color-mix(in srgb, var(--soc-bg-mid) 60%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 20%, transparent);
}

.p2-carousel-btn,
.p2-carousel-dot[aria-current="true"] {
  background: color-mix(in srgb, var(--cootravir-blue) 75%, transparent);
  border-color: color-mix(in srgb, var(--cootravir-gold) 30%, transparent);
  color: var(--soc-text);
}`;
}
