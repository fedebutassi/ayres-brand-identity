const slides = [
  {
    type: 'cover',
    theme: 'dark',
    eyebrow: 'DISTRIBUCIÓN MAYORISTA',
    title: 'LAS MARCAS QUE<br><em>ENCONTRÁS EN AYRES</em>',
    lede: 'Una propuesta amplia para perros y gatos, con líneas para distintas etapas y categorías.',
    products: [
      '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/fawna-cachorro-pequeno.png',
      '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/op-pn-lamb-puppy-all.png',
      '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/kongo-gold-adultos-medianos-grandes.png',
      '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/company-gatos-adultos.png',
      '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/voraz-perros-adultos-mix-carne-pollo-vegetales.png',
    ],
  },
  {
    type: 'duo',
    theme: 'light',
    eyebrow: 'MARCAS 01 · 02',
    title: 'FÓRMULAS PARA<br><em>DISTINTAS ETAPAS</em>',
    lede: 'Opciones para perros y gatos, con variedades según edad, tamaño y objetivo de la fórmula.',
    brands: [
      { name: 'Fawna', logo: '../media/logos/FAWNA-LOGO2.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/fawna-gato-adulto.png', note: 'Perros · gatos · distintas etapas' },
      { name: 'Old Prince', logo: '../media/logos/OLD-PRINCE-LOGO2.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/op-pn-lamb-puppy-all.png', note: 'Equilibrium · Proteínas Noveles · Premium' },
    ],
  },
  {
    type: 'duo',
    theme: 'dark',
    eyebrow: 'MARCAS 03 · 04',
    title: 'VARIEDAD PARA<br><em>PERROS Y GATOS</em>',
    lede: 'Alternativas para construir una oferta clara y cubrir diferentes segmentos del catálogo.',
    brands: [
      { name: 'Kongo', logo: '../media/logos/KONGO-LOGO-2.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/kongo-gatos-adultos-salmon-atun.png', note: 'Kongo · Kongo Gold' },
      { name: 'Voraz', wordmark: 'VORAZ', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/voraz-perros-cachorros.png', note: 'Perros · gatos · cachorros y adultos' },
    ],
  },
  {
    type: 'duo',
    theme: 'light',
    eyebrow: 'MARCAS 05 · 06',
    title: 'LÍNEAS PARA<br><em>ACOMPAÑAR CADA ETAPA</em>',
    lede: 'Presentaciones para sumar variedad y facilitar la recomendación dentro del comercio.',
    brands: [
      { name: 'Company', logo: '../media/logos/COMPANY-LOGO.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/company-cachorros.png', note: 'Perros y gatos' },
      { name: 'Origen by Company', logo: '../media/logos/ORIGEN-COMPANY-LOGO.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/origen-company-gato-adulto.png', note: 'Cachorros y adultos' },
    ],
  },
  {
    type: 'duo',
    theme: 'dark',
    eyebrow: 'MARCAS 07 · 08',
    title: 'OPCIONES PARA<br><em>CRIADORES Y COMERCIOS</em>',
    lede: 'Líneas que amplían las posibilidades de abastecimiento para perros y gatos.',
    brands: [
      { name: 'Maintenance Criadores', logo: '../media/logos/MAINTENANCES-LOGO2.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/maintenance-criadores-adulto.png', note: 'Perros · gatos · cachorros y adultos' },
      { name: 'High Pro Criadores', wordmark: 'HIGH PRO\nCRIADORES', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/high-pro-criadores-cordero-perros-adultos.png', note: 'Perros y gatos' },
    ],
  },
  {
    type: 'quad',
    theme: 'light',
    eyebrow: 'MARCAS 09 · 12',
    title: 'MÁS ALTERNATIVAS PARA<br><em>COMPLETAR TU OFERTA</em>',
    lede: 'Cuatro opciones adicionales disponibles dentro del catálogo AYRES.',
    brands: [
      { name: 'Natural Meat', logo: '../media/logos/NATURAL-MEAT-LOGO.png', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/natural-meat-perros-cachorros.png' },
      { name: 'Carnix', wordmark: 'CARNIX', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/carnix-perros-adultos.png' },
      { name: 'Caudillo', wordmark: 'CAUDILLO', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/caudillo-perros-adultos.png' },
      { name: 'Cereales', wordmark: 'CEREALES', product: '../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/cereales-perros-adultos.png' },
    ],
  },
  {
    type: 'cta',
    theme: 'dark',
    eyebrow: 'AYRES PET SUPPLY',
    title: '<em>12 MARCAS.</em><br>UN SOLO CONTACTO.',
    lede: '¿Tenés un petshop, veterinaria o comercio? Conocé las líneas y presentaciones disponibles para tu negocio.',
    cta: 'ESCRIBINOS CATÁLOGO + TU LOCALIDAD',
    note: 'Disponibilidad y distribución sujetas a zona de cobertura.',
  },
];

const params = new URLSearchParams(window.location.search);
const index = Math.max(0, Math.min(slides.length - 1, Number(params.get('slide') || 1) - 1));
const vertical = params.get('format') === 'vertical';
const reelMode = params.get('medium') === 'reel';
const data = slides[index];
const root = document.getElementById('slide');

const brandMark = (brand) => {
  if (brand.logo) return `<img class="brand-logo" src="${brand.logo}" alt="${brand.name}">`;
  const parts = brand.wordmark.split('\n');
  return `<div class="wordmark">${parts[0]}${parts[1] ? `<span>${parts[1]}</span>` : ''}</div>`;
};

const cards = (brands, quad = false) => `
  <section class="${quad ? 'brand-grid quad-grid' : 'brand-grid duo-grid'}">
    ${brands.map((brand) => `
      <article class="brand-card">
        <div class="mark-wrap">${brandMark(brand)}</div>
        <img class="pack" src="${brand.product}" alt="Producto ${brand.name}">
        <div class="brand-name">${brand.name}</div>
        ${brand.note ? `<div class="brand-note">${brand.note}</div>` : ''}
      </article>
    `).join('')}
  </section>`;

const coverStage = (products) => `
  <section class="cover-stage">
    <div class="ground"></div>
    ${products.map((product, i) => `<img class="cover-pack p${i + 1}" src="${product}" alt="Producto del catálogo AYRES">`).join('')}
  </section>`;

root.innerHTML = `
  <article class="slide ${data.theme} ${data.type} ${vertical ? 'vertical' : ''} ${reelMode ? 'reel-mode' : ''}">
    <div class="glow"></div>
    <header class="topbar">
      <img class="ayres-logo" src="../assets/${data.theme === 'dark' ? 'logo-dark.svg' : 'logo-light.svg'}" alt="AYRES Pet Supply">
      <div class="counter"><strong>${String(index + 1).padStart(2, '0')}</strong> / ${String(slides.length).padStart(2, '0')}</div>
    </header>
    <div class="safe">
      <section class="copy">
        <div class="eyebrow">${data.eyebrow}</div>
        <h1>${data.title}</h1>
        <p class="lede">${data.lede}</p>
      </section>
      ${data.type === 'cover' ? coverStage(data.products) : ''}
      ${data.type === 'duo' ? cards(data.brands) : ''}
      ${data.type === 'quad' ? cards(data.brands, true) : ''}
      ${data.type === 'cta' ? `<section class="cta-box"><div class="cta-label">${data.cta}</div><div class="cta-note">${data.note}</div></section>` : ''}
      <footer><span>@AYRES.PETSUPPLY</span><span>${index === slides.length - 1 ? 'DISTRIBUCIÓN MAYORISTA' : 'DESLIZÁ'} <b>${index === slides.length - 1 ? '•' : '→'}</b></span></footer>
    </div>
  </article>`;

Promise.all([...document.images].map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
  img.addEventListener('load', resolve, { once: true });
  img.addEventListener('error', resolve, { once: true });
}))).then(() => document.documentElement.classList.add('render-ready'));
