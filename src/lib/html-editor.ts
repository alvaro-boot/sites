/** Utilidades para editar HTML de diapositivas sin escribir código a mano. */

export interface TextFieldDef {
  id: string;
  label: string;
  selector: string;
  html?: boolean;
}

export interface BenCardItem {
  title: string;
  description: string;
  icon: string;
}

export interface BenRowItem {
  name: string;
  sub: string;
  value: string;
}

/** Panel lateral page_beneficios_vigilancia — imagen del guarda */
export interface BenSceneData {
  kicker: string;
  titleHtml: string;
  imageSrc: string;
  imageAlt: string;
  hudLeft: string;
  hudRight: string;
}

export interface ImageItem {
  index: number;
  src: string;
  alt: string;
}

export interface CertPhotoItem {
  index: number;
  label: string;
  src: string;
}

/** Certificación page_2b — logo + textos */
export interface P2bCertItem {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export interface P2bValChipItem {
  key: string;
  label: string;
  active: boolean;
}

export interface P2bPageData {
  heroTitle: string;
  valHubTitle: string;
  valHubSubtitle: string;
  valChips: P2bValChipItem[];
  /** Panel lateral: por qué elegir COOTRAVIR */
  whyChooseTitle: string;
  whyChooseBadge: string;
  whyChooseBody: string;
  whyChoosePointsLabel: string;
  whyChoosePoints: string[];
  certsSectionTitle: string;
  certs: P2bCertItem[];
}

const DEFAULT_WHY_CHOOSE_BODY =
  '<p>Integramos <strong>experiencia en seguridad privada</strong>, certificaciones de gestión y un equipo humano comprometido con la operación de su empresa.</p>';

const DEFAULT_WHY_POINTS_LABEL = 'Lo que nos distingue';

const DEFAULT_WHY_POINTS = [
  'Trayectoria y respaldo institucional COOTRAVIR C.T.A.',
  'Cumplimiento normativo, calidad y cultura de mejora continua',
  'Tecnología, supervisión y reacción ante novedades',
  'Atención cercana con ejecutivo de cuenta y coordinación dedicada',
];

/** Carrusel presencia física (page_2) — slides en DOM */
export interface P2CarouselSlideItem {
  ariaLabel: string;
  icon: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

/** Carrusel tecnológico (page_3, page_3_operacional) — array PRODUCTS en script */
export interface TechProductItem {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHtml: string;
  desc: string;
  type: 'img' | 'video';
  src: string;
  fallbackIcon: string;
}

const SLIDE_TEXT_FIELDS: Record<string, TextFieldDef[]> = {
  page_1: [
    { id: 'h1', label: 'Título principal', selector: '.cover-main-title' },
    { id: 'client', label: 'Nombre del cliente', selector: '.cover-client-name' },
    { id: 'sub1', label: 'Subtítulo línea 1', selector: '.cover-sub--1' },
    { id: 'sub2', label: 'Subtítulo línea 2', selector: '.cover-sub--2' },
  ],
  page_2: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
    { id: 'brand', label: 'Marca (cabecera)', selector: '.soc-header-brand > span:first-child' },
    { id: 'p2_presencia', label: 'Etiqueta carrusel', selector: '.p2-carousel > p' },
    { id: 'p2_coop_h2', label: 'Bloque cooperativa — título', selector: '.p2-reveal--2 h2' },
    { id: 'p2_coop_p', label: 'Bloque cooperativa — descripción', selector: '.p2-reveal--2 > div > div > p' },
    { id: 'p2_reg_h2', label: 'Reconocimiento — título', selector: '.p2-donut-head h2' },
    { id: 'p2_reg_p', label: 'Reconocimiento — descripción', selector: '.p2-donut-head p' },
  ],
  page_2b: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
    { id: 'brand', label: 'Marca (cabecera)', selector: '.soc-header-brand > span:first-child' },
  ],
  page_3: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
  ],
  page_3_operacional: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
  ],
  page_beneficios_vigilancia: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-chip' },
    { id: 'scene', label: 'Titular lateral (HTML)', selector: '.ben-scene-title', html: true },
    { id: 'lead', label: 'Subtítulo panel (HTML)', selector: '.ben-lead', html: true },
    { id: 'foot', label: 'Pie de página', selector: '.ben-foot' },
  ],
  page_cierre: [
    { id: 'h1', label: 'Título', selector: '.soc-header h1, .p6-head-left h1' },
    { id: 'kicker', label: 'Línea superior', selector: '.p6-kicker' },
  ],
  page_4: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
    { id: 'brand', label: 'Marca (cabecera)', selector: '.soc-header-brand > span:first-child' },
  ],
  page_5: [
    { id: 'h1', label: 'Título diapositiva', selector: '.soc-header h1' },
    { id: 'chip', label: 'Etiqueta superior', selector: '.soc-header .soc-chip' },
    { id: 'brand', label: 'Marca (cabecera)', selector: '.soc-header-brand > span:first-child' },
  ],
  page_video: [{ id: 'h1', label: 'Título', selector: '.soc-header h1' }],
};

const DEFAULT_FIELDS: TextFieldDef[] = [
  { id: 'h1', label: 'Título principal', selector: '.soc-header h1' },
  { id: 'h1b', label: 'Título portada', selector: '.cover-main-title' },
];

function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(
    `<div id="slide-root">${html}</div>`,
    'text/html',
  );
}

function serializeBody(doc: Document): string {
  const root = doc.getElementById('slide-root');
  return root?.innerHTML.trim() ?? '';
}

const TEXT_EDIT_EXCLUDE =
  'script, style, noscript, .p2-carousel-viewport, .ben-cards, .ben-card, .ben-ledger, .ben-row, .ben-scene-media, .ben-scene-head, .ben-scene-hud, .tech-cc-dots, .p2-carousel-nav, .p2-chart3d-wrap, .p2-leg-wrap, .p4-service-grid, .p4-period-grid, .p4-subtotal-hero, .p4-card-head, .p2b-cert-row, .p2b-val-chips, .p2b-val-hub-head, .p2b-hero, .p2b-certs-head, .p2b-why-head, .p2b-why-stack, .p2b-why-cuerpo, .p2b-why-puntos, .apoyos-grid, .reinv-card, .reinv-tags, .apoyos-head-text';

function isInsideExcluded(el: Element): boolean {
  return Boolean(el.closest(TEXT_EDIT_EXCLUDE));
}

function isEditableTextElement(el: Element): boolean {
  if (el.classList.contains('p4-eyebrow')) return true;
  if (isInsideExcluded(el)) return false;
  if (el.closest('[aria-hidden="true"]') && !el.classList.contains('soc-chip')) return false;
  if (el.matches('i, svg, button, input, textarea, select, option, img, video, source, track')) {
    return false;
  }
  if (el.id === 'techCcTitle' || el.id === 'techCcDesc' || el.id === 'techCcBadgeText') {
    return false;
  }

  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > 600) return false;

  const tag = el.tagName;
  const textTags = new Set([
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'LI',
    'TD',
    'TH',
    'LABEL',
    'FIGCAPTION',
    'BLOCKQUOTE',
  ]);
  if (textTags.has(tag)) return true;

  if (
    el.classList.contains('soc-chip') ||
    el.classList.contains('soc-label') ||
    el.classList.contains('soc-kpi-value') ||
    el.classList.contains('p4-eyebrow') ||
    el.classList.contains('p4-sub-label') ||
    el.classList.contains('p4-sub-value')
  ) {
    return true;
  }

  if (tag === 'SPAN' || tag === 'STRONG' || tag === 'SMALL' || tag === 'DIV') {
    if (el.children.length > 0) return false;
    return text.length > 0 && text.length <= 200;
  }

  return false;
}

