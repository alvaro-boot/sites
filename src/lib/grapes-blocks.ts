/** Bloques reutilizables COOTRAVIR para el editor GrapesJS. */
export function registerCootravirBlocks(
  editor: {
    BlockManager: {
      add: (id: string, block: { label: string; category?: string; content: string }) => void;
    };
  },
) {
  const bm = editor.BlockManager;
  const cat = 'COOTRAVIR';
  const d = 'div';

  bm.add('cv-portada', {
    label: 'Portada',
    category: cat,
    content: `<${d} class="slide cover-slide flex flex-col justify-between p-8 min-h-[80vh]">
      <header><span class="text-amber-400 text-sm font-semibold">COOTRAVIR C.T.A.</span></header>
      <main class="flex-1 flex flex-col justify-center">
        <h1 class="text-4xl font-bold text-white mb-4">Propuesta de seguridad integral</h1>
        <p class="text-slate-300 text-lg">Presentado a: <strong class="text-amber-300">NOMBRE DEL CLIENTE</strong></p>
      </main>
    </${d}>`,
  });

  bm.add('cv-titulo-seccion', {
    label: 'Título sección',
    category: cat,
    content: `<${d} class="p-6">
      <h2 class="text-2xl font-bold text-white border-l-4 border-amber-500 pl-4">Título de sección</h2>
      <p class="text-slate-400 mt-2">Subtítulo o descripción breve</p>
    </${d}>`,
  });

  bm.add('cv-dos-columnas', {
    label: 'Dos columnas',
    category: cat,
    content: `<${d} class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <${d} class="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
        <h3 class="font-semibold text-amber-300 mb-2">Columna 1</h3>
        <p class="text-slate-300 text-sm">Contenido editable</p>
      </${d}>
      <${d} class="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
        <h3 class="font-semibold text-amber-300 mb-2">Columna 2</h3>
        <p class="text-slate-300 text-sm">Contenido editable</p>
      </${d}>
    </${d}>`,
  });

  bm.add('cv-tarjeta-valor', {
    label: 'Tarjeta valor',
    category: cat,
    content: `<${d} class="p-4 m-4 rounded-xl border border-amber-500/30 bg-[#0c1428] max-w-sm">
      <p class="text-xs text-amber-400 uppercase tracking-wide mb-1">Concepto</p>
      <p class="text-2xl font-bold text-white">$ 0</p>
      <p class="text-slate-400 text-sm mt-1">Descripción del valor</p>
    </${d}>`,
  });

  bm.add('cv-lista-check', {
    label: 'Lista con íconos',
    category: cat,
    content: `<ul class="space-y-3 p-6 text-slate-200">
      <li class="flex gap-2"><span class="text-green-400">✓</span> Elemento 1</li>
      <li class="flex gap-2"><span class="text-green-400">✓</span> Elemento 2</li>
      <li class="flex gap-2"><span class="text-green-400">✓</span> Elemento 3</li>
    </ul>`,
  });

  bm.add('cv-imagen', {
    label: 'Imagen',
    category: cat,
    content:
      '<img src="/legacy/images/logo-escudo-cootravir.png" alt="Imagen" class="max-w-xs mx-auto"/>',
  });
}
