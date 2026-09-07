document.getElementById('story').innerHTML = `
  <article class="story">
    <img class="photo" src="assets/background-categorias-perro-gato.png" alt="Perro y gato en un espacio moderno">
    <div class="overlay"></div>
    <img class="logo" src="../../assets/logo-dark.svg" alt="AYRES Pet Supply">
    <div class="safe">
      <section class="copy">
        <div class="eyebrow">TU EXPERIENCIA NOS AYUDA</div>
        <h1>¿QUÉ CATEGORÍA TE <em>CONSULTAN MÁS?</em></h1>
        <p class="lede">Tu respuesta nos ayuda a preparar contenido más útil.</p>
      </section>
      <div class="sticker-space" aria-hidden="true"></div>
      <footer>@AYRES.PETSUPPLY</footer>
    </div>
  </article>`;

Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
  image.addEventListener('load', resolve, { once: true });
  image.addEventListener('error', resolve, { once: true });
}))).then(() => document.documentElement.classList.add('ready'));
