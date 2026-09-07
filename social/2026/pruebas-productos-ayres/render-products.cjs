const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const renderProduct = (product, config) => {
  const payload = {
    ...product,
    image: pathToFileURL(product.imagePath).href,
    logo: pathToFileURL(product.logoPath).href,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  const pageUrl = pathToFileURL(config.pagePath).href;
  const output = path.join(config.outputDir, `${config.filePrefix}-${product.slug}-${config.width}x${config.height}.png`);
  const url = `${pageUrl}?content=${encodeURIComponent(encoded)}`;

  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
      `--window-size=${config.width},${config.height}`, `--screenshot=${output}`, url,
    ], { stdio: 'ignore' });
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolve(output) : reject(new Error(`Chrome finalizó con código ${code}`)));
  });
};

const renderProducts = async (products, config) => {
  fs.mkdirSync(config.outputDir, { recursive: true });
  const queue = [...products];
  const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
    while (queue.length) {
      const product = queue.shift();
      await renderProduct(product, config);
      console.log(`Generado: ${product.slug}`);
    }
  });
  await Promise.all(workers);
  console.log(`Total generado: ${products.length}`);
};

module.exports = { renderProducts };
