const path = require('path');
const { pathToFileURL } = require('url');
const { spawn } = require('child_process');
const { loadCampaigns } = require('./campaign-data.cjs');

const repoRoot = path.resolve(__dirname, '../..');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const logo = pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href;

const render = (campaign) => new Promise((resolve, reject) => {
  const hydrated = {
    ...campaign,
    photo: pathToFileURL(path.join(__dirname, 'assets', campaign.photo)).href,
    products: campaign.products?.map((product) => ({
      ...product, image: pathToFileURL(product.imagePath).href,
    })),
    product: campaign.product ? {
      ...campaign.product, image: pathToFileURL(campaign.product.imagePath).href,
    } : undefined,
  };
  const content = Buffer.from(JSON.stringify({ logo, campaign: hydrated }), 'utf8').toString('base64');
  const page = pathToFileURL(path.join(__dirname, 'serie.html')).href;
  const pageUrl = `${page}?content=${encodeURIComponent(content)}`;
  const output = path.join(__dirname, `${campaign.number}-${campaign.slug}-1080x1350.png`);
  const child = spawn(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=1600', '--window-size=1080,1350', `--screenshot=${output}`, pageUrl,
  ], { stdio: 'ignore' });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve(output) : reject(new Error(`Chrome finalizó con código ${code}`)));
});

const main = async () => {
  for (const campaign of loadCampaigns(repoRoot)) {
    const output = await render(campaign);
    console.log(`Generado: ${output}`);
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
