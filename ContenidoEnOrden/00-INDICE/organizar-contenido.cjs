const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '../..');
const sourceRoot = path.join(repoRoot, 'marketing-2026');
const libraryRoot = path.resolve(__dirname, '..');
const mappings = [];

const add = (source, destinationDirectory, tags) => {
  mappings.push({ source, destinationDirectory, tags });
};

const addGroup = (sources, destinationDirectory, tags) => {
  sources.forEach((source) => add(source, destinationDirectory, tags));
};

// Campaña institucional y de comunidad.
addGroup(['output/feed/01-familia-que-espera-1080x1350.png', 'output/feed/02-quien-manda-en-casa-1080x1350.png'],
  '01-Piezas-Finales/AYRES-Institucional/Comunidad/Feed', ['final', 'ayres', 'comunidad', 'feed']);
addGroup(['output/stories/10-story-segui-a-quienes-cuidan-1080x1920.png', 'output/stories/11-story-equipo-perro-gato-1080x1920.png'],
  '01-Piezas-Finales/AYRES-Institucional/Comunidad/Historias', ['final', 'ayres', 'comunidad', 'historia']);
add('output/feed/04-elegir-empieza-antes-1080x1350.png',
  '01-Piezas-Finales/AYRES-Institucional/Educacion/Feed', ['final', 'ayres', 'educacion', 'feed']);
add('output/feed/09-no-adivines-1080x1350.png',
  '01-Piezas-Finales/AYRES-Institucional/Asesoramiento/Feed', ['final', 'ayres', 'asesoramiento', 'feed']);
add('output/stories/15-story-contanos-y-comparamos-1080x1920.png',
  '01-Piezas-Finales/AYRES-Institucional/Asesoramiento/Historias', ['final', 'ayres', 'asesoramiento', 'historia']);
addGroup(['output/feed/07-pet-shop-mejores-razones-1080x1350.png', 'output/feed/08-cordoba-nos-une-1080x1350.png'],
  '01-Piezas-Finales/AYRES-Institucional/B2B/Feed', ['final', 'ayres', 'b2b', 'feed']);
add('output/stories/14-story-suma-ayres-negocio-1080x1920.png',
  '01-Piezas-Finales/AYRES-Institucional/B2B/Historias', ['final', 'ayres', 'b2b', 'historia']);

// Catálogo, educación y comparativas multimarca.
add('output/feed/05-setenta-y-una-opciones-1080x1350.png',
  '01-Piezas-Finales/Catalogo-Multimarca/Feed', ['final', 'multimarca', 'catalogo', 'feed']);
add('output/stories/13-story-descubri-catalogo-1080x1920.png',
  '01-Piezas-Finales/Catalogo-Multimarca/Historias', ['final', 'multimarca', 'catalogo', 'historia']);
add('output/feed/06-comparar-tambien-es-cuidar-1080x1350.png',
  '01-Piezas-Finales/Productos/Comparativas/Multimarca', ['final', 'multimarca', 'comparativa', 'feed']);
add('output/feed/03-no-mires-solo-el-frente-1080x1350.png',
  '01-Piezas-Finales/Productos/Individuales/Fawna/Gatos/Educacion', ['final', 'fawna', 'gatos', 'educacion', 'feed']);
add('output/stories/12-story-tres-ingredientes-1080x1920.png',
  '01-Piezas-Finales/Productos/Individuales/Old-Prince/Perros/Educacion', ['final', 'old-prince', 'perros', 'educacion', 'historia']);

// Serie de ingredientes: comparativas por marcas y especie.
addGroup(['pruebas-ingredientes/01-salmon-cordero-1080x1350.png', 'pruebas-ingredientes/02-ingredientes-visuales-salmon-cordero-1080x1350.png'],
  '01-Piezas-Finales/Productos/Comparativas/Fawna-vs-Old-Prince/Perros', ['final', 'fawna', 'old-prince', 'perros', 'comparativa']);
add('pruebas-ingredientes/03-comparativa-gatos-salmon-cordero-1080x1350.png',
  '01-Piezas-Finales/Productos/Comparativas/Fawna-vs-Old-Prince/Gatos', ['final', 'fawna', 'old-prince', 'gatos', 'comparativa']);
add('pruebas-ingredientes/04-comparativa-cerdo-cordero-1080x1350.png',
  '01-Piezas-Finales/Productos/Comparativas/Old-Prince-vs-High-Pro/Perros', ['final', 'old-prince', 'high-pro', 'perros', 'comparativa']);

// Serie de ingredientes: productos individuales por marca y especie.
add('pruebas-ingredientes/05-premium-fawna-gatito-1080x1350.png',
  '01-Piezas-Finales/Productos/Individuales/Fawna/Gatos', ['final', 'fawna', 'gatos', 'individual']);
add('pruebas-ingredientes/06-premium-old-prince-gato-adulto-1080x1350.png',
  '01-Piezas-Finales/Productos/Individuales/Old-Prince/Gatos', ['final', 'old-prince', 'gatos', 'individual']);
