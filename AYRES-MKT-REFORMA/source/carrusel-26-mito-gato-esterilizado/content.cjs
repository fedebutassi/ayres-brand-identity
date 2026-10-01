const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'VERDAD O MITO · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'VERDAD O MITO',
      title: '«AL GATO ESTERILIZADO<br>LE DAS EL MISMO<br>QUE AL <em>ADULTO.»</em>',
      lede: '¿La fórmula importa o es solo una variante de packaging? Miremos los datos declarados.',
      products: [
        { id: 'fawna-gato-adulto', name: 'Fawna Gato Adulto' },
        { id: 'fawna-gato-esterilizado', name: 'Fawna Gato Esterilizado' },
      ],
    },
    {
      number: '01',
      eyebrow: 'EL ANÁLISIS',
      title: 'NO ES LO MISMO:<br>LOS NÚMEROS <em>CAMBIAN.</em>',
      lede: 'Comparación con datos declarados de Fawna Gato Adulto vs Fawna Gato Esterilizado.',
      pointsTitle: 'Tres diferencias que importan:',
      points: [
        { title: 'Menos grasa (9% vs 12%)', detail: 'El gato esterilizado baja su metabolismo. Menos extracto etéreo reduce el aporte calórico por ración.' },
        { title: 'Más proteína (38% vs 35%)', detail: 'Más proteína con menos grasa: la fórmula prioriza masa muscular sobre reserva energética.' },
        { title: 'Más fibra (5% vs 3%)', detail: 'Mayor fibra genera saciedad. El gato esterilizado tiende a pedir más comida — la fibra ayuda a controlar la ingesta.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Tenemos líneas específicas para gatos esterilizados. Ampliá la oferta de tu góndola felina.',
      cta: { title: '¿Querés sumar la línea de gatos esterilizados?', copy: 'Escribinos por WhatsApp y te enviamos precios para tu comercio.' },
    },
  ],
};

module.exports = { content, repoRoot };
