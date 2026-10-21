const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const catalogPath = path.join(repoRoot, 'infoproductos', 'productos.json');
const catalog = new Map(JSON.parse(fs.readFileSync(catalogPath, 'utf8')).productos.map((item) => [item.id, item]));

const nutrient = (item, prefix) => {
  const found = item.composicion_centesimal.find(({ nutriente }) =>
    nutriente.toLocaleLowerCase('es').startsWith(prefix));
  if (!found) return { value: '—', qualifier: '' };
  return found.minimo
    ? { value: found.minimo, qualifier: 'MÍN.' }
    : { value: found.maximo, qualifier: 'MÁX.' };
};

const adulto = catalog.get('fawna-gato-adulto');
const esterilizado = catalog.get('fawna-gato-esterilizado');
const urinario = catalog.get('fawna-gato-urinario');

const ingr = (item) => item.ingredientes.split(',').slice(0, 3).map((v) => v.trim());

const NOTABLES = [
  ['probióticos', 'PROBIÓTICOS'], ['aceite de salmón', 'ACEITE DE SALMÓN'],
  ['arándanos', 'ARÁNDANOS'], ['l-carnitina', 'L-CARNITINA'],
  ['taurina', 'TAURINA'], ['levadura de cerveza', 'LEVADURA'],
  ['glucosamina', 'GLUCOSAMINA'], ['condroit', 'CONDROITÍN'],
];

const notables = (item) => {
  const lower = item.ingredientes.toLocaleLowerCase('es');
  return NOTABLES.filter(([needle]) => lower.includes(needle)).map(([, label]) => label).slice(0, 4);
};

const productIds = ['fawna-gato-adulto', 'fawna-gato-esterilizado', 'fawna-gato-urinario'];

const slides = [
  {
    layout: 'table',
    eyebrow: 'COMPOSICIÓN COMPARADA',
    title: 'ADULTO VS<br>ESTERILIZADO VS<br><em>URINARIO.</em>',
    headers: ['ADULTO', 'ESTERILIZADO', 'URINARIO'],
    productIds,
    rows: [
      {
        label: 'PROTEÍNA',
        values: [
          { value: '35%', qualifier: 'MÍN.' },
          { value: '38%', qualifier: 'MÍN.', highlight: true },
          { value: '35%', qualifier: 'MÍN.' },
        ],
      },
      {
        label: 'GRASA',
        values: [
          { value: '12%', qualifier: 'MÍN.' },
          { value: '9%', qualifier: 'MÍN.', highlight: true },
          { value: '12%', qualifier: 'MÍN.' },
        ],
      },
      {
        label: 'FIBRA',
        values: [
          { value: '3%', qualifier: 'MÁX.' },
          { value: '5%', qualifier: 'MÁX.', highlight: true },
          { value: '4%', qualifier: 'MÁX.' },
        ],
      },
      {
        label: 'CALCIO',
        values: [
          { value: '1–1,2%', qualifier: '' },
          { value: '0,7–1,1%', qualifier: '' },
          { value: '0,6–0,9%', qualifier: '', highlight: true },
        ],
      },
      {
        label: 'FÓSFORO',
        values: [
          { value: '0,6–1%', qualifier: '' },
          { value: '0,5–0,8%', qualifier: '' },
          { value: '0,4–0,8%', qualifier: '', highlight: true },
        ],
      },
    ],
  },
  {
    layout: 'ingredients',
    eyebrow: 'PRIMEROS INGREDIENTES',
    title: 'MISMA BASE,<br><em>DISTINTOS EXTRAS.</em>',
    lede: 'Las tres fórmulas arrancan con harina de salmón, pollo y huevo. La diferencia está en los ingredientes funcionales.',
    productIds,
    columns: [
      { name: 'ADULTO', ingredients: ingr(adulto), extras: notables(adulto) },
      { name: 'ESTERILIZADO', ingredients: ingr(esterilizado), extras: notables(esterilizado) },
      { name: 'URINARIO', ingredients: ingr(urinario), extras: notables(urinario) },
    ],
  },
  {
    layout: 'cta',
    eyebrow: 'MAYORISTA CÓRDOBA',
    title: 'COMPLETÁ LA<br>GÓNDOLA<br><em>FELINA.</em>',
    lede: 'Tu cliente tiene un gato adulto, esterilizado o con necesidades urinarias. Con Fawna, tenés una respuesta para cada caso.',
    productIds,
    cta: {
      title: 'Pedí la lista de precios por WhatsApp',
      action: 'Te enviamos precios para las tres líneas de gato. Link en bio →',
    },
  },
];

module.exports = { slides, productIds, repoRoot };
