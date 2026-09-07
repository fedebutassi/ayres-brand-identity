// Stories 01/09 — Verdadero o falso (clave B2B: quiz para equipos de atención).
// Story 1 sin recuadros de opciones: el sticker nativo de quiz/encuesta ocupa ese espacio
// (aprendizaje del 21/08 y 25/08). Story 3 deja la banda para el CTA CATÁLOGO.
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
      badge: 'VERDADERO O FALSO',
      eyebrow: 'PARA TU EQUIPO DE ATENCIÓN',
      title: '¿TU EQUIPO SABRÍA<br><em>RESPONDER?</em>',
      lede: '"Una fórmula con objetivo específico se elige solo por el nombre del envase."',
      // sin "options": el sticker nativo de quiz ocupa este espacio
      hint: 'Votá con el sticker: <em>¿verdadero o falso?</em>',
    },
    {
      light: true,
      badge: 'RESPUESTA: FALSO',
      eyebrow: 'GUÍA DE MOSTRADOR',
      title: 'LA INDICA EL<br><em>VETERINARIO.</em>',
      lede: 'El envase declara el objetivo; la indicación es profesional.',
      options: ['ESTERILIZADO', 'URINARIO', 'LIGHT'],
      hint: 'Enseñáselo a tu equipo: <em>derivar no es perder la venta.</em>',
    },
    {
      badge: 'CATÁLOGO MAYORISTA',
      eyebrow: 'LÍNEAS ESPECÍFICAS · GATOS',
      title: 'FÓRMULAS ESPECÍFICAS<br>PARA TU <em>GÓNDOLA.</em>',
      products: [product('fawna-gato-esterilizado'), product('fawna-gato-urinario')],
      band: 'RESPONDÉ ESTA HISTORIA CON CATÁLOGO + TU LOCALIDAD',
    },
  ],
};

const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const source = path.join(__dirname, 'story.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'vf-01-09');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = ['quiz-objetivo-especifico', 'respuesta-veterinario', 'cta-gondola-gatos'];

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
