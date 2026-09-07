const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const page = path.join(__dirname, 'chat-retail.html');
const output = path.resolve(__dirname, '..', '..', 'historias', '04-chatbot-asesoramiento-minorista-1080x1920.png');

const child = spawn(chrome, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=1600',
  '--window-size=1080,1920',
  `--screenshot=${output}`,
  pathToFileURL(page).href,
], { stdio: 'ignore' });

child.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Chrome finalizó con código ${code}`);
    process.exit(code || 1);
  }
  console.log(`Generado: ${output}`);
});
