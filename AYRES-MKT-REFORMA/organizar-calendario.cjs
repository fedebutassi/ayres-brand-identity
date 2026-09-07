const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const root = path.join(__dirname, 'CALENDARIO-PUBLICACIONES');
const immediateRoot = path.join(root, '00-ESTA-SEMANA');
const organicRoot = path.join(root, '01-PLAN-ORGANICO');

const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
const copy = (source, targetDir) => {
  ensure(targetDir);
  fs.copyFileSync(path.join(repo, source), path.join(targetDir, path.basename(source)));
};
const copyGlob = (sourceDir, extension, targetDir) => {
  ensure(targetDir);
  const absolute = path.join(repo, sourceDir);
  fs.readdirSync(absolute)
    .filter((name) => name.toLowerCase().endsWith(extension))
    .sort()
    .forEach((name) => fs.copyFileSync(path.join(absolute, name), path.join(targetDir, name)));
};

const publicationMd = (item) => `# ${item.dateDisplay} - ${item.title}

## Estado

**${item.status}**

## Publicación

- Formato: ${item.format}
- Pilar: ${item.pillar}
- Objetivo: ${item.objective}
- CTA: ${item.cta}

## Indicaciones

${item.instructions.map((value) => `- ${value}`).join('\n')}

## Copy sugerido

${item.copy || 'Pendiente de redactar o validar cuando la pieza esté producida.'}

## Control posterior

- Registrar resultados a las 24 horas.
- Completar la evaluación a los 7 días.
- Medir la métrica principal indicada para esta pieza.
`;

const createDay = (base, item) => {
  const dir = path.join(base, item.folder);
  ensure(dir);
  fs.writeFileSync(path.join(dir, 'PUBLICACION.md'), publicationMd(item));
  (item.files || []).forEach((source) => copy(source, dir));
  (item.collections || []).forEach(({ source, extension, folder }) => copyGlob(source, extension, path.join(dir, folder || 'PLACAS')));
  return dir;
};

