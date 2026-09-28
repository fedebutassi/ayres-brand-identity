const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const content = {
  badge: 'VERDAD O MITO · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'VERDAD O MITO',
      title: '«LA BOLSA DE 20 KG DEJA<br>MEJOR MARGEN QUE TRES<br>DE <em>7,5 KG.»</em>',
      lede: '¿Seguro? Revisemos los números antes de descartar los formatos chicos.',
      products: [
        { id: 'fawna-adulto-pequeno', name: 'Fawna Adulto Pequeño' },
        { id: 'kongo-adultos-todas-razas', name: 'Kongo Adulto' },
      ],
    },
    {
      number: '01',
      eyebrow: 'EL ANÁLISIS',
      title: 'DEPENDE DE QUÉ<br>ESTÉS <em>MIDIENDO.</em>',
      lede: 'El margen por bolsa no es lo mismo que la rentabilidad por metro de góndola.',
      pointsTitle: 'Lo que muchos no cuentan:',
      points: [
        { title: 'Más unidades, más rotación', detail: 'Tres bolsas de 7,5 kg suman 22,5 kg vendidos. Mayor volumen total y más transacciones.' },
        { title: 'Menos capital inmovilizado', detail: 'Formato chico rota más rápido: menos plata parada en stock, menos riesgo de vencimiento.' },
        { title: 'Más perfiles de cliente', detail: 'Razas pequeñas, primera compra, prueba de marca: público que no compra la bolsa de 20 kg.' },
      ],
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Consultá precios por presentación y armá el mix que más te convenga.',
      cta: { title: '¿Querés comparar márgenes por formato?', copy: 'Escribinos por WhatsApp y te pasamos la lista con todas las presentaciones.' },
    },
  ],
};

module.exports = { content, repoRoot };