function isLeafEditableText(el: Element): boolean {
  if (!isEditableTextElement(el)) return false;
  if (el.classList.contains('p4-eyebrow')) return true;
  for (const child of el.children) {
    if (isEditableTextElement(child)) return false;
  }
  return true;
}

function usesRichHtml(el: Element): boolean {
  const inner = el.innerHTML.trim();
  const text = (el.textContent ?? '').trim();
  return inner !== text && /<[a-z][\s\S]*>/i.test(inner);
}

/** Asigna ids estables a bloques de texto para poder editarlos en el panel visual. */
export function ensureTextFieldIds(html: string): string {
  const doc = parseHtml(html);
  const root = doc.getElementById('slide-root');
  if (!root) return html;

  let n = 0;
  for (const el of root.querySelectorAll('[data-vedit-id]')) {
    const num = parseInt(el.getAttribute('data-vedit-id')?.replace('vedit-', '') ?? '', 10);
    if (!Number.isNaN(num)) n = Math.max(n, num + 1);
  }

  let changed = false;
  for (const el of root.querySelectorAll('*')) {
    if (!isLeafEditableText(el)) continue;
    if (el.hasAttribute('data-vedit-id')) continue;
    el.setAttribute('data-vedit-id', `vedit-${n++}`);
    changed = true;
  }

  return changed ? serializeBody(doc) : html;
}

export function discoverTextFields(html: string): TextFieldDef[] {
  const doc = parseHtml(html);
  const fields: TextFieldDef[] = [];

  for (const el of doc.querySelectorAll('[data-vedit-id]')) {
    const veditId = el.getAttribute('data-vedit-id');
    if (!veditId) continue;
    const preview = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 48);
    const tag = el.tagName.toLowerCase();
    fields.push({
      id: `auto_${veditId}`,
      label: `${tag}: ${preview}${preview.length >= 48 ? '…' : ''}`,
      selector: `[data-vedit-id="${veditId}"]`,
      html: usesRichHtml(el),
    });
  }

  return fields;
}

export function getTextFieldsForSlide(slideKey: string, html?: string): TextFieldDef[] {
  const explicit = SLIDE_TEXT_FIELDS[slideKey] ?? [];
  if (!html) {
    return explicit.length > 0 ? explicit : DEFAULT_FIELDS;
  }

  const discovered = discoverTextFields(html);
  const seenSelectors = new Set(explicit.map((f) => f.selector));
  const merged = [...explicit];

  for (const field of discovered) {
    if (seenSelectors.has(field.selector)) continue;
    const el = parseHtml(html).querySelector(field.selector);
    if (!el) continue;
    const overlapsExplicit = explicit.some((ex) => {
      const exEl = parseHtml(html).querySelector(ex.selector);
      return exEl && (exEl === el || exEl.contains(el) || el.contains(exEl));
    });
    if (overlapsExplicit) continue;
    merged.push(field);
    seenSelectors.add(field.selector);
  }

  return merged.length > 0 ? merged : DEFAULT_FIELDS;
}

export function readTextFields(
  html: string,
  fields: TextFieldDef[],
): Record<string, string> {
  const doc = parseHtml(html);
  const out: Record<string, string> = {};
  for (const f of fields) {
    const el = doc.querySelector(f.selector);
    out[f.id] = el
      ? f.html
        ? el.innerHTML
        : (el.textContent ?? '')
      : '';
  }
  return out;
}

export function applyTextFields(
  html: string,
  fields: TextFieldDef[],
  values: Record<string, string>,
): string {
  const doc = parseHtml(html);
  for (const f of fields) {
    const el = doc.querySelector(f.selector);
    if (!el || values[f.id] === undefined) continue;
    if (f.html) el.innerHTML = values[f.id];
    else el.textContent = values[f.id];
  }
  return serializeBody(doc);
}

export function extractImages(html: string): ImageItem[] {
  const doc = parseHtml(html);
  return [...doc.querySelectorAll('img')].map((img, index) => ({
    index,
    src: img.getAttribute('src') ?? '',
    alt: img.getAttribute('alt') ?? '',
  }));
}

export function replaceImageSrc(html: string, index: number, newSrc: string): string {
  const doc = parseHtml(html);
  const imgs = doc.querySelectorAll('img');
  const img = imgs[index];
  if (img) img.setAttribute('src', newSrc);
  return serializeBody(doc);
}

export function hasCertPhotos(html: string): boolean {
  return parseHtml(html).querySelector('.p2b-cert-photo[data-cert-src]') !== null;
}

export function parseCertPhotos(html: string): CertPhotoItem[] {
  const doc = parseHtml(html);
  return [...doc.querySelectorAll('.p2b-cert-photo[data-cert-src]')].map((slot, index) => {
    const cert = slot.closest('.p2b-cert');
    const label =
      cert?.querySelector('.p2b-cert-text strong')?.textContent?.trim() ??
      `Certificación ${index + 1}`;
    return {
      index,
      label,
      src: slot.getAttribute('data-cert-src') ?? '',
    };
  });
}

export function replaceCertPhotoSrc(html: string, index: number, newSrc: string): string {
  const data = parseP2bPage(html);
  if (index < 0 || index >= data.certs.length) return html;
  const certs = [...data.certs];
  certs[index] = { ...certs[index], imageSrc: newSrc };
  return applyP2bPage(html, { ...data, certs });
}

export function hasP2bPage(html: string): boolean {
  const doc = parseHtml(html);
  return (
    doc.querySelector('.p2b-slide') !== null ||
    doc.querySelector('.p2b-cert-row') !== null ||
    doc.querySelector('.p2b-val-chips') !== null
  );
}

function slugifyValKey(label: string): string {
  const base = label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  return base || 'valor';
}

const DEFAULT_DNA_PALETTE =
  '{ color: 0x334155, emissive: 0x64748b, emissiveI: 1.0, metalness: 0.06, roughness: 0.52 }';

