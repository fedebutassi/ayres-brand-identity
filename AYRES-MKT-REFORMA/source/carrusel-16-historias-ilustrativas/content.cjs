const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'HISTORIAS ILUSTRATIVAS',
  slides: [
    {
      photo: '01-elena-mora.png',
      number: '01',
      quote: '“TENÉS QUE LLEVARLE EL QUE TENGA <em>MÁS PROTEÍNA.</em>”',
      name: 'ELENA Y MORA',
      story: '<strong>Elena, 68 años,</strong> llegó con una foto de la bolsa que usa Mora, su compañera de 9 años. No quería elegir por un número aislado: primero necesitaba que escucharan su situación.',
      takeaway: 'Un porcentaje no reemplaza el contexto.',
    },
    {
      photo: '02-nicolas-petshop.png',
      number: '02',
      quote: '“SI ES PREMIUM, ES <em>MEJOR PARA TODOS.</em>”',
      name: 'NICOLÁS Y SU PETSHOP',
      story: '<strong>Nicolás atiende un petshop de barrio.</strong> Sus clientes llegan con presupuestos, animales y necesidades diferentes. Una etiqueta de mercado no decide, por sí sola, qué opción corresponde a cada consulta.',
      takeaway: 'El posicionamiento no es una respuesta universal.',
    },
    {
      photo: '03-paula-simon.png',
      number: '03',
      quote: '“CON SABER LA MARCA <em>ALCANZA.</em>”',
      name: 'PAULA Y SIMÓN',
      story: '<strong>Paula solo recordaba la marca</strong> del alimento de Simón. Pero una misma marca puede tener líneas distintas por especie, etapa y otras características. Faltaba identificar el producto exacto.',
      takeaway: 'Marca, línea y producto no son lo mismo.',
    },
    {
      photo: '04-ramiro-perros.png',
      number: '04',
      quote: '“A MI PERRO LE FUNCIONÓ. <em>RECOMENDALO.</em>”',
      name: 'RAMIRO, PIPA Y BRUNO',
      story: '<strong>Ramiro vive con Pipa y Bruno.</strong> Tienen edades y tamaños diferentes, y no comen lo mismo. Su experiencia puede abrir una conversación, pero no convertirse automáticamente en una regla.',
      takeaway: 'Una experiencia individual no define a todos.',
    },
    {
      photo: '05-carolina-compara.png',
      number: '05',
      quote: '“LOS DOS TIENEN 28%. <em>SON IGUALES.</em>”',
      name: 'CAROLINA Y UNA COMPARACIÓN',
      story: '<strong>Carolina comparó las etiquetas completas:</strong> ingredientes, grasa, fibra, etapa declarada y presentación. Que dos productos coincidan en un valor no los vuelve equivalentes.',
      takeaway: 'El análisis se lee completo, no como un ranking.',
    },
    {
      photo: '06-luis-tano.png',
      number: '06',
      quote: '“ES PARA ADULTO. <em>DALE CUALQUIERA.</em>”',
      name: 'LUIS Y TANO',
      story: '<strong>Luis acababa de adoptar a Tano</strong> y todavía reunía información sobre su edad y antecedentes. Cuando faltan datos o hay necesidades particulares, lo responsable es consultar al veterinario.',
      takeaway: 'Preguntar también es parte de recomendar.',
    },
    {
      type: 'closing',
      photo: '07-cierre-escuchar.png',
      number: '07',
      quote: 'UNA RECOMENDACIÓN PIERDE SENTIDO CUANDO <em>IGNORA EL CONTEXTO.</em>',
      name: 'PREGUNTAR ANTES DE SUGERIR',
      story: 'Una sola frase nunca cuenta la historia completa. Antes de comparar, preguntá <strong>especie, etapa, tamaño y condición individual.</strong>',
      takeaway: 'Recomendar mejor empieza por escuchar mejor.',
      cta: '¿Tenés un petshop, veterinaria o comercio? Escribinos <strong>CATÁLOGO + tu localidad.</strong>',
    },
  ],
};

module.exports = { content, repoRoot };
