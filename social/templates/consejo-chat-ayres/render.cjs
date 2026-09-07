const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const [contentArg, framesArg, variantArg] = process.argv.slice(2);
if (!contentArg || !framesArg) {
  console.error('Uso: node render.cjs <content.json> <frames-dir>');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '../../..');
const contentPath = path.resolve(contentArg);
const framesPath = path.resolve(framesArg);
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const payload = {
  ...content,
  background: pathToFileURL(path.join(repoRoot, content.background)).href,
  icon: pathToFileURL(path.join(repoRoot, 'assets/logo-light.svg')).href,
  logo: pathToFileURL(path.join(repoRoot, 'assets/logo-dark.svg')).href,
};
const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const pageUrl = pathToFileURL(path.join(__dirname, 'chat.html')).href;
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(framesPath, { recursive: true });

const variants = ['a', 'b'].includes(variantArg) ? [variantArg] : ['a', 'b'];
for (const variant of variants) {
  for (let scene = 1; scene <= 5; scene += 1) {
    const filename = `variant-${variant}-scene-${scene}.png`;
    const output = path.join(framesPath, filename);
    const url = `${pageUrl}?variant=${variant}&scene=${scene}&content=${encodeURIComponent(encoded)}`;
    const result = spawnSync(chrome, [
      '--headless', '--disable-gpu', '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1200',
      '--window-size=1080,1920', `--screenshot=${output}`, url,
    ], { stdio: 'inherit' });
    if (result.status !== 0) process.exit(result.status || 1);
  }
}
