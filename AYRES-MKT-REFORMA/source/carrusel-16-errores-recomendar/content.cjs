const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const coverIds = ['fawna-cachorro-pequeno', 'voraz-perros-adultos-carne', 'kongo-gatos-adultos-carne-pollo', 'origen-company-gato-adulto'];

const content = {
  badge: 'GUÍA AYRES · 7 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'GUÍA PARA COMERCIOS',
      title: 'CINCO ERRORES FRECUENTES AL <em>RECOMENDAR ALIMENTO.</em>',
      lede: 'Y cómo evitarlos en el mostrador. Para repasar con tu equipo de atención.',
      products: coverIds.map((id) => ({ id, name: id })),
    },
    {
      number: '01',
      eyebrow: 'ERROR 01',
      title: 'EMPEZAR POR<br>LA <em>MARCA.</em>',
      lede: 'Sin datos del animal, cualquier recomendación es una apuesta.',
      cards: [
        { term: 'El hábito', copy: 'Ofrecer la marca de siempre sin preguntar nada.' },
        { term: 'La alternativa', copy: 'Preguntar primero especie, edad y tamaño: tres datos que acotan la góndola.' },
      ],
      cardsNote: 'La marca aparece al final del recorrido, no al principio.',
    },
    {
      number: '02',
      eyebrow: 'ERROR 02',
      title: 'IGNORAR EDAD<br>Y <em>TAMAÑO.</em>',
      lede: 'Cada fórmula declara su alcance en el envase: usarlo ordena la venta.',
      pointsTitle: 'Antes de recomendar, ubicar:',
      points: [
        { title: 'Etapa de vida', detail: 'Cachorro, adulto o senior: está declarada en el envase.' },
        { title: 'Tamaño o segmento', detail: 'Razas pequeñas, medianas, grandes o todas las razas.' },
        { title: 'Alcance declarado', detail: 'Si el envase no coincide con el animal, no es esa fórmula.' },
      ],
    },
    {
      number: '03',
      eyebrow: 'ERROR 03',
      title: 'MIRAR UN<br>SOLO <em>DATO.</em>',
      lede: 'La proteína sola no describe la fórmula completa.',
      pointsTitle: 'La lectura completa incluye:',
      points: [
        { title: 'Primeros ingredientes declarados', detail: 'El orden de la lista aporta información.' },
        { title: 'Mínimos y máximos', detail: 'Proteína mín., humedad máx.: cada valor indica qué mide.' },
        { title: 'Presentaciones disponibles', detail: 'El formato también es parte de la recomendación.' },
      ],
    },
    {
      number: '04',
      eyebrow: 'ERROR 04',
      title: 'PROMETER RESULTADOS<br><em>MÉDICOS.</em>',
      lede: 'El límite profesional protege al animal, al cliente y a tu comercio.',
      cards: [
        { term: 'El límite', copy: 'Ninguna fórmula previene, cura ni trata enfermedades. Solo declaran composición y objetivo.' },
        { term: 'La respuesta correcta', copy: 'Ante una condición, derivar al veterinario. Derivar no es perder la venta: es fidelizar.' },
      ],
      cardsNote: 'Las líneas específicas (esterilizado, urinario, light) se venden con indicación profesional.',
    },
    {
      number: '05',
      eyebrow: 'ERROR 05',
      title: 'UNA SOLA RESPUESTA PARA<br><em>TODA LA CLIENTELA.</em>',
      lede: 'Si la góndola no tiene profundidad, la recomendación tampoco.',
      pointsTitle: 'Un surtido que responde:',
      points: [
        { title: 'Base de rotación diaria', detail: 'Líneas masivas de alcance amplio.' },
        { title: 'Opciones especializadas a mano', detail: 'Para consultas por raza, etapa o condición.' },
        { title: 'Formatos chico y grande', detail: 'Probar con el chico, volver por el grande.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'PARA TU EQUIPO',
      title: 'COMPARTILO CON TU<br><em>EQUIPO DE ATENCIÓN.</em>',
      lede: 'Recomendar con método construye confianza y repite ventas.',
      cta: { title: 'Guardá esta guía', copy: 'Y si querés sumar surtido, comentá CATALOGO y te enviamos la lista de precios mayoristas →' },
    },
  ],
};

module.exports = { content, repoRoot };
