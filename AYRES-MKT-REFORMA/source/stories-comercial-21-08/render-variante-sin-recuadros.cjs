// Variante de la Story 1 sin los recuadros de opciones:
// deja el espacio libre para superponer el sticker de encuesta nativo de Instagram.
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const payload = {
  logoLight: pathToFileURL(path.join(repoRoot, 'assets', 'logo-light.svg')).href,
  logoDark: pathToFileURL(path.join(repoRoot, 'assets', 'logo-dark.svg')).href,
  stories: [
    {
      badge: 'QUEREMOS CONOCERTE',
      eyebrow: 'ACCIÓN COMERCIAL',
      title: '¿TENÉS UNA <em>PET SHOP,</em><br><em>VETERINARIA</em> O<br>COMERCIO?',
      lede: 'Contanos qué tipo de negocio tenés.',
      // sin "options": el sticker de encuesta de Instagram ocupa este espacio
      hint: 'Respondé esta historia y sumá <em>tu localidad.</em>',
    },
    // placeholders para que el contador marque 01 / 03 (solo se renderiza la story 1)
    {},
    {},
  ],
};

const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
const source = path.join(__dirname, 'story.html');
const outputRoot = path.join(repoRoot, 'AYRES-MKT-REFORMA', 'produccion', 'stories', 'comercial-21-08');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(outputRoot, { recursive: true });
const output = path.join(outputRoot, '01-story-pregunta-negocio-sin-recuadros-1080x1920.png');
const url = `${pathToFileURL(source).href}?story=1&payload=${encodeURIComponent(encoded)}`;
const result = spawnSync(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=1400',
  '--window-size=1080,1920', `--screenshot=${output}`, url,
]);
if (result.status !== 0) throw new Error(`Chrome finalizó con código ${result.status}`);
console.log(`Generado: ${output}`);
