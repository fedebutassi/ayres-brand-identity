const bytes = Uint8Array.from(
  atob(new URLSearchParams(window.location.search).get('payload')),
  (character) => character.charCodeAt(0),
);
const carousel = JSON.parse(new TextDecoder().decode(bytes));
const productBase = '../../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos';
const cover = document.querySelector('#cover');

cover.style.setProperty('--accent', carousel.accent);
cover.classList.toggle('is-comparison', Boolean(carousel.comparison));
document.querySelector('#eyebrow').textContent = carousel.eyebrow;
document.querySelector('#title').innerHTML = carousel.title.replace('\n', '<br>');
document.querySelector('#subtitle').textContent = carousel.subtitle;

document.querySelector('#brands').innerHTML = carousel.products
  .map(({ brand, line }, index) => `
    <span class="brand-${line}">
      <b>${String(index + 1).padStart(2, '0')}</b>${brand}
    </span>`)
  .join('');

document.querySelector('#lineGuide').innerHTML = carousel.comparison
  ? '<span>PREMIUM · 2 PRODUCTOS</span><span>MAINSTREAM · 2 PRODUCTOS</span>'
  : '';

document.querySelector('#products').innerHTML = carousel.products
  .map(({ id, brand, protein, line }, index) => `
    <article class="product product-${index + 1} product-${line}">
      <em>${protein}<small>PROTEÍNA MÍN.</small></em>
      ${carousel.comparison ? `<i>${line.toUpperCase()}</i>` : ''}
      <img src="${productBase}/${id}.png" alt="${brand}">
    </article>`)
  .join('');
