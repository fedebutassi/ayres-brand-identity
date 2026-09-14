const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const outputDir = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'apoyo-reels-sep');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const logoPath = pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href;

const fontFlorensa = pathToFileURL(path.join(repoRoot, 'social', 'carrusel-14-gastritis-gatos', 'assets', 'Florensa-Demo.ttf')).href;
const fontArboria = pathToFileURL(path.join(repoRoot, 'social', 'carrusel-14-gastritis-gatos', 'assets', 'Arboria-Black.ttf')).href;

const stories = [
  {
    id: 'apoyo-sep-01',
    badge: 'NUEVO REEL',
    eyebrow: 'PETSHOPS · GÓNDOLA',
    title: '¿TU GÓNDOLA DE<br>CACHORROS TIENE<br>ESTAS <em>4 OPCIONES?</em>',
    subtitle: 'Revisá tu surtido de cachorros.',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-01/sep-01-gondola-cachorros/portada-1080x1920.png',
  },
  {
    id: 'apoyo-sep-02',
    badge: 'NUEVO REEL',
    eyebrow: 'MÉTODO DE VENTA · GATOS',
    title: 'ESTÁS PERDIENDO<br>VENTAS EN <em>GATOS.</em>',
    subtitle: 'Adulto, esterilizado y urinario<br>no son lo mismo.',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-02/sep-02-gato-tres-lineas/portada-1080x1920.png',
  },
  {
    id: 'apoyo-sep-03',
    badge: 'NUEVO REEL',
    eyebrow: 'SURTIDO · CÓRDOBA',
    title: '3 MARCAS QUE TUS<br>COLEGAS YA ESTÁN<br><em>VENDIENDO.</em>',
    subtitle: '¿Las tenés en tu góndola?',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-03/sep-03-marcas-que-rotan/portada-1080x1920.png',
  },
  {
    id: 'apoyo-sep-04',
    badge: 'NUEVO REEL',
    eyebrow: 'SURTIDO · PRIMAVERA',
    title: 'EN PRIMAVERA CAMBIA<br>LA DEMANDA — ¿TU<br>GÓNDOLA ESTÁ <em>LISTA?</em>',
    subtitle: 'Cada temporada tiene su pico.',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-04/sep-04-surtido-temporada/portada-1080x1920.png',
  },
  {
    id: 'apoyo-sep-05',
    badge: 'NUEVO REEL',
    eyebrow: 'MARGEN · GATOS',
    title: '¿VENDÉS ALIMENTO<br>PARA GATOS Y NO<br>TENÉS <em>PIEDRAS?</em>',
    subtitle: 'Tu cliente compra alimento Y piedras.',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-05/sep-05-piedras-sanitarias/portada-1080x1920.png',
  },
  {
    id: 'apoyo-sep-06',
    badge: 'NUEVO REEL',
    eyebrow: 'PRIMER PEDIDO · PETSHOPS',
    title: 'SI ARRANCÁS UN<br>PETSHOP, ESTE ES<br>EL <em>PEDIDO INICIAL.</em>',
    subtitle: 'Con una selección inteligente<br>cubrís el 80% de la demanda.',
    cover: 'AYRES-MKT-REFORMA/produccion/reels/sep-06/sep-06-pedido-petshop-nuevo/portada-1080x1920.png',
  },
];

const buildHtml = (story) => {
  const coverUrl = pathToFileURL(path.join(repoRoot, story.cover)).href;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080, initial-scale=1">
<style>
@font-face{font-family:Florensa;src:url(${fontFlorensa}) format("truetype");font-weight:400;font-style:normal;font-display:block}
@font-face{font-family:Arboria;src:url(${fontArboria}) format("truetype");font-weight:900;font-style:normal;font-display:block}
:root{--green:#3db870;--deep:#222b2f;--cream:#f5f4f2}
*{box-sizing:border-box}
html,body,main{width:1080px;height:1920px;margin:0;overflow:hidden}
body{background:var(--deep);-webkit-font-smoothing:antialiased}
main{position:relative;isolation:isolate;color:#fff;font-family:Florensa,Arial,sans-serif}
.cover{position:absolute;z-index:-4;inset:0;width:100%;height:100%;object-fit:cover;object-position:center bottom;filter:blur(7px);transform:scale(1.06)}
.veil{position:absolute;z-index:-3;inset:0;background:linear-gradient(180deg,rgba(25,32,35,.97) 0%,rgba(25,32,35,.9) 52%,rgba(25,32,35,.8) 100%)}
.safe{position:absolute;inset:115px 78px 105px}
header{display:flex;align-items:center;justify-content:space-between}
header img{width:225px;filter:brightness(0) invert(1)}
header span{padding:13px 18px;border:1px solid rgba(61,184,112,.75);border-radius:100px;font:900 13px Arboria,Arial,sans-serif;letter-spacing:2px}
.copy{margin-top:270px}
.copy p{margin:0;color:var(--green);font:900 17px Arboria,Arial,sans-serif;letter-spacing:3px}
h1{margin:28px 0 0;font:400 88px/.96 Florensa,Arial,sans-serif;letter-spacing:-1px;text-transform:uppercase}
h1 em{color:var(--green);font-style:normal}
.rule{width:62px;height:5px;margin:36px 0;background:var(--green)}
h2{max-width:790px;margin:0;color:#e4e9e9;font:400 34px/1.3 Florensa,Arial,sans-serif}
.share{position:absolute;right:0;bottom:205px;left:0;padding:30px 35px;border:2px solid var(--green);background:rgba(61,184,112,.10);font:900 18px Arboria,Arial,sans-serif;letter-spacing:1.2px;text-align:center}
footer{position:absolute;right:0;bottom:0;left:0;padding-top:23px;border-top:1px solid rgba(255,255,255,.25);color:var(--green);font:900 14px Arboria,Arial,sans-serif}
</style>
</head>
<body>
<main>
  <img class="cover" src="${coverUrl}" alt="">
  <div class="veil"></div>
  <section class="safe">
    <header>
      <img src="${logoPath}" alt="AYRES Pet Supply">
      <span>${story.badge}</span>
    </header>
    <div class="copy">
      <p>${story.eyebrow}</p>
      <h1>${story.title}</h1>
      <div class="rule"></div>
      <h2>${story.subtitle}</h2>
    </div>
    <div class="share">MIRÁ EL NUEVO REEL ↓</div>
    <footer>@ayres.petsupply</footer>
  </section>
</main>
</body>
</html>`;
};

fs.mkdirSync(outputDir, { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ayres-story-apoyo-'));

for (let i = 0; i < stories.length; i++) {
  const story = stories[i];
  const htmlPath = path.join(tmpDir, `${story.id}.html`);
  const outputPath = path.join(outputDir, `${String(i + 1).padStart(2, '0')}-${story.id}-1080x1920.png`);

  fs.writeFileSync(htmlPath, buildHtml(story));

  const result = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
    '--allow-file-access-from-files', `--window-size=1080,1920`,
    `--screenshot=${outputPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'pipe', timeout: 30000 });

  if (result.status !== 0) {
    console.error(`Error en ${story.id}: ${result.stderr?.toString()}`);
    process.exit(1);
  }
  console.log(`Generado: ${outputPath}`);
}

fs.rmSync(tmpDir, { recursive: true, force: true });
