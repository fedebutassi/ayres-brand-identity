const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const slide = payload.slides[Math.min(Math.max(Number(params.get('slide')) || 1, 1), payload.slides.length) - 1];

const productsMarkup = () => {
  if (!slide.products?.length) return '';
  return `<section class="product-stage">${slide.products.map((product) => `
    <article class="product">
      ${product.stat ? `<span class="badge"><b>${product.stat}</b>${product.label}</span>` : ''}
      <img src="${product.image}" alt="${product.name}">
    </article>
  `).join('')}</section>`;
};

const infoMarkup = () => !slide.cards?.length ? '' : `<section class="info-grid">${slide.cards.map((card) => `
  <article class="info-card"><b>${card.title}</b><p>${card.copy}</p>${card.note ? `<small>${card.note}</small>` : ''}</article>
`).join('')}</section>`;

const comparisonMarkup = () => !slide.comparison?.length ? '' : `<section class="comparison">${slide.comparison.map((item) => `
  <article><h2>${item.name}</h2><img src="${item.image}" alt="${item.name}"><ul>${item.items.map((value) => `<li>${value}</li>`).join('')}</ul></article>
`).join('')}</section>`;

const metricsMarkup = () => !slide.metrics?.length ? '' : `<section class="metrics">${slide.metrics.map((metric) => `
  <article class="metric"><span>${metric.label}</span><b>${metric.value}</b><small>${metric.detail}</small></article>
`).join('')}</section>`;

const presentationsMarkup = () => !slide.presentations?.length ? '' : `<section class="presentation-list">${slide.presentations.map((item) => `
  <div class="presentation-row"><b>${item.name}</b><span>${item.value}</span></div>
`).join('')}</section>`;

const ctaMarkup = () => !slide.cta ? '' : `<section class="cta-panel"><b>${slide.cta.title}</b><p>${slide.cta.copy}</p></section>`;

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
      ${infoMarkup()}
      ${comparisonMarkup()}
      ${metricsMarkup()}
      ${presentationsMarkup()}
      ${ctaMarkup()}
      <footer class="footer"><b>@ayres.petsupply</b><span>${slide.page} / ${payload.slides.length}</span></footer>
    </div>
  </article>
`;
