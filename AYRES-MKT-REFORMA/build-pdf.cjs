const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname;
const OUT_DIR = path.resolve(ROOT, '..', 'output', 'pdf');
const TMP_DIR = path.resolve(ROOT, '..', 'tmp', 'pdfs', 'ayres-plan-organico');
const OUT_PDF = path.join(OUT_DIR, 'AYRES-plan-visibilidad-marketing-organico-2026.pdf');
const OUT_HTML = path.join(TMP_DIR, 'manual.html');

const sections = [
  {
    kicker: 'PARTE I - IMPLEMENTACIÓN',
    title: 'Guía práctica de ejecución',
    file: path.join(ROOT, 'GUIA-PRACTICA-EJECUCION.md'),
  },
  {
    kicker: 'PARTE II - ESTRATEGIA COMPLETA',
    title: 'Plan maestro de crecimiento para Instagram',
    file: path.join(ROOT, 'PLAN-MAESTRO-INSTAGRAM.md'),
  },
  {
    kicker: 'PARTE III - SEGUIMIENTO',
    title: 'Estado actual de producción',
    file: path.join(ROOT, 'ESTADO-PRODUCCION.md'),
  },
];

function normalizeText(value) {
  return value
    .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, '-')
    .replace(/\u2192/g, '->')
    .replace(/\u00a0/g, ' ');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(value) {
  return value.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function inline(value) {
  let out = escapeHtml(normalizeText(value.trim()));
  out = out.replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1">$1</a>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => inline(cell));
}

function markdownToHtml(markdown, partTitle, partKicker, idPrefix) {
  const lines = normalizeText(markdown).split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quote = [];
  let inCode = false;
  let code = [];
  let firstH1Skipped = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    html.push(`<${tag}>${listItems.map(item => `<li>${inline(item)}</li>`).join('')}</${tag}>`);
    listItems = [];
    listType = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`);
    quote = [];
  };
  const flushAll = () => { flushParagraph(); flushList(); flushQuote(); };

  html.push(`<section class="part-break"><div class="part-kicker">${partKicker}</div><h1>${partTitle}</h1></section>`);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flushAll();
      if (inCode) {
        html.push(`<pre>${escapeHtml(code.join('\n'))}</pre>`);
        code = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!trimmed) {
      flushAll();
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushAll();
      html.push('<hr>');
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const title = heading[2].replace(/\*\*/g, '');
      if (level === 1 && !firstH1Skipped) {
        firstH1Skipped = true;
        continue;
      }
      const outLevel = Math.min(4, level + 1);
      const id = `${idPrefix}-${slugify(title)}-${i}`;
      html.push(`<h${outLevel} id="${id}">${inline(title)}</h${outLevel}>`);
      continue;
    }

    if (trimmed.startsWith('|') && i + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[i + 1])) {
      flushAll();
      const header = splitTableRow(trimmed);
      i += 1;
      const rows = [];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
        rows.push(splitTableRow(lines[i + 1]));
        i += 1;
      }
      html.push(`<table><thead><tr>${header.map(cell => `<th>${cell}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph(); flushQuote();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(unordered[1]);
      continue;
    }
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph(); flushQuote();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(ordered[1]);
      continue;
    }
    if (trimmed.startsWith('>')) {
      flushParagraph(); flushList();
      quote.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }

    paragraph.push(trimmed);
  }
  flushAll();
  return html.join('\n');
}

function buildDocument() {
  const logo = path.resolve(ROOT, '..', 'assets', 'logo-dark.svg');
  const raleway = path.resolve(ROOT, '..', 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Raleway-Variable.ttf');
  const poppins = path.resolve(ROOT, '..', 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Poppins-Regular.ttf');
  const poppinsSemi = path.resolve(ROOT, '..', 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Poppins-SemiBold.ttf');

  const body = sections.map((section, index) => markdownToHtml(
    fs.readFileSync(section.file, 'utf8'),
    section.title,
    section.kicker,
    `p${index + 1}`,
  )).join('\n');

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AYRES - Plan de visibilidad y marketing orgánico 2026</title>
<style>
  @font-face { font-family: RalewayAYRES; src: url('${raleway}') format('truetype'); font-weight: 100 900; }
  @font-face { font-family: PoppinsAYRES; src: url('${poppins}') format('truetype'); font-weight: 400; }
  @font-face { font-family: PoppinsAYRES; src: url('${poppinsSemi}') format('truetype'); font-weight: 600; }
  @page { size: A4; margin: 20mm 17mm 21mm; }
  :root { --green:#3DB870; --green-dark:#2A9455; --charcoal:#3E484E; --deep:#2A3035; --muted:#6F7E86; --warm:#F5F4F2; --line:#DCD9D4; --white:#FFFFFF; }
  * { box-sizing: border-box; }
  html { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  body { margin:0; color:var(--charcoal); font-family:PoppinsAYRES, Arial, sans-serif; font-size:9.35pt; line-height:1.56; background:white; }
  .cover { height:257mm; position:relative; overflow:hidden; color:white; background:linear-gradient(145deg, var(--deep) 0%, #344047 62%, #24352e 100%); padding:25mm 21mm; page-break-after:always; }
  .cover:before { content:""; position:absolute; width:150mm; height:150mm; border:1px solid rgba(61,184,112,.32); border-radius:50%; right:-55mm; top:-45mm; }
  .cover:after { content:""; position:absolute; width:110mm; height:110mm; background:radial-gradient(circle, rgba(61,184,112,.22), transparent 68%); right:-18mm; bottom:-28mm; }
  .cover img { width:48mm; height:auto; filter:brightness(0) invert(1); position:relative; z-index:1; }
  .cover .eyebrow { margin-top:46mm; color:#71D399; font:700 8.5pt/1 RalewayAYRES; letter-spacing:2.2px; }
  .cover h1 { margin:6mm 0 5mm; max-width:155mm; color:white; font:850 30pt/1.06 RalewayAYRES; letter-spacing:-.5px; }
  .cover .lead { max-width:130mm; color:#E2E8E4; font-size:12pt; line-height:1.55; }
  .cover .meta { position:absolute; left:21mm; bottom:23mm; color:#BFCBC5; font-size:8.5pt; line-height:1.65; z-index:1; }
  .cover .bar { width:30mm; height:2.2mm; background:var(--green); margin:9mm 0 0; border-radius:2mm; }
  main { width:100%; }
  .reader-note { page-break-after:always; padding-top:7mm; }
  .reader-note .hero-box { background:var(--warm); border-left:4px solid var(--green); padding:8mm; margin:4mm 0 8mm; }
  .part-break { min-height:95mm; display:flex; flex-direction:column; justify-content:flex-end; padding:12mm; margin:-2mm -2mm 12mm; background:linear-gradient(145deg, var(--deep), #344047); color:white; border-radius:4mm; page-break-before:always; page-break-after:always; }
  .part-break:first-of-type { page-break-before:auto; }
  .part-kicker, .kicker { color:var(--green); font:700 8pt/1.2 RalewayAYRES; letter-spacing:2px; text-transform:uppercase; margin-bottom:4mm; }
  .part-break h1 { color:white; font-size:27pt; line-height:1.08; margin:0; max-width:145mm; }
  h1,h2,h3,h4,h5 { font-family:RalewayAYRES, Arial, sans-serif; color:var(--deep); page-break-after:avoid; break-after:avoid; }
  h1 { font-size:24pt; line-height:1.12; margin:0 0 8mm; }
  h2 { font-size:17pt; line-height:1.18; margin:11mm 0 4mm; padding-top:2mm; border-top:1px solid var(--line); }
  h3 { font-size:13.2pt; line-height:1.22; margin:7mm 0 2.5mm; color:var(--charcoal); }
  h4 { font-size:10.7pt; line-height:1.25; margin:5mm 0 2mm; color:var(--green-dark); }
  p { margin:0 0 3.3mm; orphans:3; widows:3; }
  ul,ol { margin:1.5mm 0 4mm 5.5mm; padding-left:4.5mm; }
  li { margin:0 0 1.4mm; padding-left:1mm; break-inside:avoid; }
  li::marker { color:var(--green-dark); font-weight:600; }
  strong { font-weight:600; color:var(--deep); }
  code { font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:8.5pt; background:#EAEDEB; color:#28583F; padding:.4mm 1mm; border-radius:1mm; }
  pre { white-space:pre-wrap; background:var(--deep); color:#EEF5F0; padding:4mm; border-radius:2mm; font-size:8pt; break-inside:avoid; }
  blockquote { margin:4mm 0 5mm; padding:4mm 5mm; border-left:3px solid var(--green); background:#EDF7F1; color:#31453A; font-size:10pt; break-inside:avoid; }
  hr { border:0; border-top:1px solid var(--line); margin:8mm 0; }
  table { width:100%; border-collapse:separate; border-spacing:0; margin:4mm 0 6mm; font-size:7.9pt; line-height:1.4; break-inside:avoid; border:1px solid var(--line); border-radius:2mm; overflow:hidden; }
  thead { display:table-header-group; }
  th { background:var(--deep); color:white; text-align:left; font-family:RalewayAYRES; font-weight:700; }
  th,td { padding:2.3mm 2.5mm; vertical-align:top; border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
  th:last-child,td:last-child { border-right:0; }
  tbody tr:last-child td { border-bottom:0; }
  tbody tr:nth-child(even) td { background:var(--warm); }
  a { color:var(--green-dark); text-decoration:none; }
  .toc { page-break-after:always; }
  .toc-grid { display:grid; grid-template-columns:1fr 1fr; gap:4mm; margin-top:8mm; }
  .toc-card { border:1px solid var(--line); border-radius:3mm; padding:5mm; min-height:35mm; }
  .toc-card .n { color:var(--green); font:800 19pt/1 RalewayAYRES; }
  .toc-card h3 { margin:2mm 0 1mm; }
  .toc-card p { color:var(--muted); font-size:8.6pt; }
</style>
</head>
<body>
  <section class="cover">
    <img src="${logo}" alt="AYRES">
    <div class="eyebrow">MANUAL DE EJECUCIÓN · INSTAGRAM 2026</div>
    <h1>Plan de aumento de visibilidad y marketing orgánico</h1>
    <p class="lead">Estrategia, contenidos, guiones, calendario, medición y decisiones necesarias para convertir alcance en consultas comerciales.</p>
    <div class="bar"></div>
    <div class="meta">AYRES Pet Supply<br>Versión consolidada · 3 de agosto de 2026<br>Uso interno</div>
  </section>
  <main>
    <section class="reader-note">
      <div class="kicker">ANTES DE EMPEZAR</div>
      <h1>Cómo usar este manual</h1>
      <div class="hero-box"><strong>Resultado buscado:</strong> transformar el alcance existente en visitas al perfil, seguidores relevantes y consultas mayoristas medibles.</div>
      <p>Este documento reúne toda la información operativa de la reforma de Instagram. La primera parte sirve para ponerla en marcha; la segunda conserva el plan maestro completo y todos sus guiones; la tercera muestra qué piezas ya existen y cuáles continúan pendientes.</p>
      <p>Para ejecutar el plan, comenzá por las definiciones comerciales y la optimización del perfil. Luego publicá el primer lote, registrá los resultados a las 24 horas y a los 7 días, y usá esos datos para decidir qué producir a continuación.</p>
      <blockquote>La prioridad no es generar la mayor cantidad posible de publicaciones. La prioridad es construir un sistema que descubra qué contenido atrae, qué contenido convierte y qué CTA genera consultas reales.</blockquote>
    </section>
    <section class="toc">
      <div class="kicker">MAPA DEL DOCUMENTO</div>
      <h1>Contenido</h1>
      <div class="toc-grid">
        <div class="toc-card"><div class="n">01</div><h3>Implementación</h3><p>Orden de trabajo, lanzamiento, rutina, métricas e interpretación.</p></div>
        <div class="toc-card"><div class="n">02</div><h3>Estrategia</h3><p>Diagnóstico, objetivos, públicos, posicionamiento y pilares.</p></div>
        <div class="toc-card"><div class="n">03</div><h3>Contenido</h3><p>Guiones de Reels, carruseles, Stories, fijadas y destacados.</p></div>
        <div class="toc-card"><div class="n">04</div><h3>Control</h3><p>Calendario, pruebas A/B, medición, aprobaciones y estado.</p></div>
      </div>
    </section>
    ${body}
  </main>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.writeFileSync(OUT_HTML, buildDocument());

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 }, deviceScaleFactor: 1 });
  await page.goto(`file://${OUT_HTML}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="font-family:Arial,sans-serif;font-size:8px;color:#7A8A92;width:100%;padding:0 17mm;display:flex;justify-content:space-between;"><span>AYRES · Plan de visibilidad y marketing orgánico</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '20mm', right: '17mm', bottom: '21mm', left: '17mm' },
  });
  await browser.close();
  process.stdout.write(`${OUT_PDF}\n`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
