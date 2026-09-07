const fs = require('fs');
const path = require('path');

const THEME_DEFAULT = { accent: '#3db870', soft: '#9ec9aa' };

const THEMES = [
  [/^fawna-/, '#76963c', '#b8c68d'],
  [/^op-pn-/, '#c76850', '#c9a078'],
  [/^op-eq-/, '#3b75a8', '#9fc1d8'],
  [/^op-prem-/, '#b27e39', '#ddbd86'],
  [/^maintenance-/, '#3f7189', '#a6c2cf'],
  [/^natural-meat-/, '#d87838', '#e5b38a'],
  [/^company-/, '#337f8a', '#99c3c6'],
  [/^kongo-gold-/, '#ab8733', '#d8c692'],
  [/^kongo-gat/, '#cf2462', '#47afce'],
  [/^kongo-/, '#c64235', '#dba39e'],
  [/^voraz-/, '#cb3d35', '#e7a09a'],
  [/^carnix-/, '#b7332f', '#df8b86'],
  [/^cereales-/, '#4c7794', '#a7bfce'],
  [/^caudillo-/, '#353535', '#9a9a9a'],
  [/^origen-/, '#c86a45', '#e0ab94'],
  [/^high-pro-/, '#d07a35', '#e6b78f'],
];

function themeFor(productId) {
  const match = THEMES.find(([pattern]) => pattern.test(productId));
  return match ? { accent: match[1], soft: match[2] } : THEME_DEFAULT;
}

function nutrientFor(product, nutrientName) {
  return product.composicion_centesimal.find(({ nutriente }) =>
    nutriente.toLocaleLowerCase('es').startsWith(nutrientName)
  );
}

function nutrientValue(nutrient) {
  if (!nutrient) return '—';
  return nutrient.minimo || nutrient.maximo || '—';
}

function firstIngredients(product) {
  return product.ingredientes
    .split(',')
    .slice(0, 3)
    .map((ingredient) => ingredient.trim());
}

function titleSize(name) {
  if (name.length > 58) return 'title-xlong';
  if (name.length > 44) return 'title-long';
  if (name.length > 30) return 'title-medium';
  return 'title-regular';
}

function normalizeProduct(product, repoRoot) {
  const protein = nutrientFor(product, 'proteína');
  const fat = nutrientFor(product, 'extracto etéreo');
  const theme = themeFor(product.id);

  return {
    slug: product.id,
    name: product.nombre,
    titleSize: titleSize(product.nombre),
    subtitle: product.categoria,
    category: `${product.marca} · ${product.especie === 'perro' ? 'PERROS' : 'GATOS'}`,
    protein: nutrientValue(protein),
    fat: nutrientValue(fat),
    ingredients: firstIngredients(product),
    presentations: product.presentaciones.join(' · '),
    accent: theme.accent,
    accentSoft: theme.soft,
    imagePath: path.join(__dirname, 'assets', 'cutouts-exactos', `${product.id}.png`),
    logoPath: path.join(repoRoot, 'assets', 'logo-light.svg'),
  };
}

function loadProducts(repoRoot) {
  const source = path.join(repoRoot, 'infoproductos', 'productos.json');
  const data = JSON.parse(fs.readFileSync(source, 'utf8'));
  return data.productos.map((product) => normalizeProduct(product, repoRoot));
}

module.exports = { loadProducts };
