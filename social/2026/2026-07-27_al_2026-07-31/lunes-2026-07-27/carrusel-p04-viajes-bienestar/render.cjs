const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const outputDir = path.join(__dirname, 'output');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pageUrl = pathToFileURL(path.join(__dirname, 'carousel.html')).href;
const requested = Number(process.argv[2]);
const slides = Number.isInteger(requested) && requested >= 1 && requested <= 9
  ? [requested]
  : [1, 2, 3, 4, 5, 6, 7, 8, 9];

fs.mkdirSync(outputDir, { recursive: true });

for (const slide of slides) {
  const filename = `p04-viajes-slide-${String(slide).padStart(2, '0')}.png`;
  const output = path.join(outputDir, filename);
  const result = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1200',
    '--window-size=1080,1350', `--screenshot=${output}`, `${pageUrl}?slide=${slide}`,
  ], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
