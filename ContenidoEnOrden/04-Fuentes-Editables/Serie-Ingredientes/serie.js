const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const content = JSON.parse(new TextDecoder().decode(bytes));
const { campaign } = content;

const ingredientRows = (ingredients) => ingredients.map((ingredient, index) => `
  <li><b>0${index + 1}</b><span>${ingredient}</span></li>`).join('');

const metric = ({ label, value, qualifier }) => `
  <div class="metric"><strong>${value}</strong><span>${label}<small>${qualifier}</small></span></div>`;

const header = () => `
  <header><img src="${content.logo}" alt="AYRES Pet Supply"><span>INGREDIENTES · MÁS VISUAL</span></header>`;

const footer = (note) => `
  <footer><span>@ayres.petsupply</span><small>${note}</small></footer>`;

const compareCard = (product, index) => `
  <article class="formula formula-${index + 1}">
    <p>${product.displayName}</p>
    <h2>${product.visualLine}</h2>
    <div class="photo-window">
      <img class="ingredient-photo" src="${campaign.photo}" alt="Representación de ingredientes">
      <span>REPRESENTACIÓN VISUAL</span>
    </div>
    <ol>${ingredientRows(product.ingredients)}</ol>
    <div class="protein"><b>${product.metrics[0].value}</b><span>PROTEÍNA<br>${product.metrics[0].qualifier}</span></div>
    <img class="product-pack" src="${product.image}" alt="${product.displayName}">
  </article>`;

const renderComparison = () => `
  <article class="creative comparison" style="--accent:${campaign.accent}">
    <div class="glow"></div>${header()}
    <section class="copy">
      <p>${campaign.eyebrow}</p>
      <h1>${campaign.headline.split('|').join('<br><em>')}</em></h1>
      <div>${campaign.subtitle}</div>
    </section>
    <section class="formulas">${campaign.products.map(compareCard).join('')}</section>
    <div class="cta">MIRÁ · COMPARÁ · ELEGÍ CON CONTEXTO</div>
    ${footer('La fotografía representa la fuente del ingrediente.<br>Valores e ingredientes tomados de la declaración del producto.')}
  </article>`;

const renderSpotlight = () => {
  const product = campaign.product;
  return `
    <article class="creative spotlight" style="--accent:${campaign.accent}">
      <div class="glow"></div>${header()}
      <section class="copy">
        <p>${campaign.eyebrow}</p>
        <h1>${campaign.headline.split('|').join('<br><em>')}</em></h1>
        <div>${campaign.subtitle}</div>
      </section>
      <section class="hero-photo photo-${campaign.photoPosition}">
        <img src="${campaign.photo}" alt="Representación de ingredientes">
        <span>REPRESENTACIÓN VISUAL</span>
      </section>
      <section class="product-panel">
        <div class="product-copy">
          <p>LOS 3 PRIMEROS INGREDIENTES</p>
          <h2>${product.visualLine}</h2>
          <ol>${ingredientRows(product.ingredients)}</ol>
          <div class="extras"><b>TAMBIÉN DECLARA</b>${product.extras.map((item) => `<span>${item}</span>`).join('')}</div>
        </div>
        <img class="single-pack" src="${product.image}" alt="${product.displayName}">
        <div class="metrics">${product.metrics.map(metric).join('')}</div>
        <div class="presentations"><b>PRESENTACIONES</b><span>${product.presentations}</span></div>
      </section>
      <div class="cta">CONOCÉ LA FÓRMULA · ELEGÍ CON INFORMACIÓN</div>
      ${footer('Datos según declaración del producto.<br>La fotografía representa la fuente del ingrediente.')}
    </article>`;
};

document.querySelector('#app').innerHTML = campaign.kind === 'comparison'
  ? renderComparison()
  : renderSpotlight();
