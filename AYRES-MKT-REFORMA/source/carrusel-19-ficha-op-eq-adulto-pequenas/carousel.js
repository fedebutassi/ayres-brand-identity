const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const slide = payload.slides[Math.min(Math.max(Number(params.get('slide')) || 1, 1), payload.slides.length) - 1];

const productsMarkup = () => {
  if (!slide.products?.length) return '';
  return `<section class="product-stage">${slide.products.map((product) => `
    <article class="product">
      <img src="${product.image}" alt="${product.name}">
    </article>
  `).join('')}</section>`;
};

const profileMarkup = () => {
  if (!slide.profile) return '';
  const { profile } = slide;
  return `<section class="profile">
    <div class="profile-visual">
      <span class="profile-badge"><b>${profile.protein}</b>PROTEÍNA MÍN.</span>
      <img src="${profile.image}" alt="${profile.name}">
    </div>
    <div class="profile-data">${profile.rows.map((row) => `
      <div class="profile-row"><span>${row.label}</span><b>${row.value}</b></div>
    `).join('')}</div>
  </section>`;
};

const tableMarkup = () => {
  if (!slide.table) return '';
  const { headers, rows } = slide.table;
  return `<section class="table">
    <div class="table-head">${headers.map((cell) => `<span>${cell}</span>`).join('')}</div>
    ${rows.map((row) => `<div class="table-row"><b>${row[0]}</b><span class="num">${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join('')}
    <div class="table-note">Proteína: mínimo declarado por cada fórmula. Fuente: catálogo de productos, datos declarados por el fabricante.</div>
  </section>`;
};

const ctaMarkup = () => !slide.cta ? '' : `<section class="cta-panel"><b>${slide.cta.title}</b><p>${slide.cta.copy}</p></section>`;

const cardsMarkup = () => {
  if (!slide.cards?.length) return '';
  return `<section class="cards">${slide.cards.map((card) => `
    <article class="card"><b>${card.term}</b><p>${card.copy}</p></article>
  `).join('')}</section>${slide.cardsNote ? `<p class="cards-note">${slide.cardsNote}</p>` : ''}`;
};

const pointsMarkup = () => {
  if (!slide.points?.length) return '';
  return `<section class="points-card">
    ${slide.pointsTitle ? `<h2>${slide.pointsTitle}</h2>` : ''}
    ${slide.points.map((point, index) => `
      <div class="point"><b>${String(index + 1).padStart(2, '0')}</b><span>${point.title}${point.detail ? `<small>${point.detail}</small>` : ''}</span></div>
    `).join('')}
    ${slide.pointsNote ? `<p class="points-note">${slide.pointsNote}</p>` : ''}
  </section>`;
};

document.querySelector('#slide').innerHTML = `
  <article class="slide ${slide.type || ''}${slide.dark ? ' dark' : ''}">
    <div class="safe">
      <header class="brand"><img src="${slide.dark ? payload.logoDark : payload.logoLight}" alt="AYRES Pet Supply"><span>${payload.badge}</span></header>
      <section class="heading">
        <div class="step">${slide.number ? `<b>${slide.number}</b>` : ''}${slide.eyebrow}</div>
        <h1>${slide.title}</h1>
        ${slide.lede ? `<p class="lede">${slide.lede}</p>` : ''}
        <div class="rule"></div>
      </section>
      ${productsMarkup()}
      ${profileMarkup()}
      ${tableMarkup()}
      ${cardsMarkup()}
      ${pointsMarkup()}
      ${ctaMarkup()}
      <footer class="footer"><b>@ayres.petsupply</b><span>${slide.page} / ${payload.slides.length}</span></footer>
    </div>
  </article>
`;
