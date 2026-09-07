const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const sceneIndex = Math.min(Math.max(Number(params.get('scene')) || 1, 1), payload.scenes.length) - 1;
const scene = payload.scenes[sceneIndex];
const motion = params.get('motion') === 'start' ? ' motion-start' : '';

const productMarkup = ({ image, name, stat, label = 'PROTEÍNA MÍN.' }) => `
  <article class="product">
    ${stat ? `<span class="product-badge"><b>${stat}</b>${label}</span>` : ''}
    <img src="${image}" alt="${name}">
  </article>
`;

const productsMarkup = () => {
  if (!scene.products?.length) return '';
  const gridClass = scene.products.length === 4 ? ' grid-4' : '';
  return `
    <section class="stage">
      <div class="stage-shadow"></div>
      <div class="products${gridClass}">${scene.products.map(productMarkup).join('')}</div>
    </section>
  `;
};

const listMarkup = () => {
  if (!scene.points?.length) return '';
  return `
    <section class="list-card">
      ${scene.listTitle ? `<h2>${scene.listTitle}</h2>` : ''}
      <div class="points">
        ${scene.points.map((point, index) => `
          <div class="point"><b>${String(index + 1).padStart(2, '0')}</b><span>${point.title}${point.detail ? `<small>${point.detail}</small>` : ''}</span></div>
        `).join('')}
      </div>
    </section>
  `;
};

const focusMarkup = () => {
  if (!scene.focus) return '';
  return `
    <div class="stat"><b>${scene.focus.stat}</b><span>${scene.focus.label}</span></div>
    <section class="focus-stage"><img src="${scene.focus.image}" alt="${scene.focus.name}"></section>
  `;
};

const definitionMarkup = () => {
  if (!scene.definitions?.length) return '';
  return `
    <section class="definition">
      ${scene.definitions.map((item) => `<article><b>${item.term}</b><p>${item.copy}</p></article>`).join('')}
    </section>
  `;
};

const ctaMarkup = () => {
  if (!scene.cta) return '';
  return `<section class="cta-box"><b>${scene.cta.title}</b><span>${scene.cta.action}</span></section>`;
};

document.querySelector('#reel').innerHTML = `
  <article class="frame layout-${scene.layout || 'hero'}${scene.dark ? ' dark' : ''}${motion}">
    <div class="grain"></div>
    <div class="safe">
      <header class="brand">
        <img src="${scene.dark ? payload.logoDark : payload.logoLight}" alt="AYRES Pet Supply">
        <span><i></i>${payload.badge}</span>
      </header>
      <section class="copy">
        <p class="eyebrow">${scene.eyebrow || payload.eyebrow}</p>
        <h1>${scene.title}</h1>
        ${scene.lede ? `<p class="lede">${scene.lede}</p>` : ''}
        <div class="rule"></div>
      </section>
      ${productsMarkup()}
      ${listMarkup()}
      ${focusMarkup()}
      ${definitionMarkup()}
      ${ctaMarkup()}
      <footer class="footer"><b>@ayres.petsupply</b><span>AYRESPETSUPPLY.COM</span></footer>
    </div>
  </article>
`;

const imageReady = (image) => image.complete
  ? Promise.resolve()
  : new Promise((resolve) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });

Promise.all([
  document.fonts.ready,
  ...Array.from(document.images, imageReady),
]).then(() => document.documentElement.classList.add('render-ready'));
