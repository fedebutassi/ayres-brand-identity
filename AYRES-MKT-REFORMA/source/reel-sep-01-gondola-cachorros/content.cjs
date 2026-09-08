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

const fawna = product('fawna-cachorro-pequeno');
const oldPrince = product('op-pn-lamb-puppy-all');
const company = product('company-cachorros');
const kongo = product('kongo-gold-cachorros-todas-razas');

const reels = [
  {
    id: 'sep-01-gondola-cachorros',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'PETSHOPS · GÓNDOLA',
    scenes: [
      {
        layout: 'hero',
        title: '¿TU GÓNDOLA DE<br>CACHORROS TIENE<br>ESTAS <em>4 OPCIONES?</em>',
        lede: 'Si te falta alguna, tus clientes se van con la competencia.',
        products: [fawna, oldPrince, company, kongo],
      },
      {
        layout: 'focus',
        title: '01 · RAZAS<br><em>PEQUEÑAS</em>',
        lede: 'El segmento que más crece. Si no tenés opciones específicas, estás perdiendo ventas.',
        focus: fawna,
      },
      {
        layout: 'hero',
        title: '02 · TODAS LAS<br><em>RAZAS</em>',
        lede: 'La opción segura que tu equipo puede recomendar sin dudar.',
        products: [oldPrince, kongo],
      },
      {
        layout: 'hero',
        dark: true,
        title: '03 · DISTINTAS<br><em>LÍNEAS Y PRECIOS</em>',
        lede: 'Tu cliente compara. Si solo tenés una línea, la comparación la hace en otro comercio.',
        products: [fawna, oldPrince, company, kongo],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿TE FALTA<br><em>SURTIDO?</em>',
        lede: 'Somos AYRES, distribuidora mayorista en Córdoba. Te armamos el pedido.',
        cta: { title: 'Mandanos un mensaje', action: 'y te enviamos la lista de precios →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
