const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'infoproductos', 'productos.json'), 'utf8')).productos;
const item = catalog.find((p) => p.id === 'fawna-gato-adulto');

const nutrient = (prefix) => {
  const n = item.composicion_centesimal.find(({ nutriente }) => nutriente.toLocaleLowerCase('es').startsWith(prefix));
  if (!n) return '';
  if (n.minimo && n.maximo) return `${n.minimo} – ${n.maximo}`;
  return n.minimo ? `mín. ${n.minimo}` : `máx. ${n.maximo}`;
};

const firstIngredients = item.ingredientes.split(',').slice(0, 3).map((s) => s.trim()).join(', ');

const content = {
  badge: 'FICHA DE PRODUCTO · 3 PLACAS',
  slides: [
    {
      type: 'cover',
      eyebrow: 'FICHA DE PRODUCTO',
      title: 'FAWNA<br>GATO <em>ADULTO.</em>',
      lede: `Línea especializada · ${item.categoria} · Presentaciones: ${item.presentaciones.join(' / ')}`,
      products: [{ id: item.id, name: item.nombre }],
    },
    {
      number: '01',
      eyebrow: 'COMPOSICIÓN DECLARADA',
      title: 'LOS DATOS QUE<br>IMPORTAN EN LA <em>ETIQUETA.</em>',
      lede: `Primeros ingredientes: ${firstIngredients}.`,
      profile: {
        id: item.id,
        name: item.nombre,
        protein: nutrient('prot').replace('mín. ', ''),
        rows: [
          { label: 'EXTRACTO ETÉREO', value: nutrient('extracto') },
          { label: 'FIBRA CRUDA', value: nutrient('fibra') },
          { label: 'HUMEDAD', value: nutrient('humedad') },
          { label: 'CALCIO', value: nutrient('calcio') },
          { label: 'PRESENTACIONES', value: item.presentaciones.join(' · ') },
        ],
      },
    },
    {
      type: 'cta',
      dark: true,
      eyebrow: 'MAYORISTA CÓRDOBA',
      title: 'PEDÍ LA LISTA DE<br>PRECIOS POR <em>WHATSAPP.</em>',
      lede: 'Distribuidora mayorista de alimento balanceado y piedras sanitarias en Córdoba.',
      cta: { title: '¿Querés sumar la línea de gatos Fawna?', copy: 'Escribinos por WhatsApp y te enviamos la lista completa con precios mayoristas.' },
    },
  ],
};

module.exports = { content, repoRoot };
