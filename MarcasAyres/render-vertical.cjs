const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const source = path.join(__dirname, 'carousel.html');
const storyDir = path.join(__dirname, 'stories');
const reelDir = path.join(__dirname, 'reel');
const frameDir = path.join(reelDir, 'frames');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ffmpeg = '/opt/homebrew/bin/ffmpeg';
const slugs = [
  'portada-marcas-ayres',
  'fawna-old-prince',
  'kongo-voraz',
  'company-origen',
  'maintenance-high-pro',
  'natural-meat-carnix-caudillo-cereales',
  'cta-catalogo-mayorista',
];

for (const dir of [storyDir, reelDir, frameDir]) fs.mkdirSync(dir, { recursive: true });

const spawnChecked = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { stdio: options.stdio || 'inherit' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`${path.basename(command)} finalizó con código ${code}`)));
});

async function renderFrames() {
  for (let index = 0; index < slugs.length; index += 1) {
    const number = String(index + 1).padStart(2, '0');
    const story = path.join(storyDir, `${number}-${slugs[index]}-story-1080x1920.png`);
    const frame = path.join(frameDir, `${number}.png`);
    const storyUrl = `${pathToFileURL(source).href}?slide=${index + 1}&format=vertical`;
    const reelUrl = `${storyUrl}&medium=reel`;
    await spawnChecked(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
      '--window-size=1080,1920', `--screenshot=${story}`, storyUrl,
    ], { stdio: 'ignore' });
    await spawnChecked(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1800',
      '--window-size=1080,1920', `--screenshot=${frame}`, reelUrl,
    ], { stdio: 'ignore' });
    process.stdout.write(`Generado: ${story}\n`);
    process.stdout.write(`Generado: ${frame}\n`);
  }
}

async function buildReel() {
  const inputs = [];
  for (let index = 0; index < slugs.length; index += 1) {
    inputs.push('-loop', '1', '-t', '3.2', '-i', path.join(frameDir, `${String(index + 1).padStart(2, '0')}.png`));
  }
  const chains = [];
  for (let index = 0; index < slugs.length; index += 1) {
    chains.push(`[${index}:v]fps=30,format=yuv420p,settb=AVTB[v${index}]`);
  }
  let previous = 'v0';
  for (let index = 1; index < slugs.length; index += 1) {
    const out = `x${index}`;
    const offset = (index * 2.85).toFixed(2);
    chains.push(`[${previous}][v${index}]xfade=transition=fade:duration=0.35:offset=${offset}[${out}]`);
    previous = out;
  }
  const target = path.join(reelDir, 'marcas-ayres-reel-1080x1920.mp4');
  await spawnChecked(ffmpeg, [
    '-y', ...inputs,
    '-filter_complex', chains.join(';'),
    '-map', `[${previous}]`, '-t', '20.3',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target,
  ], { stdio: 'ignore' });
  process.stdout.write(`Generado: ${target}\n`);
}

renderFrames().then(buildReel).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
