import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/html-editor.ts');
let c = fs.readFileSync(filePath, 'utf8');

const p4Repl = `  const icon = item.icon || p4IconFromScene(item.webglScene);
  return \`<div class="p4-svc-icon-wrap flex items-center justify-center shrink-0" style="width:78px;height:78px;border-radius:14px;background:linear-gradient(165deg,rgba(18,32,58,.98),rgba(7,11,20,1));border:1px solid rgba(6,182,212,.28);"><i class="fas \${escapeAttr(icon)} text-2xl" style="color:var(--cootravir-gold-light);"></i></div>\`;`;

c = c.replace(
  /  const wideCls = item\.wide \? ' p4-svc-webgl-wrap--wide' : '';\n  return `<div class="p4-svc-webgl-wrap\$\{wideCls\}" data-p4-scene="\$\{escapeAttr\(item\.webglScene\)\}" aria-hidden="true"><\/motion.div>`;\n}/,
  p4Repl,
);

const ap5Repl = `  const icon = item.icon || ap5IconFromKind(item.webglKind);
  const cls = head ? 'apoyos-head-icon flex items-center justify-center' : 'apoyo-icon-fa flex items-center justify-center';
  return \`<motion.div class="\${cls}" style="width:56px;height:56px;border-radius:12px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);"><i class="fas \${escapeAttr(icon)} text-xl" style="color:var(--cootravir-gold-light);"></i></motion.div>\`;`;

c = c.replace(
  /  const cls = head \? 'apoyos-head-slot' : 'apoyo-vp';\n  return `<div class="\$\{cls\}" data-icon-kind="\$\{escapeAttr\(item\.webglKind\)\}" aria-hidden="true"><\/motion.div>`;/,
  ap5Repl.replace(/<motion\.div/g, '<div').replace(/<\/motion\.div>/g, '</motion.div>'),
);

if (!c.includes('ensureFlatVisuals')) {
  c = c.replace(
    'export function ensureAp5ReinvChart(html: string): string {',
    `export function ensureFlatVisuals(html: string): string {
  let out = html;
  if (hasP4Economics(out)) {
    const d = parseP4Economics(out);
    d.services = d.services.map((s) => ({
      ...s,
      visualType: s.visualType === 'webgl' ? 'icon' : s.visualType,
      icon:
        s.visualType === 'webgl'
          ? p4IconFromScene(s.webglScene)
          : s.icon || p4IconFromScene(s.webglScene),
    }));
    out = applyP4Economics(out, d);
  }
  if (hasAp5Benefits(out)) {
    const d = parseAp5Benefits(out);
    d.cards = d.cards.map((card) => ({
      ...card,
      visualType: card.visualType === 'webgl' ? 'icon' : card.visualType,
      icon:
        card.visualType === 'webgl'
          ? ap5IconFromKind(card.webglKind)
          : card.icon || ap5IconFromKind(card.webglKind),
    }));
    out = applyAp5Benefits(out, d);
  }
  return out;
}

export function ensureAp5ReinvChart(html: string): string {`,
  );
}

fs.writeFileSync(filePath, c);
console.log('ok', c.includes('p4-svc-icon-wrap'), c.includes('ensureFlatVisuals'));
