const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pageUrl = pathToFileURL(path.join(__dirname, 'cover.html')).href;
const carousels = ['premium', 'mainstream'];

const renderCover = (carousel) => {
  const outputDir = path.join(__dirname, '..', `carrusel-${carousel}`);
  const output = path.join(outputDir, `01-portada-${carousel}-1080x1350.png`);
  fs.mkdirSync(outputDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=1400',
      '--window-size=1080,1350',
      `--screenshot=${output}`,
      `${pageUrl}?carousel=${carousel}`,
    ], { stdio: 'ignore' });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code !== 0) return reject(new Error(`${carousel}: Chrome finalizó con código ${code}`));
      return resolve(output);
    });
  });
};

Promise.all(carousels.map(renderCover))
  .then((outputs) => outputs.forEach((output) => console.log(`Generado: ${output}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
