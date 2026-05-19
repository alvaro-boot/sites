import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../plantilla 1');
const backend = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../cootravir-backend/assets/system-template/html');

const P4 = [
  ['porteria', 'fa-door-open'],
  ['ronda', 'fa-route'],
  ['coordinador', 'fa-user-tie'],
  ['ajuste', 'fa-tag'],
  ['seguro', 'fa-shield-halved'],
];

const AP5 = [
  ['gift', 'fa-gift'],
  ['phone', 'fa-mobile-screen-button'],
  ['moto', 'fa-motorcycle'],
  ['coordinator', 'fa-user-tie'],
  ['bell', 'fa-bell'],
  ['network', 'fa-network-wired'],
  ['study', 'fa-graduation-cap'],
  ['clipboard', 'fa-clipboard-list'],
];

function p4Icon(scene, wide) {
  return `<div class="p4-svc-icon-wrap flex items-center justify-center shrink-0" style="width:78px;height:78px;border-radius:14px;background:linear-gradient(165deg,rgba(18,32,58,.98),rgba(7,11,20,1));border:1px solid rgba(6,182,212,.28);"><i class="fas ${scene} text-2xl" style="color:var(--cootravir-gold-light);"></i></div>`;
}

function ap5Icon(kind) {
  return `<motion.div class="apoyo-icon-fa flex items-center justify-center" style="width:56px;height:56px;border-radius:12px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);"><i class="fas ${kind} text-xl" style="color:var(--cootravir-gold-light);"></i></motion.div>`;
}

function patchPage4(c) {
  for (const [scene, icon] of P4) {
    const re = new RegExp(
      `<div class="p4-svc-webgl-wrap[^"]*"[^>]*data-p4-scene="${scene}"[^>]*></div>`,
      'g',
    );
    c = c.replace(re, p4Icon(icon));
  }
  c = c.replace(/\s*<script src="page_4-3d\.js"><\/script>\s*/g, '\n');
  return c;
}

function patchPage5(c) {
  c = c.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/three@[^"]+"><\/script>\s*/g, '');
  c = c.replace(
    /<div class="apoyos-head-slot" data-icon-kind="gift"[^>]*><\/div>/,
    `<div class="apoyos-head-icon flex items-center justify-center" style="width:56px;height:56px;border-radius:12px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);"><i class="fas fa-gift text-xl" style="color:var(--cootravir-gold-light);"></i></div>`,
  );
  c = c.replace(/<span class="apoyos-chip"><i class="fas fa-cube"><\/i>[^<]*<\/span>/, '<span class="apoyos-chip"><i class="fas fa-layer-group"></i> Apoyos incluidos</span>');
  for (const [kind, icon] of AP5) {
    c = c.replace(
      new RegExp(`<div class="apoyo-vp" data-icon-kind="${kind}"[^>]*></div>`, 'g'),
      ap5Icon(icon).replace(/<motion\.div/g, '<div').replace(/<\/motion\.motion\.motion\.motion\.motion\.motion\.div>/g, '</motion.div>'),
    );
  }
  if (!c.includes('.apoyo-icon-fa')) {
    c = c.replace(
      '.reinv-note i {',
      `.apoyo-icon-fa, .apoyos-head-icon { flex-shrink: 0; }
        #bars-canvas, #icons-canvas { display: none !important; }
        .reinv-note i {`,
    );
  }
  return c;
}

