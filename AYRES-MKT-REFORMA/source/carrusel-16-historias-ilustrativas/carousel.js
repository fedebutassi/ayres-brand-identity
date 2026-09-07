const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const slideIndex = Math.min(Math.max(Number(params.get('slide')) || 1, 1), payload.slides.length) - 1;
const slide = payload.slides[slideIndex];

document.querySelector('#slide').innerHTML = `
  <article class="slide ${slide.type || 'story'}">
    <img class="photo" src="${slide.photo}" alt="">
    <div class="shade"></div>
    <div class="safe">
      <header class="brand">
        <img src="${payload.logo}" alt="AYRES Pet Supply">
        <span>${payload.badge}</span>
      </header>
      <section class="quote-block">
        <div class="number">${slide.number}</div>
        <h1>${slide.quote}</h1>
      </section>
      <section class="story-card">
        <div class="story-name">${slide.name}</div>
        <p>${slide.story}</p>
        <div class="takeaway">${slide.takeaway}</div>
        ${slide.cta ? `<div class="cta">${slide.cta}</div>` : ''}
      </section>
      <footer><b>@ayres.petsupply</b><span>${String(slideIndex + 1).padStart(2, '0')} / ${String(payload.slides.length).padStart(2, '0')}</span></footer>
    </div>
  </article>`;
