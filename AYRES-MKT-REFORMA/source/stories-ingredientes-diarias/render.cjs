// Stories diarias de ingredientes — 2 stories por producto (1080×1920).
// Story A: ingredientes (foto de fuentes + top 3 + extras).
// Story B: proteína/composición (cutout de producto + métricas + presentaciones).
// Output: carpeta única con archivos numerados por día, listos para el planner de Meta.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');
const { loadVisualProducts } = require('../../../IngredProdVisual/_produccion/visual-product-data.cjs');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const collectionRoot = path.join(repoRoot, 'IngredProdVisual');
const outputDir = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'ingredientes-diarias');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const logoLight = pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href;
const logoDark = pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href;
const fontFlorensa = pathToFileURL(path.join(repoRoot, 'social', 'carrusel-14-gastritis-gatos', 'assets', 'Florensa-Demo.ttf')).href;
const fontArboria = pathToFileURL(path.join(repoRoot, 'social', 'carrusel-14-gastritis-gatos', 'assets', 'Arboria-Black.ttf')).href;

const allProducts = loadVisualProducts(repoRoot, collectionRoot);

// Interleave brands/species for variety
const byBrand = {};
for (const p of allProducts) { (byBrand[p.brand] ??= []).push(p); }
const brandOrder = ['Fawna', 'Old Prince', 'Kongo', 'Voraz', 'High Pro Criadores', 'Company',
  'Maintenance', 'Kongo Gold', 'Natural Meat', 'Origen by Company', 'Carnix', 'Cereales', 'Caudillo'];
const queues = brandOrder.map((b) => byBrand[b] || []).filter((q) => q.length);
const ordered = [];
while (queues.some((q) => q.length)) {
  for (const q of queues) { if (q.length) ordered.push(q.shift()); }
}

