const fs = require('fs');
const path = require('path');
const { loadProducts } = require('../../social/2026/pruebas-productos-ayres/product-data.cjs');

const SCENES = {
  'arroz-integral__pollo__salmon': ['dual-salmon-pollo-arroz-cordero-arroz-arveja.png', 'left'],
  'huevo__pollo__salmon': ['dual-salmon-pollo-huevo-cordero-arroz-arveja.png', 'left'],
  'arroz-integral__arveja__cordero': ['dual-salmon-pollo-arroz-cordero-arroz-arveja.png', 'right'],
  'cerdo__garbanzo__lenteja': ['dual-cerdo-legumbres-cordero-arroz-maiz.png', 'left'],
  'arroz__maiz__pollo': ['pollo-arroz-maiz.png', 'full'],
  'arroz__carne__pollo': ['pollo-carne-arroz.png', 'full'],
  'arroz__carne-vacuna__pollo': ['pollo-carne-arroz.png', 'full'],
  'arroz__cordero__maiz': ['dual-cerdo-legumbres-cordero-arroz-maiz.png', 'right'],
  'carne-vacuna__pescado__pollo': ['pollo-pescado-carne.png', 'full'],
  'carne-vacuna__pollo__trigo': ['pollo-carne-trigo.png', 'full'],
  'carne__pollo__trigo': ['pollo-carne-trigo.png', 'full'],
  'maiz__pollo__trigo': ['trigo-pollo-maiz.png', 'full'],
  'carne__subproductos-pollo__trigo': ['subproductos-pollo-carne-trigo.png', 'full'],
  'aceite-pollo__carne-vacuna__pollo': ['carne-pollo-aceite.png', 'full'],
  'maiz__subproductos-pollo__trigo': ['subproductos-pollo-trigo-maiz.png', 'full'],
  'arroz__pollo__trigo': ['pollo-trigo-arroz.png', 'full'],
  'arroz__carne__pescado': ['carne-pescado-arroz.png', 'full'],
  'carne-hueso__pollo__trigo': ['carne-hueso-pollo-trigo.png', 'full'],
  'arveja__carne-vacuna__pollo': ['carne-pollo-arveja.png', 'full'],
  'arveja__carne__pollo': ['carne-pollo-arveja.png', 'full'],
  'pescado__pollo__salmon': ['salmon-pescado-pollo.png', 'full'],
};

const visualType = (ingredient) => {
  const value = ingredient.toLocaleLowerCase('es');
  if (value.includes('salmón') || value.includes('salmon')) return 'salmon';
  if (value.includes('cordero')) return 'cordero';
  if (value.includes('cerdo')) return 'cerdo';
  if (value.includes('subproductos de pollo')) return 'subproductos-pollo';
  if (value.includes('pollo')) return value.includes('aceite') ? 'aceite-pollo' : 'pollo';
  if (value.includes('pescado')) return 'pescado';
  if (value.includes('carne y hueso')) return 'carne-hueso';
  if (value.includes('carne vacuna')) return 'carne-vacuna';
  if (value.includes('carne')) return 'carne';
  if (value.includes('arroz integral')) return 'arroz-integral';
  if (value.includes('arroz')) return 'arroz';
  if (value.includes('garbanzo')) return 'garbanzo';
  if (value.includes('lenteja')) return 'lenteja';
  if (value.includes('arveja')) return 'arveja';
  if (value.includes('trigo')) return 'trigo';
  if (value.includes('maíz') || value.includes('maiz')) return 'maiz';
  if (value.includes('huevo') || value.includes('albúmina') || value.includes('albumina')) return 'huevo';
  throw new Error(`Ingrediente visual no clasificado: ${ingredient}`);
};

const VISUAL_LABELS = {
  salmon: 'SALMÓN', cordero: 'CORDERO', cerdo: 'CERDO', pollo: 'POLLO', pescado: 'PESCADO',
  'subproductos-pollo': 'SUBPRODUCTOS DE POLLO', 'aceite-pollo': 'ACEITE DE POLLO',
  carne: 'CARNE', 'carne-vacuna': 'CARNE VACUNA', 'carne-hueso': 'CARNE Y HUESO',
  arroz: 'ARROZ', 'arroz-integral': 'ARROZ INTEGRAL', garbanzo: 'GARBANZO',
  lenteja: 'LENTEJA', arveja: 'ARVEJA', trigo: 'TRIGO', maiz: 'MAÍZ', huevo: 'HUEVO',
};

