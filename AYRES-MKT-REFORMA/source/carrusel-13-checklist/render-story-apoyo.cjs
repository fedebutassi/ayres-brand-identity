const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const source = path.join(__dirname, 'story-apoyo.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'CALENDARIO-PUBLICACIONES', '01-PLAN-ORGANICO', '12-08-26-miercoles', 'STORY');
const output = path.join(outputRoot, '01-apoyo-carrusel-checklist-1080x1920.png');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(outputRoot, { recursive: true });
const child = spawn(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
  '--window-size=1080,1920', `--screenshot=${output}`, pathToFileURL(source).href,
], { stdio: 'ignore' });

child.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});
child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Chrome finalizó con código ${code}`);
    process.exit(1);
  }
  console.log(`Generado: ${output}`);
});
