const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { slides, repoRoot } = require('./content.cjs');

const source = path.join(__dirname, 'countdown.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'expovet-countdown');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const bgImage = pathToFileURL(path.join(repoRoot, 'AYRES-MKT-REFORMA', 'ayres-expovet-story-1080x1920.jpg')).href;

const payload = { slides, bgImage };
const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');

const slugs = ['faltan-4-dias', 'faltan-3-dias', 'faltan-2-dias', 'falta-1-dia'];

const render = (index) => new Promise((resolve, reject) => {
  const output = path.join(outputRoot, `${slugs[index]}-1080x1920.png`);
  const url = `${pathToFileURL(source).href}?slide=${index + 1}&payload=${encodeURIComponent(encoded)}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1500',
    '--allow-file-access-from-files',
    '--window-size=1080,1920', `--screenshot=${output}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => {
    if (code !== 0) return reject(new Error(`Story ${slugs[index]}: Chrome finalizó con código ${code}`));
    console.log(`Generado: ${output}`);
    return resolve();
  });
});

fs.mkdirSync(outputRoot, { recursive: true });
Promise.all(slides.map((_, index) => render(index))).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
