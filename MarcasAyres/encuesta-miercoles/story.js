const stories = [
  {
    eyebrow: 'QUEREMOS CONOCERTE',
    title: '¿TENÉS O TRABAJÁS EN UNA <em>PET SHOP, VETERINARIA O COMERCIO?</em>',
    lede: 'Queremos saber quién está del otro lado.',
    type: 'products',
    products: [
      '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/fawna-cachorro-pequeno.png',
      '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/kongo-gold-adultos-medianos-grandes.png',
      '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/company-gatos-adultos.png',
    ],
  },
  {
    eyebrow: 'TU EXPERIENCIA NOS AYUDA',
    title: '¿QUÉ CATEGORÍA TE <em>CONSULTAN MÁS?</em>',
    lede: 'Tu respuesta nos ayuda a preparar contenido más útil.',
    type: 'products',
    products: [
      '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/op-pn-lamb-puppy-all.png',
      '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos/fawna-gato-adulto.png',
    ],
  },
];

const params = new URLSearchParams(window.location.search);
const index = Math.max(0, Math.min(stories.length - 1, Number(params.get('story') || 1) - 1));
const data = stories[index];

const visual = data.type === 'products'
  ? `<section class="products"><div class="shadow"></div>${data.products.map((src) => `<img class="pack" src="${src}" alt="Producto AYRES">`).join('')}</section>`
  : `<section class="category-icons"><article class="animal"><b>PERROS</b><img src="${data.products[0]}" alt="Producto para perros"></article><article class="animal"><b>GATOS</b><img src="${data.products[1]}" alt="Producto para gatos"></article></section>`;

document.getElementById('story').innerHTML = `
  <article class="story">
    <img class="logo" src="../../assets/logo-dark.svg" alt="AYRES Pet Supply">
    <div class="safe">
      <section class="copy">
        <div class="eyebrow">${data.eyebrow}</div>
        <h1>${data.title}</h1>
        <p class="lede">${data.lede}</p>
      </section>
      <div class="sticker-space" aria-hidden="true"></div>
      ${visual}
      <footer>@AYRES.PETSUPPLY</footer>
    </div>
  </article>`;

Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
  image.addEventListener('load', resolve, { once: true });
  image.addEventListener('error', resolve, { once: true });
}))).then(() => document.documentElement.classList.add('ready'));
