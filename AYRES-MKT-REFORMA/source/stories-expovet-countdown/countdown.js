const params = new URLSearchParams(window.location.search);
const bytes = Uint8Array.from(atob(decodeURIComponent(params.get('payload'))), (c) => c.charCodeAt(0));
const data = JSON.parse(new TextDecoder().decode(bytes));
const slideIndex = Math.max(1, Math.min(Number(params.get('slide')) || 1, data.slides.length)) - 1;
const slide = data.slides[slideIndex];

const plural = slide.days === 1 ? 'DÍA' : 'DÍAS';
const faltaVerb = slide.days === 1 ? 'FALTA' : 'FALTAN';

document.querySelector('#app').innerHTML = `
  <article class="story">
    <img class="bg" src="${data.bgImage}" alt="">
    <div class="countdown-overlay">
      <div class="countdown-box">
        <span class="faltan">${faltaVerb}</span>
        <span class="number">${slide.days}</span>
        <span class="dias">${plural}</span>
        <p class="para">EXPO VETERINARIAS · 25 OCT</p>
      </div>
    </div>
  </article>`;

const imageReady = (img) => img.complete
  ? Promise.resolve()
  : new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });

Promise.all([
  document.fonts.ready,
  ...Array.from(document.images, imageReady),
]).then(() => document.documentElement.classList.add('render-ready'));
