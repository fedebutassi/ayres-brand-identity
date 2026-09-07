const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const source = path.join(__dirname, 'ad.html');
const output = path.join(__dirname, '..', '..', 'produccion', 'pauta', 'b1-12-marcas-un-contacto');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const formats = [
  { name: 'b1-12-marcas-un-contacto-feed-1080x1350.png', size: '1080,1350', query: '' },
  { name: 'b1-12-marcas-un-contacto-story-1080x1920.png', size: '1080,1920', query: '?format=vertical' },
];

fs.mkdirSync(output, { recursive: true });

const render = ({ name, size, query }) => new Promise((resolve, reject) => {
  const target = path.join(output, name);
  const url = `${pathToFileURL(source).href}${query}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
    `--window-size=${size}`, `--screenshot=${target}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(target) : reject(new Error(`${name}: Chrome finalizó con código ${code}`)));
});

formats.reduce((chain, format) => chain.then((files) => render(format).then((file) => [...files, file])), Promise.resolve([]))
  .then((files) => process.stdout.write(`${files.join('\n')}\n`))
  .catch((error) => { console.error(error.message); process.exit(1); });
