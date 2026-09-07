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
    brand: item.marca,
    category: item.categoria,
    protein: protein?.minimo || protein?.maximo || '—',
    proteinLabel: protein?.minimo ? 'mínimo declarado' : 'máximo declarado',
    ingredients: item.ingredientes.split(',').slice(0, 3).map((value) => value.trim()),
    presentations: item.presentaciones.join(' · '),
  };
};

const fawna = product('fawna-cachorro-pequeno');
const oldPrince = product('op-pn-lamb-puppy-all');
const company = product('company-cachorros');
const kongo = product('kongo-gold-cachorros-todas-razas');
const all = [fawna, oldPrince, company, kongo];

const profileSlide = (item, index, title, sizeLabel) => ({
  number: String(index).padStart(2, '0'),
  eyebrow: `OPCIÓN ${String(index).padStart(2, '0')} · ${item.brand.toUpperCase()}`,
  title,
  profile: {
    id: item.id,
    name: item.name,
    protein: item.protein,
    rows: [
      { label: 'Etapa y alcance', value: sizeLabel },
      { label: 'Proteína', value: `${item.protein} ${item.proteinLabel}` },
      { label: 'Primeros ingredientes', value: item.ingredients.join(', ') },
      { label: 'Presentaciones', value: item.presentations },
    ],
  },
});

const content = {
  badge: 'COMPARATIVA AYRES · 7 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'GUÍA PARA COMERCIOS',
      title: 'CUATRO ALTERNATIVAS<br>PARA <em>CACHORROS.</em>',
      lede: 'Etapa, proteína mínima, primeros ingredientes y presentaciones, según lo declarado por cada fórmula.',
      products: all,
    },
    profileSlide(fawna, 1, 'FAWNA<br><em>CACHORRO PEQUEÑO.</em>', 'Cachorro · Razas pequeñas'),
    profileSlide(oldPrince, 2, 'OLD PRINCE PROTEÍNAS NOVELES<br><em>LAMB MEAL PUPPY ALL BREEDS.</em>', 'Cachorro · Todas las razas'),
    profileSlide(company, 3, 'COMPANY<br><em>CACHORROS.</em>', 'Cachorro'),
    profileSlide(kongo, 4, 'KONGO GOLD<br><em>CACHORROS TODAS LAS RAZAS.</em>', 'Cachorro · Todas las razas'),
    {
      number: '05',
      eyebrow: 'VISTA COMPLETA',
      title: 'TABLA <em>COMPARATIVA.</em>',
      lede: 'Datos declarados por cada fórmula. Sin ganadores: la elección depende del surtido y la clientela de cada comercio.',
      table: {
        headers: ['Producto', 'Proteína mín.', 'Primer ingrediente', 'Presentaciones'],
        rows: all.map((item) => [item.name, item.protein, item.ingredients[0], item.presentations]),
      },
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'SURTIDO PARA TU COMERCIO',
      title: 'UN SECTOR CACHORROS<br><em>BIEN ARMADO.</em>',
      lede: 'Cuatro fórmulas diferentes para responder a las necesidades de tu clientela.',
      cta: { title: '¿Tenés un petshop?', copy: 'Escribinos CATÁLOGO y contanos tu localidad →' },
    },
  ],
};

module.exports = { content, repoRoot };
