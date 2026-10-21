const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { slides, productIds, repoRoot } = require('./content.cjs');

const source = path.join(__dirname, 'story-compare.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'comparativa-fawna-gatos');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const cutouts = {};
for (const id of productIds) {
  cutouts[id] = pathToFileURL(path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'assets', 'cutouts-exactos', `${id}.png`)).href;
}

const payload = {
  slides,
  cutouts,
  logoLight: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  logoDark: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
};
const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');

const slugs = ['comparativa-tabla', 'ingredientes-detalle', 'cta-whatsapp'];

const render = (index) => new Promise((resolve, reject) => {
  const number = String(index + 1).padStart(2, '0');
  const output = path.join(outputRoot, `${number}-${slugs[index]}-1080x1920.png`);
  const url = `${pathToFileURL(source).href}?slide=${index + 1}&payload=${encodeURIComponent(encoded)}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1500',
    '--window-size=1080,1920', `--screenshot=${output}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => {
    if (code !== 0) return reject(new Error(`Story ${number}: Chrome finalizó con código ${code}`));
    console.log(`Generado: ${output}`);
    return resolve();
  });
});

fs.mkdirSync(outputRoot, { recursive: true });
Promise.all(slides.map((_, index) => render(index))).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
