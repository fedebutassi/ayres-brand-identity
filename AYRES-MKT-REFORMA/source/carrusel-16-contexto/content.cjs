const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'GUÍA PARA COMERCIOS · 7 PLACAS',
  slides: [
    {
      type: 'cover',
      photo: '01-cover.png',
      eyebrow: 'PARA EQUIPOS DE ATENCIÓN',
      title: '5 FRASES QUE PUEDEN LLEVAR A UNA <em>MALA RECOMENDACIÓN.</em>',
      lede: 'Antes de sugerir un alimento, el contexto importa.',
    },
    {
      type: 'case',
      number: '01',
      photo: '02-proteina.png',
      eyebrow: 'ERROR 01 · UN SOLO NÚMERO',
      title: '“DAME EL QUE TENGA <em>MÁS PROTEÍNA.</em>”',
      contextTitle: 'PREGUNTÁ ANTES DE COMPARAR',
      context: 'Un porcentaje aislado no define toda la fórmula. Primero consultá <strong>especie, etapa y tamaño.</strong>',
    },
    {
      type: 'case',
      number: '02',
      photo: '03-mismo-porcentaje.png',
      eyebrow: 'ERROR 02 · PARECIDO NO ES IGUAL',
      title: '“ESTOS DOS TIENEN 28%. <em>SON IGUALES.</em>”',
      contextTitle: 'MIRÁ LA INFORMACIÓN COMPLETA',
      context: 'Pueden cambiar los <strong>ingredientes, la grasa, la fibra, la etapa declarada y las presentaciones.</strong>',
    },
    {
      type: 'case',
      number: '03',
      photo: '04-premium.png',
      eyebrow: 'ERROR 03 · ETIQUETAS DE MERCADO',
      title: '“SI ES PREMIUM, <em>ES MEJOR.</em>”',
      contextTitle: 'NO CONVIERTAS POSICIONAMIENTO EN RANKING',
      context: 'Premium y mainstream describen propuestas diferentes. No reemplazan <strong>leer la fórmula ni entender para quién fue pensada.</strong>',
    },
    {
      type: 'case',
      number: '04',
      photo: '05-marca.png',
      eyebrow: 'ERROR 04 · LA MARCA NO ALCANZA',
      title: '“CON SABER LA MARCA <em>ALCANZA.</em>”',
      contextTitle: 'IDENTIFICÁ LA LÍNEA Y EL PRODUCTO',
      context: 'Una misma marca puede ofrecer alternativas por <strong>especie, etapa, tamaño u objetivo declarado.</strong>',
    },
    {
      type: 'case',
      number: '05',
      photo: '06-experiencia.png',
      eyebrow: 'ERROR 05 · GENERALIZAR EXPERIENCIAS',
      title: '“A MI PERRO LE FUNCIONÓ: <em>RECOMENDALO.</em>”',
      contextTitle: 'UNA EXPERIENCIA NO ES UNA REGLA',
      context: 'Ante condiciones particulares, síntomas, dietas especiales o transiciones sensibles, <strong>recomendá consulta veterinaria.</strong>',
    },
    {
      type: 'closing',
      photo: '07-cierre.png',
      eyebrow: 'ATENCIÓN CON CONTEXTO',
      title: 'RECOMENDAR MEJOR EMPIEZA POR <em>PREGUNTAR MEJOR.</em>',
      lede: 'Especie · Etapa · Tamaño · Condición individual',
      ctaTitle: 'COMPARTILO CON TU EQUIPO DE ATENCIÓN',
      cta: '¿Tenés un petshop, veterinaria o comercio? Escribinos <strong>CATÁLOGO + tu localidad.</strong>',
    },
  ],
};

module.exports = { content, repoRoot };
