const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { loadSelection } = require('./selection.cjs');

const repoRoot = path.resolve(__dirname, '../..');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const content = {
  logo: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  products: loadSelection(repoRoot).map((product) => ({
    displayName: product.displayName,
    ingredients: product.ingredients,
    image: pathToFileURL(product.imagePath).href,
  })),
};
const encoded = Buffer.from(JSON.stringify(content), 'utf8').toString('base64');
const pageUrl = `${pathToFileURL(path.join(__dirname, 'comparativa.html')).href}?content=${encodeURIComponent(encoded)}`;
const output = path.join(__dirname, '01-salmon-cordero-1080x1350.png');

const child = spawn(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1600',
  '--window-size=1080,1350', `--screenshot=${output}`, pageUrl,
], { stdio: 'ignore' });

child.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});
child.on('exit', (code) => {
  if (code !== 0) process.exit(code || 1);
  console.log(`Generado: ${output}`);
});
