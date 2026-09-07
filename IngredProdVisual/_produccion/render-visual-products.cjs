const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { loadVisualProducts } = require('./visual-product-data.cjs');

const repoRoot = path.resolve(__dirname, '../..');
const collectionRoot = path.resolve(__dirname, '..');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const requested = new Set(process.argv.slice(2));
const allProducts = loadVisualProducts(repoRoot, collectionRoot);
const products = requested.size ? allProducts.filter(({ slug }) => requested.has(slug)) : allProducts;

const renderProduct = (product) => new Promise((resolve, reject) => {
  fs.mkdirSync(product.destinationDirectory, { recursive: true });
  const payload = {
    ...product,
    image: pathToFileURL(product.imagePath).href,
    logo: pathToFileURL(product.logoPath).href,
    photo: pathToFileURL(product.photoPath).href,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  const page = pathToFileURL(path.join(__dirname, 'visual-card.html')).href;
  const pageUrl = `${page}?content=${encodeURIComponent(encoded)}`;
  const output = path.join(product.destinationDirectory, `ayres-ingredientes-visuales-${product.slug}-1080x1350.png`);
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=1500', '--window-size=1080,1350', `--screenshot=${output}`, pageUrl,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve({ product, output }) : reject(new Error(`Chrome finalizó con código ${code}`)));
});

const checksum = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const renderAll = async () => {
  if (requested.size && products.length !== requested.size) throw new Error('Uno o más IDs solicitados no existen.');
  const queue = [...products];
  const completed = [];
  const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const product = queue.shift();
      const result = await renderProduct(product);
      completed.push(result);
      console.log(`Generado: ${product.slug}`);
    }
  });
  await Promise.all(workers);

  const manifest = completed.sort((a, b) => a.product.slug.localeCompare(b.product.slug)).map(({ product, output }) => ({
    producto_id: product.slug,
    marca: product.brand,
    especie: product.species,
    primeros_ingredientes: product.ingredients,
    fotografia_fuente: path.relative(repoRoot, product.photoPath),
    imagen_final: path.relative(repoRoot, output),
    sha256: checksum(output),
  }));
  fs.writeFileSync(path.join(collectionRoot, 'MANIFIESTO.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Total generado: ${completed.length}`);
};

renderAll().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
