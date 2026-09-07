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
    presentations: item.presentaciones.join(' · '),
  };
};

const fawna = product('fawna-cachorro-pequeno');
const kongo = product('kongo-gold-cachorros-todas-razas');
const oldPrincePuppy = product('op-pn-lamb-puppy-all');
const fawnaSinStat = product('fawna-cachorro-pequeno', { showStat: false });
const fawnaGatoSinStat = product('fawna-gato-adulto', { showStat: false });
const fawnaGatoEsterilizadoSinStat = product('fawna-gato-esterilizado', { showStat: false });

const reels = [
  {
    id: '03-fawna-frente-a-old-prince',
    badge: 'COMPARACIÓN NEUTRAL',
    eyebrow: 'NUTRICIÓN · CACHORROS',
    scenes: [
      { layout: 'hero', title: 'FAWNA <em>34%</em> FRENTE A<br>OLD PRINCE <em>32%.</em>', lede: 'Dos opciones para cachorros. ¿Qué cambia además de la proteína?', products: [fawna, oldPrincePuppy] },
      { layout: 'list', title: '01 · ¿PARA QUÉ<br><em>CACHORRO?</em>', lede: 'El segmento declarado no es el mismo.', listTitle: 'Alcance declarado:', points: [{ title: 'Fawna Cachorro Pequeño', detail: 'Cachorro · Razas Pequeñas.' }, { title: 'Old Prince Proteínas Noveles Lamb Meal Puppy All Breeds', detail: 'Cachorro · Todas las Razas.' }] },
      { layout: 'definition', title: '02 · PRIMEROS<br><em>INGREDIENTES.</em>', lede: 'El orden de la lista declarada aporta información.', definitions: [{ term: 'Fawna: Harina de Salmón', copy: 'Le siguen harina de pollo y arroz integral.' }, { term: 'Old Prince: Harina de cordero', copy: 'Le siguen arroz integral y arveja.' }] },
      { layout: 'list', dark: true, title: '03 · VALORES<br><em>DECLARADOS.</em>', lede: 'Tal como figuran en cada etiqueta (Fawna · Old Prince).', listTitle: 'Comparación declarada:', points: [{ title: 'Proteína mín.: 34% · 32%', detail: 'Piso declarado en cada fórmula.' }, { title: 'Extracto etéreo mín.: 20% · 16%', detail: 'También como valor mínimo.' }, { title: 'Presentaciones: 3 y 7,5 kg · 3, 7,5 y 15 kg', detail: 'El formato también es parte de la decisión.' }] },
      { layout: 'cta', dark: true, title: 'NO HAY UN GANADOR:<br>HAY <em>PERFILES DISTINTOS.</em>', lede: 'Compará segmento, ingredientes y valores declarados según el cachorro.', cta: { title: 'Compartilo', action: 'Con alguien que esté eligiendo alimento para su cachorro →' } },
    ],
  },
  {
    id: '05-como-leer-etiqueta-20-segundos',
    badge: 'ETIQUETA EN CLARO',
    eyebrow: 'NUTRICIÓN · ETIQUETAS',
    scenes: [
      { layout: 'hero', title: 'CÓMO LEER UNA ETIQUETA<br>EN <em>20 SEGUNDOS.</em>', lede: 'Cuatro datos para ubicar antes de mirar el diseño del frente.', products: [fawna, kongo] },
      { layout: 'list', title: '01 · ETAPA<br>Y <em>TAMAÑO.</em>', lede: 'El primer filtro de cualquier comparación.', products: [fawna], listTitle: 'Buscá en el envase:', points: [{ title: 'Etapa de vida declarada', detail: 'Cachorro, adulto o senior.' }, { title: 'Tamaño o segmento', detail: 'Razas pequeñas, todas las razas u otro alcance.' }] },
      { layout: 'definition', title: '02 · COMPOSICIÓN<br><em>CENTESIMAL.</em>', lede: 'Cada valor debe indicar si es un mínimo o un máximo.', definitions: [{ term: 'Proteína: 34% mín.', copy: 'Piso declarado. Ejemplo: Fawna Cachorro Pequeño.' }, { term: 'Humedad: 12% máx.', copy: 'Techo declarado en la misma fórmula.' }] },
      { layout: 'list', dark: true, title: '03 · INGREDIENTES<br>Y <em>PRESENTACIÓN.</em>', lede: 'Completá la lectura con estos dos datos.', listTitle: 'Antes de decidir:', points: [{ title: 'Primeros ingredientes declarados', detail: 'El orden de la lista aporta información.' }, { title: 'Presentaciones disponibles', detail: 'El formato también es parte de la decisión.' }] },
      { layout: 'cta', dark: true, title: 'LEÉ MÁS ALLÁ<br>DEL <em>FRENTE.</em>', lede: 'Información clara para comparar fórmulas con criterio.', cta: { title: 'Seguinos', action: 'Para aprender a comparar fórmulas →' } },
    ],
  },
  {
    id: '07-tres-preguntas-antes-de-elegir',
    badge: 'MÉTODO SIMPLE',
    eyebrow: 'MÉTODO DE VENTA · COMERCIOS',
    scenes: [
      { layout: 'hero', title: '¿TENÉS UN <em>PET SHOP</em><br>O <em>VETERINARIA?</em>', lede: 'Tres preguntas ordenan cualquier venta de alimento.', products: [fawnaSinStat, fawnaGatoSinStat] },
      { layout: 'list', title: '01 · ¿QUÉ ESPECIE<br>Y QUÉ <em>EDAD?</em>', lede: 'El primer filtro descarta la mayoría de las opciones.', listTitle: 'Definí antes de comparar:', points: [{ title: 'Perro o gato', detail: 'Cada fórmula declara su especie en el envase.' }, { title: 'Cachorro, adulto o senior', detail: 'La etapa de vida también está declarada.' }] },
      { layout: 'definition', title: '02 · ¿QUÉ TAMAÑO<br>O <em>ETAPA?</em>', lede: 'Las fórmulas declaran su alcance en el envase.', definitions: [{ term: 'Razas pequeñas, medianas o grandes', copy: 'El segmento acota la búsqueda todavía más.' }, { term: 'Ejemplo: Fawna Cachorro Pequeño', copy: 'Segmento declarado: Cachorro · Razas Pequeñas.' }] },
      { layout: 'list', dark: true, title: '03 · ¿HAY UNA CONDICIÓN<br>O <em>INDICACIÓN?</em>', lede: 'Ese dato lo aporta el veterinario, no la góndola.', listTitle: 'Tenelo presente:', points: [{ title: 'Existen líneas específicas', detail: 'Esterilizado, urinario o light, entre otras.' }, { title: 'La indicación es del veterinario', detail: 'La orientación comercial no reemplaza el diagnóstico.' }] },
      { layout: 'cta', dark: true, title: 'TRES RESPUESTAS,<br>UNA <em>VENTA CLARA.</em>', lede: 'Con especie, etapa y condición definidas, recomendar es más simple.', cta: { title: 'Comentá CATALOGO', action: 'Y te enviamos la lista de precios mayoristas →' } },
    ],
  },
  {
    id: '04-gato-adulto-esterilizado-urinario',
    badge: 'GUÍA DE VENTA',
    eyebrow: 'MÉTODO DE VENTA · GATOS',
    scenes: [
      { layout: 'hero', title: '¿TU CLIENTE PIDE<br>GATO <em>ESTERILIZADO?</em>', lede: 'Adulto, esterilizado y urinario no son lo mismo. Así se guía esa venta.', products: [fawnaGatoSinStat, fawnaGatoEsterilizadoSinStat] },
      { layout: 'list', title: '01 · TRES LÍNEAS,<br>TRES <em>OBJETIVOS.</em>', lede: 'Las tres son para gatos adultos, pero no tienen el mismo objetivo.', listTitle: 'Ejemplo: línea Fawna Gato:', points: [{ title: 'Adulto: mantenimiento diario', detail: 'La fórmula base de la categoría.' }, { title: 'Esterilizado y Urinario: objetivos específicos', detail: 'Cada envase declara su alcance.' }] },
      { layout: 'definition', title: '02 · VALORES<br><em>DECLARADOS.</em>', lede: 'Tal como figuran en cada etiqueta (Adulto · Esterilizado · Urinario).', definitions: [{ term: 'Proteína mín.: 35% · 38% · 35%', copy: 'Piso declarado en cada fórmula.' }, { term: 'Extracto etéreo mín.: 12% · 9% · 12%', copy: 'La fórmula esterilizado declara menor aporte graso.' }] },
      { layout: 'list', dark: true, title: '03 · EL LÍMITE<br><em>PROFESIONAL.</em>', lede: 'Enseñale esto a tu equipo: la línea específica la indica el veterinario.', listTitle: 'Regla de mostrador:', points: [{ title: 'Ninguna fórmula previene ni trata enfermedades', detail: 'Solo declaran su composición y objetivo.' }, { title: 'Ante una condición, derivar al veterinario', detail: 'La recomendación profesional va primero.' }] },
      { layout: 'cta', dark: true, title: 'VENDÉ CON <em>CRITERIO,</em><br>NO DE MEMORIA.', lede: 'Tres fórmulas de gato bien explicadas fidelizan a la clientela.', cta: { title: 'Comentá CATALOGO', action: 'Y te enviamos la lista de precios mayoristas →' } },
    ],
  },
];

module.exports = { reels, repoRoot };
