const variants = {
  choice: {
    image: 'assets/visual-eleccion.png',
    title: '¿QUÉ ALIMENTO<br><span>ELEGIR?</span>',
    subtitle: 'Conocé nuestras nuevas guías de producto.',
  },
  compare: {
    image: 'assets/visual-comparacion.png',
    title: 'COMPARÁ.<br>INFORMATE.<br><span>ELEGÍ MEJOR.</span>',
    subtitle: '',
  },
};

const params = new URLSearchParams(window.location.search);
const variantName = params.get('variant') || 'choice';
const variant = variants[variantName] || variants.choice;
const subtitle = variant.subtitle ? `<p>${variant.subtitle}</p>` : '';

document.querySelector('#story').innerHTML = `
  <article class="story ${variantName}">
    <img class="visual" src="${variant.image}" alt="">
    <img class="brand" src="../../../assets/logo-light.png" alt="AYRES Pet Supply">
    <section class="copy">
      <h1>${variant.title}</h1>
      ${subtitle}
    </section>
    <footer class="website">ayrespetsupply.com</footer>
  </article>
`;
