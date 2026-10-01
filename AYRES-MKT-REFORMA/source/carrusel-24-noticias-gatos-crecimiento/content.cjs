const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'NOTICIAS DEL RUBRO · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'NOTICIAS DEL RUBRO',
      title: 'ALIMENTO PARA GATOS:<br>LA CATEGORÍA QUE<br>MÁS <em>CRECE.</em>',
      lede: 'La góndola de gatos ya no es un complemento. ¿Tu local le está dando el espacio que merece?',
      products: [
        { id: 'fawna-gato-adulto', name: 'Fawna Gato Adulto' },
        { id: 'op-eq-adulto-gato', name: 'Old Prince Eq. Gato Adulto' },
      ],
    },
    {
      number: '01',
      eyebrow: 'LOS DATOS',
      title: 'POR QUÉ IMPORTA<br>PARA TU <em>NEGOCIO.</em>',
      lede: 'Tendencias del mercado argentino de alimento para mascotas.',
      pointsTitle: 'Tres razones para ampliar tu sección de gatos:',
      points: [
        { title: 'Más hogares con gatos', detail: 'Los hogares con gatos crecieron más que los de perros en los últimos años. Más gatos en la zona = más demanda de balanceado felino.' },
        { title: 'El ticket promedio es más alto', detail: 'El gato come menos cantidad pero el alimento felino tiene mayor valor por kilo. Margen por bolsa más atractivo en menos espacio de góndola.' },
        { title: 'Menos competencia en góndola', detail: 'La mayoría de los petshops tiene 2–3 opciones de gatos. Ampliar la oferta captura clientes que hoy compran en otro lado.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Tenemos líneas de gatos en distintos segmentos. Armá la góndola que tu clientela necesita.',
      cta: { title: '¿Querés ampliar tu sección de gatos?', copy: 'Escribinos por WhatsApp y te armamos una propuesta con las marcas que mejor rotan.' },
    },
  ],
};

module.exports = { content, repoRoot };
