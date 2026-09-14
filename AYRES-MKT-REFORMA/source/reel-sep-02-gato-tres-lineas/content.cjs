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

const fawnaGatoSinStat = product('fawna-gato-adulto', { showStat: false });
const fawnaGatoEsterilizadoSinStat = product('fawna-gato-esterilizado', { showStat: false });

const reels = [
  {
    id: 'sep-02-gato-tres-lineas',
    badge: 'GUÍA DE VENTA',
    eyebrow: 'MÉTODO DE VENTA · GATOS',
    scenes: [
      {
        layout: 'hero',
        title: 'ESTÁS PERDIENDO<br>VENTAS EN <em>GATOS.</em>',
        lede: 'Adulto, esterilizado y urinario: si tu góndola no las diferencia, tu cliente compra en otro comercio.',
        products: [fawnaGatoSinStat, fawnaGatoEsterilizadoSinStat],
      },
      {
        layout: 'list',
        title: '01 · TRES LÍNEAS,<br>TRES <em>OBJETIVOS.</em>',
        lede: 'Las tres son para gatos adultos, pero no tienen el mismo objetivo.',
        listTitle: 'Ejemplo: línea Fawna Gato:',
        points: [
          { title: 'Adulto: mantenimiento diario', detail: 'La fórmula base de la categoría.' },
          { title: 'Esterilizado y Urinario: objetivos específicos', detail: 'Cada envase declara su alcance.' },
        ],
      },
      {
        layout: 'definition',
        title: '02 · VALORES QUE<br>TU EQUIPO <em>NECESITA.</em>',
        lede: 'Datos declarados para recomendar con criterio (Adulto · Esterilizado · Urinario).',
        definitions: [
          { term: 'Proteína mín.: 35% · 38% · 35%', copy: 'Piso declarado en cada fórmula.' },
          { term: 'Extracto etéreo mín.: 12% · 9% · 12%', copy: 'La fórmula esterilizado declara menor aporte graso.' },
        ],
      },
      {
        layout: 'list',
        dark: true,
        title: '03 · EL LÍMITE<br><em>PROFESIONAL.</em>',
        lede: 'Enseñale esto a tu equipo y evitá reclamos.',
        listTitle: 'Regla de mostrador:',
        points: [
          { title: 'Ninguna fórmula previene ni trata enfermedades', detail: 'Solo declaran su composición y objetivo.' },
          { title: 'Ante una condición, derivar al veterinario', detail: 'La recomendación profesional va primero.' },
        ],
      },
      {
        layout: 'cta',
        dark: true,
        title: '¿TE FALTA ALGUNA<br><em>LÍNEA DE GATO?</em>',
        lede: 'Completá tu góndola y vendé con criterio. Somos AYRES, distribuidora mayorista en Córdoba.',
        cta: { title: 'Mandanos un mensaje', action: 'y te enviamos la lista de precios para tu zona →' },
      },
    ],
  },
];

module.exports = { reels, repoRoot };
