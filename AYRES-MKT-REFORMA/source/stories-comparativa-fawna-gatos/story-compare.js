const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(decodeURIComponent(params.get('payload'))), (c) => c.charCodeAt(0));
const data = JSON.parse(new TextDecoder().decode(bytes));
const slideIndex = Math.max(1, Math.min(Number(params.get('slide')) || 1, data.slides.length)) - 1;
const slide = data.slides[slideIndex];

const productImage = (id) => data.cutouts[id] || '';

const renderTable = () => {
  const rows = slide.rows.map((row) => {
    const cells = row.values.map((v, i) => {
      const hl = v.highlight ? ' highlight' : '';
      return `<div class="cell${hl}"><strong>${v.value}</strong><small>${v.qualifier || ''}</small></div>`;
    }).join('');
    return `<div class="compare-row"><div class="label">${row.label}</div>${cells}</div>`;
  }).join('');

  const headerCells = slide.headers.map((h) => `<span>${h}</span>`).join('');

  const products = slide.productIds.map((id, i) => `
    <div class="product-thumb">
      <img src="${productImage(id)}" alt="${slide.headers[i]}">
      <span>${slide.headers[i]}</span>
    </div>
  `).join('');

  document.querySelector('#app').innerHTML = `
    <article class="story-table">
      <div class="grain"></div>
      <div class="safe">
        <header>
          <img src="${data.logoLight}" alt="AYRES">
          <span>FAWNA · GATOS</span>
        </header>
        <p class="eyebrow">${slide.eyebrow}</p>
        <h1>${slide.title}</h1>
        <div class="rule"></div>
        <div class="compare-grid">
          <div class="compare-row header-row"><div class="label"></div>${headerCells}</div>
          ${rows}
        </div>
        <div class="products-row">${products}</div>
      </div>
      <footer>
        <span>@ayres.petsupply</span>
        <small>Datos según declaración del fabricante.</small>
      </footer>
    </article>`;
};

const renderIngredients = () => {
  const columns = slide.columns.map((col) => {
    const items = col.ingredients.map((ing, i) => `
      <li><b>0${i + 1}</b><span>${ing}</span></li>
    `).join('');
    const extras = col.extras.map((e) => `<span>${e}</span>`).join('');
    return `
      <div class="ingr-col">
        <h3>${col.name}</h3>
        <ol>${items}</ol>
        <div class="extras"><b>TAMBIÉN DECLARA</b>${extras}</div>
      </div>
    `;
  }).join('');

  const products = slide.productIds.map((id) => `
    <img src="${productImage(id)}" alt="">
  `).join('');

  document.querySelector('#app').innerHTML = `
    <article class="story-ingredients">
      <div class="grain"></div>
      <div class="safe">
        <header>
          <img src="${data.logoDark}" alt="AYRES">
          <span>FAWNA · GATOS</span>
        </header>
        <p class="eyebrow">${slide.eyebrow}</p>
        <h1>${slide.title}</h1>
        <div class="rule"></div>
        <p class="lede">${slide.lede}</p>
        <div class="ingredient-columns">${columns}</div>
        <div class="product-strip">${products}</div>
      </div>
      <footer>
        <span>@ayres.petsupply</span>
        <small>Datos según declaración del fabricante.</small>
      </footer>
    </article>`;
};

const renderCta = () => {
  const products = slide.productIds.map((id) => `
    <img src="${productImage(id)}" alt="">
  `).join('');

  document.querySelector('#app').innerHTML = `
    <article class="story-cta">
      <div class="grain"></div>
      <div class="safe">
        <header>
          <img src="${data.logoDark}" alt="AYRES">
          <span>AYRES MAYORISTA</span>
        </header>
        <p class="eyebrow">${slide.eyebrow}</p>
        <h1>${slide.title}</h1>
        <div class="rule"></div>
        <p class="lede">${slide.lede}</p>
        <div class="cta-box">
          <b>${slide.cta.title}</b>
          <span>${slide.cta.action}</span>
        </div>
        <div class="product-row">${products}</div>
      </div>
      <footer>
        <span>@ayres.petsupply</span>
        <small>Pedí la lista de precios por WhatsApp — link en bio.</small>
      </footer>
    </article>`;
};

const renderers = { table: renderTable, ingredients: renderIngredients, cta: renderCta };
(renderers[slide.layout] || renderTable)();

const imageReady = (img) => img.complete
  ? Promise.resolve()
  : new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });

Promise.all([
  document.fonts.ready,
  ...Array.from(document.images, imageReady),
]).then(() => document.documentElement.classList.add('render-ready'));
