const logo = '<img class="logo" src="./assets/logo-white.svg" alt="AYRES Pet Supply" />';
const progress = (current) => `<div class="progress"><strong>${String(current).padStart(2, "0")}</strong> / 05</div>`;

const lineIcon = (kind) => {
  const paths = {
    stomach: '<path d="M22 12v16c0 4 3 7 7 7h3c3 0 5 2 5 5v8c0 8 6 14 14 14 10 0 18-8 18-18v-8c0-6-5-11-11-11h-8c-5 0-9-4-9-9v-4"/><path d="M22 28c-7 0-12-5-12-12"/>',
    vomit: '<path d="M17 24c3-8 10-12 19-12 12 0 22 9 22 21 0 8-4 14-10 18"/><path d="M18 46c5-5 13-6 18-1M16 55h34M24 61h18"/>',
    bowl: '<path d="M10 34h52l-7 20H17z"/><path d="M19 20c5-5 10-5 15 0s10 5 15 0"/>',
    sleep: '<path d="M14 47c8-17 29-23 44-12 6 4 9 10 10 17H14z"/><path d="M47 14h13L48 27h14"/>',
    pain: '<path d="M35 10c14 0 25 11 25 25S49 60 35 60 10 49 10 35 21 10 35 10z"/><path d="M25 25l20 20M45 25L25 45"/>',
  };
  return `<svg viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind]}</svg>`;
};

const slides = [
  `<article class="slide cover">
    <img class="photo" src="./assets/cat-sick.jpg" alt="Gatito con expresión decaída" />
    ${logo}
    <div class="cover-copy">
      <div class="eyebrow">SALUD FELINA</div>
      <h1>Tu gato vomita seguido y perdió el apetito.</h1>
      <p class="subtitle">Podría ser gastritis 🐱🤢</p>
    </div>
    <div class="cover-swipe">DESLIZÁ <span>→</span></div>
  </article>`,

  `<article class="slide light-surface">
    ${logo}${progress(1)}
    <section class="definition-content">
      <div class="icon-circle">${lineIcon("stomach")}</div>
      <div class="eyebrow">ENTENDÉ QUÉ PASA</div>
      <h2>¿Qué es la gastritis felina?</h2>
      <p class="lead">Es una inflamación del estómago del gato.</p>
      <p class="detail">En la mayoría de los casos está relacionada con la alimentación.</p>
      <div class="definition-types">
        <div class="definition-type"><strong>Aguda</strong><span>Un episodio puntual.</span></div>
        <div class="definition-type"><strong>Crónica</strong><span>Se repite con frecuencia.</span></div>
      </div>
    </section>
  </article>`,

  `<article class="slide dark-surface">
    ${logo}${progress(2)}
    <section class="symptoms-content">
      <div class="eyebrow">SEÑALES DE ALERTA</div>
      <h2>Síntomas a reconocer</h2>
      <div class="symptom-grid">
        <div class="symptom">${lineIcon("vomit")}<strong>Vómitos frecuentes</strong><span>A veces pueden aparecer con bilis amarilla.</span></div>
        <div class="symptom">${lineIcon("bowl")}<strong>Pérdida de apetito</strong><span>Come mucho menos o directamente evita el alimento.</span></div>
        <div class="symptom">${lineIcon("sleep")}<strong>Decaimiento</strong><span>Se muestra con poca energía o letargo.</span></div>
        <div class="symptom">${lineIcon("pain")}<strong>Dolor abdominal</strong><span>Evita que lo toquen en la panza.</span></div>
      </div>
      <p class="symptoms-note">Si los síntomas se repiten, consultá con su veterinario.</p>
    </section>
  </article>`,

  `<article class="slide light-surface">
    ${logo}${progress(3)}
    <section class="causes-content">
      <div class="eyebrow">CAUSAS MÁS COMUNES</div>
      <h2>¿Qué la provoca?</h2>
      <p class="intro">Distintos factores pueden irritar su estómago:</p>
      <ul class="dash-list">
        <li><strong>Cambio brusco</strong> de alimento.</li>
        <li>Ingestión de <strong>plantas, objetos o comida inapropiada.</strong></li>
        <li>Uso prolongado de ciertos <strong>medicamentos.</strong></li>
        <li>Enfermedades subyacentes como <strong>insuficiencia renal o pancreatitis.</strong></li>
      </ul>
      <div class="cause-highlight"><strong>También importa:</strong> la obesidad es un factor de riesgo.</div>
    </section>
  </article>`,

  `<article class="slide treatment">
    <img class="photo" src="./assets/cat-vet.jpg" alt="Gato durante una consulta de control" />
    ${logo}${progress(4)}
    <section class="treatment-copy">
      <div class="eyebrow">CUIDADO PROFESIONAL</div>
      <h2>Diagnóstico y tratamiento</h2>
      <p><strong>Solo el veterinario</strong> puede diagnosticarla correctamente.</p>
      <p>El tratamiento varía según la causa: puede incluir medicación, cambio de dieta o ambas.</p>
      <p class="alert">El seguimiento regular es fundamental para que tu gato se recupere bien.</p>
    </section>
  </article>`,

  `<article class="slide prevention">
    <img class="photo" src="./assets/cat-bowl.jpg" alt="Gato junto a su espacio de alimentación" />
    ${logo}${progress(5)}
    <section class="prevention-copy">
      <div class="eyebrow">HÁBITOS SALUDABLES</div>
      <h2>Cómo prevenirla</h2>
      <p class="intro">Hábitos que protegen el estómago de tu michi:</p>
      <ul class="dash-list">
        <li>Mantené una <strong>dieta estable y de calidad.</strong></li>
        <li>Hacé los cambios de alimento <strong>de forma gradual</strong>, nunca de un día para el otro.</li>
        <li>No le des <strong>comida de personas ni plantas de interior.</strong></li>
      </ul>
    </section>
  </article>`,

  `<article class="slide cta dark-surface">
    <section class="center">
      <img class="logo-center" src="./assets/logo-white.svg" alt="AYRES Pet Supply" />
      <div class="divider"></div>
      <h2>La alimentación correcta previene muchas enfermedades digestivas. <span class="paw">🐾</span></h2>
      <p class="save">Guardá este post si tu gato tiene el estómago sensible.</p>
      <p class="question">💬 ¿Tu gato tuvo gastritis alguna vez?<br />¿Cómo lo manejaron?</p>
      <div class="socials">
        <span class="pill">@ayres.petsupply</span>
        <span class="pill primary">ayrespetsupply.com</span>
      </div>
    </section>
  </article>`,
];

const requested = Number(new URLSearchParams(window.location.search).get("slide") || 1);
document.querySelector("#app").innerHTML = slides[Math.min(Math.max(requested, 1), slides.length) - 1];
