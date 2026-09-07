const fs = require('fs');
const path = require('path');

const nutrient = (product, label) => {
  const entry = product.composicion_centesimal.find(({ nutriente }) =>
    nutriente.toLocaleLowerCase('es').startsWith(label));
  if (!entry) return { value: '—', qualifier: '' };
  return entry.minimo
    ? { value: entry.minimo, qualifier: 'MÍN.' }
    : { value: entry.maximo, qualifier: 'MÁX.' };
};

const firstIngredients = (product) => product.ingredientes
  .split(',')
  .slice(0, 3)
  .map((item) => item.trim());

const productView = (products, cutouts, spec) => {
  const product = products.get(spec.id);
  if (!product) throw new Error(`Producto inexistente: ${spec.id}`);
  return {
    ...spec,
    category: product.categoria,
    ingredients: firstIngredients(product),
    presentations: product.presentaciones.join(' · '),
    metrics: [
      { label: 'PROTEÍNA', ...nutrient(product, 'proteína') },
      { label: 'GRASA', ...nutrient(product, 'extracto etéreo') },
      { label: 'FIBRA', ...nutrient(product, 'fibra cruda') },
    ],
    imagePath: path.join(cutouts, `${spec.id}.png`),
  };
};

const CAMPAIGNS = [
  {
    number: '03', kind: 'comparison', slug: 'comparativa-gatos-salmon-cordero',
    photo: 'ingredientes-gatos-salmon-cordero.png', accent: '#3db870',
    eyebrow: 'GATOS ADULTOS · COMPARATIVA VISUAL',
    headline: 'DOS FÓRMULAS FELINAS.|INGREDIENTES A LA VISTA.',
    subtitle: 'Misma etapa de vida. Distintas fuentes principales declaradas.',
    products: [
      { id: 'fawna-gato-adulto', displayName: 'Fawna Gato Adulto', visualLine: 'SALMÓN · POLLO · HUEVO' },
      { id: 'op-pn-adulto-gato', displayName: 'Old Prince Cordero Adult Cat', visualLine: 'CORDERO · ARROZ · ARVEJA' },
    ],
  },
  {
    number: '04', kind: 'comparison', slug: 'comparativa-cerdo-cordero',
    photo: 'ingredientes-cerdo-cordero.png', accent: '#c76850',
    eyebrow: 'PERROS ADULTOS · COMPARATIVA VISUAL',
    headline: 'DOS PERFILES ADULTOS.|PROTEÍNAS DIFERENTES.',
    subtitle: 'Cerdo con legumbres o cordero con cereales: empezá por la lista.',
    products: [
      { id: 'op-pn-swine-adult-all', displayName: 'Old Prince Novel Cerdo', visualLine: 'CERDO · GARBANZO · LENTEJA' },
      { id: 'high-pro-criadores-cordero-perros-adultos', displayName: 'High Pro Cordero Adulto', visualLine: 'CORDERO · ARROZ · MAÍZ' },
    ],
  },
  {
    number: '05', kind: 'spotlight', slug: 'premium-fawna-gatito',
    photo: 'ingredientes-gatos-salmon-cordero.png', photoPosition: 'left', accent: '#76963c',
    eyebrow: 'PRODUCTO ESPECIALIZADO · EN DETALLE',
    headline: 'FAWNA|GATITO.',
    subtitle: 'Salmón como primer ingrediente declarado.',
    product: {
      id: 'fawna-gatito', displayName: 'Fawna Gatito', visualLine: 'SALMÓN · POLLO · HUEVO',
      extras: ['Aceite de salmón', 'Arándanos deshidratados', 'Probióticos declarados'],
    },
  },
  {
    number: '06', kind: 'spotlight', slug: 'premium-old-prince-gato-adulto',
    photo: 'ingredientes-gatos-salmon-cordero.png', photoPosition: 'right', accent: '#c76850',
    eyebrow: 'PRODUCTO ESPECIALIZADO · EN DETALLE',
    headline: 'OLD PRINCE|ADULT CAT.',
    subtitle: 'Cordero como primer ingrediente declarado.',
    product: {
      id: 'op-pn-adulto-gato', displayName: 'Old Prince Proteínas Noveles Adult Cat', visualLine: 'CORDERO · ARROZ · ARVEJA',
      extras: ['Aceite de salmón', 'Pulpa de remolacha · FOS', 'Taurina declarada'],
    },
  },
  {
    number: '07', kind: 'spotlight', slug: 'premium-old-prince-cerdo',
    photo: 'ingredientes-cerdo-cordero.png', photoPosition: 'left', accent: '#c76850',
    eyebrow: 'PROTEÍNA ALTERNATIVA · EN DETALLE',
    headline: 'OLD PRINCE|NOVEL CERDO.',
    subtitle: 'Cerdo como primer ingrediente declarado.',
    product: {
      id: 'op-pn-swine-adult-all', displayName: 'Old Prince Proteínas Noveles Swine Adult', visualLine: 'CERDO · GARBANZO · LENTEJA',
      extras: ['Aceite de pescado', 'Glucosamina declarada', 'Condroitín sulfato'],
    },
  },
  {
    number: '08', kind: 'spotlight', slug: 'premium-equilibrium-control-peso',
    photo: 'ingredientes-control-peso.png', photoPosition: 'full', accent: '#3b75a8',
    eyebrow: 'PERFIL NUTRICIONAL · EN DETALLE',
    headline: 'EQUILIBRIUM|CONTROL DE PESO.',
    subtitle: 'Pollo como primer ingrediente declarado.',
    product: {
      id: 'op-eq-control-peso', displayName: 'Old Prince Equilibrium Control de Peso', visualLine: 'POLLO · ARROZ · MAÍZ',
      extras: ['Fuente de fibra insoluble', 'Aceite de pescado', 'L-carnitina declarada'],
    },
  },
];

const loadCampaigns = (repoRoot) => {
  const source = path.join(repoRoot, 'infoproductos', 'productos.json');
  const products = new Map(JSON.parse(fs.readFileSync(source, 'utf8')).productos
    .map((product) => [product.id, product]));
  const cutouts = path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'assets', 'cutouts-exactos');
  return CAMPAIGNS.map((campaign) => ({
    ...campaign,
    products: campaign.products?.map((spec) => productView(products, cutouts, spec)),
    product: campaign.product ? productView(products, cutouts, campaign.product) : undefined,
  }));
};

module.exports = { loadCampaigns };
