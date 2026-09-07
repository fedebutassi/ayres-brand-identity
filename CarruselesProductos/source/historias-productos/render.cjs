const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const source = path.join(__dirname, 'story.html');
const outputRoot = path.resolve(__dirname, '..', '..', 'historias');
const jobs = [
  ['choice', '02-que-alimento-elegir-1080x1920.png'],
  ['compare', '03-compara-informate-elegi-mejor-1080x1920.png'],
];

const render = ([variant, filename]) => new Promise((resolve, reject) => {
  const output = path.join(outputRoot, filename);
  const url = `${pathToFileURL(source).href}?variant=${variant}`;
  const child = spawn(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=1600',
    '--window-size=1080,1920',
    `--screenshot=${output}`,
    url,
  ], { stdio: 'ignore' });

  child.on('error', reject);
  child.on('exit', (code) => {
    if (code !== 0) return reject(new Error(`${variant}: Chrome finalizó con código ${code}`));
    console.log(`Generado: ${output}`);
    return resolve(output);
  });
});

Promise.all(jobs.map(render)).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