function patchPage2b(c) {
  c = c.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/three@[^"]+"><\/script>\s*/g, '');
  const flatCss = `
        .p2b-dna-bars {
            position: absolute;
            inset: 14px 12px 64px 12px;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 6px;
            align-items: end;
            z-index: 1;
        }
        .p2b-dna-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            gap: 4px;
            opacity: 0.45;
            transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .p2b-dna-bar.is-active { opacity: 1; transform: translateY(-4px); }
        .p2b-dna-bar-fill {
            width: 100%;
            max-width: 28px;
            height: var(--h, 50%);
            min-height: 8px;
            border-radius: 6px 6px 4px 4px;
            box-shadow: 0 0 12px rgba(0,0,0,0.35);
        }
        .p2b-helix-hud { font-size: 0.65rem; }
`;
  if (!c.includes('.p2b-dna-bars')) {
    c = c.replace('.p2b-helix-hud {', flatCss + '\n        .p2b-helix-hud {');
  }
  c = c.replace(
    /<div id="p2b-helix-root"><\/motion.div>/,
    '<div class="p2b-dna-bars" id="p2b-dna-bars"></div>',
  );
  c = c.replace(/<motion.div id="p2b-helix-root"><\/motion.div>/, '<div class="p2b-dna-bars" id="p2b-dna-bars"></div>');
  c = c.replace(/<div id="p2b-helix-root"><\/motion.div>/, '<div class="p2b-dna-bars" id="p2b-dna-bars"></div>');
  c = c.replace(
    /<div class="p2b-helix-hud">WebGL · ADN horizontal<\/div>/,
    '<div class="p2b-helix-hud">Diagrama de valores</div>',
  );
  c = c.replace(
    /if \(window\.p2bDnaHelix && typeof window\.p2bDnaHelix\.setByKey === "function"\) \{\s*window\.p2bDnaHelix\.setByKey\(key\);\s*\}/,
    'if (window.p2bDnaFlat && typeof window.p2bDnaFlat.setByKey === "function") { window.p2bDnaFlat.setByKey(key); }',
  );
  const flatScript = `
        (function () {
            var root = document.getElementById("p2b-dna-bars");
            if (!root) return;
            var order = ["cooperacion","igualdad","cumplimiento","calidez","confianza","sentido","respeto","responsabilidad"];
            var colors = ["#f59e0b","#c084fc","#3b82f6","#f472b6","#818cf8","#e879f9","#34d399","#f87171"];
            var chips = document.querySelectorAll(".p2b-val-chip");
            order.forEach(function (key, i) {
                var chip = chips[i];
                var label = chip ? chip.textContent.trim() : key;
                var bar = document.createElement("div");
                bar.className = "p2b-dna-bar" + (chip && chip.classList.contains("is-active") ? " is-active" : "");
                bar.setAttribute("data-val", key);
                bar.innerHTML = '<div class="p2b-dna-bar-fill" style="--h:' + (35 + (i % 5) * 12) + '%;background:linear-gradient(180deg,' + colors[i] + 'cc,' + colors[i] + ')"></div>';
                root.appendChild(bar);
            });
            window.p2bDnaFlat = {
                setByKey: function (key) {
                    var idx = order.indexOf(key);
                    root.querySelectorAll(".p2b-dna-bar").forEach(function (b, j) {
                        b.classList.toggle("is-active", j === idx);
                    });
                }
            };
        })();
`;
  if (!c.includes('p2bDnaFlat')) {
    c = c.replace(
      '(function () {\n            var root = document.getElementById("p2b-helix-root");',
      flatScript + '\n        (function () {\n            return;\n            var root = document.getElementById("p2b-helix-root");',
    );
  }
  return c;
}

function patchBeneficios(c) {
  c = c.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/three@[^"]+"><\/script>\s*/g, '');
  const flatCss = `
        .ben-figure-flat {
            flex: 1 1 auto;
            min-height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 8px 0;
        }
        .ben-figure-flat i {
            font-size: clamp(4rem, 12vw, 6.5rem);
            color: var(--cootravir-gold-light);
            filter: drop-shadow(0 0 24px rgba(212, 175, 55, 0.45));
        }
        #ben-3d-root { display: none !important; }
`;
  if (!c.includes('.ben-figure-flat')) {
    c = c.replace('#ben-3d-root {', flatCss + '\n        #ben-3d-root {');
  }
  c = c.replace(
    /<div id="ben-3d-root"[^>]*><\/motion.div>/,
    '<div class="ben-figure-flat" aria-hidden="true"><i class="fas fa-user-shield"></i></div><div id="ben-3d-root" aria-hidden="true" style="display:none"></motion.div>',
  );
  c = c.replace(
    /<span>Guarda de seguridad · figura 3D<\/span>\s*<span>WebGL<\/span>/,
    '<span>Guarda de seguridad</span><span>Iconografía</span>',
  );
  c = c.replace(
    /\(function \(\) \{\s*var root = document\.getElementById\("ben-3d-root"\);/,
    '(function () { return; var root = document.getElementById("ben-3d-root");',
  );
  return c;
}

function patchFile(filePath, fn) {
  if (!fs.existsSync(filePath)) return;
  const out = fn(fs.readFileSync(filePath, 'utf8'));
  fs.writeFileSync(filePath, out);
  console.log('patched', path.basename(filePath));
}

for (const dir of [root, backend]) {
  patchFile(path.join(dir, 'page_4.html'), patchPage4);
  patchFile(path.join(dir, 'page_5.html'), patchPage5);
  patchFile(path.join(dir, 'page_2b.html'), patchPage2b);
  patchFile(path.join(dir, 'page_beneficios_vigilancia.html'), patchBeneficios);
}
