const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { loadProducts } = require('../social/2026/pruebas-productos-ayres/product-data.cjs');

const repoRoot = path.resolve(__dirname, '..');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const campaign = JSON.parse(fs.readFileSync(path.join(__dirname, 'campaign.json'), 'utf8'));
const products = new Map(loadProducts(repoRoot).map((product) => [product.slug, product]));
const requestedIds = new Set(process.argv.slice(2));

const productPayload = (id) => {
  const product = products.get(id);
  if (!product) throw new Error(`Producto inexistente: ${id}`);
  return {
    ...product,
    image: pathToFileURL(product.imagePath).href,
  };
};

const cardPayload = (id) => ({
  id,
  name: products.get(id)?.name || id,
  image: pathToFileURL(path.join(repoRoot, 'social/2026/pruebas-productos-ayres/output/productos-ingredientes', `ayres-ingredientes-${id}-1080x1350.png`)).href,
});

const resolveContent = (item) => ({
  ...item,
  logo: pathToFileURL(path.join(repoRoot, 'assets', item.tone === 'dark' ? 'logo-dark.svg' : 'logo-light.svg')).href,
  background: item.background ? pathToFileURL(path.join(__dirname, item.background)).href : undefined,
  product: item.product ? productPayload(item.product) : undefined,
  products: item.products?.map(productPayload),
  cards: item.cards?.map(cardPayload),
});

const renderItem = (item) => new Promise((resolve, reject) => {
  const content = resolveContent(item);
  const width = 1080;
  const height = item.format === 'story' ? 1920 : 1350;
  const outputDir = path.join(__dirname, 'output', item.format === 'story' ? 'stories' : 'feed');
  const output = path.join(outputDir, `${item.id}-${width}x${height}.png`);
  const encoded = Buffer.from(JSON.stringify(content), 'utf8').toString('base64');
  const pageUrl = `${pathToFileURL(path.join(__dirname, 'campaign.html')).href}?content=${encodeURIComponent(encoded)}`;

  fs.mkdirSync(outputDir, { recursive: true });
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1600',
    `--window-size=${width},${height}`, `--screenshot=${output}`, pageUrl,
  ], { stdio: 'ignore' });

  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(output) : reject(new Error(`${item.id}: Chrome finalizó con código ${code}`)));
});

const renderCampaign = async () => {
  const selected = requestedIds.size ? campaign.filter(({ id }) => requestedIds.has(id)) : campaign;
  if (requestedIds.size && selected.length !== requestedIds.size) throw new Error('Una o más piezas solicitadas no existen');

  const queue = [...selected];
  const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      const output = await renderItem(item);
      console.log(`Generado: ${output}`);
    }
  });

  await Promise.all(workers);
  console.log(`Campaña completa: ${selected.length} piezas`);
};

renderCampaign().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
