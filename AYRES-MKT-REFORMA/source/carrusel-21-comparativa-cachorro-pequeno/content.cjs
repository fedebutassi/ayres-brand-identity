const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'infoproductos', 'productos.json'), 'utf8')).productos;
const fawna = catalog.find((p) => p.id === 'fawna-cachorro-pequeno');
const op = catalog.find((p) => p.id === 'op-eq-cachorro-pequenas');

const nutrient = (item, prefix) => {
  const n = item.composicion_centesimal.find(({ nutriente }) => nutriente.toLocaleLowerCase('es').startsWith(prefix));
  if (!n) return '—';
  if (n.minimo && n.maximo) return `${n.minimo} – ${n.maximo}`;
  return n.minimo || n.maximo || '—';
};

const first3 = (item) => item.ingredientes.split(',').slice(0, 3).map((s) => s.trim()).join(', ');

const content = {
  badge: 'COMPARATIVA · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'COMPARATIVA',
      title: 'MISMA CATEGORÍA,<br>DOS <em>FÓRMULAS.</em>',
      lede: 'Cachorro · Razas Pequeñas. Qué declara cada una en la etiqueta.',
      products: [
        { id: fawna.id, name: fawna.nombre },
        { id: op.id, name: op.nombre },
      ],
    },
    {
      number: '01',
      eyebrow: 'DATOS DECLARADOS',
      title: 'LO QUE DICE<br>CADA <em>ETIQUETA.</em>',
      lede: 'Misma categoría, distinta formulación. Los datos para que compares.',
      cards: [
        { term: 'FAWNA CACHORRO PEQUEÑO', copy: `Proteína mín. ${nutrient(fawna, 'prot')} · Extracto etéreo mín. ${nutrient(fawna, 'extracto')} · Calcio ${nutrient(fawna, 'calcio')} · Primeros ingredientes: ${first3(fawna)} · ${fawna.presentaciones.join(' / ')}` },
        { term: 'OP EQUILIBRIUM CACHORRO PEQ.', copy: `Proteína mín. ${nutrient(op, 'prot')} · Extracto etéreo mín. ${nutrient(op, 'extracto')} · Calcio ${nutrient(op, 'calcio')} · Primeros ingredientes: ${first3(op)} · ${op.presentaciones.join(' / ')}` },
      ],
      cardsNote: 'Fuente: composición centesimal declarada por cada fabricante. Consultá las fichas completas en ayrespetsupply.com',
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Tenemos las dos marcas. Armá el surtido que mejor funcione para tu clientela.',
      cta: { title: '¿Querés incorporar ambas líneas?', copy: 'Escribinos por WhatsApp y te enviamos precios de Fawna y Old Prince para tu comercio.' },
    },
  ],
};

module.exports = { content, repoRoot };
