'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  FA_ICONS,
  applyAp5Benefits,
  applyBenCards,
  applyBenRows,
  applyP4Economics,
  applyP2CarouselSlides,
  applyTechProducts,
  applyTextFields,
  extractImages,
  getTextFieldsForSlide,
  hasAp5Benefits,
  hasBenCards,
  hasBenRows,
  hasBenScene,
  parseBenScene,
  applyBenScene,
  hasP2bPage,
  hasP4Economics,
  hasP2Carousel,
  hasTechCarousel,
  parseAp5Benefits,
  parseBenCards,
  parseBenRows,
  parseP2bPage,
  applyP2bPage,
  parseMoney,
  parseP4Economics,
  parseP2CarouselSlides,
  parseTechProducts,
  readTextFields,
  replaceImageSrc,
  type Ap5BenefitsData,
  type ApoyoVisual,
  type ApoyoCardItem,
  type BenCardItem,
  type BenRowItem,
  type BenSceneData,
  type P2bPageData,
  type P2bCertItem,
  type P4EconomicsData,
  type P4ServiceItem,
  type P2CarouselSlideItem,
  type TechProductItem,
  type VisualIconType,
} from '@/lib/html-editor';
import { authFetch } from '@/lib/client-api';
import { storagePathFromRef } from '@/lib/resolve-storage';

