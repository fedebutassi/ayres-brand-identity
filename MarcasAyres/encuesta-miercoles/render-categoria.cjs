const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const source = path.join(__dirname, 'categoria.html');
const output = path.join(__dirname, 'output-categorias');
const target = path.join(output, '02-encuesta-categoria-mas-consultada-background-perro-gato-1080x1920.png');
fs.mkdirSync(output, { recursive: true });

const child = spawn(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
  '--window-size=1080,1920', `--screenshot=${target}`, pathToFileURL(source).href,
], { stdio: 'ignore' });

child.on('error', (error) => { console.error(error.message); process.exit(1); });
child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Chrome finalizó con código ${code}`);
    process.exit(1);
  }
  process.stdout.write(`${target}\n`);
});
