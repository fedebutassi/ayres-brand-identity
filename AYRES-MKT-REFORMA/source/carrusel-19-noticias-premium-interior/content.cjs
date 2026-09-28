const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'NOTICIAS DEL RUBRO · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: '📍 CÓRDOBA · NOTICIAS DEL RUBRO',
      title: 'EL PREMIUM CRECE EN<br>EL <em>INTERIOR.</em>',
      lede: 'Cada vez más petshops del interior suman líneas especializadas. ¿Tu góndola lo refleja?',
      products: [
        { id: 'fawna-cachorro-pequeno', name: 'Fawna Cachorro Pequeño' },
        { id: 'op-eq-equilibrium-adulto', name: 'Old Prince Equilibrium' },
      ],
    },
    {
      number: '01',
      eyebrow: 'QUÉ ESTÁ PASANDO',
      title: 'EL CONSUMIDOR<br>CAMBIÓ DE <em>PERFIL.</em>',
      lede: 'El dueño de mascota del interior pregunta más, compara y busca opciones específicas.',
      pointsTitle: 'Lo que vemos en la calle:',
      points: [
        { title: 'Más consultas por etapa y raza', detail: 'Cachorro de raza pequeña, adulto castrado, senior: el cliente ya llega con la pregunta armada.' },
        { title: 'El mostrador necesita respuestas', detail: 'Si solo tenés una marca masiva, perdés la venta especializada frente a quien tiene variedad.' },
        { title: 'El formato chico abre la puerta', detail: 'Bolsas de 1,5 a 3 kg para probar: bajo riesgo para el comercio, puerta de entrada para el cliente.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Sumá líneas especializadas sin comprometer tu capital: empezá con formatos chicos.',
      cta: { title: '¿Querés ampliar tu surtido premium?', copy: 'Escribinos por WhatsApp y te armamos una propuesta a medida para tu comercio.' },
    },
  ],
};

module.exports = { content, repoRoot };
