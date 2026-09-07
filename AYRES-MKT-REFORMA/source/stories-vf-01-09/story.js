const params = new URLSearchParams(window.location.search);
const payload = JSON.parse(decodeURIComponent(escape(atob(params.get('payload')))));
const index = Math.min(Math.max(Number(params.get('story')) || 1, 1), payload.stories.length) - 1;
const story = payload.stories[index];

const optionsMarkup = () => !story.options?.length ? '' : `<section class="options">${story.options.map((value) => `<span>${value}</span>`).join('')}</section>`;
const hintMarkup = () => !story.hint ? '' : `<p class="hint">${story.hint}</p>`;
const stageMarkup = () => !story.products?.length ? '' : `<section class="stage">${story.products.map((item) => `<article><img src="${item.image}" alt="${item.name}"></article>`).join('')}</section>`;
const bandMarkup = () => !story.band ? '' : `<div class="band">${story.band}</div>`;
const ctaMarkup = () => !story.cta ? '' : `<section class="cta-panel"><p>${story.cta.eyebrow}</p><b>${story.cta.title}</b><span>${story.cta.button}</span></section>`;
const noteMarkup = () => !story.note ? '' : `<p class="note">${story.note}</p>`;

document.querySelector('#story').innerHTML = `
  <article class="story${story.light ? ' light' : ''}">
    <div class="safe">
      <header>
        <img src="${story.light ? payload.logoLight : payload.logoDark}" alt="AYRES Pet Supply">
        <span>${story.badge}</span>
      </header>
      <section class="copy">
        <span class="page">${String(index + 1).padStart(2, '0')} / ${String(payload.stories.length).padStart(2, '0')}</span>
        <p>${story.eyebrow}</p>
        <h1>${story.title}</h1>
        <div class="rule"></div>
        ${story.lede ? `<h2>${story.lede}</h2>` : ''}
      </section>
      ${optionsMarkup()}
      ${stageMarkup()}
      ${ctaMarkup()}
      ${noteMarkup()}
      ${hintMarkup()}
      ${bandMarkup()}
      <footer><b>@ayres.petsupply</b><i>DISTRIBUCIÓN MAYORISTA</i></footer>
    </div>
  </article>
`;
