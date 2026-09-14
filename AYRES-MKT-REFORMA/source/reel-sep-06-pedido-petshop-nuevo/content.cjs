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

// Masivo (entrada de precio)
const kongoAdulto = product('kongo-adultos-medianos-grandes', { showStat: false });
const vorazAdulto = product('voraz-perros-adultos-carne', { showStat: false });
// Especializado (margen medio)
const fawnaCachorro = product('fawna-cachorro-pequeno', { showStat: false });
const companyAdulto = product('company-adultos', { showStat: false });
// Gatos (completar la góndola)
const fawnaGato = product('fawna-gato-adulto', { showStat: false });
const kongoGato = product('kongo-gatos-adultos-carne-pollo', { showStat: false });

const reels = [
  {
    id: 'sep-06-pedido-petshop-nuevo',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'PRIMER PEDIDO · PETSHOPS',
    scenes: [
      {
        layout: 'hero',
        title: 'SI ARRANCÁS UN<br>PETSHOP, ESTE ES<br>EL <em>PEDIDO INICIAL.</em>',
        lede: 'No necesitás 50 productos. Con una selección inteligente cubrís el 80% de la demanda desde el día uno.',
        products: [fawnaCachorro, kongoAdulto, fawnaGato],
      },
      {
        layout: 'hero',
        title: '01 · PERROS:<br><em>MASIVO + ESPECIALIZADO</em>',
        lede: 'Un masivo para volumen y uno especializado para margen. Dos marcas que se complementan.',
        products: [kongoAdulto, fawnaCachorro],
      },
      {
        layout: 'hero',
        title: '02 · GATOS:<br><em>NO LOS OLVIDES</em>',
        lede: 'El cliente de gato es fiel y compra seguido. Con dos opciones arrancás bien.',
        products: [fawnaGato, kongoGato],
      },
      {
        layout: 'hero',
        dark: true,
        title: '03 · COMPLETÁ<br>CON <em>VARIEDAD</em>',
        lede: 'Sumá una segunda marca de cada segmento. Tu cliente compara y vos le das las opciones.',
        products: [companyAdulto, vorazAdulto],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿ESTÁS ARMANDO<br>TU <em>PRIMER PEDIDO?</em>',
        lede: 'Te ayudamos a elegir el surtido inicial. Somos AYRES, distribuidora mayorista en Córdoba.',
        cta: { title: 'Mandanos un mensaje', action: 'y te armamos un pedido a medida →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
