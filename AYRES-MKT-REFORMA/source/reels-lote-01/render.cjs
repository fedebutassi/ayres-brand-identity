const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { reels, repoRoot } = require('./content.cjs');

const source = path.join(__dirname, 'reel.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'reels', 'lote-01');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const requestedIds = process.argv.slice(2);
const selected = requestedIds.length ? reels.filter(({ id }) => requestedIds.includes(id)) : reels;

if (selected.length !== (requestedIds.length || reels.length)) {
  throw new Error('Se solicitó un Reel inexistente.');
}

const hydrateProduct = (item) => ({
  ...item,
  image: pathToFileURL(path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'assets', 'cutouts-exactos', `${item.id}.png`)).href,
});

const hydrateScene = (scene) => ({
  ...scene,
  products: scene.products?.map(hydrateProduct),
  focus: scene.focus ? hydrateProduct(scene.focus) : undefined,
});

const jobs = [];
fs.mkdirSync(outputRoot, { recursive: true });
for (const reel of selected) {
  const frameDir = path.join(outputRoot, reel.id, 'frames');
  const motionDir = path.join(outputRoot, reel.id, 'motion');
  fs.mkdirSync(frameDir, { recursive: true });
  fs.mkdirSync(motionDir, { recursive: true });
  const payload = {
    ...reel,
    scenes: reel.scenes.map(hydrateScene),
    logoDark: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
    logoLight: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  for (let index = 0; index < reel.scenes.length; index += 1) {
    const frame = String(index + 1).padStart(2, '0');
    const output = path.join(frameDir, `${frame}.png`);
    const startOutput = path.join(motionDir, `${frame}-start.png`);
    const baseUrl = `${pathToFileURL(source).href}?scene=${index + 1}&payload=${encodeURIComponent(encoded)}`;
    const url = `${baseUrl}&motion=final`;
    const startUrl = `${baseUrl}&motion=start`;
    jobs.push({ output, url });
    jobs.push({ output: startOutput, url: startUrl });
  }
}

const createCdpClient = (child) => {
  let buffer = Buffer.alloc(0);
  let commandId = 0;
  const pending = new Map();
  const eventWaiters = [];

  child.stdio[4].on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    let delimiter = buffer.indexOf(0);
    while (delimiter !== -1) {
      const raw = buffer.subarray(0, delimiter).toString('utf8');
      buffer = buffer.subarray(delimiter + 1);
      if (raw) {
        const message = JSON.parse(raw);
        const request = pending.get(message.id);
        if (request) {
          pending.delete(message.id);
          if (message.error) request.reject(new Error(message.error.message));
          else request.resolve(message.result);
        }
        eventWaiters
          .filter(({ method, sessionId }) => method === message.method && sessionId === message.sessionId)
          .forEach(({ resolve }) => resolve(message.params));
        for (let index = eventWaiters.length - 1; index >= 0; index -= 1) {
          const waiter = eventWaiters[index];
          if (waiter.method === message.method && waiter.sessionId === message.sessionId) eventWaiters.splice(index, 1);
        }
      }
      delimiter = buffer.indexOf(0);
    }
  });

  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    commandId += 1;
    pending.set(commandId, { resolve, reject });
    child.stdio[3].write(`${JSON.stringify({ id: commandId, method, params, sessionId })}\0`);
  });
  const waitFor = (method, sessionId) => new Promise((resolve) => eventWaiters.push({ method, sessionId, resolve }));
  return { send, waitFor };
};

const launchChrome = () => {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ayres-reel-render-'));
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
    '--allow-file-access-from-files', '--remote-debugging-pipe', `--user-data-dir=${profile}`,
    '--window-size=1080,1920', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] });
  return { child, profile };
};

const waitForAssets = `Promise.all([
  document.fonts.ready,
  ...Array.from(document.images).map((image) => image.decode ? image.decode().catch(() => true) : true)
]).then(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)))))`;

const main = async () => {
  const { child, profile } = launchChrome();
  const cdp = createCdpClient(child);
  try {
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false,
    }, sessionId);

    for (const job of jobs) {
      const loaded = cdp.waitFor('Page.loadEventFired', sessionId);
      await cdp.send('Page.navigate', { url: job.url }, sessionId);
      await loaded;
      await cdp.send('Runtime.evaluate', { expression: waitForAssets, awaitPromise: true }, sessionId);
      const { data } = await cdp.send('Page.captureScreenshot', {
        format: 'png', fromSurface: true, captureBeyondViewport: false,
      }, sessionId);
      fs.writeFileSync(job.output, Buffer.from(data, 'base64'));
      console.log(`Generado: ${job.output}`);
    }
  } finally {
    child.kill('SIGTERM');
    fs.rmSync(profile, { recursive: true, force: true });
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
