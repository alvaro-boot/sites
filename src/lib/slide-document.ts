import type { Slide, ThemeConfig } from '@/lib/types';
import { buildMapContextScript, type MapSlideContext } from '@/lib/map-context';
import { buildThemeOverrideCss } from '@/lib/theme';
import { hasAp5Benefits, hasBenScene, hasMapSlide, hasP2bPage } from '@/lib/html-editor';

export type SlideDocumentMode = 'present' | 'edit';

/** Carga logos de certificaciones (data-cert-src ya resuelto a URL firmada). */
function buildP2bCertLoaderScript(): string {
  return `<script>
(function () {
  function loadCertPhotos() {
    document.querySelectorAll(".p2b-cert-photo[data-cert-src]").forEach(function (slot) {
      var src = (slot.getAttribute("data-cert-src") || "").trim();
      if (!src || src.indexOf("__STORAGE__:") === 0) return;
      slot.querySelectorAll(".p2b-cert-photo__img").forEach(function (el) { el.remove(); });
      var fb = slot.querySelector(".p2b-cert-fallback");
      if (fb) fb.style.removeProperty("display");
      var img = new Image();
      img.onload = function () {
        if (!slot.isConnected) return;
        img.className = "p2b-cert-photo__img";
        img.alt = "";
        img.loading = "lazy";
        slot.appendChild(img);
        if (fb) fb.style.display = "none";
      };
      img.onerror = function () {
        if (fb) fb.style.display = "";
      };
      img.src = src;
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCertPhotos);
  } else {
    loadCertPhotos();
  }
})();
<\/script>`;
}

/** Documento HTML completo de una diapositiva (visor y editor). */
export function buildSlideDocument(
  slide: Slide,
  mode: SlideDocumentMode = 'present',
  themeConfig?: ThemeConfig | null,
  mapContext?: MapSlideContext | null,
): string {
  const scripts = slide.scripts as Record<string, unknown> | null;
  const headScripts: string[] = [];
  const bodyScripts: string[] = [];

  const needsD3 =
    scripts?.d3 === true ||
    slide.key === 'page_4' ||
    /d3\.(select|pie)\(/.test(slide.html);
  if (needsD3) {
    headScripts.push('<script src="https://d3js.org/d3.v7.min.js"><\/script>');
  }

  const needsThree =
    scripts?.three === true ||
    slide.key === 'page_2' ||
    /p2-chart3d-root|renderDonut3D/.test(slide.html);
  if (needsThree) {
    headScripts.push(
      '<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"><\/script>',
    );
  }
  if (scripts?.script === 'page_4-3d.js') {
    bodyScripts.push('<script src="/legacy/page_4-3d.js"><\/script>');
  }
  const isMap = hasMapSlide(slide.html, slide.key);
  const needsLeaflet = scripts?.leaflet === true || isMap;
  const needsMapScript =
    scripts?.script === 'js/mapa-pereira.js' || slide.key === 'mapa-pereira' || isMap;

  if (needsLeaflet) {
    headScripts.push(
      '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>',
    );
    bodyScripts.push(
      '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""><\/script>',
    );
  }
  if (needsMapScript) {
    if (mapContext?.proposalId) {
      bodyScripts.push(buildMapContextScript(mapContext));
    }
    bodyScripts.push('<script src="/legacy/js/mapa-pereira.js"><\/script>');
  }

  const baseLayout =
    mode === 'edit'
      ? `html, body { height: 100%; margin: 0; }
body.prop-fill { min-height: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.slide, .cover-slide, [class*="slide"] { box-sizing: border-box; }`
      : `html, body { height: 100%; margin: 0; overflow: hidden; }
body.prop-fill { min-height: 100%; display: flex; flex-direction: column; }`;

  if (hasP2bPage(slide.html)) {
    bodyScripts.push(buildP2bCertLoaderScript());
  }

  return `<!DOCTYPE html>
<html lang="es" class="prop-fill">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="/legacy/slides-theme.css" rel="stylesheet"/>
  ${hasP2bPage(slide.html) ? '<link href="/legacy/css/p2b-why-panel.css" rel="stylesheet"/>' : ''}
  ${hasBenScene(slide.html) ? '<link href="/legacy/css/ben-scene-panel.css" rel="stylesheet"/>' : ''}
  ${hasAp5Benefits(slide.html) ? '<link href="/legacy/css/ap5-apoyos-grid.css" rel="stylesheet"/>' : ''}
  ${isMap ? '<link href="/legacy/css/mapa-slide-layout.css" rel="stylesheet"/>' : ''}
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>${buildThemeOverrideCss(themeConfig)}
${baseLayout}
${slide.css ?? ''}</style>
  ${headScripts.join('\n')}
</head>
<body class="prop-fill">
${slide.html}
${bodyScripts.join('\n')}
</body>
</html>`;
}
