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
    presentations: item.presentaciones.join(' · '),
  };
};

const fawnaGato = product('fawna-gato-adulto', { showStat: false });
const fawnaGatoEst = product('fawna-gato-esterilizado', { showStat: false });

const reels = [
  {
    id: 'sep-05-piedras-sanitarias',
    badge: 'OPORTUNIDAD',
    eyebrow: 'MARGEN · GATOS',
    scenes: [
      {
        layout: 'hero',
        title: '¿VENDÉS ALIMENTO<br>PARA GATOS Y NO<br>TENÉS <em>PIEDRAS?</em>',
        lede: 'Tu cliente de gato compra alimento Y piedras. Si no tenés las dos, la mitad de esa venta la hace en otro lado.',
        products: [fawnaGato, fawnaGatoEst],
      },
      {
        layout: 'list',
        title: '01 · VENTA<br><em>CRUZADA SEGURA</em>',
        lede: 'El dueño de gato no elige dónde comprar piedras por separado.',
        listTitle: 'El combo es automático:',
        points: [
          { title: 'Alimento + piedras = un solo viaje', detail: 'Si tenés las dos, el ticket sube sin esfuerzo.' },
          { title: 'Sin piedras, el cliente busca otro comercio', detail: 'Y ahí compara precios de todo, incluido el alimento.' },
        ],
      },
      {
        layout: 'definition',
        title: '02 · EL MARGEN QUE<br><em>NADIE TE CUENTA</em>',
        lede: 'Las piedras sanitarias tienen un margen por kilo superior al del alimento balanceado.',
        definitions: [
          { term: 'Rotación alta, reposición simple', copy: 'No necesitás 20 marcas. Con 2 ó 3 opciones cubrís todo el rango.' },
          { term: 'Peso bajo, espacio reducido', copy: 'Ocupan menos góndola que el alimento y rotan igual o más rápido.' },
        ],
      },
      {
        layout: 'list',
        dark: true,
        title: '03 · ARMÁ LA<br><em>GÓNDOLA DE GATOS</em>',
        lede: 'Alimento + piedras + accesorios: el cliente de gato valora encontrar todo en un solo lugar.',
        listTitle: 'Checklist mínimo:',
        points: [
          { title: 'Alimento en 3 líneas (adulto, esterilizado, gatito)', detail: 'Cubrís el 90% de la demanda.' },
          { title: 'Piedras sanitarias en 2 o 3 opciones', detail: 'Una económica, una aglomerante, una premium.' },
        ],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿QUERÉS SUMAR<br><em>PIEDRAS A TU PEDIDO?</em>',
        lede: 'Te asesoramos sobre las marcas con mejor margen. Somos AYRES, distribuidora mayorista en Córdoba.',
        cta: { title: 'Mandanos un mensaje', action: 'y te enviamos las opciones de piedras para tu zona →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
