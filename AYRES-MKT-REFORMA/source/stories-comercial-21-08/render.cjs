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
      badge: 'QUEREMOS CONOCERTE',
      eyebrow: 'ACCIÓN COMERCIAL',
      title: '¿TENÉS UNA <em>PET SHOP,</em><br><em>VETERINARIA</em> O<br>COMERCIO?',
      lede: 'Contanos qué tipo de negocio tenés.',
      options: ['PET SHOP', 'VETERINARIA', 'COMERCIO'],
      hint: 'Respondé esta historia y sumá <em>tu localidad.</em>',
    },
    {
      light: true,
      badge: 'VARIEDAD PARA TU NEGOCIO',
      eyebrow: 'ESTA SEMANA · SECTOR GATOS',
      title: 'MARCAS Y CATEGORÍAS<br>PARA <em>GATOS.</em>',
      lede: 'Distintas etapas, líneas y presentaciones.',
      products: [
        product('voraz-gatos-adultos'),
        product('high-pro-criadores-gato-adulto'),
        product('maintenance-criadores-gatos-adultos'),
        product('origen-company-gato-adulto'),
      ],
      band: 'CONSULTÁ OPCIONES Y DISPONIBILIDAD PARA TU LOCALIDAD',
    },
    {
      badge: 'CATÁLOGO MAYORISTA',
      eyebrow: 'UN SOLO CONTACTO',
      title: 'CONOCÉ LAS<br><em>OPCIONES<br>DISPONIBLES.</em>',
      cta: { eyebrow: 'RESPONDÉ ESTA HISTORIA CON', title: '<em>CATÁLOGO</em> +<br>TU LOCALIDAD', button: 'ENVIAR MENSAJE' },
      note: '<b>Cobertura:</b> gran parte de la provincia de Córdoba, sujeta a consulta.',
    },
  ],
};

const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const source = path.join(__dirname, 'story.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'comercial-21-08');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = ['pregunta-negocio', 'marcas-gatos', 'cta-catalogo'];

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
