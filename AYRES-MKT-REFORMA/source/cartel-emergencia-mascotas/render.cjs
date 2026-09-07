const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const source = path.join(__dirname, 'cartel.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'merch', 'cartel-emergencia');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(outputRoot, { recursive: true });
for (const variant of ['dark', 'light']) {
  const output = path.join(outputRoot, `cartel-emergencia-${variant}-2160x2160.png`);
  const url = `${pathToFileURL(source).href}?v=${variant}`;
  const result = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
    '--force-device-scale-factor=2',
    '--window-size=1080,1080', `--screenshot=${output}`, url,
  ]);
  if (result.status !== 0) throw new Error(`Cartel ${variant}: Chrome finalizó con código ${result.status}`);
  console.log(`Generado: ${output}`);
}
