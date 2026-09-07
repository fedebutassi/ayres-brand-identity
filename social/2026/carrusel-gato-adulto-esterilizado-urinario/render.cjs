const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { pathToFileURL } = require('url');
const { loadCarouselData } = require('./carousel-data.cjs');

const WIDTH = 1080;
const HEIGHT = 1350;
const OUTPUT = path.join(__dirname, 'output');
const NAMES = [
  '01-portada-gato-adulto-esterilizado-urinario.png',
  '02-ingredientes-compartidos.png',
  '03-proteina-y-grasa.png',
  '04-fibra-maxima.png',
  '05-calcio-y-fosforo.png',
  '06-tabla-comparativa.png',
  '07-recomendacion-y-distribucion-ayres.png',
];

function findChrome() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ];
  return candidates.find(fs.existsSync) || 'google-chrome';
}

function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });
  const payload = Buffer.from(JSON.stringify(loadCarouselData())).toString('base64');
  const page = pathToFileURL(path.join(__dirname, 'carousel.html')).href;
  const chrome = findChrome();

  NAMES.forEach((name, index) => {
    const screenshot = path.join(OUTPUT, name);
    const url = `${page}?slide=${index + 1}&payload=${encodeURIComponent(payload)}`;
    const result = spawnSync(chrome, [
      '--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-sandbox',
      `--window-size=${WIDTH},${HEIGHT}`, '--force-device-scale-factor=1',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=2500',
      `--screenshot=${screenshot}`, url,
    ], { encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr || `Chrome falló en placa ${index + 1}`);
    if (!fs.existsSync(screenshot) || fs.statSync(screenshot).size < 10000) {
      throw new Error(`La placa ${index + 1} no se generó correctamente`);
    }
    console.log(`✓ ${name}`);
  });
}

main();
