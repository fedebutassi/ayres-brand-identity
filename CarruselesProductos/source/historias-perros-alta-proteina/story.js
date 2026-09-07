const products = [
  { id: 'fawna-cachorro-pequeno', brand: 'FAWNA', protein: '34%' },
  { id: 'op-pn-lamb-puppy-all', brand: 'OLD PRINCE', protein: '32%' },
  { id: 'company-cachorros', brand: 'COMPANY', protein: '28%' },
  { id: 'kongo-gold-cachorros-todas-razas', brand: 'KONGO', protein: '28%' },
];

const productBase = '../../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos';

const productMarkup = ({ id, brand, protein }, index) => `
  <article class="product product-${index + 1}">
    <em>${protein}<small>PROTEÍNA<br>MÍN.</small></em>
    <img src="${productBase}/${id}.png" alt="${brand}">
  </article>
`;

const headerMarkup = (theme = 'light') => `
  <header class="brand-header">
    <img src="../../../assets/logo-${theme}.svg" alt="AYRES Pet Supply">
    <span>PRODUCTOS AYRES</span>
  </header>
`;

const presentationMarkup = () => `
  <article class="story presentation">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>
    ${headerMarkup('light')}
    <section class="intro">
      <p>PERROS · INFORMACIÓN NUTRICIONAL</p>
      <h1>PERROS CON ALTA<br>PROTEÍNA DECLARADA</h1>
      <h2>Cuatro opciones para conocer y comparar.</h2>
    </section>
    <section class="brand-list" aria-label="Marcas seleccionadas">
      ${products.map(({ brand }, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${brand}</span>`).join('')}
    </section>
    <section class="products" aria-label="Productos seleccionados">
      ${products.map((product, index) => productMarkup(product, index)).join('')}
    </section>
    <footer class="story-footer">
      <b>Mirá el carrusel completo</b>
      <span>Deslizá para conocer cada ficha →</span>
    </footer>
  </article>
`;

const ctaMarkup = () => `
  <article class="story cta">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>
    ${headerMarkup('dark')}
    <section class="cta-copy">
      <p>MÁS INFORMACIÓN · ASESORAMIENTO</p>
      <h1>¿QUERÉS<br>SABER MÁS?</h1>
      <h2>Nuestro chatbot online puede orientarte para elegir la opción indicada.</h2>
      <div class="website"><span>ayrespetsupply.com</span><b>→</b></div>
    </section>
    <section class="chatbot-card" aria-label="Chatbot online AYRES">
      <div class="chat-head">
        <img src="../../../assets/logo-badge.svg" alt="">
        <div>
          <b>CHATBOT AYRES</b>
          <span><i></i> EN LÍNEA</span>
        </div>
      </div>
      <div class="bubble bubble-one">¿Necesitás ayuda para elegir?</div>
      <div class="bubble bubble-two">Puedo orientarte según la etapa y las necesidades de tu perro.</div>
      <div class="chat-action"><span>INICIAR ASESORAMIENTO</span><b>→</b></div>
    </section>
    <footer class="story-footer">
      <b>@ayres.petsupply</b>
      <span>Chatbot disponible en ayrespetsupply.com</span>
    </footer>
  </article>
`;

const variant = new URLSearchParams(window.location.search).get('variant');
document.querySelector('#story').innerHTML = variant === 'cta' ? ctaMarkup() : presentationMarkup();