const immediate = [
  {
    folder: '04-08-26-martes-publicado', dateDisplay: 'Martes 04/08/26',
    title: 'Carrusel - Marcas que encontrás en AYRES', status: 'LISTO PARA PUBLICAR',
    format: 'Carrusel de 7 placas, 1080 x 1350 px', pillar: 'Institucional y valor para comercios',
    objective: 'Presentar la amplitud del catálogo y generar consultas mayoristas.',
    cta: 'Escribinos CATÁLOGO + tu localidad.',
    instructions: ['Publicar las siete placas en el orden numérico.', 'Compartir la portada en Stories.', 'Responder consultas indicando que la disponibilidad depende de la zona de cobertura.'],
    copy: 'Una oferta completa empieza con variedad. En AYRES trabajamos con marcas y líneas para perros y gatos, pensadas para diferentes etapas, tamaños y categorías. ¿Tenés un petshop, veterinaria o comercio? Escribinos CATÁLOGO + tu localidad y consultá líneas, presentaciones y disponibilidad para tu negocio.',
    files: ['MarcasAyres/CAPTION.md'], collections: [{ source: 'MarcasAyres/output', extension: '.png', folder: 'PLACAS' }],
  },
  {
    folder: '05-08-26-miercoles', dateDisplay: 'Miércoles 05/08/26',
    title: 'Stories - Encuestas de audiencia y categorías', status: 'LISTO PARA PUBLICAR',
    format: 'Secuencia de 2 Stories, 1080 x 1920 px', pillar: 'Conversación y segmentación',
    objective: 'Conocer el perfil de la audiencia y si recibe más consultas sobre perros o gatos.',
    cta: 'Responder los stickers nativos de encuesta.',
    instructions: ['Story 01: elegir solamente una alternativa visual, perro o gato.', 'Story 01: agregar Encuesta con Sí, trabajo en uno / No, soy tutor/a.', 'Story 02: agregar Encuesta con Perros / Gatos.', 'Las opciones no están dibujadas dentro de las imágenes.', 'Registrar cantidad de votos después de 24 horas.'],
    copy: 'Dos encuestas para conocer mejor a la audiencia de AYRES y preparar contenido más útil.',
    files: ['MarcasAyres/encuesta-miercoles/STICKERS-INSTAGRAM.md'], collections: [{ source: 'MarcasAyres/encuesta-miercoles/output-opciones', extension: '.png', folder: 'OPCIONES-STORY-01' }, { source: 'MarcasAyres/encuesta-miercoles/output-categorias', extension: '.png', folder: 'STORY-02-CATEGORIAS' }],
  },
  {
    folder: '06-08-26-jueves', dateDisplay: 'Jueves 06/08/26',
    title: 'Stories - Marcas AYRES', status: 'LISTO PARA PUBLICAR',
    format: 'Secuencia de 7 Stories, 1080 x 1920 px', pillar: 'Conversación e institucional',
    objective: 'Reforzar las marcas disponibles y llevar audiencia hacia una consulta.',
    cta: 'CATÁLOGO + localidad en la última Story.',
    instructions: ['Publicar en el orden numérico.', 'Agregar sticker de encuesta en la primera Story: ¿Tenés petshop o veterinaria?', 'Agregar sticker de mensaje o enlace en la última Story.'],
    copy: 'Texto de apoyo para la primera Story: Marcas y líneas para acompañar la oferta de tu negocio.',
    collections: [{ source: 'MarcasAyres/stories', extension: '.png', folder: 'STORIES' }],
  },
  {
    folder: '07-08-26-viernes', dateDisplay: 'Viernes 07/08/26',
    title: 'Reel - 12 marcas, un solo contacto', status: 'LISTO PARA PUBLICAR',
    format: 'Reel vertical 1080 x 1920 px, 20,3 segundos', pillar: 'Descubrimiento e institucional',
    objective: 'Alcanzar no seguidores y generar consultas de comercios.',
    cta: 'Escribinos CATÁLOGO + tu localidad.',
    instructions: ['Agregar música desde Instagram.', 'Usar la portada del Reel como cubierta.', 'Compartir el Reel en Stories después de publicarlo.'],
    copy: 'Doce marcas. Un solo contacto. Conocé las líneas y presentaciones que AYRES distribuye para petshops, veterinarias y comercios. Escribinos CATÁLOGO + tu localidad para consultar disponibilidad.',
    files: ['MarcasAyres/reel/marcas-ayres-reel-1080x1920.mp4', 'MarcasAyres/CAPTION.md'],
  },
];

