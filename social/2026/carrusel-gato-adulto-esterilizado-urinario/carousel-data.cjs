const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '../../..');
const PRODUCTS_FILE = path.join(ROOT, 'infoproductos', 'productos.json');
const IMAGE_DIR = path.join(ROOT, 'infoproductos', 'productosimg');

const WANTED = [
  { id: 'fawna-gato-adulto', label: 'Adulto' },
  { id: 'fawna-gato-esterilizado', label: 'Esterilizado' },
  { id: 'fawna-gato-urinario', label: 'Urinario' },
];

const NUTRIENTS = {
  protein: 'Proteína',
  fat: 'Extracto Etéreo',
  fiber: 'Fibra cruda',
  calcium: 'Calcio',
  phosphorus: 'Fósforo',
};

function required(value, message) {
  if (value === undefined || value === null) throw new Error(message);
  return value;
}

function nutrient(product, name) {
  return required(
    product.composicion_centesimal.find((item) => item.nutriente === name),
    `Falta ${name} en ${product.id}`,
  );
}

function validateQualifiers(product, values) {
  for (const key of ['protein', 'fat']) {
    if (!values[key].minimo || values[key].maximo) {
      throw new Error(`${product.id}: ${key} debe estar declarado como mínimo`);
    }
  }
  if (values.fiber.minimo || !values.fiber.maximo) {
    throw new Error(`${product.id}: fibra debe estar declarada como máximo`);
  }
  for (const key of ['calcium', 'phosphorus']) {
    if (!values[key].minimo || !values[key].maximo) {
      throw new Error(`${product.id}: ${key} debe tener mínimo y máximo`);
    }
  }
}

function loadCarouselData() {
  const database = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const products = WANTED.map(({ id, label }) => {
    const source = required(database.productos.find((item) => item.id === id), `Falta ${id}`);
    const values = Object.fromEntries(
      Object.entries(NUTRIENTS).map(([key, name]) => [key, nutrient(source, name)]),
    );
    validateQualifiers(source, values);

    const imagePath = path.join(IMAGE_DIR, `${id}.png`);
    required(fs.existsSync(imagePath) ? imagePath : null, `Falta el envase ${imagePath}`);

    return {
      id,
      label,
      name: source.nombre,
      image: pathToFileURL(imagePath).href,
      ingredients: source.ingredientes.split(',').map((item) => item.trim()).slice(0, 3),
      values,
    };
  });

  const sharedIngredients = products[0].ingredients;
  if (!products.every((product) => JSON.stringify(product.ingredients) === JSON.stringify(sharedIngredients))) {
    throw new Error('Los primeros tres ingredientes ya no coinciden entre las tres fórmulas');
  }

  return {
    sourceVersion: database.version,
    sourceUpdated: database.ultima_actualizacion,
    products,
    sharedIngredients,
    logoLight: pathToFileURL(path.join(ROOT, 'assets', 'logo-light.svg')).href,
    logoDark: pathToFileURL(path.join(ROOT, 'assets', 'logo-dark.svg')).href,
  };
}

module.exports = { loadCarouselData, PRODUCTS_FILE };
