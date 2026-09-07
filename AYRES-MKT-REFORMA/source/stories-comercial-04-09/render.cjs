// Stories 04/09 — Acción comercial de cierre de ciclo (clave B2B).
// Muestra variedad de marcas y categorías (el 28/08 fue sector perros; acá va el surtido completo).
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
      badge: 'PROVEEDOR MAYORISTA',
      eyebrow: 'ACCIÓN COMERCIAL',
      title: 'UN SOLO CONTACTO,<br>TODO EL <em>SURTIDO.</em>',
      lede: 'Alimento balanceado por mayor: marcas, líneas y presentaciones.',
      options: ['PERROS', 'GATOS', 'TODAS LAS ETAPAS'],
      hint: 'Respondé esta historia y contanos <em>qué te falta en góndola.</em>',
    },
    {
      light: true,
      badge: 'VARIEDAD PARA TU NEGOCIO',
      eyebrow: 'ESTA SEMANA · SURTIDO COMPLETO',
      title: 'MARCAS PARA<br><em>PERROS Y GATOS.</em>',
      lede: 'Cachorros, adultos y líneas específicas por mayor.',
      products: [
        product('kongo-gold-cachorros-todas-razas'),
        product('high-pro-criadores-cordero-perros-adultos'),
        product('company-gatos-adultos'),
        product('op-prem-adulto-pollo-carne'),
      ],
      band: 'CONSULTÁ DISPONIBILIDAD PARA TU LOCALIDAD',
    },
    {
      badge: 'CATÁLOGO MAYORISTA',
      eyebrow: 'UN SOLO CONTACTO',
      title: 'PEDÍ LA LISTA<br><em>DE PRECIOS.</em>',
      cta: { eyebrow: 'RESPONDÉ ESTA HISTORIA CON', title: '<em>CATÁLOGO</em> +<br>TU LOCALIDAD', button: 'ENVIAR MENSAJE' },
      note: '<b>Cobertura:</b> gran parte de la provincia de Córdoba, sujeta a consulta.',
    },
  ],
};

const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const source = path.join(__dirname, 'story.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'comercial-04-09');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = ['surtido-completo', 'marcas-perros-gatos', 'cta-catalogo'];

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