function syncP2bHelixScript(html: string, chipKeys: string[]): string {
  if (chipKeys.length === 0) return html;
  const orderBlock = `[\n                ${chipKeys.map((k) => `"${escapeAttr(k)}"`).join(',\n                ')}\n            ]`;
  let out = html.replace(/var order = \[[\s\S]*?\];/, `var order = ${orderBlock};`);

  const palArr = extractBracketedArray(out, /var VALUE_PALETTES = \[/);
  if (!palArr) return out;
  try {
    const palettes = new Function(`return ${palArr}`)() as object[];
    const list = Array.isArray(palettes) ? [...palettes] : [];
    const fallback = list[list.length - 1] ?? DEFAULT_DNA_PALETTE;
    while (list.length < chipKeys.length) list.push(fallback);
    if (list.length > chipKeys.length) list.length = chipKeys.length;
    const palLines = list.map((p) => {
      if (typeof p === 'object' && p !== null) {
        const o = p as Record<string, number>;
        return `                { color: ${o.color ?? 0x334155}, emissive: ${o.emissive ?? 0x64748b}, emissiveI: ${o.emissiveI ?? 1}, metalness: ${o.metalness ?? 0.06}, roughness: ${o.roughness ?? 0.52} }`;
      }
      return `                ${DEFAULT_DNA_PALETTE}`;
    });
    const newPal = `[\n${palLines.join(',\n')}\n            ]`;
    const idx = out.indexOf(palArr);
    out = out.slice(0, idx) + newPal + out.slice(idx + palArr.length);
  } catch {
    /* mantener paletas originales si no se pueden parsear */
  }
  return out;
}

function parseWhyChooseFromLegacyHtml(legacyHtml: string): {
  body: string;
  pointsLabel: string;
  points: string[];
} {
  if (!legacyHtml.trim()) {
    return {
      body: DEFAULT_WHY_CHOOSE_BODY,
      pointsLabel: DEFAULT_WHY_POINTS_LABEL,
      points: [...DEFAULT_WHY_POINTS],
    };
  }
  const wrap = parseHtml(`<div>${legacyHtml}</div>`);
  const body =
    wrap.querySelector('#p2b-why-cuerpo')?.innerHTML?.trim() ||
    wrap.querySelector('.p2b-why-cuerpo-text')?.innerHTML?.trim() ||
    wrap.querySelector('.p2b-why-lead')?.outerHTML?.trim() ||
    wrap.querySelector('p')?.outerHTML?.trim() ||
    DEFAULT_WHY_CHOOSE_BODY;
  const pointsLabel =
    wrap.querySelector('#p2b-why-puntos-label')?.textContent?.trim() ||
    wrap.querySelector('.p2b-why-puntos__label')?.textContent?.trim() ||
    DEFAULT_WHY_POINTS_LABEL;
  const points = [...wrap.querySelectorAll('.p2b-why-list li, ul li')]
    .map((li) => li.querySelector('span')?.textContent?.trim() || li.textContent?.trim() || '')
    .filter(Boolean);
  return {
    body,
    pointsLabel,
    points: points.length > 0 ? points : [...DEFAULT_WHY_POINTS],
  };
}

export function parseP2bPage(html: string): P2bPageData {
  const doc = parseHtml(html);
  const valChips = [...doc.querySelectorAll('.p2b-val-chip')].map((btn) => ({
    key: btn.getAttribute('data-val') ?? slugifyValKey(btn.textContent ?? ''),
    label: btn.textContent?.trim() ?? '',
    active: btn.classList.contains('is-active'),
  }));

  const certs = [...doc.querySelectorAll('.p2b-cert')].map((cert) => ({
    title: cert.querySelector('.p2b-cert-text strong')?.textContent?.trim() ?? '',
    subtitle: cert.querySelector('.p2b-cert-text span')?.textContent?.trim() ?? '',
    imageSrc: cert.querySelector('.p2b-cert-photo')?.getAttribute('data-cert-src') ?? '',
  }));

  const aside = doc.querySelector('.p2b-aside');
  const legacyHtml = doc.querySelector('#p2b-why-body')?.innerHTML?.trim() || '';
  const legacy = legacyHtml ? parseWhyChooseFromLegacyHtml(legacyHtml) : null;

  let whyChooseBody =
    doc.querySelector('#p2b-why-cuerpo')?.innerHTML?.trim() || legacy?.body || '';
  if (!whyChooseBody && aside?.querySelector('p')) {
    whyChooseBody = aside.querySelector('p')!.outerHTML;
  }
  if (!whyChooseBody) whyChooseBody = DEFAULT_WHY_CHOOSE_BODY;

  const whyChoosePointsLabel =
    doc.querySelector('#p2b-why-puntos-label')?.textContent?.trim() ||
    legacy?.pointsLabel ||
    aside?.querySelector('.p2b-why-puntos__label, h4')?.textContent?.trim() ||
    DEFAULT_WHY_POINTS_LABEL;

  let whyChoosePoints = [...doc.querySelectorAll('.p2b-why-list li')].map(
    (li) => li.querySelector('span')?.textContent?.trim() || li.textContent?.trim() || '',
  ).filter(Boolean);
  if (whyChoosePoints.length === 0 && aside) {
    whyChoosePoints = [...aside.querySelectorAll('li')].map(
      (li) =>
        li.querySelector('span')?.textContent?.trim() ||
        li.textContent?.replace(/^\s*✓\s*/, '').trim() ||
        '',
    ).filter(Boolean);
  }
  if (whyChoosePoints.length === 0 && legacy) whyChoosePoints = legacy.points;
  if (whyChoosePoints.length === 0) whyChoosePoints = [...DEFAULT_WHY_POINTS];

  return {
    heroTitle: doc.querySelector('.p2b-hero h2')?.textContent?.trim() ?? '',
    valHubTitle: doc.querySelector('.p2b-val-hub-head h3')?.textContent?.trim() ?? '',
    valHubSubtitle: doc.querySelector('.p2b-val-hub-head span')?.textContent?.trim() ?? '',
    valChips,
    whyChooseTitle:
      doc.querySelector('#p2b-why-title')?.textContent?.trim() ??
      doc.querySelector('#p2b-dna-title')?.textContent?.trim() ??
      aside?.querySelector('h3')?.textContent?.trim() ??
      '¿Por qué elegir COOTRAVIR C.T.A.?',
    whyChooseBadge:
      doc.querySelector('.p2b-why-badge')?.textContent?.trim() ??
      doc.querySelector('.p2b-dna-badge')?.textContent?.trim() ??
      'COOTRAVIR',
    whyChooseBody,
    whyChoosePointsLabel,
    whyChoosePoints,
    certsSectionTitle: doc.querySelector('.p2b-certs-head h3')?.textContent?.trim() ?? '',
    certs,
  };
}

function renderWhyChooseCard(data: P2bPageData): string {
  return (
    '<div class="p2b-why-head">\n' +
    '                                    <h3 id="p2b-why-title" class="font-bold m-0">' +
    escapeHtml(data.whyChooseTitle) +
    '</h3>\n' +
    '                                    <span class="p2b-why-badge">' +
    escapeHtml(data.whyChooseBadge) +
    '</span>\n' +
    '                                </div>\n' +
    '                                <div class="p2b-why-stack">\n' +
    '                                    <section class="p2b-why-cuerpo" aria-labelledby="p2b-why-title">\n' +
    '                                        <div id="p2b-why-cuerpo" class="p2b-why-cuerpo-text">' +
    data.whyChooseBody +
    '</div>\n' +
    '                                    </section>\n' +
    '                                    <section class="p2b-why-puntos" aria-labelledby="p2b-why-puntos-label">\n' +
    '                                        <p id="p2b-why-puntos-label" class="p2b-why-puntos__label">' +
    escapeHtml(data.whyChoosePointsLabel) +
    '</p>\n' +
    '                                        <ul class="p2b-why-list">\n' +
    renderWhyChoosePoints(data.whyChoosePoints.length > 0 ? data.whyChoosePoints : DEFAULT_WHY_POINTS) +
    '\n                                        </ul>\n' +
    '                                    </section>\n' +
    '                                </div>'
  );
}

function renderWhyChoosePoints(points: string[]): string {
  return points
    .map(
      (text) =>
        `<li><i class="fas fa-check" aria-hidden="true"></i><span>${escapeHtml(text)}</span></li>`,
    )
    .join('\n');
}

function renderP2bCertItem(c: P2bCertItem): string {
  const srcAttr = c.imageSrc ? ` data-cert-src="${escapeAttr(c.imageSrc)}"` : '';
  const titleAttr = c.imageSrc
    ? ` title="Logo: ${escapeAttr(c.imageSrc)}"`
    : '';
  return `<div class="p2b-cert" role="listitem">
                                    <div class="p2b-cert-photo"${srcAttr}${titleAttr}>
                                        <span class="p2b-cert-fallback"><i class="fas fa-certificate" aria-hidden="true"></i><small>Logo / sello (opcional)</small></span>
                                    </div>
                                    <div class="p2b-cert-text">
                                        <strong>${escapeHtml(c.title)}</strong>
                                        <span>${escapeHtml(c.subtitle)}</span>
                                    </div>
                                </div>`;
}

export function applyP2bPage(html: string, data: P2bPageData): string {
  const doc = parseHtml(html);

  const heroH2 = doc.querySelector('.p2b-hero h2');
  if (heroH2) heroH2.textContent = data.heroTitle;

  const hubH3 = doc.querySelector('.p2b-val-hub-head h3');
  if (hubH3) hubH3.textContent = data.valHubTitle;
  const hubSpan = doc.querySelector('.p2b-val-hub-head span');
  if (hubSpan) hubSpan.textContent = data.valHubSubtitle;

  const chipsWrap = doc.querySelector('.p2b-val-chips');
  if (chipsWrap && data.valChips.length > 0) {
    chipsWrap.innerHTML = data.valChips
      .map(
        (chip, i) =>
          `<button type="button" class="p2b-val-chip${chip.active || i === 0 ? ' is-active' : ''}" role="option" aria-selected="${chip.active || i === 0 ? 'true' : 'false'}" data-val="${escapeAttr(chip.key)}">${escapeHtml(chip.label)}</button>`,
      )
      .join('\n');
  }

  let whyCard = doc.querySelector(
    '.p2b-aside .soc-glass, .p2b-aside .p2b-dna-card, .p2b-aside .p2b-why-card',
  );
  const aside = doc.querySelector('.p2b-aside');
  if (!whyCard && aside) {
    whyCard = doc.createElement('div');
    whyCard.className =
      'soc-glass p2b-why-card p-4 sm:p-5 min-h-0 flex flex-col flex-1 h-full max-h-full';
    aside.innerHTML = '';
    aside.appendChild(whyCard);
  }
  if (whyCard) {
    whyCard.className =
      'soc-glass p2b-why-card p-4 sm:p-5 min-h-0 flex flex-col flex-1 h-full max-h-full';
    whyCard.innerHTML = renderWhyChooseCard(data);
  }

  const certsHead = doc.querySelector('.p2b-certs-head h3');
  if (certsHead) certsHead.textContent = data.certsSectionTitle;

  const certRow = doc.querySelector('.p2b-cert-row');
  if (certRow) {
    certRow.innerHTML = data.certs.map((c) => renderP2bCertItem(c)).join('\n');
  }

  return serializeBody(doc);
}

const DEFAULT_BEN_SCENE_TITLE = 'Protegemos <span>quien protege</span>';

export function hasBenScene(html: string): boolean {
  const doc = parseHtml(html);
  return doc.querySelector('.ben-scene, .ben-slide, #ben-scene-media, #ben-3d-root') !== null;
}

export function parseBenScene(html: string): BenSceneData {
  const doc = parseHtml(html);
  const media = doc.querySelector('#ben-scene-media, #ben-3d-root');
  const img = media?.querySelector('.ben-scene-img, img');
  const hudSpans = doc.querySelectorAll('.ben-scene-hud span');
  return {
    kicker: doc.querySelector('.ben-scene-kicker')?.textContent?.trim() ?? 'Cobertura · compromiso',
    titleHtml:
      doc.querySelector('.ben-scene-title')?.innerHTML?.trim() || DEFAULT_BEN_SCENE_TITLE,
    imageSrc:
      media?.getAttribute('data-ben-image')?.trim() ||
      img?.getAttribute('src')?.trim() ||
      '',
    imageAlt: img?.getAttribute('alt')?.trim() ?? 'Personal de vigilancia COOTRAVIR',
    hudLeft: hudSpans[0]?.textContent?.trim() ?? 'Guarda de seguridad',
    hudRight: hudSpans[1]?.textContent?.trim() ?? 'Fotografía',
  };
}

function renderBenSceneMedia(data: BenSceneData): string {
  const srcAttr = data.imageSrc ? ` data-ben-image="${escapeAttr(data.imageSrc)}"` : '';
  const hasImg = Boolean(data.imageSrc);
  let inner = '';
  if (hasImg) {
    inner +=
      `<img class="ben-scene-img" src="${escapeAttr(data.imageSrc)}" alt="${escapeAttr(data.imageAlt)}" loading="lazy" onerror="this.style.display='none';this.closest('.ben-scene-media')?.classList.remove('ben-scene-media--has-img')"/>`;
  }
  inner +=
    '<span class="ben-scene-placeholder"><i class="fas fa-user-shield" aria-hidden="true"></i><small>Imagen del guarda (opcional)</small></span>';
  return (
    `<div class="ben-scene-media${hasImg ? ' ben-scene-media--has-img' : ''}" id="ben-scene-media"${srcAttr} role="img" aria-label="${escapeAttr(data.imageAlt)}">` +
    inner +
    '</div>'
  );
}

export function applyBenScene(html: string, data: BenSceneData): string {
  const doc = parseHtml(html);

  const kicker = doc.querySelector('.ben-scene-kicker');
  if (kicker) kicker.textContent = data.kicker;

  const title = doc.querySelector('.ben-scene-title');
  if (title) title.innerHTML = data.titleHtml;

  const hudSpans = doc.querySelectorAll('.ben-scene-hud span');
  if (hudSpans[0]) hudSpans[0].textContent = data.hudLeft;
  if (hudSpans[1]) hudSpans[1].textContent = data.hudRight;

  const media = doc.querySelector('#ben-scene-media, #ben-3d-root');
  const scene = doc.querySelector('.ben-scene');
  const mediaHtml = renderBenSceneMedia(data);
  if (media) {
    const wrap = doc.createElement('div');
    wrap.innerHTML = mediaHtml;
    const next = wrap.firstElementChild;
    if (next) media.replaceWith(next);
  } else if (scene) {
    const head = scene.querySelector('.ben-scene-head');
    const hud = scene.querySelector('.ben-scene-hud');
    const wrap = doc.createElement('div');
    wrap.innerHTML = mediaHtml;
    const node = wrap.firstElementChild;
    if (node) {
      if (hud) scene.insertBefore(node, hud);
      else if (head?.nextSibling) scene.insertBefore(node, head.nextSibling);
      else scene.appendChild(node);
    }
  }

  return serializeBody(doc);
}

export function parseBenCards(html: string): BenCardItem[] {
  const doc = parseHtml(html);
  return [...doc.querySelectorAll('.ben-card')].map((card) => {
    const iconEl = card.querySelector('.ben-card-ico i');
    const classes = iconEl?.getAttribute('class') ?? 'fas fa-heart';
    const icon = classes.replace(/^fas\s+/, '').trim() || 'fa-heart';
    return {
      title: card.querySelector('h3')?.textContent?.trim() ?? '',
      description: card.querySelector('p')?.textContent?.trim() ?? '',
      icon,
    };
  });
}

export function hasBenCards(html: string): boolean {
  return parseHtml(html).querySelector('.ben-cards') !== null;
}

export function applyBenCards(html: string, cards: BenCardItem[]): string {
  const doc = parseHtml(html);
  const container = doc.querySelector('.ben-cards');
  if (!container) return html;

  container.innerHTML = cards
    .map(
      (c) =>
        `<article class="ben-card" role="listitem">
      <div class="ben-card-ico" aria-hidden="true"><i class="fas ${escapeAttr(c.icon)}"></i></div>
      <div>
        <h3>${escapeHtml(c.title)}</h3>
        <p>${escapeHtml(c.description)}</p>
      </div>
    </article>`,
    )
    .join('\n');

  return serializeBody(doc);
}

export function parseBenRows(html: string): BenRowItem[] {
  const doc = parseHtml(html);
  return [...doc.querySelectorAll('.ben-row')].map((row) => ({
    name: row.querySelector('.ben-row-name')?.textContent?.trim() ?? '',
    sub: row.querySelector('.ben-row-sub')?.textContent?.trim() ?? '',
    value: row.querySelector('.ben-row-val')?.textContent?.trim() ?? '',
  }));
}

export function hasBenRows(html: string): boolean {
  return parseHtml(html).querySelector('.ben-row') !== null;
}

export function applyBenRows(html: string, rows: BenRowItem[]): string {
  const doc = parseHtml(html);
  const container = doc.querySelector('.ben-ledger');
  if (!container) return html;

  container.innerHTML = rows
    .map(
      (r) =>
        `<div class="ben-row">
        <div class="ben-row-text">
          <div class="ben-row-name">${escapeHtml(r.name)}</div>
          <div class="ben-row-sub">${escapeHtml(r.sub)}</div>
        </div>
        <div class="ben-row-val">${escapeHtml(r.value)}</div>
      </div>`,
    )
    .join('\n');

  return serializeBody(doc);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

export function hasP2Carousel(html: string): boolean {
  return parseHtml(html).querySelector('.p2-carousel-viewport .p2-carousel-slide') !== null;
}

export function parseP2CarouselSlides(html: string): P2CarouselSlideItem[] {
  const doc = parseHtml(html);
  return [...doc.querySelectorAll('.p2-carousel-viewport .p2-carousel-slide')].map(
    (slide) => {
      const iconEl = slide.querySelector('.flex i.fas');
      const classes = iconEl?.getAttribute('class') ?? 'fas fa-image';
      const icon = classes.replace(/^fas\s+/, '').trim() || 'fa-image';
      const img = slide.querySelector('.p2-photo-frame img, .p2-photo-img');
      return {
        ariaLabel: slide.getAttribute('aria-label') ?? '',
        icon,
        title: slide.querySelector('h3')?.textContent?.trim() ?? '',
        subtitle: slide.querySelector('p')?.textContent?.trim() ?? '',
        imageSrc: img?.getAttribute('src') ?? '',
        imageAlt: img?.getAttribute('alt') ?? '',
      };
    },
  );
}

export function applyP2CarouselSlides(html: string, slides: P2CarouselSlideItem[]): string {
  const doc = parseHtml(html);
  const viewport = doc.querySelector('.p2-carousel-viewport');
  if (!viewport || slides.length === 0) return html;

  viewport.innerHTML = slides
    .map(
      (s, i) =>
        `<div class="p2-carousel-slide${i === 0 ? ' is-active' : ''}" data-p2-slide="${i}" role="group" aria-roledescription="slide" aria-label="${escapeAttr(s.ariaLabel)}">
                                    <div class="flex items-center gap-2 shrink-0">
                                        <i class="fas ${escapeAttr(s.icon)} text-sm" style="color: var(--cootravir-gold-light);"></i>
                                        <h3 class="text-sm sm:text-base font-bold m-0 uppercase tracking-wide" style="font-family: var(--font-display); color: var(--soc-text);">${escapeHtml(s.title)}</h3>
                                    </div>
                                    <p class="text-xs sm:text-sm m-0 shrink-0" style="color: var(--soc-text-muted);">${escapeHtml(s.subtitle)}</p>
                                    <div class="p2-photo-frame flex-1 min-h-0">
                                        <img src="${escapeAttr(s.imageSrc)}" alt="${escapeAttr(s.imageAlt)}" class="p2-photo-img" onerror="this.style.display='none'"/>
                                    </div>
                                </div>`,
    )
    .join('\n');

  return serializeBody(doc);
}

function extractBracketedArray(html: string, marker: RegExp): string | null {
  const startMatch = html.match(marker);
  if (!startMatch || startMatch.index === undefined) return null;
  const startIdx = startMatch.index + startMatch[0].length - 1;
  let depth = 0;
  for (let i = startIdx; i < html.length; i++) {
    const ch = html[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return html.slice(startIdx, i + 1);
    }
  }
  return null;
}

export function hasTechCarousel(html: string): boolean {
  return /var\s+PRODUCTS\s*=\s*\[/.test(html);
}

export function parseTechProducts(html: string): TechProductItem[] {
  const arrStr = extractBracketedArray(html, /var\s+PRODUCTS\s*=\s*\[/);
  if (!arrStr) return [];
  try {
    const parsed = new Function(`return ${arrStr}`)() as TechProductItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function serializeTechProducts(products: TechProductItem[]): string {
  const lines = products.map(
    (p) => `                {
                    badge: ${JSON.stringify(p.badge)},
                    badgeIcon: ${JSON.stringify(p.badgeIcon)},
                    title: ${JSON.stringify(p.title)},
                    titleHtml: ${JSON.stringify(`<span>${p.title}</span>`)},
                    desc: ${JSON.stringify(p.desc)},
                    type: ${JSON.stringify(p.type)},
                    src: ${JSON.stringify(p.src)},
                    fallbackIcon: ${JSON.stringify(p.fallbackIcon)}
                }`,
  );
  return `[\n${lines.join(',\n')}\n            ]`;
}

export function applyTechProducts(html: string, products: TechProductItem[]): string {
  if (products.length === 0) return html;
  const arrStr = extractBracketedArray(html, /var\s+PRODUCTS\s*=\s*\[/);
  if (!arrStr) return html;
  const startIdx = html.indexOf(arrStr);
  if (startIdx < 0) return html;
  return (
    html.slice(0, startIdx) + serializeTechProducts(products) + html.slice(startIdx + arrStr.length)
  );
}

export type VisualIconType = 'icon' | 'image';

export const P4_SCENE_ICONS: Record<string, string> = {
  porteria: 'fa-door-open',
  ronda: 'fa-route',
  coordinador: 'fa-user-tie',
  ajuste: 'fa-tag',
  seguro: 'fa-shield-halved',
};

export const AP5_KIND_ICONS: Record<string, string> = {
  gift: 'fa-gift',
  phone: 'fa-mobile-screen-button',
  moto: 'fa-motorcycle',
  coordinator: 'fa-user-tie',
  bell: 'fa-bell',
  network: 'fa-network-wired',
  study: 'fa-graduation-cap',
  clipboard: 'fa-clipboard-list',
};

function p4IconFromScene(scene: string): string {
  return P4_SCENE_ICONS[scene] ?? 'fa-shield-halved';
}

function ap5IconFromKind(kind: string): string {
  return AP5_KIND_ICONS[kind] ?? 'fa-gift';
}

export interface P4PeriodItem {
  labelHtml: string;
  amount: string;
}

export interface P4ServiceItem {
  title: string;
  qtyLabel: string;
  price: string;
  wide: boolean;
  visualType: VisualIconType;
  icon: string;
  imageSrc: string;
  webglScene: string;
  includeInChart: boolean;
  chartName: string;
}

export interface P4EconomicsData {
  subtotalLabel: string;
  subtotalValue: string;
  summaryEyebrowHtml: string;
  cardTitle: string;
  chartTitle: string;
  chartNote: string;
  breakdownEyebrowHtml: string;
  breakdownKicker: string;
  breakdownTitle: string;
  periods: P4PeriodItem[];
  services: P4ServiceItem[];
  chartTotal: number;
}

export interface ApoyoCardItem {
  label: string;
  wide: boolean;
  visualType: VisualIconType;
  icon: string;
  imageSrc: string;
  webglKind: string;
}

export interface Ap5ReinvTag {
  value: string;
  year: string;
}

export type ApoyoVisual = Pick<
  ApoyoCardItem,
  'visualType' | 'icon' | 'imageSrc' | 'webglKind'
>;

export interface Ap5BenefitsData {
  reinvTitle: string;
  reinvIntro: string;
  reinvNote: string;
  reinvTags: Ap5ReinvTag[];
  apoyosHeadline: string;
  apoyosChip: string;
  headVisual: ApoyoVisual;
  cards: ApoyoCardItem[];
}

export function parseMoney(value: string): number {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

/** Convierte "$60M", "$ 126 M" o montos en pesos a millones (60, 126…). */
export function parseReinvMillions(value: string): number {
  const trimmed = value.trim().toUpperCase();
  const mMatch = trimmed.match(/([\d.,]+)\s*M\b/);
  if (mMatch) {
    const raw = mMatch[1].replace(/\./g, '').replace(',', '.');
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  }
  const digits = parseMoney(value);
  if (digits >= 1_000_000) return Math.round(digits / 1_000_000);
  if (digits > 0 && digits < 10_000) return digits;
  return digits > 0 ? Math.round(digits / 1_000_000) : 0;
}

export function formatReinvAxis(millions: number): string {
  const n = Math.round(millions);
  return `$${n}M`;
}

function reinvChartScale(values: number[]): { values: number[]; max: number } {
  const safe = values.length > 0 ? values : [0];
  const peak = Math.max(...safe, 1);
  const max = Math.max(10, Math.ceil(peak / 10) * 10);
  return { values: safe, max };
}

function reinvBarColorClass(index: number, total: number): string {
  if (total <= 1 || index === total - 1) return 'reinv-bar-fill--gold';
  if (index === 0) return 'reinv-bar-fill--blue';
  return 'reinv-bar-fill--mid';
}

function renderReinvBarsChartHtml(tags: Ap5ReinvTag[]): string {
  const values = tags.map((t) => parseReinvMillions(t.value));
  const { max } = reinvChartScale(values);
  const cols = tags
    .map((_, i) => {
      const pct = max > 0 ? Math.min(100, (values[i] / max) * 100) : 0;
      const color = reinvBarColorClass(i, tags.length);
      const h = Math.max(pct, values[i] > 0 ? 4 : 0);
      return `<div class="reinv-bar-col"><div class="reinv-bar-fill ${color}" style="height:${h.toFixed(1)}%"></div></div>`;
    })
    .join('\n');
  return `<div class="reinv-bars-chart" aria-hidden="true">\n${cols}\n</div>`;
}

function updateReinvAxisLabels(doc: Document, tags: Ap5ReinvTag[]): void {
  const axis = doc.querySelector('.reinv-axis');
  if (!axis) return;
  const values = tags.map((t) => parseReinvMillions(t.value));
  const { max } = reinvChartScale(values);
  const spans = axis.querySelectorAll('span');
  if (spans[0]) spans[0].textContent = formatReinvAxis(max);
  if (spans[1]) spans[1].textContent = formatReinvAxis(max / 2);
  if (spans[2]) spans[2].textContent = '$0';
}

function updateReinvBarsChart(doc: Document, tags: Ap5ReinvTag[]): void {
  const host = doc.querySelector('.reinv-3d');
  if (!host || tags.length === 0) return;
  const html = renderReinvBarsChartHtml(tags);
  const existing = host.querySelector('.reinv-bars-chart');
  if (existing) {
    existing.outerHTML = html;
    return;
  }
  const canvas = host.querySelector('#bars-canvas');
  const wrap = doc.createElement('div');
  wrap.innerHTML = html;
  const chart = wrap.firstElementChild;
  if (!chart) return;
  if (canvas?.nextSibling) host.insertBefore(chart, canvas.nextSibling);
  else host.appendChild(chart);
}

function ensureP4ChartBoot(html: string): string {
  if (!html.includes('renderChart') || !html.includes('chart-container')) return html;
  const resilientBoot = `function bootP4Chart() {
                if (typeof d3 === "undefined") return;
                requestAnimationFrame(renderChart);
            }
            if (document.readyState === "complete") bootP4Chart();
            else window.addEventListener("load", bootP4Chart);`;
  if (html.includes('bootP4Chart')) return html;
  return html.replace(
    /window\.addEventListener\("load",\s*function\s*\(\)\s*\{\s*requestAnimationFrame\(renderChart\);\s*\}\);/,
    resilientBoot,
  );
}

/** Sincroniza el arreglo \`data\` del script D3 con los servicios visibles en la cuadrícula. */
export function syncP4Chart(html: string): string {
  if (!hasP4Economics(html)) return html;
  let out = applyP4Economics(html, parseP4Economics(html));
  out = ensureP4ChartBoot(out);
  return out;
}

/** Normaliza HTML de diapositiva (ids de texto, iconos planos, gráfico reinversión). Idempotente. */
export function normalizeSlideHtml(html: string): string {
  let out = ensureTextFieldIds(html);
  out = syncP4Chart(out);
  out = ensureFlatVisuals(out);
  out = ensureAp5ReinvChart(out);
  if (hasAp5Benefits(out)) {
    out = applyAp5Benefits(out, parseAp5Benefits(out));
  }
  if (hasP2bPage(out)) {
    out = applyP2bPage(out, parseP2bPage(out));
  }
  if (hasBenScene(out) && (!out.includes('id="ben-scene-media"') || out.includes('id="ben-3d-root"'))) {
    out = applyBenScene(out, parseBenScene(out));
  }
  return out;
}

/** Sincroniza etiquetas, ejes y barras CSS con los datos de reinversión. */
export function ensureFlatVisuals(html: string): string {
  const needsFlat =
    html.includes('p4-svc-webgl-wrap') ||
    html.includes('apoyo-vp') ||
    /apoyos-head-slot[^>]*data-icon-kind/.test(html);
  if (!needsFlat) return html;

  let out = html;
  if (hasP4Economics(out)) {
    const d = parseP4Economics(out);
    d.services = d.services.map((s) => ({
      ...s,
      visualType: 'icon' as const,
      icon: s.icon || p4IconFromScene(s.webglScene),
    }));
    out = applyP4Economics(out, d);
  }
  if (hasAp5Benefits(out)) {
    const d = parseAp5Benefits(out);
    d.headVisual = {
      ...d.headVisual,
      visualType:
        d.headVisual.imageSrc && d.headVisual.visualType === 'image'
          ? ('image' as const)
          : ('icon' as const),
      icon: d.headVisual.icon || ap5IconFromKind(d.headVisual.webglKind),
    };
    d.cards = d.cards.map((card) => ({
      ...card,
      visualType: card.visualType === 'image' && card.imageSrc ? 'image' as const : 'icon' as const,
      icon: card.icon || ap5IconFromKind(card.webglKind),
    }));
    out = applyAp5Benefits(out, d);
  }
  return out;
}

/** Regenera barras planas y ejes según las etiquetas de reinversión. */
export function syncReinvChart(html: string): string {
  if (!hasAp5Benefits(html)) return html;
  const doc = parseHtml(html);
  if (!doc.querySelector('.reinv-3d')) return html;
  const data = parseAp5Benefits(html);
  if (data.reinvTags.length === 0) return html;
  updateReinvAxisLabels(doc, data.reinvTags);
  updateReinvBarsChart(doc, data.reinvTags);
  return serializeBody(doc);
}

export function ensureAp5ReinvChart(html: string): string {
  return syncReinvChart(html);
}

function parseP4ServiceVisual(tile: Element): Pick<P4ServiceItem, 'visualType' | 'icon' | 'imageSrc' | 'webglScene'> {
  const iconWrap = tile.querySelector('.p4-svc-icon-wrap i.fas');
  if (iconWrap) {
    const cls = iconWrap.getAttribute('class') ?? 'fas fa-shield-halved';
    return {
      visualType: 'icon',
      icon: cls.replace(/^fas\s+/, '').trim() || 'fa-shield-halved',
      imageSrc: '',
      webglScene: 'porteria',
    };
  }
  const img = tile.querySelector('.p4-svc-img-wrap img');
  if (img) {
    return {
      visualType: 'image',
      icon: 'fa-shield-halved',
      imageSrc: img.getAttribute('src') ?? '',
      webglScene: 'porteria',
    };
  }
  const webgl = tile.querySelector('.p4-svc-webgl-wrap');
  const scene = webgl?.getAttribute('data-p4-scene') ?? 'porteria';
  return {
    visualType: 'icon',
    icon: p4IconFromScene(scene),
    imageSrc: '',
    webglScene: scene,
  };
}

function renderP4ServiceVisual(item: P4ServiceItem): string {
  if (item.visualType === 'icon') {
    return `<div class="p4-svc-icon-wrap flex items-center justify-center shrink-0" style="width:78px;height:78px;border-radius:14px;background:linear-gradient(165deg,rgba(18,32,58,.98),rgba(7,11,20,1));border:1px solid rgba(6,182,212,.28);">
                                        <i class="fas ${escapeAttr(item.icon)} text-2xl" style="color:var(--cootravir-gold-light);"></i>
                                    </div>`;
  }
  if (item.visualType === 'image' && item.imageSrc) {
    return `<div class="p4-svc-img-wrap shrink-0" style="width:78px;height:78px;border-radius:14px;overflow:hidden;border:1px solid rgba(6,182,212,.28);">
                                        <img src="${escapeAttr(item.imageSrc)}" alt="" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
                                    </div>`;
  }
  const wideCls = item.wide ? ' p4-svc-webgl-wrap--wide' : '';
  return `<div class="p4-svc-webgl-wrap${wideCls}" data-p4-scene="${escapeAttr(item.webglScene)}" aria-hidden="true"></div>`;
}

export function hasP4Economics(html: string): boolean {
  return parseHtml(html).querySelector('.p4-service-grid') !== null;
}

export function parseP4Economics(html: string): P4EconomicsData {
  const doc = parseHtml(html);
  const services = [...doc.querySelectorAll('.p4-svc-tile')].map((tile) => {
    const qty = tile.querySelector('.p4-qty-pill')?.textContent?.trim() ?? '';
    const visual = parseP4ServiceVisual(tile);
    return {
      title: tile.querySelector('h4')?.textContent?.trim() ?? '',
      qtyLabel: qty,
      price: tile.querySelector('.p4-svc-price')?.textContent?.trim() ?? '',
      wide: tile.classList.contains('p4-svc-tile--wide'),
      ...visual,
      includeInChart: !/ajuste/i.test(qty),
      chartName: tile.querySelector('h4')?.textContent?.trim() ?? '',
    };
  });

  const periods = [...doc.querySelectorAll('.p4-period-tile')].map((tile) => ({
    labelHtml: tile.querySelector('span:first-child')?.innerHTML?.trim() ?? '',
    amount: tile.querySelector('.p4-amt')?.textContent?.trim() ?? '',
  }));

  const totalMatch = html.match(/var\s+total\s*=\s*(\d+)/);
  const eyebrows = doc.querySelectorAll('.p4-eyebrow');
  const cardHeads = doc.querySelectorAll('.p4-card-head');
  const serviceHead = cardHeads.length > 0 ? cardHeads[cardHeads.length - 1] : null;

  return {
    subtotalLabel: doc.querySelector('.p4-sub-label')?.textContent?.trim() ?? 'Subtotal anual referencia',
    subtotalValue: doc.querySelector('.p4-sub-value')?.textContent?.trim() ?? '',
    summaryEyebrowHtml: eyebrows[0]?.innerHTML?.trim() ?? '',
    cardTitle: cardHeads[0]?.querySelector('h2')?.textContent?.trim() ?? 'Valores mensuales consolidados',
    chartTitle:
      doc.querySelector('.p4-chart-card .p4-card-head h3')?.textContent?.trim() ??
      'Distribución del subtotal',
    chartNote:
      doc.querySelector('.p4-chart-card p.text-xs')?.textContent?.trim() ??
      'Participación por ítem de cotización (sin descuentos de ronda en gráfico).',
    breakdownEyebrowHtml: eyebrows[1]?.innerHTML?.trim() ?? '',
    breakdownKicker: serviceHead?.querySelector('p.text-xs')?.textContent?.trim() ?? 'Detalle de servicios',
    breakdownTitle: serviceHead?.querySelector('h3')?.textContent?.trim() ?? 'Líneas de cobro mensual',
    periods,
    services,
    chartTotal: totalMatch ? parseInt(totalMatch[1], 10) : parseMoney(
      doc.querySelector('.p4-sub-value')?.textContent ?? '',
    ),
  };
}

export function applyP4Economics(html: string, data: P4EconomicsData): string {
  const doc = parseHtml(html);
  const subLabel = doc.querySelector('.p4-sub-label');
  const subValue = doc.querySelector('.p4-sub-value');
  if (subLabel) subLabel.textContent = data.subtotalLabel;
  if (subValue) subValue.textContent = data.subtotalValue;

  const eyebrows = doc.querySelectorAll('.p4-eyebrow');
  if (eyebrows[0] && data.summaryEyebrowHtml) eyebrows[0].innerHTML = data.summaryEyebrowHtml;
  if (eyebrows[1] && data.breakdownEyebrowHtml) eyebrows[1].innerHTML = data.breakdownEyebrowHtml;

  const cardHeads = doc.querySelectorAll('.p4-card-head');
  const summaryH2 = cardHeads[0]?.querySelector('h2');
  if (summaryH2) summaryH2.textContent = data.cardTitle;
  const chartH3 = doc.querySelector('.p4-chart-card .p4-card-head h3');
  if (chartH3) chartH3.textContent = data.chartTitle;
  const chartNote = doc.querySelector('.p4-chart-card p.text-xs');
  if (chartNote) chartNote.textContent = data.chartNote;
  const serviceHead = cardHeads.length > 0 ? cardHeads[cardHeads.length - 1] : null;
  const kicker = serviceHead?.querySelector('p.text-xs');
  if (kicker) kicker.textContent = data.breakdownKicker;
  const breakdownH3 = serviceHead?.querySelector('h3');
  if (breakdownH3) breakdownH3.textContent = data.breakdownTitle;

  const periodGrid = doc.querySelector('.p4-period-grid');
  if (periodGrid) {
    periodGrid.innerHTML = data.periods
      .map(
        (p) =>
          `<div class="p4-period-tile">
                                    <span>${p.labelHtml}</span>
                                    <span class="p4-amt">${escapeHtml(p.amount)}</span>
                                </div>`,
      )
      .join('\n');
  }

  const serviceGrid = doc.querySelector('.p4-service-grid');
  if (serviceGrid) {
    serviceGrid.innerHTML = data.services
      .map(
        (s) =>
          `<div class="p4-svc-tile${s.wide ? ' p4-svc-tile--wide' : ''} service-item-dark">
                                    <div class="flex gap-3 items-start">
                                        ${renderP4ServiceVisual(s)}
                                        <div class="min-w-0 flex-1 pl-0.5">
                                            <h4 class="font-bold text-xs sm:text-sm leading-snug m-0" style="color: var(--soc-text);">${escapeHtml(s.title)}</h4>
                                            <span class="p4-qty-pill mt-2">${escapeHtml(s.qtyLabel)}</span>
                                            <p class="p4-svc-price m-0">${escapeHtml(s.price)}</p>
                                        </div>
                                    </div>
                                </div>`,
      )
      .join('\n');
  }

  let out = serializeBody(doc);
  const chartItems = data.services
    .filter((s) => s.includeInChart)
    .map((s) => ({
      name: s.chartName || s.title,
      value: parseMoney(s.price),
    }));
  const chartArr = `[\n${chartItems
    .map(
      (d) =>
        `                { name: ${JSON.stringify(d.name)}, value: ${d.value} }`,
    )
    .join(',\n')}\n            ]`;
  const oldArr = extractBracketedArray(out, /var\s+data\s*=\s*\[/);
  if (oldArr) {
    const idx = out.indexOf(oldArr);
    out = out.slice(0, idx) + chartArr + out.slice(idx + oldArr.length);
  }
  const total = data.chartTotal || parseMoney(data.subtotalValue);
  out = out.replace(/var\s+total\s*=\s*\d+/, `var total = ${total}`);
  return out;
}

function parseApoyoVisual(el: Element | null): ApoyoVisual {
  if (!el) {
    return { visualType: 'icon', icon: 'fa-gift', imageSrc: '', webglKind: 'gift' };
  }
  const mediaImg = el.querySelector(
    '.apoyo-media img, .apoyo-img-wrap img, .apoyos-head-slot img, .apoyo-icon-fa img',
  );
  if (mediaImg) {
    return {
      visualType: 'image',
      icon: 'fa-gift',
      imageSrc: mediaImg.getAttribute('src') ?? '',
      webglKind: 'gift',
    };
  }
  const iconEl = el.querySelector('.apoyo-icon-fa i.fas, .apoyo-media--icon i.fas, i.fas');
  if (iconEl) {
    const cls = iconEl.getAttribute('class') ?? 'fas fa-gift';
    return {
      visualType: 'icon',
      icon: cls.replace(/^fas\s+/, '').trim() || 'fa-gift',
      imageSrc: '',
      webglKind: 'gift',
    };
  }
  const vp = el.querySelector('.apoyo-vp');
  const kind = vp?.getAttribute('data-icon-kind') ?? 'gift';
  return {
    visualType: 'icon',
    icon: ap5IconFromKind(kind),
    imageSrc: '',
    webglKind: kind,
  };
}

function renderApoyoHeadVisual(item: ApoyoVisual): string {
  if (item.visualType === 'image' && item.imageSrc) {
    return '<div class="apoyos-head-slot apoyos-head-slot--image"><img src="' +
      escapeAttr(item.imageSrc) +
      '" alt="" loading="lazy"/></div>';
  }
  return (
    '<div class="apoyos-head-slot apoyos-head-slot--icon" aria-hidden="true"><i class="fas ' +
    escapeAttr(item.icon || 'fa-gift') +
    '"></i></div>'
  );
}

function renderApoyoCardVisual(item: ApoyoCardItem): string {
  if (item.visualType === 'image' && item.imageSrc) {
    return (
      '<div class="apoyo-media apoyo-media--image"><img src="' +
      escapeAttr(item.imageSrc) +
      '" alt="" loading="lazy" decoding="async"/></div>'
    );
  }
  return (
    '<div class="apoyo-media apoyo-media--icon" aria-hidden="true"><i class="fas ' +
    escapeAttr(item.icon || 'fa-gift') +
    '"></i></div>'
  );
}

export function hasMapSlide(html: string, slideKey?: string): boolean {
  if (slideKey === 'mapa-pereira') return true;
  return /mapa-page|id="map-wrap"|id="map"[^-]/.test(html);
}

export function hasAp5Benefits(html: string): boolean {
  return parseHtml(html).querySelector('.apoyos-grid') !== null;
}

export function parseAp5Benefits(html: string): Ap5BenefitsData {
  const doc = parseHtml(html);
  const headEl =
    doc.querySelector('.apoyos-head-slot, .apoyos-head-icon') ??
    doc.querySelector('.apoyos-head');
  const headVisual = parseApoyoVisual(headEl);
  const cards = [...doc.querySelectorAll('.apoyos-grid .apoyo-card, .apoyos-host .apoyo-card')].map(
    (card) => ({
      label: card.querySelector('.apoyo-label')?.textContent?.trim() ?? '',
      wide: card.classList.contains('apoyo-card--wide'),
      ...parseApoyoVisual(card),
    }),
  );

  return {
    reinvTitle:
      doc.querySelector('.reinv-card > h2 span:last-child')?.textContent?.trim() ??
      doc.querySelector('.reinv-card > h2')?.textContent?.trim() ??
      '',
    reinvIntro: doc.querySelector('.reinv-intro')?.textContent?.trim() ?? '',
    reinvNote: doc.querySelector('.reinv-note span')?.textContent?.trim() ?? '',
    reinvTags: [...doc.querySelectorAll('.reinv-tags > div')].map((tag) => ({
      value: tag.querySelector('.reinv-tag-val')?.textContent?.trim() ?? '',
      year: tag.querySelector('.reinv-tag-year')?.textContent?.trim() ?? '',
    })),
    apoyosHeadline: doc.querySelector('.apoyos-head-text h2')?.textContent?.trim() ?? '',
    apoyosChip: doc.querySelector('.apoyos-chip')?.textContent?.trim() ?? '',
    headVisual,
    cards,
  };
}

export function applyAp5Benefits(html: string, data: Ap5BenefitsData): string {
  const payload: Ap5BenefitsData = {
    ...data,
    headVisual: data.headVisual ?? {
      visualType: 'icon',
      icon: 'fa-gift',
      imageSrc: '',
      webglKind: 'gift',
    },
  };
  const doc = parseHtml(html);
  const reinvH2 = doc.querySelector('.reinv-card > h2');
  if (reinvH2) {
    reinvH2.innerHTML = `<span class="reinv-icon" aria-hidden="true"><i class="fas fa-sync-alt"></i></span><span>${escapeHtml(payload.reinvTitle)}</span>`;
  }
  const intro = doc.querySelector('.reinv-intro');
  if (intro) intro.textContent = data.reinvIntro;
  const note = doc.querySelector('.reinv-note span');
  if (note) note.textContent = data.reinvNote;

  const tagsWrap = doc.querySelector('.reinv-tags');
  if (tagsWrap) {
    tagsWrap.innerHTML = data.reinvTags
      .map(
        (t) =>
          `<div>
                                        <span class="reinv-tag-val">${escapeHtml(t.value)}</span>
                                        <span class="reinv-tag-year">${escapeHtml(t.year)}</span>
                                    </div>`,
      )
      .join('\n');
  }

  updateReinvAxisLabels(doc, data.reinvTags);
  updateReinvBarsChart(doc, data.reinvTags);

  const apoyosH2 = doc.querySelector('.apoyos-head-text h2');
  if (apoyosH2) apoyosH2.textContent = data.apoyosHeadline;
  const chip = doc.querySelector('.apoyos-chip');
  if (chip) chip.innerHTML = `<i class="fas fa-layer-group"></i> ${escapeHtml(data.apoyosChip)}`;

  const headSlot = doc.querySelector('.apoyos-head-slot, .apoyos-head-icon');
  if (headSlot) {
    headSlot.outerHTML = renderApoyoHeadVisual(payload.headVisual);
  }

  const grid = doc.querySelector('.apoyos-grid');
  if (grid) {
    grid.innerHTML = data.cards
      .map(
        (c) =>
          `<article class="apoyo-card${c.wide ? ' apoyo-card--wide' : ''}">
                                        ${renderApoyoCardVisual(c)}
                                        <p class="apoyo-label">${escapeHtml(c.label)}</p>
                                    </article>`,
      )
      .join('\n');
  }

  return serializeBody(doc);
}

export const P4_WEBGL_SCENES = ['porteria', 'ronda', 'coordinador', 'ajuste', 'seguro'];

export const AP5_WEBGL_KINDS = [
  'gift',
  'phone',
  'moto',
  'coordinator',
  'bell',
  'network',
  'study',
  'clipboard',
];

export const FA_ICONS = [
  'fa-heart',
  'fa-hands-holding',
  'fa-graduation-cap',
  'fa-shield-halved',
  'fa-calendar-day',
  'fa-award',
  'fa-hand-holding-usd',
  'fa-handshake',
  'fa-gift',
  'fa-microchip',
  'fa-chart-line',
  'fa-users',
  'fa-building',
  'fa-map-marker-alt',
  'fa-motorcycle',
  'fa-desktop',
  'fa-user-check',
  'fa-video',
  'fa-mobile-screen-button',
  'fa-bolt',
  'fa-image',
  'fa-file-invoice-dollar',
  'fa-layer-group',
  'fa-list-ul',
  'fa-chart-pie',
  'fa-door-open',
  'fa-route',
  'fa-user-tie',
  'fa-id-card',
  'fa-phone',
  'fa-bell',
  'fa-network-wired',
  'fa-clipboard-list',
  'fa-sync-alt',
  'fa-info-circle',
  'fa-cube',
];