const NOTABLES = [
  ['probióticos', 'PROBIÓTICOS'], ['aceite de salmón', 'ACEITE DE SALMÓN'],
  ['aceite de pescado', 'ACEITE DE PESCADO'], ['arándanos', 'ARÁNDANOS'],
  ['zapallo', 'ZAPALLO'], ['glucosamina', 'GLUCOSAMINA'], ['condroit', 'CONDROITÍN'],
  ['colágeno', 'COLÁGENO'], ['l-carnitina', 'L-CARNITINA'], ['carnitina', 'CARNITINA'],
  ['taurina', 'TAURINA'], ['manano-oligosacáridos', 'MOS'], ['fructo-oligosacáridos', 'FOS'],
  ['pulpa de remolacha', 'PULPA DE REMOLACHA'], ['levadura de cerveza', 'LEVADURA DE CERVEZA'],
];

const nutrient = (product, prefix) => {
  const item = product.composicion_centesimal.find(({ nutriente }) =>
    nutriente.toLocaleLowerCase('es').startsWith(prefix));
  if (!item) return { value: '—', qualifier: '' };
  return item.minimo ? { value: item.minimo, qualifier: 'MÍN.' } : { value: item.maximo, qualifier: 'MÁX.' };
};

const notableIngredients = (ingredients) => {
  const lower = ingredients.toLocaleLowerCase('es');
  return NOTABLES.filter(([needle]) => lower.includes(needle)).map(([, label]) => label).slice(0, 3);
};

const titleParts = (product) => {
  const configs = [
    ['Old Prince', /^Old Prince\s*/i], ['High Pro', /^High Pro Criadores\s*/i],
    ['Origen', /^Origen (?:by )?Company\s*/i], ['Natural Meat', /^Natural Meat\s*/i],
    ['Maintenance', /^Maintenance\s*/i], ['Fawna', /^Fawna\s*/i], ['Company', /^Company\s*/i],
    ['Kongo', /^Kongo\s*/i], ['Voraz', /^Voraz\s*/i], ['Carnix', /^Carnix\s*/i],
    ['Cereales', /^Cereales\s*/i], ['Caudillo', /^Caudillo\s*/i],
  ];
  const [primary, pattern] = configs.find(([, regex]) => regex.test(product.nombre)) || [product.marca, /^$/];
  let secondary = product.nombre.replace(pattern, '').trim() || product.categoria;
  secondary = secondary
    .replace(/Proteínas Noveles/gi, 'Novel').replace(/Lamb Meal/gi, 'Cordero').replace(/Swine Meal/gi, 'Cerdo')
    .replace(/Puppy All Breeds/gi, 'Cachorro').replace(/Adult Dog Small Breeds/gi, 'Adulto Pequeño')
    .replace(/Adult Dog Medium & Large Breeds/gi, 'Adulto Mediano y Grande').replace(/Senior All Breeds/gi, 'Senior')
    .replace(/Light All Breeds/gi, 'Light').replace(/Sterilized Cat/gi, 'Gato Esterilizado')
    .replace(/Adult Cat/gi, 'Gato Adulto').replace(/Kitten/gi, 'Gatito');
  return { primary: primary.toUpperCase(), secondary: secondary.toUpperCase() };
};

const safeDirectory = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');

const loadVisualProducts = (repoRoot, collectionRoot) => {
  const source = path.join(repoRoot, 'infoproductos', 'productos.json');
  const rawProducts = JSON.parse(fs.readFileSync(source, 'utf8')).productos;
  const baseProducts = new Map(loadProducts(repoRoot).map((product) => [product.slug, product]));
  return rawProducts.map((raw) => {
    const base = baseProducts.get(raw.id);
    const types = base.ingredients.map(visualType);
    const sceneKey = [...types].sort().join('__');
    const scene = SCENES[sceneKey];
    if (!scene) throw new Error(`Escena inexistente para ${raw.id}: ${sceneKey}`);
    const species = raw.especie === 'perro' ? 'Perros' : 'Gatos';
    return {
      ...base, brand: raw.marca, species, title: titleParts(raw),
      categoryLabel: `${raw.marca} · ${species.toUpperCase()}`,
      visualLine: types.map((type) => VISUAL_LABELS[type]).join(' · '),
      firstSource: VISUAL_LABELS[types[0]], extras: notableIngredients(raw.ingredientes),
      metrics: [
        { label: 'PROTEÍNA', ...nutrient(raw, 'proteína') },
        { label: 'GRASA', ...nutrient(raw, 'extracto etéreo') },
        { label: 'FIBRA', ...nutrient(raw, 'fibra cruda') },
      ],
      photoPath: path.join(collectionRoot, '_recursos', 'fotografias', scene[0]), photoPosition: scene[1],
      destinationDirectory: path.join(collectionRoot, safeDirectory(raw.marca), species),
    };
  });
};

module.exports = { loadVisualProducts };
