const path = require('path');
const { loadProducts } = require('./product-data.cjs');
const { renderProducts } = require('./render-products.cjs');

const repoRoot = path.resolve(__dirname, '../../..');
const requestedIds = new Set(process.argv.slice(2));
const allProducts = loadProducts(repoRoot);
const products = requestedIds.size
  ? allProducts.filter(({ slug }) => requestedIds.has(slug))
  : allProducts;

const renderAll = async () => {
  if (requestedIds.size && products.length !== requestedIds.size) {
    throw new Error('Uno o más IDs solicitados no existen en productos.json');
  }
  await renderProducts(products, {
    pagePath: path.join(__dirname, 'product-story.html'),
    outputDir: path.join(__dirname, 'output', 'stories'),
    filePrefix: 'ayres-story-producto',
    width: 1080,
    height: 1920,
  });
};

renderAll().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
