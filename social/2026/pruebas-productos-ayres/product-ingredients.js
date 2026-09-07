const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const product = JSON.parse(new TextDecoder().decode(bytes));

const ingredientSize = (ingredient) => {
  if (ingredient.length > 28) return 'ingredient-xlong';
  if (ingredient.length > 21) return 'ingredient-long';
  return 'ingredient-regular';
};

const secondaryIngredients = product.ingredients
  .slice(1)
  .map((ingredient, index) => `
    <li>
      <b>0${index + 2}</b>
      <span>${ingredient}</span>
    </li>`)
  .join('');

document.querySelector('#app').innerHTML = `
  <article class="card" style="--accent:${product.accent};--accent-soft:${product.accentSoft};--product-scale:${product.productScale || 1}">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>

    <header>
      <img src="${product.logo}" alt="AYRES Pet Supply">
      <span>FOCO EN INGREDIENTES</span>
    </header>

    <section class="copy">
      <p class="category">${product.category}</p>
      <h1 class="${product.titleSize}">${product.name}</h1>
      <p class="subtitle">${product.subtitle}</p>

      <div class="ingredient-spotlight">
        <p>INGREDIENTE Nº 1 DECLARADO</p>
        <div class="primary-ingredient">
          <strong>01</strong>
          <h2 class="${ingredientSize(product.ingredients[0])}">${product.ingredients[0]}</h2>
        </div>
        <small>El orden respeta la declaración del producto.</small>
      </div>

      <div class="ingredient-list">
        <p>LE SIGUEN EN LA LISTA</p>
        <ol>${secondaryIngredients}</ol>
      </div>
    </section>

    <div class="product-halo"></div>
    <div class="product-shadow"></div>
    <div class="product-stage">
      <img class="product" src="${product.image}" alt="${product.name}">
    </div>

    <footer>
      <div><span>PRESENTACIONES</span><b>${product.presentations}</b></div>
      <small>Ingredientes declarados en productos.json<br>Verificá siempre el orden en el envase.</small>
    </footer>
  </article>`;
