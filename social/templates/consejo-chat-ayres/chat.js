const params = new URLSearchParams(window.location.search);
const variant = params.get('variant') === 'b' ? 'b' : 'a';
const scene = Math.min(Math.max(Number(params.get('scene')) || 1, 1), 5);
const content = JSON.parse(decodeURIComponent(escape(atob(params.get('content')))));

const headerA = `
  <header class="assistant-header">
    <img class="assistant-logo" src="${content.logo}" alt="AYRES Pet Supply">
    <span class="online-status"><i></i><span><b>ASISTENTE AYRES</b><small>EN LÍNEA</small></span></span>
  </header>`;

const headerB = `
  <header class="brand-header">
    <img src="${content.logo}" alt="AYRES Pet Supply">
    <span><i></i> CONSEJO AYRES</span>
  </header>`;

const question = `
  <section class="message message-user">
    <label>VOS</label>
    <div>${content.question}</div>
  </section>`;

const typing = `
  <section class="message message-assistant typing">
    <label>ASISTENTE AYRES</label>
    <div><i></i><i></i><i></i></div>
  </section>`;

const answer = `
  <section class="message message-assistant">
    <label>ASISTENTE AYRES</label>
    <div>${content.answer}<small>${content.support}</small></div>
  </section>`;

const closing = `
  <section class="closing-card">
    <b>${content.cta}</b>
    <span>${content.action}</span>
  </section>`;

const sceneContent = () => {
  if (scene === 1) return '';
  if (scene === 2) return question;
  if (scene === 3) return `${question}${typing}`;
  if (scene === 4) return `${question}${answer}`;
  return `${question}${answer}${closing}`;
};

document.querySelector('#app').innerHTML = `
  <article class="story variant-${variant} scene-${scene}">
    <img class="background" src="${content.background}" alt="">
    <div class="shade"></div>
    <div class="safe-area">
      ${variant === 'a' ? headerA : headerB}
      <section class="topic">
        <span>${content.eyebrow}</span>
        <h1>${content.title}</h1>
      </section>
      <div class="conversation">${sceneContent()}</div>
      <footer><b>@AYRES.PETSUPPLY</b><span>AYRESPETSUPPLY.COM</span></footer>
    </div>
  </article>`;
