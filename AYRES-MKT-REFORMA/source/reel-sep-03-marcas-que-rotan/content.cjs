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
const fawnaGato = product('fawna-gato-adulto', { showStat: false });
const opEquilibrium = product('op-eq-adulto-pequenas', { showStat: false });
const opNoveles = product('op-pn-lamb-adult-small', { showStat: false });
const kongoStd = product('kongo-adultos-medianos-grandes', { showStat: false });
const kongoGold = product('kongo-gold-cachorros-todas-razas', { showStat: false });

const reels = [
  {
    id: 'sep-03-marcas-que-rotan',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'SURTIDO · CÓRDOBA',
    scenes: [
      {
        layout: 'hero',
        title: '3 MARCAS QUE TUS<br>COLEGAS YA ESTÁN<br><em>VENDIENDO.</em>',
        lede: '¿Las tenés en tu góndola? Si te falta alguna, tus clientes la buscan en otro comercio.',
        products: [fawnaCachorro, opEquilibrium, kongoGold],
      },
      {
        layout: 'focus',
        title: '01 · <em>FAWNA</em><br>PATAGONIC TASTE',
        lede: '10 fórmulas para perros y gatos. El especializado que más crece en la zona.',
        focus: fawnaCachorro,
      },
      {
        layout: 'hero',
        title: '02 · <em>OLD PRINCE</em><br>3 LÍNEAS, 25 FÓRMULAS',
        lede: 'Equilibrium, Proteínas Noveles y Premium. La marca con más opciones del catálogo.',
        products: [opEquilibrium, opNoveles],
      },
      {
        layout: 'hero',
        dark: true,
        title: '03 · <em>KONGO</em><br>VOLUMEN + GOLD',
        lede: 'La línea masiva que cubre todo el rango de precio. Tu cliente siempre encuentra opción.',
        products: [kongoStd, kongoGold],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿TE FALTA ALGUNA<br>DE <em>LAS TRES?</em>',
        lede: 'Somos AYRES, distribuidora mayorista en Córdoba. Las tres marcas en un solo pedido.',
        cta: { title: 'Mandanos un mensaje', action: 'y te armamos el pedido con las tres →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
