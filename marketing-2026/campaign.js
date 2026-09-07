const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const content = JSON.parse(new TextDecoder().decode(bytes));

const background = content.background
  ? `<img class="background" src="${content.background}" alt="">`
  : '';

const options = content.options
  ? `<div class="options">${content.options.map((option) => `<span>${option}</span>`).join('')}</div>`
  : '';

const points = content.points
  ? `<div class="points">${content.points.map((point, index) => `<div><b>0${index + 1}</b><span>${point}</span></div>`).join('')}</div>`
  : '';

const products = content.products
  ? `<div class="packshots">${content.products.map((product) => `<img src="${product.image}" alt="${product.name}">`).join('')}</div>`
  : '';

const ingredient = content.product
  ? `<div class="ingredient-visual">
      <div class="ingredient-list">
        ${content.product.ingredients.map((item, index) => `<div><b>0${index + 1}</b><span>${item}</span></div>`).join('')}
      </div>
      <img src="${content.product.image}" alt="${content.product.name}">
    </div>`
  : '';

const cards = content.cards
  ? `<div class="comparison-cards">${content.cards.map((card) => `<img src="${card.image}" alt="Ficha de ${card.name}">`).join('')}</div>`
  : '';

const messages = content.messages
  ? `<div class="chat-panel">
      <span class="chat-label">ASESOR AYRES</span>
      <p class="incoming">${content.messages[0]}</p>
      <p class="outgoing">${content.messages[1]}</p>
    </div>`
  : '';

document.documentElement.style.setProperty('--height', content.format === 'story' ? '1920px' : '1350px');
document.querySelector('#app').innerHTML = `
  <article class="creative format-${content.format} layout-${content.layout} tone-${content.tone}">
    ${background}
    <div class="overlay"></div>
    <div class="glow glow-one"></div>
    <div class="glow glow-two"></div>

    <header>
      <img src="${content.logo}" alt="AYRES Pet Supply">
      <span>CAMPAÑA 2026</span>
    </header>

    <section class="copy">
      <p class="eyebrow">${content.eyebrow}</p>
      <h1>${content.title}</h1>
      <p class="body">${content.body}</p>
      ${options}
      ${points}
    </section>

    ${products}
    ${ingredient}
    ${cards}
    ${messages}

    <div class="cta">${content.cta}</div>
    <footer><span>@ayres.petsupply</span><b>ayrespetsupply.com</b></footer>
  </article>`;