// ── Story A: Ingredientes (light theme) ─────────────────────────────────────
const buildIngredientStory = (product) => {
  const photoUrl = pathToFileURL(product.photoPath).href;
  const ingredientRows = product.ingredients.map((ing, i) =>
    `<div class="ing"><b>0${i + 1}</b><span>${ing}</span></div>`).join('');
  const extraChips = product.extras.map((e) => `<span>${e}</span>`).join('');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080, initial-scale=1">
<style>
@font-face{font-family:Florensa;src:url(${fontFlorensa}) format("truetype")}
@font-face{font-family:Arboria;src:url(${fontArboria}) format("truetype");font-weight:900}
:root{--accent:${product.accent};--dark:#3e484e;--muted:#7a8a92;--cream:#f5f4f2}
*{box-sizing:border-box}
html,body,main{width:1080px;height:1920px;margin:0;overflow:hidden}
body{background:var(--cream);-webkit-font-smoothing:antialiased}
main{position:relative;isolation:isolate;color:var(--dark);font-family:Florensa,Arial,sans-serif;background:linear-gradient(150deg,#faf9f6,#f0eee9 66%,#e6ebe6)}
main:before{position:absolute;z-index:-2;top:-260px;right:-220px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 22%,transparent),transparent 68%);content:""}
.safe{position:absolute;inset:250px 78px 270px}
header{display:flex;align-items:center;justify-content:space-between}
header img{width:210px}
header span{padding:13px 18px;border:1px solid rgba(62,72,78,.28);border-radius:100px;font:900 13px Arboria,Arial,sans-serif;letter-spacing:2px}
.badge{margin-top:10px;color:var(--accent);font:900 14px Arboria,Arial,sans-serif;letter-spacing:3px}
.badge:after{display:block;width:54px;height:4px;margin-top:10px;background:var(--accent);content:""}
h1{margin:12px 0 0;text-transform:uppercase;line-height:.94}
h1 span{display:block;font:400 48px Florensa,Arial,sans-serif}
h1 em{display:block;color:var(--accent);font:400 44px Florensa,Arial,sans-serif;font-style:normal}
.source{margin:8px 0 0;color:#5c6a70;font:900 15px Arboria,Arial,sans-serif}
.photo{position:absolute;top:520px;right:78px;left:78px;height:370px;overflow:hidden;background:#eadfcd;box-shadow:0 20px 50px rgba(42,48,53,.1)}
.photo img{position:absolute;width:${product.photoPosition === 'full' ? '100%' : '200%'};height:100%;object-fit:cover;${product.photoPosition === 'right' ? 'left:-100%' : 'left:0'}}
.photo>span{position:absolute;right:14px;bottom:13px;padding:9px 11px;background:rgba(42,48,53,.84);color:#fff;font:900 9px Arboria,Arial,sans-serif;letter-spacing:1.3px}
.panel{position:absolute;top:920px;right:78px;left:78px;padding:30px 32px 24px;background:rgba(255,255,255,.96);box-shadow:0 24px 55px rgba(42,48,53,.1)}
.panel:before{position:absolute;top:0;right:0;left:0;height:6px;background:var(--accent);content:""}
.panel-label{margin:0;color:var(--muted);font:900 12px Arboria,Arial,sans-serif;letter-spacing:1.8px}
.visual-line{margin:8px 0 18px;color:var(--dark);font:900 24px Arboria,Arial,sans-serif}
.ing{display:flex;align-items:center;gap:14px;padding:14px 0;border-top:1px solid rgba(62,72,78,.14);font:900 15px Arboria,Arial,sans-serif;text-transform:uppercase}
.ing b{display:grid;width:34px;height:34px;flex:none;place-items:center;border-radius:50%;background:var(--accent);color:#fff;font-size:11px}
.extras{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.extras span{padding:9px 12px;border:1px solid color-mix(in srgb,var(--accent) 45%,#ddd);border-radius:99px;color:var(--dark);font:900 10px Arboria,Arial,sans-serif;letter-spacing:1px;text-transform:uppercase}
.cta{position:absolute;bottom:340px;left:78px;padding:18px 24px;background:var(--accent);color:#fff;font:900 14px Arboria,Arial,sans-serif;letter-spacing:1.5px;box-shadow:0 12px 32px color-mix(in srgb,var(--accent) 30%,transparent)}
footer{position:absolute;right:0;bottom:0;left:0;display:flex;justify-content:space-between;padding-top:23px;border-top:1px solid rgba(62,72,78,.23);font:900 14px Arboria,Arial,sans-serif}
footer b{color:var(--accent)}
footer i{color:var(--muted);font-style:normal}
</style>
</head>
<body>
<main>
  <section class="safe">
    <header>
      <img src="${logoLight}" alt="AYRES">
      <span>INGREDIENTES</span>
    </header>
    <p class="badge">${product.categoryLabel} · EN DETALLE</p>
    <h1><span>${product.title.primary}</span><em>${product.title.secondary}</em></h1>
    <p class="source">${product.firstSource} como fuente del primer ingrediente declarado.</p>
    <footer><b>@ayres.petsupply</b><i>DISTRIBUCIÓN MAYORISTA</i></footer>
  </section>
  <section class="photo">
    <img src="${photoUrl}" alt="Fuentes de ingredientes">
    <span>REPRESENTACIÓN VISUAL</span>
  </section>
  <section class="panel">
    <p class="panel-label">LOS 3 PRIMEROS INGREDIENTES</p>
    <p class="visual-line">${product.visualLine}</p>
    ${ingredientRows}
    ${extraChips.length ? `<div class="extras">${extraChips}</div>` : ''}
  </section>
  <div class="cta">CONOCÉ LA FÓRMULA · ELEGÍ CON INFORMACIÓN</div>
</main>
</body>
</html>`;
};

// ── Story B: Proteína / Composición (dark theme) ────────────────────────────
const buildProteinStory = (product) => {
  const cutoutUrl = pathToFileURL(product.imagePath).href;
  const metricRows = product.metrics.map((m) =>
    `<div class="metric-row"><span class="metric-label">${m.label}</span><b class="metric-value">${m.value}</b><span class="metric-qual">${m.qualifier}</span></div>`).join('');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080, initial-scale=1">
<style>
@font-face{font-family:Florensa;src:url(${fontFlorensa}) format("truetype")}
@font-face{font-family:Arboria;src:url(${fontArboria}) format("truetype");font-weight:900}
:root{--accent:${product.accent};--deep:#222b2f}
*{box-sizing:border-box}
html,body,main{width:1080px;height:1920px;margin:0;overflow:hidden}
body{background:var(--deep);-webkit-font-smoothing:antialiased}
main{position:relative;isolation:isolate;color:#fff;font-family:Florensa,Arial,sans-serif;background:linear-gradient(160deg,#2c363b,#1d2529 62%,#141c20)}
main:before{position:absolute;z-index:-2;top:-260px;right:-220px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 30%,transparent),transparent 68%);content:""}
main:after{position:absolute;z-index:-2;right:-340px;bottom:-480px;width:900px;height:900px;border:1px solid color-mix(in srgb,var(--accent) 30%,transparent);border-radius:50%;content:""}
.safe{position:absolute;inset:250px 78px 270px}
header{display:flex;align-items:center;justify-content:space-between}
header img{width:210px}
header span{padding:13px 18px;border:1px solid color-mix(in srgb,var(--accent) 75%,transparent);border-radius:100px;font:900 13px Arboria,Arial,sans-serif;letter-spacing:2px}
.badge{margin-top:10px;color:var(--accent);font:900 14px Arboria,Arial,sans-serif;letter-spacing:3px}
.badge:after{display:block;width:54px;height:4px;margin-top:10px;background:var(--accent);content:""}
h1{margin:12px 0 0;text-transform:uppercase;line-height:.94}
h1 span{display:block;font:400 48px Florensa,Arial,sans-serif}
h1 em{display:block;color:var(--accent);font:400 44px Florensa,Arial,sans-serif;font-style:normal}
.cutout{position:absolute;top:460px;left:50%;width:380px;height:540px;transform:translateX(-50%);display:flex;align-items:flex-end;justify-content:center}
.cutout:before{position:absolute;right:40px;bottom:20px;left:40px;height:70px;border-radius:50%;background:rgba(0,0,0,.25);filter:blur(28px);content:""}
.cutout img{position:relative;z-index:2;max-width:100%;max-height:500px;object-fit:contain;filter:drop-shadow(0 24px 22px rgba(0,0,0,.3))}
.protein-badge{position:absolute;z-index:4;top:440px;left:78px;min-width:200px;padding:18px 24px;border:2px solid var(--accent);border-radius:99px;background:rgba(255,255,255,.95);color:#3e484e;text-align:center}
.protein-badge strong{display:block;color:var(--accent);font:900 42px Arboria,Arial,sans-serif;line-height:.9}
.protein-badge small{font:900 12px Arboria,Arial,sans-serif;letter-spacing:1.5px}
.metrics{position:absolute;bottom:440px;right:78px;left:78px;display:grid;gap:14px}
.metric-row{display:flex;align-items:center;padding:22px 26px;background:rgba(255,255,255,.08);border-left:5px solid var(--accent)}
.metric-label{flex:1;color:#c8d1d4;font:900 13px Arboria,Arial,sans-serif;letter-spacing:1.5px}
.metric-value{color:var(--accent);font:900 32px Arboria,Arial,sans-serif;margin-right:8px}
.metric-qual{color:#8a969c;font:900 11px Arboria,Arial,sans-serif;letter-spacing:1px}
.presentations{position:absolute;bottom:350px;right:78px;left:78px;padding-top:16px;border-top:1px solid rgba(255,255,255,.2);color:#c8d1d4;font:900 14px Arboria,Arial,sans-serif;letter-spacing:1.2px}
.presentations b{color:var(--accent);margin-right:16px}
.cta{position:absolute;bottom:280px;left:78px;right:78px;padding:24px 30px;border:2px solid var(--accent);background:color-mix(in srgb,var(--accent) 10%,transparent);color:#fff;font:900 16px Arboria,Arial,sans-serif;letter-spacing:1.2px;text-align:center}
footer{position:absolute;right:0;bottom:0;left:0;display:flex;justify-content:space-between;padding-top:23px;border-top:1px solid rgba(255,255,255,.25);font:900 14px Arboria,Arial,sans-serif}
footer b{color:var(--accent)}
footer i{color:#aebbc0;font-style:normal}
</style>
</head>
<body>
<main>
  <section class="safe">
    <header>
      <img src="${logoDark}" alt="AYRES">
      <span>COMPOSICIÓN</span>
    </header>
    <p class="badge">${product.categoryLabel} · DATOS DECLARADOS</p>
    <h1><span>${product.title.primary}</span><em>${product.title.secondary}</em></h1>
    <footer><b>@ayres.petsupply</b><i>DISTRIBUCIÓN MAYORISTA</i></footer>
  </section>
  <div class="protein-badge">
    <strong>${product.metrics[0].value}</strong>
    <small>PROTEÍNA ${product.metrics[0].qualifier}</small>
  </div>
  <div class="cutout"><img src="${cutoutUrl}" alt="${product.name}"></div>
  <section class="metrics">
    ${metricRows}
  </section>
  <div class="presentations"><b>PRESENTACIONES</b>${product.presentations}</div>
  <div class="cta">PEDÍ LA LISTA DE PRECIOS POR WHATSAPP</div>
</main>
</body>
</html>`;
};

// ── Render ───────────────────────────────────────────────────────────────────
fs.mkdirSync(outputDir, { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ayres-stories-diarias-'));

const renderStory = (html, outputPath, label) => {
  const htmlPath = path.join(tmpDir, `${label}.html`);
  fs.writeFileSync(htmlPath, html);
  const result = spawnSync(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
    '--allow-file-access-from-files', '--window-size=1080,1920',
    `--screenshot=${outputPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'pipe', timeout: 30000 });
  if (result.status !== 0) {
    console.error(`Error ${label}: ${result.stderr?.toString()}`);
    process.exit(1);
  }
};

let day = 1;
for (const product of ordered) {
  const dayStr = String(day).padStart(3, '0');
  const slugClean = product.slug;

  const outA = path.join(outputDir, `${dayStr}a-ingredientes-${slugClean}-1080x1920.png`);
  const outB = path.join(outputDir, `${dayStr}b-composicion-${slugClean}-1080x1920.png`);

  renderStory(buildIngredientStory(product), outA, `${dayStr}a-${slugClean}`);
  console.log(`Día ${day} A: ${outA}`);

  renderStory(buildProteinStory(product), outB, `${dayStr}b-${slugClean}`);
  console.log(`Día ${day} B: ${outB}`);

  day++;
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log(`\nTotal: ${ordered.length} productos × 2 stories = ${ordered.length * 2} archivos en ${outputDir}`);
