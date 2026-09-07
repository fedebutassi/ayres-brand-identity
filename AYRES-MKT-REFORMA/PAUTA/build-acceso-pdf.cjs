const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = __dirname;
const REPO = path.resolve(ROOT, '..', '..');
const OUT_DIR = path.join(REPO, 'output', 'pdf');
const TMP_DIR = path.join(REPO, 'tmp', 'pdfs', 'acceso-meta');
const OUT_PDF = path.join(OUT_DIR, 'AYRES-guia-configuracion-meta-business.pdf');
const OUT_HTML = path.join(TMP_DIR, 'guia.html');
const SRC_MD = path.join(ROOT, 'ACCESO-META-BUSINESS.md');

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

function inline(value) {
  let out = escapeHtml(normalizeText(value.trim()));
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function markdownToHtml(markdown) {
  const lines = normalizeText(markdown).split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quote = [];
  let firstH1Skipped = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    html.push(`<${tag}>${listItems.map(item => {
      const sub = item.sub.length ? `<ul>${item.sub.map(s => `<li>${s}</li>`).join('')}</ul>` : '';
      return `<li>${item.html}${sub}</li>`;
    }).join('')}</${tag}>`);
    listItems = [];
    listType = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`);
    quote = [];
  };
  const flushAll = () => { flushParagraph(); flushList(); flushQuote(); };

  for (const line of lines) {
    const trimmed = line.trim();
    const indent = line.match(/^\s*/)[0].length;
    if (!trimmed) { flushParagraph(); flushQuote(); continue; }
    if (/^---+$/.test(trimmed)) { flushAll(); html.push('<hr>'); continue; }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const title = heading[2].replace(/\*\*/g, '');
      if (level === 1 && !firstH1Skipped) { firstH1Skipped = true; continue; }
      html.push(`<h${Math.min(4, level)}>${inline(title)}</h${Math.min(4, level)}>`);
      continue;
    }

    const check = trimmed.match(/^[-*]\s+\[( |x)\]\s+(.+)$/);
    if (check) {
      flushParagraph(); flushQuote();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push({ html: `<span class="chk${check[1] === 'x' ? ' on' : ''}"></span> ${inline(check[2])}`, sub: [] });
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph(); flushQuote();
      // Sub-bullet indented under an ordered list item: nest it, don't break the numbering
      if (indent >= 2 && listType === 'ol' && listItems.length) {
        listItems[listItems.length - 1].sub.push(inline(unordered[1]));
        continue;
      }
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push({ html: inline(unordered[1]), sub: [] });
      continue;
    }
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph(); flushQuote();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push({ html: inline(ordered[1]), sub: [] });
      continue;
    }
    if (trimmed.startsWith('>')) {
      flushParagraph(); flushList();
      quote.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushAll();
  return html.join('\n');
}

function buildDocument() {
  const logo = path.join(REPO, 'assets', 'logo-dark.svg');
  const raleway = path.join(REPO, 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Raleway-Variable.ttf');
  const poppins = path.join(REPO, 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Poppins-Regular.ttf');
  const poppinsSemi = path.join(REPO, 'social', '2026', 'carrusel-gato-adulto-esterilizado-urinario', 'assets', 'fonts', 'Poppins-SemiBold.ttf');

  const body = markdownToHtml(fs.readFileSync(SRC_MD, 'utf8'));

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>AYRES - Configuración de Meta Business</title>
<style>
  @font-face { font-family: RalewayAYRES; src: url('${raleway}') format('truetype'); font-weight: 100 900; }
  @font-face { font-family: PoppinsAYRES; src: url('${poppins}') format('truetype'); font-weight: 400; }
  @font-face { font-family: PoppinsAYRES; src: url('${poppinsSemi}') format('truetype'); font-weight: 600; }
  @page { size: A4; margin: 20mm 17mm 21mm; }
  :root { --green:#3DB870; --green-dark:#2A9455; --charcoal:#3E484E; --deep:#2A3035; --muted:#6F7E86; --warm:#F5F4F2; --line:#DCD9D4; }
  * { box-sizing: border-box; }
  html { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  body { margin:0; color:var(--charcoal); font-family:PoppinsAYRES, Arial, sans-serif; font-size:10pt; line-height:1.6; background:white; }
  .cover { height:250mm; position:relative; overflow:hidden; color:white; background:linear-gradient(145deg, var(--deep) 0%, #344047 62%, #24352e 100%); padding:25mm 21mm; page-break-after:always; }
  .cover:before { content:""; position:absolute; width:150mm; height:150mm; border:1px solid rgba(61,184,112,.32); border-radius:50%; right:-55mm; top:-45mm; }
  .cover:after { content:""; position:absolute; width:110mm; height:110mm; background:radial-gradient(circle, rgba(61,184,112,.22), transparent 68%); right:-18mm; bottom:-28mm; }
  .cover img { width:48mm; height:auto; filter:brightness(0) invert(1); position:relative; z-index:1; }
  .cover .eyebrow { margin-top:52mm; color:#71D399; font:700 8.5pt/1 RalewayAYRES; letter-spacing:2.2px; }
  .cover h1 { margin:6mm 0 5mm; max-width:155mm; color:white; font:850 29pt/1.08 RalewayAYRES; letter-spacing:-.5px; }
  .cover .lead { max-width:132mm; color:#E2E8E4; font-size:12pt; line-height:1.55; }
  .cover .meta { position:absolute; left:21mm; bottom:23mm; color:#BFCBC5; font-size:8.5pt; line-height:1.65; z-index:1; }
  .cover .bar { width:30mm; height:2.2mm; background:var(--green); margin:9mm 0 0; border-radius:2mm; }
  h1,h2,h3,h4 { font-family:RalewayAYRES, Arial, sans-serif; color:var(--deep); page-break-after:avoid; break-after:avoid; }
  h2 { font-size:16pt; line-height:1.2; margin:10mm 0 4mm; padding-top:3mm; border-top:1px solid var(--line); }
  h2:first-child { margin-top:0; border-top:0; }
  h3 { font-size:12.5pt; margin:6mm 0 2.5mm; color:var(--green-dark); }
  p { margin:0 0 3.5mm; orphans:3; widows:3; }
  ul,ol { margin:1.5mm 0 4.5mm 5.5mm; padding-left:4.5mm; }
  li { margin:0 0 1.8mm; padding-left:1mm; }
  li::marker { color:var(--green-dark); font-weight:600; }
  .chk { display:inline-block; width:3.4mm; height:3.4mm; border:1.5px solid var(--green-dark); border-radius:.8mm; vertical-align:-.4mm; margin-right:1mm; }
  .chk.on { background:var(--green); border-color:var(--green); }
  strong { font-weight:600; color:var(--deep); }
  code { font-family:ui-monospace, Menlo, monospace; font-size:9pt; background:#EAEDEB; color:#28583F; padding:.4mm 1.2mm; border-radius:1mm; }
  blockquote { margin:4mm 0 5mm; padding:4mm 5mm; border-left:3px solid var(--green); background:#EDF7F1; color:#31453A; break-inside:avoid; }
  hr { border:0; border-top:1px solid var(--line); margin:8mm 0; }
  a { color:var(--green-dark); text-decoration:none; }
</style>
</head>
<body>
  <section class="cover">
    <img src="${logo}" alt="AYRES">
    <div class="eyebrow">GUÍA PASO A PASO · META BUSINESS</div>
    <h1>Configuración de Facebook, Instagram y publicidad</h1>
    <p class="lead">Cómo verificar la vinculación de cuentas, crear la página de Facebook si hace falta y habilitar la gestión de anuncios de AYRES.</p>
    <div class="bar"></div>
    <div class="meta">AYRES Pet Supply<br>Agosto 2026<br>Uso interno</div>
  </section>
  <main>${body}</main>
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
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.goto(`file://${OUT_HTML}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="font-family:Arial,sans-serif;font-size:8px;color:#7A8A92;width:100%;padding:0 17mm;display:flex;justify-content:space-between;"><span>AYRES · Configuración de Meta Business</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '20mm', right: '17mm', bottom: '21mm', left: '17mm' },
  });
  await browser.close();
  process.stdout.write(`${OUT_PDF}\n`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