const organic = [
  {
    folder:'10-08-26-lunes',dateDisplay:'Lunes 10/08/26',title:'Reel 01 - ¿Más proteína significa mejor alimento?',status:'LISTO PARA PUBLICAR',format:'Reel 1080 x 1920 px',pillar:'Descubrimiento y educación',objective:'Alcance, guardados y educación.',cta:'Guardalo antes de comparar tu próxima bolsa.',instructions:['Usar portada con la pregunta principal.','Compartir en Stories con encuesta sobre proteína e ingredientes.'],copy:'La proteína declarada es un dato útil, pero debe interpretarse junto con la etapa, el tamaño, los ingredientes y las necesidades individuales. Verificá siempre la información del envase y, ante condiciones particulares, consultá con su veterinario.',files:['AYRES-MKT-REFORMA/produccion/reels/lote-01/01-mas-proteina-significa-mejor/01-mas-proteina-significa-mejor-1080x1920.mp4'],
  },
  {
    folder:'11-08-26-martes',dateDisplay:'Martes 11/08/26',title:'Stories - Encuesta de decisión',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Conversación',objective:'Obtener respuestas y preparar el carrusel del miércoles.',cta:'Responder encuesta.',instructions:['Story 1: ¿Qué mirás primero al elegir alimento?','Sticker: Proteína / Ingredientes.','Story 2: Los dos datos ayudan, pero ninguno debería leerse aislado.','Story 3: También revisá etapa, tamaño y condición individual.'],copy:'Usar stickers nativos de Instagram.',
  },
  {
    folder:'12-08-26-miercoles',dateDisplay:'Miércoles 12/08/26',title:'Carrusel 13 - Checklist para comparar alimentos',status:'LISTO PARA PUBLICAR',format:'Carrusel de 7 placas, 1080 x 1350 px',pillar:'Educación y autoridad',objective:'Guardados y compartidos.',cta:'Guardá esta checklist para tu próxima comparación.',instructions:['Publicar las placas en orden numérico.','Compartir la portada en Stories.'],copy:'Dos envases pueden mostrar porcentajes parecidos y responder a necesidades distintas. Compará la fórmula completa, la etapa, el tamaño y la información declarada en el envase.',files:['AYRES-MKT-REFORMA/produccion/carruseles/13-checklist-comparar-alimentos/CAPTION.md'],collections:[{source:'AYRES-MKT-REFORMA/produccion/carruseles/13-checklist-comparar-alimentos',extension:'.png',folder:'PLACAS'}],
  },
  {
    folder:'13-08-26-jueves',dateDisplay:'Jueves 13/08/26',title:'Reel 06 - ¿Qué significa proteína mínima?',status:'LISTO PARA PUBLICAR',format:'Reel 1080 x 1920 px',pillar:'Educación y autoridad',objective:'Explicar terminología y generar compartidos.',cta:'Compartilo con alguien que compara etiquetas.',instructions:['Publicar con una portada que destaque 34% mínimo.','Responder dudas sin transformar la explicación en recomendación veterinaria.'],copy:'Cuando un envase indica proteína mínima, informa el valor mínimo declarado para ese nutriente. Por eso, al comparar etiquetas, también es importante distinguir los valores mínimos de los máximos.',files:['AYRES-MKT-REFORMA/produccion/reels/lote-01/06-que-significa-proteina-minima/06-que-significa-proteina-minima-1080x1920.mp4'],
  },
  {
    folder:'14-08-26-viernes',dateDisplay:'Viernes 14/08/26',title:'Stories - Acción comercial',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Valor para comercios',objective:'Generar mensajes comerciales.',cta:'Escribinos CATÁLOGO + tu localidad.',instructions:['Story 1: ¿Tenés un petshop, veterinaria o comercio?','Story 2: Mostrar variedad de marcas y categorías.','Story 3: CTA con sticker de mensaje o enlace.'],copy:'Escribinos CATÁLOGO y contanos tu localidad.',
  },
  {
    folder:'15-08-26-sabado',dateDisplay:'Sábado 15/08/26',title:'Reel 09 - Así se prepara un pedido en AYRES',status:'CONDICIONADO A FILMACIÓN Y AUTORIZACIÓN',format:'Reel vertical de 20 a 25 segundos',pillar:'Confianza institucional',objective:'Mostrar actividad real y generar consultas.',cta:'¿Tenés un comercio? Escribinos MAYORISTA.',instructions:['Confirmar permiso para filmar el área de pedidos.','No mostrar datos personales, facturas, direcciones ni información comercial sensible.','Filmar recepción, selección, control, preparación y despacho.'],copy:'No publicar hasta contar con material real autorizado.',
  },
  {
    folder:'17-08-26-lunes',dateDisplay:'Lunes 17/08/26',title:'Reel 02 - Mismo 28%, distinta fórmula',status:'LISTO PARA PUBLICAR',format:'Reel 1080 x 1920 px',pillar:'Descubrimiento y educación',objective:'Comentarios, compartidos y retención.',cta:'¿Qué dos productos querés que comparemos después?',instructions:['Aclarar proteína mínima en ambos productos.','No declarar un ganador ni usar afirmaciones de superioridad.'],copy:'Dos productos pueden declarar el mismo porcentaje de proteína mínima y tener ingredientes, presentaciones y composiciones diferentes. Compará siempre la fórmula completa.',files:['AYRES-MKT-REFORMA/produccion/reels/lote-01/02-mismo-28-distinta-formula/02-mismo-28-distinta-formula-1080x1920.mp4'],
  },
  {
    folder:'18-08-26-martes',dateDisplay:'Martes 18/08/26',title:'Stories - Verdadero o falso',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Conversación',objective:'Interacción y educación.',cta:'Responder quiz.',instructions:['Story 1: Dos alimentos con el mismo porcentaje de proteína son iguales.','Sticker: Verdadero / Falso.','Story 2: Falso. Pueden cambiar ingredientes, grasa, fibra, etapa y presentaciones.','Story 3: Mostrar Company 28% y Kongo Gold 28%.'],copy:'Usar el Reel 02 como destino de la secuencia.',
  },
  {
    folder:'19-08-26-miercoles',dateDisplay:'Miércoles 19/08/26',title:'Carrusel 14 - Cuatro alternativas para cachorros',status:'PENDIENTE DE PRODUCCIÓN',format:'Carrusel de 7 placas',pillar:'Educación y valor para comercios',objective:'Guiar una comparación entre Fawna, Old Prince, Company y Kongo Gold.',cta:'¿Tenés un petshop? Escribinos CATÁLOGO.',instructions:['Usar valores reales de productos.json.','Mostrar etapa, tamaño, proteína mínima e ingredientes principales.','Cerrar con tabla comparativa neutral.'],copy:'Pendiente hasta producir y revisar las siete placas.',
  },
  {
    folder:'20-08-26-jueves',dateDisplay:'Jueves 20/08/26',title:'Reel 05 - Cómo leer una etiqueta en 20 segundos',status:'PENDIENTE DE PRODUCCIÓN',format:'Reel de 20 segundos',pillar:'Educación y autoridad',objective:'Guardados y nuevos seguidores.',cta:'Seguinos para aprender a comparar fórmulas.',instructions:['Mostrar etapa y tamaño, composición centesimal, primeros ingredientes y presentación.','Preferir manos señalando una etiqueta real si puede filmarse.'],copy:'Antes de mirar el diseño del frente, buscá estos cuatro datos.',
  },
  {
    folder:'21-08-26-viernes',dateDisplay:'Viernes 21/08/26',title:'Stories - Acción comercial',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Valor para comercios',objective:'Generar mensajes comerciales.',cta:'CATÁLOGO + localidad.',instructions:['Repetir la estructura comercial.','Cambiar las marcas o categorías mostradas respecto de la semana anterior.'],copy:'¿Tenés un petshop, veterinaria o comercio? Escribinos CATÁLOGO y contanos tu localidad.',
  },
  {
    folder:'22-08-26-sabado',dateDisplay:'Sábado 22/08/26',title:'Reel 08 - Categorías para el sector cachorros',status:'LISTO PARA PUBLICAR',format:'Reel 1080 x 1920 px',pillar:'Valor para comercios',objective:'Generar consultas mayoristas.',cta:'Escribí CATÁLOGO para consultar disponibilidad.',instructions:['Dirigir el mensaje a petshops, veterinarias y comercios.','Registrar mensajes con la palabra CATÁLOGO.'],copy:'Una oferta clara facilita la recomendación. Estas categorías ayudan a ordenar el sector cachorros según tamaño, etapa, línea y presentación.',files:['AYRES-MKT-REFORMA/produccion/reels/lote-01/08-categorias-sector-cachorros/08-categorias-sector-cachorros-1080x1920.mp4'],
  },
  {
    folder:'24-08-26-lunes',dateDisplay:'Lunes 24/08/26',title:'Reel 03 - Fawna 34% frente a Old Prince 32%',status:'PENDIENTE DE PRODUCCIÓN',format:'Reel de 22 a 25 segundos',pillar:'Descubrimiento y educación',objective:'Compartidos y visitas al perfil.',cta:'Compartilo con alguien que esté eligiendo alimento para su cachorro.',instructions:['Comparar de manera neutral.','Diferenciar razas pequeñas de todas las razas.','Mostrar primeros ingredientes declarados.'],copy:'Dos opciones para cachorros. ¿Qué cambia además de la proteína?',
  },
  {
    folder:'25-08-26-martes',dateDisplay:'Martes 25/08/26',title:'Stories - Encuesta de decisión',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Conversación',objective:'Interacción.',cta:'Responder encuesta.',instructions:['Reutilizar la estructura de encuesta con una nueva pregunta.','Vincular la respuesta con el contenido de la semana.'],copy:'¿Qué dato te cuesta más interpretar de una etiqueta?',
  },
  {
    folder:'26-08-26-miercoles',dateDisplay:'Miércoles 26/08/26',title:'Carrusel 15 - Premium y mainstream',status:'PENDIENTE DE PRODUCCIÓN',format:'Carrusel de 7 placas',pillar:'Educación y valor para comercios',objective:'Explicar posicionamientos sin desvalorizar productos.',cta:'Compartilo con tu equipo de atención.',instructions:['No presentar las categorías como mejor y peor.','Hablar de propuesta, formulación, variedad, presentaciones y público.'],copy:'Premium y mainstream no significan automáticamente mejor y peor.',
  },
  {
    folder:'27-08-26-jueves',dateDisplay:'Jueves 27/08/26',title:'Reel 07 - Tres preguntas antes de elegir alimento',status:'PENDIENTE DE PRODUCCIÓN',format:'Reel de 18 a 22 segundos',pillar:'Educación y autoridad',objective:'Establecer un método simple de decisión.',cta:'Escribinos AYUDA y te mostramos opciones disponibles.',instructions:['Preguntar especie y edad, tamaño o etapa, y condición o recomendación profesional.','No presentar la orientación comercial como diagnóstico.'],copy:'No empieces por la marca. Empezá por estas tres preguntas.',
  },
  {
    folder:'28-08-26-viernes',dateDisplay:'Viernes 28/08/26',title:'Stories - Acción comercial',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Valor para comercios',objective:'Generar consultas.',cta:'CATÁLOGO + localidad.',instructions:['Mostrar una categoría diferente.','Usar sticker de mensaje o enlace.'],copy:'Consultá marcas, líneas y presentaciones para tu negocio.',
  },
  {
    folder:'29-08-26-sabado',dateDisplay:'Sábado 29/08/26',title:'Adaptación del contenido con mejor rendimiento',status:'EN ESPERA DE MÉTRICAS',format:'Reel o adaptación animada',pillar:'Según pieza ganadora',objective:'Escalar el formato con mejor resultado de las primeras dos semanas.',cta:'Definir según el contenido ganador.',instructions:['Elegir la pieza que supere el promedio en al menos dos métricas.','Cambiar una sola variable: hook, portada, CTA o duración.'],copy:'No producir antes de revisar resultados a 7 días.',
  },
  {
    folder:'31-08-26-lunes',dateDisplay:'Lunes 31/08/26',title:'Reel 04 - Gato adulto, esterilizado o urinario',status:'PENDIENTE DE PRODUCCIÓN',format:'Reel de 22 a 28 segundos',pillar:'Educación y autoridad',objective:'Explicar diferencias sin afirmaciones médicas.',cta:'Guardá esta comparación para consultarla después.',instructions:['Usar valores reales e indicar mínimo o máximo.','No afirmar que una fórmula previene, cura o trata enfermedades.','Incluir recomendación veterinaria.'],copy:'Los tres son para gatos adultos, pero no tienen el mismo objetivo. Los alimentos con objetivos específicos deben elegirse según la condición del gato y la recomendación veterinaria.',
  },
  {
    folder:'01-09-26-martes',dateDisplay:'Martes 01/09/26',title:'Stories - Verdadero o falso',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Conversación',objective:'Interacción y refuerzo educativo.',cta:'Responder quiz.',instructions:['Usar una pregunta relacionada con fórmulas para gatos.','Agregar advertencia veterinaria cuando corresponda.'],copy:'Una fórmula con objetivo específico debe elegirse solamente por el nombre del envase. ¿Verdadero o falso?',
  },
  {
    folder:'02-09-26-miercoles',dateDisplay:'Miércoles 02/09/26',title:'Carrusel 16 - Cinco errores al recomendar alimento',status:'PENDIENTE DE PRODUCCIÓN',format:'Carrusel de 7 placas',pillar:'Valor para comercios y autoridad',objective:'Compartidos dentro de equipos de atención.',cta:'Compartilo con tu equipo de atención.',instructions:['Incluir edad, tamaño, fórmula completa y límites médicos.','No ridiculizar decisiones ni marcas.'],copy:'Cinco errores frecuentes al recomendar alimento y cómo evitarlos.',
  },
  {
    folder:'03-09-26-jueves',dateDisplay:'Jueves 03/09/26',title:'Nueva versión del Reel con mayor retención',status:'EN ESPERA DE MÉTRICAS',format:'Reel',pillar:'Según pieza ganadora',objective:'Mejorar alcance o retención mediante una prueba controlada.',cta:'Definir según la versión original.',instructions:['Cambiar solamente el hook o la portada.','Mantener el resto de las variables para poder comparar.'],copy:'No producir antes de revisar la retención de los Reels publicados.',
  },
  {
    folder:'04-09-26-viernes',dateDisplay:'Viernes 04/09/26',title:'Stories - Acción comercial',status:'PENDIENTE DE CREAR EN INSTAGRAM',format:'Secuencia de 3 Stories',pillar:'Valor para comercios',objective:'Generar consultas de cierre del ciclo.',cta:'CATÁLOGO + localidad.',instructions:['Mostrar variedad disponible.','Usar sticker de mensaje o enlace.'],copy:'¿Tenés un petshop, veterinaria o comercio? Consultá disponibilidad para tu localidad.',
  },
  {
    folder:'05-09-26-sabado',dateDisplay:'Sábado 05/09/26',title:'Resumen mensual y próximo tema',status:'EN ESPERA DE MÉTRICAS',format:'Stories o Reel breve',pillar:'Conversación',objective:'Cerrar el período y recoger la próxima demanda de contenido.',cta:'¿Qué tema querés que expliquemos después?',instructions:['Resumir el contenido con mejor rendimiento.','No presentar resultados internos sensibles.','Usar sticker de preguntas si se publica como Stories.'],copy:'Este mes aprendimos a comparar fórmulas, etiquetas y categorías. ¿Qué tema querés que expliquemos después?',
  },
];

