const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const source = path.join(__dirname, 'carousel.html');
const output = path.join(__dirname, 'output');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = [
  'portada-marcas-ayres',
  'fawna-old-prince',
  'kongo-voraz',
  'company-origen',
  'maintenance-high-pro',
  'natural-meat-carnix-caudillo-cereales',
  'cta-catalogo-mayorista',
];

fs.mkdirSync(output, { recursive: true });

const render = (index) => new Promise((resolve, reject) => {
  const number = String(index + 1).padStart(2, '0');
  const target = path.join(output, `${number}-${slugs[index]}-1080x1350.png`);
  const url = `${pathToFileURL(source).href}?slide=${index + 1}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
    '--window-size=1080,1350', `--screenshot=${target}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(target) : reject(new Error(`Placa ${number}: Chrome finalizó con código ${code}`)));
});

Promise.all(slugs.map((_, index) => render(index)))
  .then((files) => process.stdout.write(`${files.join('\n')}\n`))
  .catch((error) => { console.error(error.message); process.exit(1); });
