// Stories 25/08 — Encuesta de decisión.
// Story 1 sin recuadros de opciones: el sticker de encuesta nativo ocupa ese espacio
// (aprendizaje del 21/08). Story 3 deja espacio para el sticker de enlace al Reel 03.
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, 'infoproductos', 'productos.json'), 'utf8')).productos;
const catalog = new Map(data.map((item) => [item.id, item]));
const imageFor = (id) => {
  if (!catalog.has(id)) throw new Error(`Producto inexistente: ${id}`);
  return pathToFileURL(path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'assets', 'cutouts-exactos', `${id}.png`)).href;
};
const product = (id) => ({ id, name: catalog.get(id).nombre, image: imageFor(id) });

const payload = {
  logoLight: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  logoDark: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
  stories: [
    {
      badge: 'ENCUESTA',
      eyebrow: 'CONVERSACIÓN · ETIQUETAS',
      title: '¿QUÉ DATO TE CUESTA MÁS <em>INTERPRETAR?</em>',
      lede: 'De la etiqueta de un alimento.',
      // sin "options": el sticker de encuesta de Instagram ocupa este espacio
      hint: 'Votá con el sticker y vemos <em>el resultado.</em>',
    },
    {
      light: true,
      badge: 'CADA DATO INFORMA',
      eyebrow: 'GUÍA RÁPIDA',
      title: 'CADA DATO SE LEE <em>DISTINTO.</em>',
      lede: 'Ninguno alcanza solo: juntos describen la fórmula.',
      options: ['PROTEÍNA MÍN.', 'INGREDIENTES', 'PRESENTACIONES'],
      hint: 'Esta semana los repasamos <em>uno por uno.</em>',
    },
    {
      badge: 'ESTA SEMANA',
      eyebrow: 'COMPARACIÓN NEUTRAL',
      title: 'FAWNA 34% FRENTE A<br>OLD PRINCE <em>32%.</em>',
      products: [product('fawna-cachorro-pequeno'), product('op-pn-lamb-puppy-all')],
      band: 'MIRÁ LA COMPARACIÓN COMPLETA EN EL REEL',
    },
  ],
};

const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const source = path.join(__dirname, 'story.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'encuesta-25-08');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = ['encuesta-dato-dificil', 'cada-dato-se-lee-distinto', 'link-reel-comparacion'];

fs.mkdirSync(outputRoot, { recursive: true });
for (let i = 0; i < payload.stories.length; i += 1) {
  const output = path.join(outputRoot, `${String(i + 1).padStart(2, '0')}-story-${slugs[i]}-1080x1920.png`);
  const url = `${pathToFileURL(source).href}?story=${i + 1}&payload=${encodeURIComponent(encoded)}`;
  const result = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
    '--window-size=1080,1920', `--screenshot=${output}`, url,
  ]);
  if (result.status !== 0) throw new Error(`Story ${i + 1}: Chrome finalizó con código ${result.status}`);
  console.log(`Generado: ${output}`);
}