function StorageImagePreview({ src, token }: { src: string; token: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const path = storagePathFromRef(src);
    if (!path) {
      setUrl(src.startsWith('http') || src.startsWith('/') ? src : null);
      return;
    }
    let cancelled = false;
    authFetch(`/files/signed-url?path=${encodeURIComponent(path)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { url?: string } | null) => {
        if (!cancelled && data?.url) setUrl(data.url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src, token]);

  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" className="max-h-16 mb-2 rounded object-contain" />
  );
}

interface VisualEditorPanelProps {
  slideKey: string;
  html: string;
  onHtmlChange: (html: string) => void;
  proposalId: string;
  token: string;
}

export default function VisualEditorPanel({
  slideKey,
  html,
  onHtmlChange,
  proposalId,
  token,
}: VisualEditorPanelProps) {
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [cards, setCards] = useState<BenCardItem[]>([]);
  const [rows, setRows] = useState<BenRowItem[]>([]);
  const [images, setImages] = useState(() => extractImages(html));
  const [p2bData, setP2bData] = useState<P2bPageData | null>(null);
  const [p2Slides, setP2Slides] = useState<P2CarouselSlideItem[]>([]);
  const [techProducts, setTechProducts] = useState<TechProductItem[]>([]);
  const [p4Data, setP4Data] = useState<P4EconomicsData | null>(null);
  const [ap5Data, setAp5Data] = useState<Ap5BenefitsData | null>(null);
  const [benScene, setBenScene] = useState<BenSceneData | null>(null);
  const showCards = hasBenCards(html);
  const showRows = hasBenRows(html);
  const showBenScene = hasBenScene(html);
  const showP2b = hasP2bPage(html);
  const showP2Carousel = hasP2Carousel(html);
  const showTechCarousel = hasTechCarousel(html);
  const showP4 = hasP4Economics(html);
  const showAp5 = hasAp5Benefits(html);

  const fields = useMemo(() => getTextFieldsForSlide(slideKey, html), [slideKey, html]);

  useEffect(() => {
    setTexts(readTextFields(html, fields));
    setCards(hasBenCards(html) ? parseBenCards(html) : []);
    setRows(hasBenRows(html) ? parseBenRows(html) : []);
    setP2Slides(hasP2Carousel(html) ? parseP2CarouselSlides(html) : []);
    setTechProducts(hasTechCarousel(html) ? parseTechProducts(html) : []);
    setP4Data(hasP4Economics(html) ? parseP4Economics(html) : null);
    setAp5Data(hasAp5Benefits(html) ? parseAp5Benefits(html) : null);
    setImages(extractImages(html));
    setP2bData(hasP2bPage(html) ? parseP2bPage(html) : null);
    setBenScene(hasBenScene(html) ? parseBenScene(html) : null);
  }, [html, fields, slideKey]);

  function commitTexts(next: Record<string, string>) {
    setTexts(next);
    onHtmlChange(applyTextFields(html, fields, next));
  }

  function commitCards(next: BenCardItem[]) {
    setCards(next);
    onHtmlChange(applyBenCards(html, next));
  }

  function commitRows(next: BenRowItem[]) {
    setRows(next);
    onHtmlChange(applyBenRows(html, next));
  }

  function commitBenScene(next: BenSceneData) {
    setBenScene(next);
    onHtmlChange(applyBenScene(html, next));
  }

  function commitP2Slides(next: P2CarouselSlideItem[]) {
    setP2Slides(next);
    onHtmlChange(applyP2CarouselSlides(html, next));
  }

  function commitTechProducts(next: TechProductItem[]) {
    setTechProducts(next);
    onHtmlChange(applyTechProducts(html, next));
  }

  const defaultP2Slide = (): P2CarouselSlideItem => ({
    ariaLabel: 'Nuevo slide',
    icon: 'fa-image',
    title: 'Nuevo título',
    subtitle: 'Descripción',
    imageSrc: 'images/placeholder.jpg',
    imageAlt: '',
  });

  const defaultTechProduct = (): TechProductItem => ({
    badge: 'Nuevo',
    badgeIcon: 'fa-bolt',
    title: 'Nuevo apoyo',
    titleHtml: '<span>Nuevo apoyo</span>',
    desc: 'Descripción del apoyo.',
    type: 'img',
    src: 'images/placeholder.png',
    fallbackIcon: 'fa-bolt',
  });

  const defaultP4Service = (): P4ServiceItem => ({
    title: 'Nueva línea de servicio',
    qtyLabel: 'Cantidad · 1',
    price: '$ 0',
    wide: false,
    visualType: 'icon',
    icon: 'fa-shield-halved',
    imageSrc: '',
    webglScene: 'porteria',
    includeInChart: true,
    chartName: 'Nueva línea',
  });

  const defaultApoyoCard = (): ApoyoCardItem => ({
    label: 'Nueva herramienta de apoyo',
    wide: false,
    visualType: 'image',
    icon: 'fa-gift',
    imageSrc: '',
    webglKind: 'gift',
  });

  const defaultHeadVisual = (): ApoyoVisual => ({
    visualType: 'icon',
    icon: 'fa-gift',
    imageSrc: '',
    webglKind: 'gift',
  });

  function commitP4(next: P4EconomicsData) {
    const chartTotal = next.chartTotal || parseMoney(next.subtotalValue);
    const payload = { ...next, chartTotal };
    setP4Data(payload);
    onHtmlChange(applyP4Economics(html, payload));
  }

  function commitAp5(next: Ap5BenefitsData) {
    setAp5Data(next);
    onHtmlChange(applyAp5Benefits(html, next));
  }

  function commitP2b(next: P2bPageData) {
    setP2bData(next);
    onHtmlChange(applyP2bPage(html, next));
  }

  const defaultP2bCert = (): P2bCertItem => ({
    title: 'Nueva certificación',
    subtitle: 'Descripción',
    imageSrc: '',
  });

  const defaultP2bChip = (label: string): P2bPageData['valChips'][number] => ({
    key: label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '') || 'valor',
    label,
    active: false,
  });

  function renderIconControls(
    visualType: VisualIconType,
    icon: string,
    imageSrc: string,
    onChange: (patch: {
      visualType?: VisualIconType;
      icon?: string;
      imageSrc?: string;
    }) => void,
  ) {
    return (
      <div className="space-y-2 border-t border-slate-700/80 pt-2 mt-2">
        <label className="block space-y-1">
          <span className="text-slate-500 text-xs">Icono / imagen</span>
          <select
            value={visualType}
            onChange={(e) => onChange({ visualType: e.target.value as VisualIconType })}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
          >
            <option value="icon">Icono Font Awesome</option>
            <option value="image">Imagen pequeña</option>
          </select>
        </label>
        {visualType === 'icon' && (
          <select
            value={icon}
            onChange={(e) => onChange({ icon: e.target.value })}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
          >
            {FA_ICONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
        )}
        {visualType === 'image' && (
          <>
            {imageSrc && <StorageImagePreview src={imageSrc} token={token} />}
            <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline block">
              {imageSrc ? 'Cambiar imagen' : 'Subir imagen'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  uploadFile(f)
                    .then((storageRef) => onChange({ imageSrc: storageRef }))
                    .catch((err) =>
                      alert(err instanceof Error ? err.message : 'Error al subir'),
                    );
                  e.target.value = '';
                }}
              />
            </label>
          </>
        )}
      </div>
    );
  }

  async function uploadFile(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    const res = await authFetch(`/files/upload/${proposalId}`, {
      method: 'POST',
      body: form,
    });
    const data = (await res.json().catch(() => ({}))) as {
      storageRef?: string;
      message?: string | string[];
    };
    if (!res.ok) {
      const msg = Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message;
      throw new Error(msg || `Error al subir (${res.status})`);
    }
    if (!data.storageRef) throw new Error('Respuesta inválida del servidor');
    return data.storageRef;
  }

  async function uploadAndReplace(index: number, file: File) {
    const storageRef = await uploadFile(file);
    onHtmlChange(replaceImageSrc(html, index, storageRef));
  }

  async function uploadP2bCertLogo(index: number, file: File) {
    if (!p2bData) return;
    const storageRef = await uploadFile(file);
    const certs = [...p2bData.certs];
    certs[index] = { ...certs[index], imageSrc: storageRef };
    commitP2b({ ...p2bData, certs });
  }

  return (
    <div className="flex flex-col gap-4 p-3 overflow-y-auto text-sm">
      <section>
        <h3 className="text-xs font-semibold text-amber-400/90 uppercase mb-2">
          Textos ({fields.length})
        </h3>
        <p className="text-xs text-slate-500 mb-2">
          Títulos, pies, etiquetas y demás textos detectados en la diapositiva.
        </p>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {fields.map((f) => (
            <label key={f.id} className="block space-y-1">
              <span className="text-slate-400 text-xs">{f.label}</span>
              {f.html ? (
                <textarea
                  rows={2}
                  value={texts[f.id] ?? ''}
                  onChange={(e) => commitTexts({ ...texts, [f.id]: e.target.value })}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono"
                />
              ) : (
                <input
                  value={texts[f.id] ?? ''}
                  onChange={(e) => commitTexts({ ...texts, [f.id]: e.target.value })}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700"
                />
              )}
            </label>
          ))}
        </div>
      </section>

      {showP4 && p4Data && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase">
              Propuesta económica
            </h3>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() => commitP4({ ...p4Data, services: [...p4Data.services, defaultP4Service()] })}
            >
              + Línea de servicio
            </button>
          </div>
          <div className="space-y-3 mb-3 p-2 rounded border border-slate-700 bg-slate-900/40">
            <p className="text-xs text-slate-400 font-medium">Resumen tarifario</p>
            <textarea
              rows={2}
              value={p4Data.summaryEyebrowHtml ?? ''}
              placeholder="Etiqueta resumen (HTML)"
              onChange={(e) => commitP4({ ...p4Data, summaryEyebrowHtml: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs font-mono mb-1"
            />
            <input
              value={p4Data.cardTitle ?? ''}
              placeholder="Título del panel"
              onChange={(e) => commitP4({ ...p4Data, cardTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm mb-1"
            />
            <input
              value={p4Data.subtotalLabel}
              onChange={(e) => commitP4({ ...p4Data, subtotalLabel: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mb-1"
            />
            <input
              value={p4Data.subtotalValue}
              onChange={(e) =>
                commitP4({
                  ...p4Data,
                  subtotalValue: e.target.value,
                  chartTotal: parseMoney(e.target.value),
                })
              }
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm font-semibold"
            />
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
              <p className="text-xs text-slate-500">Periodos mensuales</p>
              <button
                type="button"
                className="text-xs text-[#4a6fa5] hover:underline"
                onClick={() =>
                  commitP4({
                    ...p4Data,
                    periods: [
                      ...p4Data.periods,
                      { labelHtml: 'Total mensual <strong>nuevo periodo</strong>', amount: '$ 0' },
                    ],
                  })
                }
              >
                + Periodo
              </button>
            </div>
            {p4Data.periods.map((period, i) => (
              <div key={i} className="space-y-1 pt-2 border-t border-slate-700/60">
                <p className="text-xs text-slate-500">Periodo {i + 1}</p>
                <textarea
                  rows={2}
                  value={period.labelHtml}
                  onChange={(e) => {
                    const periods = [...p4Data.periods];
                    periods[i] = { ...period, labelHtml: e.target.value };
                    commitP4({ ...p4Data, periods });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs font-mono"
                />
                <input
                  value={period.amount}
                  onChange={(e) => {
                    const periods = [...p4Data.periods];
                    periods[i] = { ...period, amount: e.target.value };
                    commitP4({ ...p4Data, periods });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                {p4Data.periods.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline"
                    onClick={() =>
                      commitP4({ ...p4Data, periods: p4Data.periods.filter((_, j) => j !== i) })
                    }
                  >
                    Eliminar periodo
                  </button>
                )}
              </div>
            ))}
            <p className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-700/60">Gráfico</p>
            <input
              value={p4Data.chartTitle ?? ''}
              placeholder="Título del gráfico"
              onChange={(e) => commitP4({ ...p4Data, chartTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mb-1"
            />
            <input
              value={p4Data.chartNote ?? ''}
              placeholder="Nota bajo el gráfico"
              onChange={(e) => commitP4({ ...p4Data, chartNote: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mb-1"
            />
            <textarea
              rows={2}
              value={p4Data.breakdownEyebrowHtml ?? ''}
              placeholder="Etiqueta desglose (HTML)"
              onChange={(e) => commitP4({ ...p4Data, breakdownEyebrowHtml: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs font-mono mb-1"
            />
            <input
              value={p4Data.breakdownKicker ?? ''}
              placeholder="Subtítulo desglose"
              onChange={(e) => commitP4({ ...p4Data, breakdownKicker: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mb-1"
            />
            <input
              value={p4Data.breakdownTitle ?? ''}
              placeholder="Título líneas de cobro"
              onChange={(e) => commitP4({ ...p4Data, breakdownTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
            />
          </div>
          <div className="space-y-3">
            {p4Data.services.map((svc, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 space-y-2 bg-slate-900/40">
                <p className="text-xs text-slate-400 font-medium">Servicio {i + 1}</p>
                <input
                  value={svc.title}
                  onChange={(e) => {
                    const services = [...p4Data.services];
                    services[i] = { ...svc, title: e.target.value, chartName: e.target.value };
                    commitP4({ ...p4Data, services });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <input
                  value={svc.qtyLabel}
                  onChange={(e) => {
                    const services = [...p4Data.services];
                    const qtyLabel = e.target.value;
                    services[i] = { ...svc, qtyLabel, includeInChart: !/ajuste/i.test(qtyLabel) };
                    commitP4({ ...p4Data, services });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <input
                  value={svc.price}
                  onChange={(e) => {
                    const services = [...p4Data.services];
                    services[i] = { ...svc, price: e.target.value };
                    commitP4({ ...p4Data, services });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <label className="flex items-center gap-2 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={svc.includeInChart}
                    onChange={(e) => {
                      const services = [...p4Data.services];
                      services[i] = { ...svc, includeInChart: e.target.checked };
                      commitP4({ ...p4Data, services });
                    }}
                  />
                  Incluir en gráfico
                </label>
                {renderIconControls(svc.visualType, svc.icon, svc.imageSrc, (patch) => {
                  const services = [...p4Data.services];
                  services[i] = {
                    ...svc,
                    visualType: patch.visualType ?? svc.visualType,
                    icon: patch.icon ?? svc.icon,
                    imageSrc: patch.imageSrc ?? svc.imageSrc,
                  };
                  commitP4({ ...p4Data, services });
                })}
                {p4Data.services.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline"
                    onClick={() =>
                      commitP4({ ...p4Data, services: p4Data.services.filter((_, j) => j !== i) })
                    }
                  >
                    Eliminar línea
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {showAp5 && ap5Data && (
        <section>
          <h3 className="text-xs font-semibold text-amber-400/90 uppercase mb-2">Apoyos y reinversión</h3>
          <div className="space-y-2 mb-3 p-2 rounded border border-slate-700 bg-slate-900/40">
            <input
              value={ap5Data.reinvTitle}
              placeholder="Título reinversión"
              onChange={(e) => commitAp5({ ...ap5Data, reinvTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
            />
            <textarea
              rows={2}
              value={ap5Data.reinvIntro}
              placeholder="Intro reinversión"
              onChange={(e) => commitAp5({ ...ap5Data, reinvIntro: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <textarea
              rows={2}
              value={ap5Data.reinvNote}
              placeholder="Nota de reinversión"
              onChange={(e) => commitAp5({ ...ap5Data, reinvNote: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Montos por año</span>
              <button
                type="button"
                className="text-xs text-[#4a6fa5] hover:underline"
                onClick={() =>
                  commitAp5({
                    ...ap5Data,
                    reinvTags: [...ap5Data.reinvTags, { value: '$ 0', year: 'Año' }],
                  })
                }
              >
                + Año
              </button>
            </div>
            {ap5Data.reinvTags.map((tag, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input
                  value={tag.value}
                  onChange={(e) => {
                    const reinvTags = [...ap5Data.reinvTags];
                    reinvTags[i] = { ...tag, value: e.target.value };
                    commitAp5({ ...ap5Data, reinvTags });
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <input
                  value={tag.year}
                  onChange={(e) => {
                    const reinvTags = [...ap5Data.reinvTags];
                    reinvTags[i] = { ...tag, year: e.target.value };
                    commitAp5({ ...ap5Data, reinvTags });
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                {ap5Data.reinvTags.length > 1 && (
                  <button
                    type="button"
                    className="col-span-2 text-xs text-red-400 hover:underline"
                    onClick={() =>
                      commitAp5({
                        ...ap5Data,
                        reinvTags: ap5Data.reinvTags.filter((_, j) => j !== i),
                      })
                    }
                  >
                    Eliminar año
                  </button>
                )}
              </div>
            ))}
            <input
              value={ap5Data.apoyosHeadline}
              placeholder="Título panel apoyos"
              onChange={(e) => commitAp5({ ...ap5Data, apoyosHeadline: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
            />
            <input
              value={ap5Data.apoyosChip}
              placeholder="Etiqueta chip apoyos"
              onChange={(e) => commitAp5({ ...ap5Data, apoyosChip: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <p className="text-xs text-slate-500 pt-1">Icono del encabezado del panel</p>
            {renderIconControls(
              ap5Data.headVisual?.visualType ?? 'icon',
              ap5Data.headVisual?.icon ?? 'fa-gift',
              ap5Data.headVisual?.imageSrc ?? '',
              (patch) =>
                commitAp5({
                  ...ap5Data,
                  headVisual: {
                    ...(ap5Data.headVisual ?? defaultHeadVisual()),
                    visualType: patch.visualType ?? ap5Data.headVisual?.visualType ?? 'icon',
                    icon: patch.icon ?? ap5Data.headVisual?.icon ?? 'fa-gift',
                    imageSrc: patch.imageSrc ?? ap5Data.headVisual?.imageSrc ?? '',
                  },
                }),
            )}
          </div>
          <div className="flex items-center justify-between mt-3 mb-2">
            <span className="text-xs font-medium text-slate-300">
              Herramientas sin costo ({ap5Data.cards.length})
            </span>
            <button
              type="button"
              className="text-xs px-2 py-1 rounded bg-[#0e2455] hover:bg-[#4a6fa5] text-white"
              onClick={() =>
                commitAp5({ ...ap5Data, cards: [...ap5Data.cards, defaultApoyoCard()] })
              }
            >
              + Añadir herramienta
            </button>
          </div>
          <div className="space-y-3">
            {ap5Data.cards.map((card, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-slate-600/80 space-y-2 bg-slate-900/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-amber-400/90">Herramienta {i + 1}</span>
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline disabled:opacity-40"
                    disabled={ap5Data.cards.length <= 1}
                    onClick={() =>
                      commitAp5({ ...ap5Data, cards: ap5Data.cards.filter((_, j) => j !== i) })
                    }
                  >
                    Eliminar
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={card.label}
                  placeholder="Descripción de la herramienta"
                  onChange={(e) => {
                    const cards = [...ap5Data.cards];
                    cards[i] = { ...card, label: e.target.value };
                    commitAp5({ ...ap5Data, cards });
                  }}
                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={card.wide}
                    onChange={(e) => {
                      const cards = [...ap5Data.cards];
                      cards[i] = { ...card, wide: e.target.checked };
                      commitAp5({ ...ap5Data, cards });
                    }}
                    className="rounded"
                  />
                  Tarjeta ancha (fila completa)
                </label>
                {renderIconControls(card.visualType, card.icon, card.imageSrc, (patch) => {
                  const cards = [...ap5Data.cards];
                  cards[i] = {
                    ...card,
                    visualType: patch.visualType ?? card.visualType,
                    icon: patch.icon ?? card.icon,
                    imageSrc: patch.imageSrc ?? card.imageSrc,
                  };
                  commitAp5({ ...ap5Data, cards });
                })}
              </div>
            ))}
          </div>
        </section>
      )}

      {showP2b && p2bData && (
        <section>
          <h3 className="text-xs font-semibold text-amber-400/90 uppercase mb-2">
            Certificaciones y por qué elegirnos
          </h3>
          <div className="space-y-2 mb-3 p-2 rounded border border-slate-700 bg-slate-900/40">
            <input
              value={p2bData.heroTitle}
              placeholder="Título bloque principal"
              onChange={(e) => commitP2b({ ...p2bData, heroTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
            />
            <input
              value={p2bData.valHubTitle}
              placeholder="Título panel valores"
              onChange={(e) => commitP2b({ ...p2bData, valHubTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <input
              value={p2bData.valHubSubtitle}
              placeholder="Subtítulo panel valores"
              onChange={(e) => commitP2b({ ...p2bData, valHubSubtitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <input
              value={p2bData.whyChooseTitle}
              placeholder="Título — ¿Por qué elegirnos?"
              onChange={(e) => commitP2b({ ...p2bData, whyChooseTitle: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <input
              value={p2bData.whyChooseBadge}
              placeholder="Etiqueta del panel"
              onChange={(e) => commitP2b({ ...p2bData, whyChooseBadge: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <label className="block text-xs text-slate-400 mt-2 mb-1">Cuerpo (párrafo principal)</label>
            <textarea
              value={p2bData.whyChooseBody}
              rows={4}
              placeholder="Texto descriptivo. Puede usar <strong> para resaltar."
              onChange={(e) => commitP2b({ ...p2bData, whyChooseBody: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs leading-relaxed"
            />
            <input
              value={p2bData.whyChoosePointsLabel}
              placeholder="Título de la lista de ventajas"
              onChange={(e) => commitP2b({ ...p2bData, whyChoosePointsLabel: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mt-2"
            />
            <div className="flex items-center justify-between mt-2 mb-1">
              <p className="text-xs text-slate-400">Ventajas / puntos clave</p>
              <button
                type="button"
                className="text-xs text-[#4a6fa5] hover:underline"
                onClick={() =>
                  commitP2b({
                    ...p2bData,
                    whyChoosePoints: [...p2bData.whyChoosePoints, 'Nuevo punto'],
                  })
                }
              >
                + Punto
              </button>
            </div>
            <div className="space-y-2">
              {p2bData.whyChoosePoints.map((point, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={point}
                    placeholder={`Punto ${i + 1}`}
                    onChange={(e) => {
                      const whyChoosePoints = [...p2bData.whyChoosePoints];
                      whyChoosePoints[i] = e.target.value;
                      commitP2b({ ...p2bData, whyChoosePoints });
                    }}
                    className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                  />
                  <button
                    type="button"
                    className="text-xs text-red-400 px-2"
                    onClick={() =>
                      commitP2b({
                        ...p2bData,
                        whyChoosePoints: p2bData.whyChoosePoints.filter((_, j) => j !== i),
                      })
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-medium">Valores corporativos (chips)</p>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() =>
                commitP2b({
                  ...p2bData,
                  valChips: [...p2bData.valChips, defaultP2bChip('Nuevo valor')],
                })
              }
            >
              + Valor
            </button>
          </div>
          <div className="space-y-2 mb-4">
            {p2bData.valChips.map((chip, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 bg-slate-900/40 grid grid-cols-2 gap-2">
                <input
                  value={chip.label}
                  placeholder="Nombre del valor"
                  onChange={(e) => {
                    const valChips = [...p2bData.valChips];
                    valChips[i] = { ...chip, label: e.target.value };
                    commitP2b({ ...p2bData, valChips });
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs col-span-2"
                />
                <input
                  value={chip.key}
                  placeholder="Clave interna"
                  onChange={(e) => {
                    const valChips = [...p2bData.valChips];
                    valChips[i] = { ...chip, key: e.target.value };
                    commitP2b({ ...p2bData, valChips });
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <label className="flex items-center gap-1 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={chip.active}
                    onChange={(e) => {
                      const valChips = p2bData.valChips.map((c, j) => ({
                        ...c,
                        active: j === i ? e.target.checked : false,
                      }));
                      commitP2b({ ...p2bData, valChips });
                    }}
                  />
                  Activo
                </label>
                {p2bData.valChips.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline col-span-2"
                    onClick={() =>
                      commitP2b({ ...p2bData, valChips: p2bData.valChips.filter((_, j) => j !== i) })
                    }
                  >
                    Eliminar valor
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 font-medium">Certificaciones</p>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() =>
                commitP2b({ ...p2bData, certs: [...p2bData.certs, defaultP2bCert()] })
              }
            >
              + Certificación
            </button>
          </div>
          <input
            value={p2bData.certsSectionTitle}
            placeholder="Título sección certificaciones"
            onChange={(e) => commitP2b({ ...p2bData, certsSectionTitle: e.target.value })}
            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs mb-2"
          />
          <ul className="space-y-2">
            {p2bData.certs.map((cert, i) => (
              <li key={i} className="p-2 rounded border border-slate-700 bg-slate-900/50 space-y-2">
                <input
                  value={cert.title}
                  placeholder="Nombre certificación"
                  onChange={(e) => {
                    const certs = [...p2bData.certs];
                    certs[i] = { ...cert, title: e.target.value };
                    commitP2b({ ...p2bData, certs });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <input
                  value={cert.subtitle}
                  placeholder="Descripción"
                  onChange={(e) => {
                    const certs = [...p2bData.certs];
                    certs[i] = { ...cert, subtitle: e.target.value };
                    commitP2b({ ...p2bData, certs });
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                {cert.imageSrc && <StorageImagePreview src={cert.imageSrc} token={token} />}
                <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline block">
                  {cert.imageSrc ? 'Cambiar logo' : 'Subir logo'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        uploadP2bCertLogo(i, f).catch((err) =>
                          alert(err instanceof Error ? err.message : 'Error al subir'),
                        );
                      e.target.value = '';
                    }}
                  />
                </label>
                {p2bData.certs.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline"
                    onClick={() =>
                      commitP2b({ ...p2bData, certs: p2bData.certs.filter((_, j) => j !== i) })
                    }
                  >
                    Eliminar certificación
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {showP2Carousel && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase">
              Carrusel (presencia física)
            </h3>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() => commitP2Slides([...p2Slides, defaultP2Slide()])}
            >
              + Añadir slide
            </button>
          </div>
          <div className="space-y-3">
            {p2Slides.map((slide, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 space-y-2 bg-slate-900/40">
                <p className="text-xs text-slate-400 font-medium">Slide {i + 1}</p>
                <input
                  value={slide.title}
                  placeholder="Título"
                  onChange={(e) => {
                    const next = [...p2Slides];
                    const title = e.target.value;
                    next[i] = { ...slide, title, ariaLabel: title || slide.ariaLabel };
                    commitP2Slides(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <input
                  value={slide.subtitle}
                  placeholder="Subtítulo / dirección"
                  onChange={(e) => {
                    const next = [...p2Slides];
                    next[i] = { ...slide, subtitle: e.target.value };
                    commitP2Slides(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <select
                  value={slide.icon}
                  onChange={(e) => {
                    const next = [...p2Slides];
                    next[i] = { ...slide, icon: e.target.value };
                    commitP2Slides(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                >
                  {FA_ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
                {slide.imageSrc && <StorageImagePreview src={slide.imageSrc} token={token} />}
                <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline block">
                  {slide.imageSrc ? 'Cambiar imagen' : 'Subir imagen'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      uploadFile(f)
                        .then((storageRef) => {
                          const next = [...p2Slides];
                          next[i] = { ...slide, imageSrc: storageRef };
                          commitP2Slides(next);
                        })
                        .catch((err) =>
                          alert(err instanceof Error ? err.message : 'Error al subir'),
                        );
                      e.target.value = '';
                    }}
                  />
                </label>
                <input
                  value={slide.imageAlt}
                  placeholder="Texto alternativo imagen"
                  onChange={(e) => {
                    const next = [...p2Slides];
                    next[i] = { ...slide, imageAlt: e.target.value };
                    commitP2Slides(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                {p2Slides.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline"
                    onClick={() => commitP2Slides(p2Slides.filter((_, j) => j !== i))}
                  >
                    Eliminar slide
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {showTechCarousel && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase">
              Carrusel (apoyos tecnológicos)
            </h3>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() => commitTechProducts([...techProducts, defaultTechProduct()])}
            >
              + Añadir apoyo
            </button>
          </div>
          <div className="space-y-3">
            {techProducts.map((p, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 space-y-2 bg-slate-900/40">
                <p className="text-xs text-slate-400 font-medium">Apoyo {i + 1}</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={p.badge}
                    placeholder="Etiqueta"
                    onChange={(e) => {
                      const next = [...techProducts];
                      next[i] = { ...p, badge: e.target.value };
                      commitTechProducts(next);
                    }}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                  />
                  <select
                    value={p.badgeIcon}
                    onChange={(e) => {
                      const next = [...techProducts];
                      next[i] = { ...p, badgeIcon: e.target.value, fallbackIcon: e.target.value };
                      commitTechProducts(next);
                    }}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                  >
                    {FA_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  value={p.title}
                  placeholder="Título"
                  onChange={(e) => {
                    const next = [...techProducts];
                    const title = e.target.value;
                    next[i] = {
                      ...p,
                      title,
                      titleHtml: `<span>${title}</span>`,
                    };
                    commitTechProducts(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <textarea
                  value={p.desc}
                  placeholder="Descripción"
                  rows={3}
                  onChange={(e) => {
                    const next = [...techProducts];
                    next[i] = { ...p, desc: e.target.value };
                    commitTechProducts(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <select
                  value={p.type}
                  onChange={(e) => {
                    const next = [...techProducts];
                    next[i] = { ...p, type: e.target.value as 'img' | 'video' };
                    commitTechProducts(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                >
                  <option value="img">Imagen</option>
                  <option value="video">Video</option>
                </select>
                {p.src && p.type === 'img' && <StorageImagePreview src={p.src} token={token} />}
                <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline block">
                  {p.src ? 'Cambiar archivo' : 'Subir archivo'}
                  <input
                    type="file"
                    accept={p.type === 'video' ? 'video/*' : 'image/*'}
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      uploadFile(f)
                        .then((storageRef) => {
                          const next = [...techProducts];
                          next[i] = { ...p, src: storageRef };
                          commitTechProducts(next);
                        })
                        .catch((err) =>
                          alert(err instanceof Error ? err.message : 'Error al subir'),
                        );
                      e.target.value = '';
                    }}
                  />
                </label>
                {techProducts.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-400 hover:underline"
                    onClick={() => commitTechProducts(techProducts.filter((_, j) => j !== i))}
                  >
                    Eliminar apoyo
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {images.length > 0 && !showP2Carousel && !showTechCarousel && !showP4 && !showAp5 && !showP2b && (
        <section>
          <h3 className="text-xs font-semibold text-amber-400/90 uppercase mb-2">Imágenes</h3>
          <ul className="space-y-2">
            {images.map((img) => (
              <li key={img.index} className="p-2 rounded border border-slate-700 bg-slate-900/50">
                {img.src && <StorageImagePreview src={img.src} token={token} />}
                <p className="text-xs text-slate-500 truncate mb-1">
                  {(storagePathFromRef(img.src) ?? img.src) || 'Sin src'}
                </p>
                <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline">
                  Cambiar imagen
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        uploadAndReplace(img.index, f).catch((err) =>
                          alert(err instanceof Error ? err.message : 'Error al subir'),
                        );
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showBenScene && benScene && (
        <section>
          <h3 className="text-xs font-semibold text-amber-400/90 uppercase mb-2">
            Imagen del guarda (panel lateral)
          </h3>
          <div className="space-y-2 mb-4 p-2 rounded border border-slate-700 bg-slate-900/40">
            <input
              value={benScene.kicker}
              placeholder="Etiqueta superior"
              onChange={(e) => commitBenScene({ ...benScene, kicker: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
            <label className="block text-xs text-slate-400">Titular lateral (HTML)</label>
            <textarea
              value={benScene.titleHtml}
              rows={2}
              onChange={(e) => commitBenScene({ ...benScene, titleHtml: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs font-mono"
            />
            {benScene.imageSrc && <StorageImagePreview src={benScene.imageSrc} token={token} />}
            <label className="text-xs text-[#4a6fa5] cursor-pointer hover:underline block">
              {benScene.imageSrc ? 'Cambiar imagen del guarda' : 'Subir imagen del guarda'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  uploadFile(f)
                    .then((storageRef) =>
                      commitBenScene({ ...benScene, imageSrc: storageRef }),
                    )
                    .catch((err) =>
                      alert(err instanceof Error ? err.message : 'Error al subir'),
                    );
                  e.target.value = '';
                }}
              />
            </label>
            {benScene.imageSrc && (
              <button
                type="button"
                className="text-xs text-red-400 hover:underline"
                onClick={() => commitBenScene({ ...benScene, imageSrc: '' })}
              >
                Quitar imagen
              </button>
            )}
            <input
              value={benScene.imageAlt}
              placeholder="Texto alternativo"
              onChange={(e) => commitBenScene({ ...benScene, imageAlt: e.target.value })}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
            />
          </div>
        </section>
      )}

      {showCards && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase">
              Tarjetas / programas
            </h3>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() =>
                commitCards([
                  ...cards,
                  { title: 'Nuevo programa', description: 'Descripción', icon: 'fa-heart' },
                ])
              }
            >
              + Añadir
            </button>
          </div>
          <div className="space-y-3">
            {cards.map((c, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 space-y-2 bg-slate-900/40">
                <input
                  value={c.title}
                  placeholder="Título"
                  onChange={(e) => {
                    const next = [...cards];
                    next[i] = { ...c, title: e.target.value };
                    commitCards(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-sm"
                />
                <textarea
                  value={c.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) => {
                    const next = [...cards];
                    next[i] = { ...c, description: e.target.value };
                    commitCards(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <select
                  value={c.icon}
                  onChange={(e) => {
                    const next = [...cards];
                    next[i] = { ...c, icon: e.target.value };
                    commitCards(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                >
                  {FA_ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="text-xs text-red-400 hover:underline"
                  onClick={() => commitCards(cards.filter((_, j) => j !== i))}
                >
                  Eliminar tarjeta
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {showRows && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase">Valores / filas</h3>
            <button
              type="button"
              className="text-xs text-[#4a6fa5] hover:underline"
              onClick={() =>
                commitRows([...rows, { name: 'Nuevo concepto', sub: '', value: '$0' }])
              }
            >
              + Añadir
            </button>
          </div>
          <div className="space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="p-2 rounded border border-slate-700 space-y-1 bg-slate-900/40">
                <input
                  value={r.name}
                  placeholder="Nombre"
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...r, name: e.target.value };
                    commitRows(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <input
                  value={r.sub}
                  placeholder="Detalle"
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...r, sub: e.target.value };
                    commitRows(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <input
                  value={r.value}
                  placeholder="Valor"
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...r, value: e.target.value };
                    commitRows(next);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-xs"
                />
                <button
                  type="button"
                  className="text-xs text-red-400"
                  onClick={() => commitRows(rows.filter((_, j) => j !== i))}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
