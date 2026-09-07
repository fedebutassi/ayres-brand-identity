const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '../..');
const productsFile = path.join(repoRoot, 'infoproductos', 'productos.json');
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8')).productos;

const collections = [
  {
    name: 'proteina',
    source: path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'output', 'productos'),
    destination: path.join(repoRoot, 'ProtEnProductos'),
    prefix: 'ayres-producto',
  },
  {
    name: 'ingredientes',
    source: path.join(repoRoot, 'social', '2026', 'pruebas-productos-ayres', 'output', 'productos-ingredientes'),
    destination: path.join(repoRoot, 'IngredProductos'),
    prefix: 'ayres-ingredientes',
  },
];

const safeDirectory = (name) => name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const checksum = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const organizeCollection = (collection) => {
  const inventory = products.map((product) => {
    const filename = `${collection.prefix}-${product.id}-1080x1350.png`;
    const source = path.join(collection.source, filename);
    if (!fs.existsSync(source)) throw new Error(`Falta la imagen: ${source}`);

    const species = product.especie === 'perro' ? 'Perros' : 'Gatos';
    const destinationDirectory = path.join(collection.destination, safeDirectory(product.marca), species);
    const destination = path.join(destinationDirectory, filename);
    fs.mkdirSync(destinationDirectory, { recursive: true });
    fs.copyFileSync(source, destination);

    const sourceHash = checksum(source);
    if (sourceHash !== checksum(destination)) throw new Error(`La copia no coincide: ${filename}`);
    return {
      producto_id: product.id,
      marca: product.marca,
      especie: species,
      original: path.relative(repoRoot, source),
      copia_ordenada: path.relative(repoRoot, destination),
      sha256: sourceHash,
    };
  });

  fs.writeFileSync(
    path.join(collection.destination, 'MANIFIESTO.json'),
    `${JSON.stringify(inventory, null, 2)}\n`,
  );
  return inventory.length;
};

for (const collection of collections) {
  console.log(`${collection.name}: ${organizeCollection(collection)} imágenes copiadas y verificadas.`);
}
