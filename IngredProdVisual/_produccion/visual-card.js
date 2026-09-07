const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const product = JSON.parse(new TextDecoder().decode(bytes));

const secondaryClass = product.title.secondary.length > 34
  ? 'secondary-xlong'
  : product.title.secondary.length > 26 ? 'secondary-long' : 'secondary-regular';
const visualClass = product.visualLine.length > 37 ? 'visual-xlong' : product.visualLine.length > 28 ? 'visual-long' : '';

const ingredientRows = product.ingredients.map((ingredient, index) => `
  <li><b>0${index + 1}</b><span>${ingredient}</span></li>`).join('');

const metricCards = product.metrics.map(({ label, value, qualifier }) => `
  <div class="metric"><strong>${value}</strong><span>${label}<small>${qualifier}</small></span></div>`).join('');

const extraChips = product.extras.map((extra) => `<span>${extra}</span>`).join('');

document.querySelector('#app').innerHTML = `
  <article class="creative" style="--accent:${product.accent};--accent-soft:${product.accentSoft}">
    <div class="glow"></div>
    <header>
      <img src="${product.logo}" alt="AYRES Pet Supply">
      <span>INGREDIENTES · MÁS VISUAL</span>
    </header>

    <section class="copy">
      <p>${product.categoryLabel} · EN DETALLE</p>
      <h1><span>${product.title.primary}</span><em class="${secondaryClass}">${product.title.secondary}</em></h1>
      <div>${product.firstSource} como fuente del primer ingrediente declarado.</div>
    </section>

    <section class="hero-photo photo-${product.photoPosition}">
      <img src="${product.photo}" alt="Representación visual de las fuentes de ingredientes">
      <span>REPRESENTACIÓN VISUAL</span>
    </section>

    <section class="product-panel">
      <div class="product-copy">
        <p>LOS 3 PRIMEROS INGREDIENTES</p>
        <h2 class="${visualClass}">${product.visualLine}</h2>
        <ol>${ingredientRows}</ol>
        <div class="extras"><b>TAMBIÉN DECLARA</b>${extraChips}</div>
      </div>
      <img class="product-pack" src="${product.image}" alt="${product.name}">
      <div class="metrics">${metricCards}</div>
      <div class="presentations"><b>PRESENTACIONES</b><span>${product.presentations}</span></div>
    </section>

    <div class="cta">CONOCÉ LA FÓRMULA · ELEGÍ CON INFORMACIÓN</div>
    <footer>
      <span>@ayres.petsupply</span>
      <small>Datos según declaración del producto.<br>La fotografía representa la fuente del ingrediente.</small>
    </footer>
  </article>`;
