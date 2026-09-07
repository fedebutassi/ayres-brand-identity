const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, 'infoproductos', 'productos.json'), 'utf8')).productos;

// Conteo real por línea declarada en el catálogo (verificable contra productos.json).
const byLine = data.reduce((acc, item) => {
  acc[item.linea] = (acc[item.linea] || 0) + 1;
  return acc;
}, {});

const coverIds = ['fawna-cachorro-pequeno', 'op-pn-lamb-puppy-all', 'company-cachorros', 'kongo-gold-cachorros-todas-razas'];

const content = {
  badge: 'GUÍA AYRES · 7 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'GUÍA PARA COMERCIOS',
      title: 'PREMIUM Y MAINSTREAM NO SIGNIFICAN <em>MEJOR Y PEOR.</em>',
      lede: 'Qué describe realmente el posicionamiento de cada línea y cómo usarlo para armar tu surtido.',
      products: coverIds.map((id) => ({ id, name: id })),
    },
    {
      number: '01',
      eyebrow: 'POSICIONAMIENTO',
      title: 'DESCRIBEN PROPUESTA<br>Y <em>PÚBLICO.</em>',
      lede: 'Son categorías comerciales: hablan de a quién apunta cada línea, no de una escala de calidad.',
      cards: [
        { term: 'Líneas premium y especializadas', copy: 'Segmentación más específica: fórmulas por raza, etapa o necesidad puntual.' },
        { term: 'Líneas mainstream (masivas)', copy: 'Alcance amplio y rotación diaria: fórmulas pensadas para el consumo masivo.' },
      ],
      cardsNote: 'Cada fórmula declara su propia composición: esa es la referencia para comparar.',
    },
    {
      number: '02',
      eyebrow: 'FÓRMULAS E INGREDIENTES',
      title: 'LA ETIQUETA MANDA,<br>NO EL <em>NOMBRE DE LA LÍNEA.</em>',
      lede: 'Sea cual sea el posicionamiento, los datos declarados se leen igual.',
      pointsTitle: 'Para comparar cualquier producto:',
      points: [
        { title: 'Primeros ingredientes declarados', detail: 'El orden de la lista aporta información.' },
        { title: 'Mínimos y máximos', detail: 'Proteína mín., humedad máx.: cada valor indica qué mide.' },
        { title: 'Etapa, tamaño y condición', detail: 'El alcance declarado define para quién es la fórmula.' },
      ],
    },
    {
      number: '03',
      eyebrow: 'VARIEDAD',
      title: 'DISTINTA PROFUNDIDAD<br>DE <em>SURTIDO.</em>',
      lede: 'La diferencia práctica entre líneas está en cuántas necesidades específicas cubren.',
      pointsTitle: `Catálogo AYRES (71 productos, 16/04/2026):`,
      points: [
        { title: `${byLine.especializados} productos en líneas especializadas`, detail: 'Variantes por raza, etapa y condición: esterilizado, urinario, light, criadores.' },
        { title: `${byLine.premium} productos en líneas premium`, detail: 'Segmentos puntuales dentro de cada marca.' },
        { title: `${byLine.masivos} productos en líneas masivas`, detail: 'Fórmulas de alcance amplio para la venta diaria.' },
      ],
    },
    {
      number: '04',
      eyebrow: 'PRESENTACIONES',
      title: 'FORMATOS PARA<br>CADA <em>COMPRA.</em>',
      lede: 'Las presentaciones declaradas del catálogo van de 0,5 kg a 25 kg.',
      cards: [
        { term: 'Formatos chicos', copy: 'Prueba, primera compra y razas pequeñas: rotación en góndola.' },
        { term: 'Formatos grandes', copy: 'Recompra habitual, criadores y clientes de consumo alto.' },
      ],
      cardsNote: 'El formato también posiciona: mismo producto, distinta ocasión de compra.',
    },
    {
      number: '05',
      eyebrow: 'OFERTA EQUILIBRADA',
      title: 'UN SURTIDO QUE RESPONDE<br>A <em>TODA TU CLIENTELA.</em>',
      lede: 'Las líneas no compiten entre sí: cubren perfiles distintos de cliente.',
      pointsTitle: 'Para armar la góndola:',
      points: [
        { title: 'Una base de rotación diaria', detail: 'Líneas masivas con alcance amplio.' },
        { title: 'Opciones especializadas a mano', detail: 'Para consultas por raza, etapa o condición.' },
        { title: 'Presentaciones variadas', detail: 'Formato chico para probar, grande para volver.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'PARA TU EQUIPO',
      title: 'COMPARTILO CON TU<br><em>EQUIPO DE ATENCIÓN.</em>',
      lede: 'Responder sin desvalorizar productos también construye confianza con la clientela.',
      cta: { title: 'Guardá esta guía', copy: 'Y si querés sumar surtido, escribinos CATÁLOGO con tu localidad →' },
    },
  ],
};

module.exports = { content, repoRoot };