addGroup(['pruebas-ingredientes/07-premium-old-prince-cerdo-1080x1350.png', 'pruebas-ingredientes/08-premium-equilibrium-control-peso-1080x1350.png'],
  '01-Piezas-Finales/Productos/Individuales/Old-Prince/Perros', ['final', 'old-prince', 'perros', 'individual']);

// Recursos fotográficos generados.
addGroup(['assets/generated/familia-perro-gato.png', 'assets/generated/perro-gato-mirada.png', 'assets/generated/pet-shop-asesoramiento.png'],
  '02-Recursos-Visuales/AYRES-Institucional/Fondos-Lifestyle', ['recurso', 'ayres', 'lifestyle']);
addGroup(['pruebas-ingredientes/assets/ingredientes-salmon-cordero.png', 'pruebas-ingredientes/assets/ingredientes-salmon-cordero-horizontal.png', 'pruebas-ingredientes/assets/ingredientes-gatos-salmon-cordero.png'],
  '02-Recursos-Visuales/Ingredientes/Comparativas/Fawna-vs-Old-Prince', ['recurso', 'ingredientes', 'fawna', 'old-prince']);
add('pruebas-ingredientes/assets/ingredientes-cerdo-cordero.png',
  '02-Recursos-Visuales/Ingredientes/Comparativas/Old-Prince-vs-High-Pro', ['recurso', 'ingredientes', 'old-prince', 'high-pro']);
add('pruebas-ingredientes/assets/ingredientes-control-peso.png',
  '02-Recursos-Visuales/Ingredientes/Individuales/Old-Prince/Perros', ['recurso', 'ingredientes', 'old-prince', 'perros']);

// Textos, estrategia y prompts.
addGroup(['CAPTIONS.md', 'PROMPTS.md', 'README.md'],
  '03-Textos-y-Planificacion/Campania-General', ['documentacion', 'campania-general']);
addGroup(['pruebas-ingredientes/IDEAS-PROXIMAS-PUBLICACIONES.md', 'pruebas-ingredientes/PROMPT-INGREDIENTES.md', 'pruebas-ingredientes/PROMPTS-SERIE.md'],
  '03-Textos-y-Planificacion/Serie-Ingredientes', ['documentacion', 'serie-ingredientes']);

// Fuentes editables y scripts de renderizado.
addGroup(['campaign.css', 'campaign.html', 'campaign.js', 'campaign.json', 'render.cjs'],
  '04-Fuentes-Editables/Campania-General', ['fuente', 'campania-general']);
addGroup([
  'pruebas-ingredientes/campaign-data.cjs', 'pruebas-ingredientes/comparativa.css',
  'pruebas-ingredientes/comparativa.html', 'pruebas-ingredientes/comparativa.js',
  'pruebas-ingredientes/render-serie.cjs', 'pruebas-ingredientes/render-visual-explicito.cjs',
  'pruebas-ingredientes/render.cjs', 'pruebas-ingredientes/selection.cjs',
  'pruebas-ingredientes/serie.css', 'pruebas-ingredientes/serie.html',
  'pruebas-ingredientes/serie.js', 'pruebas-ingredientes/visual-explicito.css',
  'pruebas-ingredientes/visual-explicito.html', 'pruebas-ingredientes/visual-explicito.js',
], '04-Fuentes-Editables/Serie-Ingredientes', ['fuente', 'serie-ingredientes']);

const listFiles = (directory, prefix = '') => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const relative = path.join(prefix, entry.name);
    return entry.isDirectory() ? listFiles(path.join(directory, entry.name), relative) : [relative];
  });

const checksum = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const validateMappings = () => {
  const mapped = mappings.map(({ source }) => source).sort();
  const unique = new Set(mapped);
  if (unique.size !== mapped.length) throw new Error('Hay archivos de origen duplicados en el mapeo.');
  const sourceFiles = listFiles(sourceRoot).sort();
  const missing = sourceFiles.filter((file) => !unique.has(file));
  const unknown = mapped.filter((file) => !sourceFiles.includes(file));
  if (missing.length || unknown.length) {
    throw new Error(`Mapeo incompleto. Sin clasificar: ${missing.join(', ') || 'ninguno'}. Inexistentes: ${unknown.join(', ') || 'ninguno'}.`);
  }
};

const copyMappedContent = () => mappings.map(({ source, destinationDirectory, tags }) => {
  const sourcePath = path.join(sourceRoot, source);
  const destination = path.join(libraryRoot, destinationDirectory, path.basename(source));
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(sourcePath, destination);
  if (checksum(sourcePath) !== checksum(destination)) throw new Error(`La copia no coincide: ${source}`);
  return {
    original: path.relative(repoRoot, sourcePath),
    copia_ordenada: path.relative(repoRoot, destination),
    etiquetas: tags,
    sha256: checksum(sourcePath),
  };
});

validateMappings();
const inventory = copyMappedContent();
fs.writeFileSync(path.join(__dirname, 'MANIFIESTO.json'), `${JSON.stringify(inventory, null, 2)}\n`);
console.log(`Copiados y verificados: ${inventory.length} archivos.`);
