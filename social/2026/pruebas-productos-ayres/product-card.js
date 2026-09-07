const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(params.get('content')), (character) => character.charCodeAt(0));
const product = JSON.parse(new TextDecoder().decode(bytes));

const ingredientItems = product.ingredients
  .map((ingredient, index) => `<li><b>0${index + 1}</b><span>${ingredient}</span></li>`)
  .join('');

document.querySelector('#app').innerHTML = `
  <article class="card" style="--accent:${product.accent};--accent-soft:${product.accentSoft};--product-scale:${product.productScale || 1}">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>
    <header>
      <img src="${product.logo}" alt="AYRES Pet Supply">
      <span>FICHA DE PRODUCTO</span>
    </header>

    <section class="copy">
      <p class="category">${product.category}</p>
      <h1 class="${product.titleSize}">${product.name}</h1>
      <p class="subtitle">${product.subtitle}</p>

      <div class="nutrition">
        <div class="primary-stat">
          <strong>${product.protein}</strong>
          <span>PROTEÍNA<br>MÍNIMA</span>
        </div>
        <div class="secondary-stat">
          <strong>${product.fat}</strong>
          <span>EXTRACTO ETÉREO<br>MÍNIMO</span>
        </div>
      </div>

      <div class="ingredients">
        <p>PRIMEROS INGREDIENTES DECLARADOS</p>
        <ol>${ingredientItems}</ol>
      </div>
    </section>

    <div class="product-halo"></div>
    <div class="product-shadow"></div>
    <div class="product-stage">
      <img class="product" src="${product.image}" alt="${product.name}">
    </div>

    <footer>
      <div><span>PRESENTACIONES</span><b>${product.presentations}</b></div>
      <small>Información declarada en productos.json<br>Verificá siempre el envase.</small>
    </footer>
  </article>`;
