const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const content = JSON.parse(new TextDecoder().decode(bytes));

const productCard = (product, index) => `
  <article class="formula formula-${index + 1}">
    <p>${product.displayName}</p>
    <h2>${index === 0 ? 'SALMÓN · POLLO · ARROZ' : 'CORDERO · ARROZ · ARVEJA'}</h2>
    <div class="photo-window">
      <img class="ingredient-photo" src="${content.ingredientPhoto}" alt="Fuentes alimentarias representadas">
      <span>REPRESENTACIÓN VISUAL</span>
    </div>
    <ol>
      ${product.ingredients.map((ingredient, ingredientIndex) => `
        <li><b>0${ingredientIndex + 1}</b><span>${ingredient}</span></li>`).join('')}
    </ol>
    <img class="product-pack" src="${product.image}" alt="${product.displayName}">
  </article>`;

document.querySelector('#app').innerHTML = `
  <article class="creative">
    <div class="glow"></div>
    <header>
      <img src="${content.logo}" alt="AYRES Pet Supply">
      <span>INGREDIENTES · MÁS VISUAL</span>
    </header>

    <section class="copy">
      <p>DE LA LISTA A LA IMAGEN</p>
      <h1>INGREDIENTES<br><em>QUE PODÉS RECONOCER.</em></h1>
      <div>Una forma visual de entender los tres primeros ingredientes declarados.</div>
    </section>

    <section class="formulas">${content.products.map(productCard).join('')}</section>
    <div class="cta">MIRÁ · COMPARÁ · ELEGÍ CON CONTEXTO</div>
    <footer>
      <span>@ayres.petsupply</span>
      <small>Las fotografías representan la fuente del ingrediente.<br>La fórmula utiliza ingredientes procesados según su declaración.</small>
    </footer>
  </article>`;
