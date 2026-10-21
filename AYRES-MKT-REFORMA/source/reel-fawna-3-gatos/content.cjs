const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const catalogPath = path.join(repoRoot, 'infoproductos', 'productos.json');
const catalog = new Map(JSON.parse(fs.readFileSync(catalogPath, 'utf8')).productos.map((item) => [item.id, item]));

const nutrient = (item, prefix) => item.composicion_centesimal.find(({ nutriente }) =>
  nutriente.toLocaleLowerCase('es').startsWith(prefix));

const product = (id, options = {}) => {
  const item = catalog.get(id);
  if (!item) throw new Error(`Producto inexistente: ${id}`);
  const protein = nutrient(item, 'proteína');
  return {
    id,
    name: item.nombre,
    stat: options.showStat === false ? '' : (protein?.minimo || protein?.maximo || '—'),
    label: options.label || 'PROTEÍNA MÍN.',
    ingredients: item.ingredientes.split(',').slice(0, 3).map((value) => value.trim()),
  };
};

const adulto = product('fawna-gato-adulto', { showStat: false });
const esterilizado = product('fawna-gato-esterilizado', { showStat: false });
const urinario = product('fawna-gato-urinario', { showStat: false });

const reels = [
  {
    id: 'fawna-3-gatos',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'FAWNA · GATOS',
    scenes: [
      {
        layout: 'hero',
        title: 'UNA MARCA,<br>TRES <em>FÓRMULAS</em><br>DISTINTAS.',
        lede: 'Fawna tiene una línea para cada gato adulto. Misma base de calidad, distinta composición según la necesidad.',
        products: [adulto, esterilizado, urinario],
      },
      {
        layout: 'focus',
        eyebrow: 'FAWNA GATO ADULTO',
        title: 'LA BASE:<br><em>FÓRMULA ESTÁNDAR</em>',
        lede: 'Proteína 35%, grasa 12%, fibra 3%. Primera fuente: harina de salmón.',
        focus: { ...adulto, stat: '35%', label: 'PROTEÍNA MÍN.' },
      },
      {
        layout: 'focus',
        eyebrow: 'FAWNA GATO ESTERILIZADO',
        title: 'MENOS GRASA,<br><em>MÁS PROTEÍNA.</em>',
        lede: 'Proteína 38%, grasa 9%, fibra 5%. Más fibra, menos calorías por ración.',
        focus: { ...esterilizado, stat: '38%', label: 'PROTEÍNA MÍN.' },
      },
      {
        layout: 'focus',
        eyebrow: 'FAWNA GATO URINARIO',
        title: 'MINERALES<br><em>CONTROLADOS.</em>',
        lede: 'Calcio 0,6–0,9%, fósforo 0,4–0,8%. Minerales más bajos para el tracto urinario.',
        focus: { ...urinario, stat: '0,6%', label: 'CALCIO MÍN.' },
      },
      {
        layout: 'cta',
        dark: true,
        title: 'TRES GATOS<br>DISTINTOS,<br>TRES <em>FÓRMULAS.</em>',
        lede: 'Ofrecé las tres opciones en tu góndola. Fawna le da a tu cliente una respuesta para cada necesidad.',
        cta: { title: 'Pedí la lista de precios', action: 'por WhatsApp — link en bio →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
