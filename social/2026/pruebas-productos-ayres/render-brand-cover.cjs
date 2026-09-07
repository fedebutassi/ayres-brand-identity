const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const outputDir = path.join(__dirname, 'output', 'carrusel');
const output = path.join(outputDir, 'ayres-portada-marcas-seleccion-1080x1350.png');
const pageUrl = pathToFileURL(path.join(__dirname, 'brand-cover.html')).href;
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(outputDir, { recursive: true });

const child = spawn(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
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
