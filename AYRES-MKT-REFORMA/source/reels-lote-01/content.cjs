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
    id: '01-mas-proteina-significa-mejor',
    badge: 'DECISIÓN INFORMADA',
    eyebrow: 'NUTRICIÓN · ETIQUETAS',
    scenes: [
      { layout: 'hero', title: '¿MÁS PROTEÍNA<br>SIGNIFICA <em>MEJOR?</em>', lede: 'Un porcentaje ayuda a comparar. Pero no cuenta toda la historia.', products: [fawna, kongo] },
      { layout: 'list', title: 'EL PORCENTAJE<br><em>IMPORTA.</em>', lede: 'Pero debe interpretarse dentro de la fórmula completa.', products: [fawna, kongo], listTitle: 'Antes de decidir, revisá:', points: [{ title: 'Etapa de vida' }, { title: 'Tamaño del animal' }] },
      { layout: 'list', title: 'MIRÁ MÁS<br>QUE UN <em>NÚMERO.</em>', products: [fawna, kongo], listTitle: 'También compará:', points: [{ title: 'Primeros ingredientes declarados' }, { title: 'Necesidades particulares' }] },
      { layout: 'definition', dark: true, title: 'LA ELECCIÓN ES<br>LA <em>FÓRMULA COMPLETA.</em>', lede: 'La opción indicada depende de la etapa, el tamaño y la condición individual.', definitions: [{ term: 'Proteína', copy: 'Es una variable relevante.' }, { term: 'Contexto', copy: 'Es lo que permite interpretarla.' }] },
      { layout: 'cta', dark: true, title: 'COMPARÁ CON<br><em>CRITERIO.</em>', lede: 'Información clara para mascotas que son familia.', cta: { title: 'Guardá este Reel', action: 'Antes de comparar tu próxima bolsa →' } },
    ],
  },
  {
    id: '02-mismo-28-distinta-formula',
    badge: 'COMPARACIÓN REAL',
    eyebrow: 'CACHORROS · INFORMACIÓN DECLARADA',
    scenes: [
      { layout: 'hero', title: 'MISMO <em>28%.</em><br>¿MISMA FÓRMULA?', lede: 'Company Cachorros y Kongo Gold declaran el mismo mínimo de proteína.', products: [company, kongo] },
      { layout: 'focus', title: 'COMPANY<br><em>CACHORROS</em>', lede: 'Sus primeros ingredientes declarados:', focus: company, points: company.ingredients.map((title) => ({ title })) },
      { layout: 'focus', title: 'KONGO GOLD<br><em>CACHORROS</em>', lede: 'Sus primeros ingredientes declarados:', focus: kongo, points: kongo.ingredients.map((title) => ({ title })) },
      { layout: 'definition', dark: true, title: 'MISMO PORCENTAJE.<br><em>DISTINTA COMPOSICIÓN.</em>', definitions: [{ term: '28%', copy: 'Proteína mínima declarada en ambos.' }, { term: 'Fórmula', copy: 'Ingredientes y presentaciones diferentes.' }] },
      { layout: 'cta', dark: true, title: 'COMPARÁ MÁS<br>QUE EL <em>FRENTE.</em>', lede: 'Leé la información completa declarada en cada envase.', cta: { title: '¿Qué productos comparamos después?', action: 'Dejanos tu propuesta en comentarios →' } },
    ],
  },
  {
    id: '06-que-significa-proteina-minima',
    badge: 'ETIQUETA EN CLARO',
    eyebrow: 'COMPOSICIÓN CENTESIMAL',
    scenes: [
      { layout: 'focus', title: 'ESE <em>34%</em><br>DICE “MÍNIMO”.', lede: '¿Qué significa cuando aparece en una etiqueta?', focus: fawna },
      { layout: 'definition', title: 'MÍNIMO ES EL<br><em>PISO DECLARADO.</em>', lede: 'El producto declara que ese nutriente alcanza, como mínimo, el valor informado.', definitions: [{ term: 'Ejemplo', copy: 'Proteína: 34% mínimo.' }, { term: 'Lectura', copy: 'No se presenta como un valor exacto fijo.' }] },
      { layout: 'definition', dark: true, title: 'MÁXIMO ES EL<br><em>TECHO DECLARADO.</em>', lede: 'Algunos componentes se informan con un límite máximo.', definitions: [{ term: 'Mínimo', copy: 'Proteína y grasa suelen declararse así.' }, { term: 'Máximo', copy: 'Fibra y humedad suelen usar este criterio.' }] },
      { layout: 'list', title: 'POR ESO SIEMPRE<br><em>ACLARAMOS.</em>', listTitle: 'Al mostrar un valor:', points: [{ title: 'Indicamos si es mínimo o máximo' }, { title: 'Usamos la información real del envase' }, { title: 'Evitamos comparaciones engañosas' }] },
      { layout: 'cta', dark: true, title: 'LEÉ LA ETIQUETA<br>CON <em>CONTEXTO.</em>', cta: { title: 'Compartilo', action: 'Con alguien que compara porcentajes →' } },
    ],
  },
  {
    id: '08-categorias-sector-cachorros',
    badge: 'AYRES MAYORISTA',
    eyebrow: 'PETSHOPS · SURTIDO',
    scenes: [
      { layout: 'hero', title: '¿TENÉS UN<br><em>PETSHOP?</em>', lede: 'Tres criterios para ordenar mejor el sector cachorros.', products: [fawna, oldPrince, company, kongo] },
      { layout: 'focus', title: '01 · RAZAS<br><em>PEQUEÑAS</em>', lede: 'Identificá las fórmulas que especifican tamaño o segmento.', focus: fawna },
      { layout: 'hero', title: '02 · TODAS<br>LAS <em>RAZAS</em>', lede: 'Sumá alternativas con diferentes ingredientes y presentaciones.', products: [oldPrince, kongo] },
      { layout: 'hero', dark: true, title: '03 · DIFERENTES<br><em>LÍNEAS</em>', lede: 'Una oferta clara permite atender distintas búsquedas comerciales.', products: [fawna, oldPrince, company, kongo] },
      { layout: 'cta', dark: true, title: 'CONSTRUÍ UNA OFERTA<br><em>MÁS CLARA.</em>', lede: 'Marcas y categorías para acompañar el crecimiento de tu negocio.', cta: { title: 'Escribinos CATÁLOGO', action: 'Y contanos la localidad de tu comercio →' } },
    ],
  },
];

module.exports = { reels, repoRoot };
