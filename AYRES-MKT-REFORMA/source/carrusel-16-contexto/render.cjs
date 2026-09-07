const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { content, repoRoot } = require('./content.cjs');

const source = path.join(__dirname, 'carousel.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'carruseles', '16-cinco-errores-recomendar-alimento');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = ['portada', 'mas-proteina', 'mismo-porcentaje', 'premium-mejor', 'solo-marca', 'experiencia-individual', 'preguntar-mejor'];

const payload = {
  ...content,
  logo: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
  slides: content.slides.map((slide) => ({
    ...slide,
    photo: pathToFileURL(path.join(__dirname, 'assets', slide.photo)).href,
  })),
};
const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');

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
