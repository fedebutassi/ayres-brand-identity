const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { loadProducts } = require('../../../social/2026/pruebas-productos-ayres/product-data.cjs');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const outputRoot = path.join(repoRoot, 'CarruselesProductos', 'coleccion-10-carruseles');
const productRoot = path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'output', 'productos');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const products = new Map(loadProducts(repoRoot).map((product) => [product.slug, product]));
const repairsOnly = process.argv.includes('--repairs-only');
const coversOnly = process.argv.includes('--covers-only');
const requestedIds = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const selectedCarousels = requestedIds.length
  ? manifest.filter(({ id }) => requestedIds.includes(id))
  : manifest;
const repairSpecs = [
  { carouselId: '01-gatos-alta-proteina', productId: 'op-pn-kitten', sequence: '03' },
  { carouselId: '01-gatos-alta-proteina', productId: 'company-gatitos', sequence: '04' },
  { carouselId: '11-perros-alta-proteina', productId: 'kongo-gold-cachorros-todas-razas', sequence: '05' },
];

if (selectedCarousels.length !== (requestedIds.length || manifest.length)) {
  const found = new Set(selectedCarousels.map(({ id }) => id));
  const missing = requestedIds.filter((id) => !found.has(id));
  throw new Error(`Carrusel inexistente: ${missing.join(', ')}`);
}

const copySlides = (carousel) => {
  const outputDir = path.join(outputRoot, carousel.id);
  fs.mkdirSync(outputDir, { recursive: true });

  carousel.products.forEach((product, index) => {
    const source = path.join(productRoot, `ayres-producto-${product.id}-1080x1350.png`);
    const output = path.join(outputDir, `${String(index + 2).padStart(2, '0')}-${product.id}-1080x1350.png`);
    if (!fs.existsSync(source)) throw new Error(`Falta la ficha: ${source}`);
    fs.copyFileSync(source, output);
  });
};

const renderScreenshot = ({ label, pagePath, payload, output, queryKey = 'payload' }) => {
  const pageUrl = pathToFileURL(pagePath).href;
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  const url = `${pageUrl}?${queryKey}=${encodeURIComponent(encoded)}`;
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
      '--window-size=1080,1350', `--screenshot=${output}`, url,
    ], { stdio: 'ignore' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code !== 0) return reject(new Error(`${label}: Chrome finalizó con código ${code}`));
      return resolve(output);
    });
  });
};

const renderCover = (carousel) => renderScreenshot({
  label: carousel.id,
  pagePath: path.join(__dirname, 'cover.html'),
  payload: carousel,
  output: path.join(outputRoot, carousel.id, `01-portada-${carousel.id}-1080x1350.png`),
});

const renderCta = (carousel) => renderScreenshot({
  label: `${carousel.id}-cta`,
  pagePath: path.join(__dirname, 'cta.html'),
  payload: carousel,
  output: path.join(outputRoot, carousel.id, '06-cta-mas-informacion-1080x1350.png'),
});

const renderProductRepair = (spec) => {
  const product = products.get(spec.productId);
  if (!product) throw new Error(`Producto inexistente: ${spec.productId}`);
  const payload = {
    ...product,
    image: pathToFileURL(product.imagePath).href,
    logo: pathToFileURL(product.logoPath).href,
  };
  return renderScreenshot({
    label: `reencuadre-${spec.productId}`,
    pagePath: path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'product-card.html'),
    payload,
    queryKey: 'content',
    output: path.join(outputRoot, spec.carouselId, `${spec.sequence}-${spec.productId}-1080x1350.png`),
  });
};

const build = async () => {
  fs.mkdirSync(outputRoot, { recursive: true });
  if (!repairsOnly && !coversOnly) selectedCarousels.forEach(copySlides);
  const selectedIds = new Set(selectedCarousels.map(({ id }) => id));
  const selectedRepairs = repairSpecs.filter(({ carouselId }) => selectedIds.has(carouselId));
  const repairCarousels = selectedCarousels.filter(({ id }) =>
    selectedRepairs.some(({ carouselId }) => carouselId === id));
  const queue = coversOnly
    ? selectedCarousels.map((carousel) => () => renderCover(carousel))
    : repairsOnly
    ? [
        ...repairCarousels.map((carousel) => () => renderCover(carousel)),
        ...selectedRepairs.map((spec) => () => renderProductRepair(spec)),
      ]
    : [
        ...selectedCarousels.flatMap((carousel) => [
          () => renderCover(carousel),
          () => renderCta(carousel),
        ]),
        ...selectedRepairs.map((spec) => () => renderProductRepair(spec)),
      ];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const render = queue.shift();
      const output = await render();
      console.log(`Generado: ${output}`);
    }
  });
  await Promise.all(workers);
  if (coversOnly) return console.log('Portadas actualizadas');
  if (repairsOnly) return console.log('Reparaciones de envase completadas');
  console.log(`Colección generada: ${selectedCarousels.length} carruseles · ${selectedCarousels.length * 6} placas`);
};

build().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
