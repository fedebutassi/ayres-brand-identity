const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const slideIndex = Math.min(Math.max(Number(params.get('slide')) || 1, 1), payload.slides.length) - 1;
const slide = payload.slides[slideIndex];

const contextMarkup = slide.context ? `
  <section class="context">
    <b>${slide.contextTitle}</b>
    <p>${slide.context}</p>
  </section>` : '';

const ctaMarkup = slide.cta ? `
  <section class="cta">
    <b>${slide.ctaTitle}</b>
    <p>${slide.cta}</p>
  </section>` : '';

document.querySelector('#slide').innerHTML = `
  <article class="slide ${slide.type}">
    <img class="photo" src="${slide.photo}" alt="">
    <div class="safe">
      <header class="brand">
        <img src="${payload.logo}" alt="AYRES Pet Supply">
        <span>${payload.badge}</span>
      </header>
      <section class="heading">
        <div class="eyebrow">${slide.number ? `<b>${slide.number}</b>` : ''}${slide.eyebrow}</div>
        <h1>${slide.title}</h1>
        ${slide.lede ? `<p class="lede">${slide.lede}</p>` : ''}
      </section>
      ${contextMarkup}
      ${ctaMarkup}
      <footer class="footer"><b>@ayres.petsupply</b><span>${String(slideIndex + 1).padStart(2, '0')} / ${String(payload.slides.length).padStart(2, '0')}</span></footer>
    </div>
  </article>`;
