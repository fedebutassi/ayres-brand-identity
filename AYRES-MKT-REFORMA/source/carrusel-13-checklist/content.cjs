const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, 'infoproductos', 'productos.json'), 'utf8')).productos;
const catalog = new Map(data.map((item) => [item.id, item]));

const nutrient = (item, prefix) => item.composicion_centesimal.find(({ nutriente }) =>
  nutriente.toLocaleLowerCase('es').startsWith(prefix));

const product = (id) => {
  const item = catalog.get(id);
  if (!item) throw new Error(`Producto inexistente: ${id}`);
  const protein = nutrient(item, 'proteína');
  return {
    id,
    name: item.nombre,
    stat: protein?.minimo || protein?.maximo || '—',
    label: protein?.minimo ? 'PROTEÍNA MÍN.' : 'PROTEÍNA MÁX.',
    ingredients: item.ingredientes.split(',').slice(0, 3).map((value) => value.trim()),
    presentations: item.presentaciones.join(' · '),
    raw: item,
  };
};

const fawna = product('fawna-cachorro-pequeno');
const oldPrince = product('op-pn-lamb-puppy-all');
const company = product('company-cachorros');
const kongo = product('kongo-gold-cachorros-todas-razas');
const protein = nutrient(fawna.raw, 'proteína');
const fat = nutrient(fawna.raw, 'extracto etéreo');
const fiber = nutrient(fawna.raw, 'fibra');
const moisture = nutrient(fawna.raw, 'humedad');

const content = {
  badge: 'CHECKLIST AYRES · 7 PLACAS',
  slides: [
    { type: 'cover', eyebrow: 'GUÍA PARA ELEGIR MEJOR', title: 'NO COMPARES SOLO<br>EL <em>PORCENTAJE DE PROTEÍNA.</em>', lede: 'Cinco datos para interpretar mejor dos alimentos.', products: [fawna, kongo] },
    { number: '01', eyebrow: 'PRIMER FILTRO', title: 'REVISÁ LA<br><em>ETAPA DE VIDA.</em>', lede: 'La fórmula debe corresponder a la etapa declarada en el envase.', cards: [{ title: 'Cachorro', copy: 'Necesidades asociadas al crecimiento.' }, { title: 'Adulto', copy: 'Mantenimiento según tamaño y condición.' }, { title: 'Senior', copy: 'Cuando existe una fórmula específica para esa etapa.' }, { title: 'Objetivo específico', copy: 'Debe elegirse según la condición individual.', note: 'Ante condiciones particulares, consultá con su veterinario.' }] },
    { number: '02', eyebrow: 'SEGUNDO FILTRO', title: 'IDENTIFICÁ EL<br><em>TAMAÑO O SEGMENTO.</em>', lede: 'No todas las fórmulas para cachorros declaran el mismo alcance.', comparison: [{ name: 'Razas pequeñas', imageId: fawna.id, items: ['Fawna Cachorro Pequeño', 'Proteína 34% mínimo', 'Presentaciones: ' + fawna.presentations] }, { name: 'Todas las razas', imageId: oldPrince.id, items: ['Old Prince Puppy All Breeds', 'Proteína 32% mínimo', 'Presentaciones: ' + oldPrince.presentations] }] },
    { number: '03', eyebrow: 'TERCER FILTRO', title: 'LEÉ LA<br><em>COMPOSICIÓN CENTESIMAL.</em>', lede: 'Cada dato debe indicar si corresponde a un mínimo o un máximo.', metrics: [{ label: 'Proteína', value: protein.minimo || protein.maximo, detail: protein.minimo ? 'Mínimo declarado' : 'Máximo declarado' }, { label: 'Extracto etéreo', value: fat.minimo || fat.maximo, detail: fat.minimo ? 'Mínimo declarado' : 'Máximo declarado' }, { label: 'Fibra', value: fiber.minimo || fiber.maximo, detail: fiber.maximo ? 'Máximo declarado' : 'Mínimo declarado' }, { label: 'Humedad', value: moisture.minimo || moisture.maximo, detail: moisture.maximo ? 'Máximo declarado' : 'Mínimo declarado' }] },
    { number: '04', eyebrow: 'CUARTO FILTRO', title: 'COMPARÁ LOS<br><em>PRIMEROS INGREDIENTES.</em>', lede: 'El mismo porcentaje de proteína puede aparecer en composiciones diferentes.', comparison: [{ name: 'Company Cachorros · 28%', imageId: company.id, items: company.ingredients }, { name: 'Kongo Gold Cachorros · 28%', imageId: kongo.id, items: kongo.ingredients }] },
    { number: '05', eyebrow: 'QUINTO FILTRO', title: 'MIRÁ LAS<br><em>PRESENTACIONES.</em>', lede: 'El formato también forma parte de una decisión práctica de compra y surtido.', presentations: [fawna, oldPrince, company, kongo].map((item) => ({ name: item.name, value: item.presentations })) },
    { type: 'cta', dark: true, eyebrow: 'DECISIÓN INFORMADA', title: 'COMPARÁ LA<br><em>FÓRMULA COMPLETA.</em>', lede: 'Etapa, tamaño, composición, ingredientes y presentación.', cta: { title: 'Guardá esta checklist', copy: '¿Tenés un petshop? Compartila con tu equipo de atención →' } },
  ],
};

module.exports = { content, repoRoot };