ensure(immediateRoot);
ensure(organicRoot);
immediate.forEach((item) => createDay(immediateRoot, item));
organic.forEach((item) => createDay(organicRoot, item));

const readme = `# Calendario de publicaciones AYRES\n\nCalendario organizado a partir del plan maestro de visibilidad y marketing orgánico.\n\n## Estructura\n\n- \`00-ESTA-SEMANA\`: carrusel publicado el martes 04 y contenido inmediato del 05, 06 y 07 de agosto de 2026.\n- \`01-PLAN-ORGANICO\`: calendario de cuatro semanas desde el lunes 10 de agosto de 2026.\n\nLas fechas utilizan guiones porque la barra \`/\` funciona como separador de directorios. Cada carpeta diaria contiene \`PUBLICACION.md\` y, cuando la pieza ya está terminada, una copia del archivo publicable. Los originales no fueron eliminados ni movidos.\n\n## Estados\n\n- \`LISTO PARA PUBLICAR\`: contiene el archivo final.\n- \`PENDIENTE DE CREAR EN INSTAGRAM\`: requiere stickers o armado manual de Stories.\n- \`PENDIENTE DE PRODUCCIÓN\`: el guion está definido, pero falta la pieza final.\n- \`CONDICIONADO\`: requiere filmación o autorización interna.\n- \`EN ESPERA DE MÉTRICAS\`: depende de los resultados de publicaciones anteriores.\n`;
fs.writeFileSync(path.join(root, 'README.md'), readme);

process.stdout.write(`Calendario creado en ${root}\n`);
process.stdout.write(`Contenido inmediato: ${immediate.length} días\n`);
process.stdout.write(`Plan orgánico: ${organic.length} días de publicación\n`);
