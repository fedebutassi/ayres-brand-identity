const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { content, repoRoot } = require('./content.cjs');

const source = path.join(__dirname, 'carousel.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'carruseles', '16-cinco-errores-recomendar');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const imageFor = (id) => pathToFileURL(path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'assets', 'cutouts-exactos', `${id}.png`)).href;
const payload = {
  ...content,
  logoLight: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  logoDark: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
  slides: content.slides.map((slide, index) => ({
    ...slide,
    page: String(index + 1).padStart(2, '0'),
    products: slide.products?.map((item) => ({ ...item, image: imageFor(item.id) })),
  })),
};
const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');

const slugs = ['portada', 'error-empezar-por-marca', 'error-edad-tamano', 'error-un-solo-dato', 'error-promesas-medicas', 'error-sin-profundidad', 'cta-compartilo'];

const render = (index) => new Promise((resolve, reject) => {
  const number = String(index + 1).padStart(2, '0');
  const output = path.join(outputRoot, `${number}-${slugs[index]}-1080x1350.png`);
  const url = `${pathToFileURL(source).href}?slide=${index + 1}&payload=${encodeURIComponent(encoded)}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
    '--window-size=1080,1350', `--screenshot=${output}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => {
    if (code !== 0) return reject(new Error(`Placa ${number}: Chrome finalizó con código ${code}`));
    console.log(`Generado: ${output}`);
    return resolve();
  });
});

fs.mkdirSync(outputRoot, { recursive: true });
Promise.all(content.slides.map((_, index) => render(index))).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
