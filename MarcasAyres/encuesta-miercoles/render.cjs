const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const source = path.join(__dirname, 'story.html');
const output = path.join(__dirname, 'output');
const names = ['01-encuesta-tipo-de-audiencia-1080x1920.png', '02-encuesta-categoria-mas-consultada-1080x1920.png'];
fs.mkdirSync(output, { recursive: true });

const render = (index) => new Promise((resolve, reject) => {
  const target = path.join(output, names[index]);
  const url = `${pathToFileURL(source).href}?story=${index + 1}`;
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
    '--window-size=1080,1920', `--screenshot=${target}`, url,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(target) : reject(new Error(`Story ${index + 1}: Chrome finalizó con código ${code}`)));
});

Promise.all(names.map((_, index) => render(index)))
  .then((files) => process.stdout.write(`${files.join('\n')}\n`))
  .catch((error) => { console.error(error.message); process.exit(1); });
