const assets = '../../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos';

const data = {
  theme: 'dark',
  eyebrow: 'DISTRIBUCIÓN MAYORISTA · CÓRDOBA',
  title: '<em>12 MARCAS.</em><br>UN SOLO CONTACTO.',
  lede: '¿Tenés un petshop, veterinaria o comercio de alimento balanceado? Recibí el catálogo mayorista para tu negocio. Entregamos en gran parte de la provincia de Córdoba.',
  products: [
    `${assets}/fawna-cachorro-pequeno.png`,
    `${assets}/op-pn-lamb-puppy-all.png`,
    `${assets}/kongo-gold-adultos-medianos-grandes.png`,
    `${assets}/company-gatos-adultos.png`,
    `${assets}/voraz-perros-adultos-mix-carne-pollo-vegetales.png`,
  ],
  cta: 'PEDÍ EL CATÁLOGO POR WHATSAPP',
  note: 'Disponibilidad y distribución sujetas a zona de cobertura.',
};

const params = new URLSearchParams(window.location.search);
const vertical = params.get('format') === 'vertical';
const root = document.getElementById('slide');

root.innerHTML = `
  <article class="slide dark cover ad ${vertical ? 'vertical' : ''}">
    <div class="glow"></div>
    <header class="topbar">
      <img class="ayres-logo" src="../../../assets/logo-dark.svg" alt="AYRES Pet Supply">
    </header>
    <div class="safe">
      <section class="copy">
        <div class="eyebrow">${data.eyebrow}</div>
        <h1>${data.title}</h1>
        <p class="lede">${data.lede}</p>
      </section>
      <section class="cover-stage">
        <div class="ground"></div>
        ${data.products.map((product, i) => `<img class="cover-pack p${i + 1}" src="${product}" alt="Producto del catálogo AYRES">`).join('')}
      </section>
      <section class="cta-box"><div class="cta-label">${data.cta}</div><div class="cta-note">${data.note}</div></section>
      <footer><span>@AYRES.PETSUPPLY</span><span>DISTRIBUCIÓN MAYORISTA <b>•</b></span></footer>
    </div>
  </article>`;

Promise.all([...document.images].map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
  img.addEventListener('load', resolve, { once: true });
  img.addEventListener('error', resolve, { once: true });
}))).then(() => document.documentElement.classList.add('render-ready'));
