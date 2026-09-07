const options = [
  { background: 'assets/background-perro.png', eyebrow: 'OPCIÓN A · PERRO' },
  { background: 'assets/background-gato.png', eyebrow: 'OPCIÓN B · GATO' },
];
const params = new URLSearchParams(window.location.search);
const index = Math.max(0, Math.min(options.length - 1, Number(params.get('option') || 1) - 1));
const data = options[index];

document.getElementById('story').innerHTML = `
  <article class="story">
    <img class="photo" src="${data.background}" alt="Fondo fotográfico de mascota">
    <div class="overlay"></div>
    <img class="logo" src="../../assets/logo-dark.svg" alt="AYRES Pet Supply">
    <div class="safe">
      <section class="copy">
        <div class="eyebrow">QUEREMOS CONOCERTE</div>
        <h1>¿TENÉS O TRABAJÁS EN UNA <em>PET SHOP, VETERINARIA O COMERCIO?</em></h1>
        <p class="lede">Queremos saber quién está del otro lado.</p>
      </section>
      <div class="sticker-space" aria-hidden="true"></div>
      <footer>@AYRES.PETSUPPLY</footer>
    </div>
  </article>`;

Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
  image.addEventListener('load', resolve, { once: true });
  image.addEventListener('error', resolve, { once: true });
}))).then(() => document.documentElement.classList.add('ready'));
