const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const content = JSON.parse(new TextDecoder().decode(bytes));

const productCard = (product, index) => `
  <article class="product-card card-${index + 1}">
    <p class="product-name">${product.displayName}</p>
    <div class="main-ingredient">
      <span>INGREDIENTE Nº 1</span>
      <h2>${product.ingredients[0]}</h2>
    </div>
    <div class="product-stage">
      <img src="${product.image}" alt="${product.displayName}">
    </div>
    <ol>
      ${product.ingredients.map((ingredient, ingredientIndex) => `
        <li><b>0${ingredientIndex + 1}</b><span>${ingredient}</span></li>`).join('')}
    </ol>
  </article>`;

document.querySelector('#app').innerHTML = `
  <article class="creative">
    <div class="glow glow-one"></div>
    <div class="glow glow-two"></div>
    <header>
      <img src="${content.logo}" alt="AYRES Pet Supply">
      <span>PRUEBA · INGREDIENTES</span>
    </header>

    <section class="copy">
      <p>PERROS ADULTOS · RAZAS PEQUEÑAS</p>
      <h1>¿SALMÓN O CORDERO?<br><em>MIRÁ QUÉ DECLARA CADA FÓRMULA.</em></h1>
      <div>Dos productos comparables. Sus tres primeros ingredientes, en el orden informado.</div>
    </section>

    <section class="comparison">
      ${content.products.map(productCard).join('')}
    </section>

    <div class="cta">COMPARAR TAMBIÉN ES CUIDAR</div>
    <footer>
      <span>@ayres.petsupply</span>
      <small>El primer ingrediente no define por sí solo cuál opción es adecuada.<br>Verificá siempre la información completa del envase.</small>
    </footer>
  </article>`;
