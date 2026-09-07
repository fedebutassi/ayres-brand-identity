const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const outputDir = path.join(__dirname, 'output', 'carrusel');
const pageUrl = pathToFileURL(path.join(__dirname, 'brand-cover-variants.html')).href;
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const availableVariants = ['v02', 'v03', 'v04', 'v05', 'v06'];
const requestedVariants = process.argv.slice(2);
const variants = requestedVariants.length ? requestedVariants : availableVariants;

const unknownVariants = variants.filter((variant) => !availableVariants.includes(variant));
if (unknownVariants.length) {
  console.error(`Variantes inexistentes: ${unknownVariants.join(', ')}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const renderVariant = (variant) => new Promise((resolve, reject) => {
  const output = path.join(outputDir, `ayres-portada-carrusel-marcas-${variant}-1080x1350.png`);
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
    '--window-size=1080,1350', `--screenshot=${output}`, `${pageUrl}?variant=${variant}`,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(output) : reject(new Error(`${variant}: Chrome finalizó con código ${code}`)));
});

Promise.all(variants.map(renderVariant))
  .then((outputs) => outputs.forEach((output) => console.log(`Generado: ${output}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
