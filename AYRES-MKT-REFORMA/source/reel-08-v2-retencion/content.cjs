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

// Reel 08 v2 — solo cambia la escena 1 (hook/portada).
// Escenas 2-5 idénticas al original para comparación A/B.
const reels = [
  {
    id: '08-v2-categorias-sector-cachorros',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'PET SHOPS · SURTIDO',
    scenes: [
      // NUEVA escena 1: hook reformulado B2B — beneficio directo
      { layout: 'hero', title: 'VENDÉ MÁS EN<br><em>CACHORROS.</em>', lede: 'Tres criterios para que tu góndola recomiende sola.', products: [fawna, oldPrince, company, kongo] },
      // Escenas 2-5: idénticas al Reel 08 original
      { layout: 'focus', title: '01 · RAZAS<br><em>PEQUEÑAS</em>', lede: 'Identificá las fórmulas que especifican tamaño o segmento.', focus: fawna },
      { layout: 'hero', title: '02 · TODAS<br>LAS <em>RAZAS</em>', lede: 'Sumá alternativas con diferentes ingredientes y presentaciones.', products: [oldPrince, kongo] },
      { layout: 'hero', dark: true, title: '03 · DIFERENTES<br><em>LÍNEAS</em>', lede: 'Una oferta clara permite atender distintas búsquedas comerciales.', products: [fawna, oldPrince, company, kongo] },
      { layout: 'cta', dark: true, title: 'VENDÉ CON<br><em>MÁS CONTEXTO.</em>', lede: 'Marcas y categorías para acompañar el crecimiento de tu negocio.', cta: { title: 'Comentá CATÁLOGO', action: 'Y te enviamos la lista de precios mayoristas →' } },
    ],
  },
];

module.exports = { reels, repoRoot };
