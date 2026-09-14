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

const fawnaCachorro = product('fawna-cachorro-pequeno', { showStat: false });
const fawnaGatito = product('fawna-gatito', { showStat: false });
const opCachorro = product('op-eq-cachorro-pequenas', { showStat: false });
const opGatito = product('op-eq-gatito', { showStat: false });
const fawnaAdPeq = product('fawna-adulto-pequeno', { showStat: false });
const fawnaAdMedGr = product('fawna-adulto-mediano-grande', { showStat: false });

const reels = [
  {
    id: 'sep-04-surtido-temporada',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'SURTIDO · PRIMAVERA',
    scenes: [
      {
        layout: 'hero',
        title: 'EN PRIMAVERA CAMBIA<br>LA DEMANDA — ¿TU<br>GÓNDOLA ESTÁ <em>LISTA?</em>',
        lede: 'Cada temporada tiene su pico. Si no ajustás el surtido, te sobra lo que no se vende y te falta lo que piden.',
        products: [fawnaCachorro, fawnaGatito, opCachorro],
      },
      {
        layout: 'focus',
        title: '01 · PICO DE<br><em>CACHORROS</em>',
        lede: 'De septiembre a diciembre nacen más camadas. Tu góndola de cachorros tiene que estar completa.',
        focus: fawnaCachorro,
      },
      {
        layout: 'hero',
        title: '02 · TEMPORADA<br>DE <em>GATITOS</em>',
        lede: 'Gatitos + campañas de castración = más demanda de gatito y esterilizado en tu mostrador.',
        products: [fawnaGatito, opGatito],
      },
      {
        layout: 'hero',
        dark: true,
        title: '03 · ROTÁ LAS<br><em>PRESENTACIONES</em>',
        lede: 'En primavera se prueban marcas nuevas. Tené bolsas chicas para la prueba y grandes para fidelizar.',
        products: [fawnaAdPeq, fawnaAdMedGr],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿NECESITÁS AJUSTAR<br>TU <em>STOCK?</em>',
        lede: 'Te armamos un pedido de temporada. Somos AYRES, distribuidora mayorista en Córdoba.',
        cta: { title: 'Mandanos un mensaje', action: 'y te sugerimos el surtido para primavera →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
