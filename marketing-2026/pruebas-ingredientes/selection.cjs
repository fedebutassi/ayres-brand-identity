const { loadProducts } = require('../../social/2026/pruebas-productos-ayres/product-data.cjs');

const SELECTION = [
  { id: 'fawna-adulto-pequeno', displayName: 'Fawna Adulto Pequeño' },
  { id: 'op-pn-lamb-adult-small', displayName: 'Old Prince Cordero Adult Small' },
];

const loadSelection = (repoRoot) => {
  const products = new Map(loadProducts(repoRoot).map((product) => [product.slug, product]));
  return SELECTION.map(({ id, displayName }) => {
    const product = products.get(id);
    if (!product) throw new Error(`Producto inexistente: ${id}`);
    return { ...product, displayName };
  });
};

module.exports = { loadSelection };
