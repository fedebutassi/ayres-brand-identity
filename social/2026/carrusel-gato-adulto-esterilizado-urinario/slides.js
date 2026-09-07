const encodedPayload = new URLSearchParams(location.search).get('payload');
const payloadBytes = Uint8Array.from(atob(encodedPayload), (character) => character.charCodeAt(0));
const payload = JSON.parse(new TextDecoder('utf-8').decode(payloadBytes));
const current = Number(new URLSearchParams(location.search).get('slide') || 1);
const { products } = payload;

const value = (product, key, qualifier) => product.values[key][qualifier];
const range = (product, key) => `${value(product, key, 'minimo')}–${value(product, key, 'maximo')}`;
const packs = (className = '') => `<div class="packs ${className}">${products.map((p) => `
  <figure class="pack"><img src="${p.image}" alt="Envase ${p.name}"><figcaption>${p.label}</figcaption></figure>`).join('')}</div>`;
const chips = () => `<div class="formula-chips">${products.map((p) => `<span>${p.label}</span>`).join('')}</div>`;
const shell = (content, options = {}) => `
  <section class="canvas ${options.dark ? 'dark' : ''}">
    <header><img class="logo" src="${options.dark ? payload.logoDark : payload.logoLight}" alt="AYRES"><span>${String(current).padStart(2, '0')} / 07</span></header>
    ${content}
    <footer><span>AYRES PET SUPPLY</span><span>CONTENIDO PARA ELEGIR CON INFORMACIÓN</span></footer>
  </section>`;

const slides = {
  1: () => shell(`
    <div class="cover-copy">
      <p class="eyebrow">GUÍA COMPARATIVA · GATOS</p>
      <h1>Gato adulto,<br>esterilizado o urinario:<br><em>¿qué cambia en la fórmula?</em></h1>
      <p class="lead">Tres perfiles. Cinco datos declarados para comparar.</p>
    </div>
    ${packs('cover-packs')}
    <div class="swipe">DESLIZÁ <b>→</b></div>
  `, { dark: true }),

  2: () => shell(`
    <div class="title-block">
      <p class="eyebrow">PUNTO DE PARTIDA</p>
      <h2>La base declarada<br><em>se parece.</em></h2>
      <p class="lead">Los tres productos comparten sus primeros tres ingredientes declarados.</p>
    </div>
    <div class="ingredient-grid">${payload.sharedIngredients.map((item, i) => `
      <article><span>0${i + 1}</span><h3>${item}</h3></article>`).join('')}</div>
    ${chips()}
    <p class="micro-note">Misma especie y etapa adulta. Distinto perfil garantizado.</p>
  `),

  3: () => shell(`
    <div class="title-block compact">
      <p class="eyebrow">ANÁLISIS GARANTIZADO</p>
      <h2>Proteína y grasa:<br><em>los mínimos.</em></h2>
    </div>
    <div class="metric-board">
      <div class="metric-label"><h3>Proteína</h3><span>MÍNIMO</span></div>
      <div class="metric-values">${products.map((p) => `<article><small>${p.label}</small><strong>${value(p, 'protein', 'minimo')}</strong><b>MÍN.</b></article>`).join('')}</div>
      <div class="metric-label second"><h3>Grasa</h3><span>EXTRACTO ETÉREO · MÍNIMO</span></div>
      <div class="metric-values">${products.map((p) => `<article><small>${p.label}</small><strong>${value(p, 'fat', 'minimo')}</strong><b>MÍN.</b></article>`).join('')}</div>
    </div>
    <p class="info-box">Son valores mínimos garantizados, no cantidades exactas.</p>
  `),

  4: () => shell(`
    <div class="title-block">
      <p class="eyebrow">ANÁLISIS GARANTIZADO</p>
      <h2>La fibra máxima<br><em>también cambia.</em></h2>
      <p class="lead">Acá se declara un límite máximo, no una cantidad exacta.</p>
    </div>
    <div class="hero-metrics">${products.map((p) => `<article>
      <div class="mini-pack"><img src="${p.image}" alt="Envase ${p.name}"></div>
      <h3>${p.label}</h3><strong>${value(p, 'fiber', 'maximo')}</strong><span>FIBRA · MÁX.</span>
    </article>`).join('')}</div>
    <p class="micro-note">Comparar el número requiere mirar también si es mínimo o máximo.</p>
  `),

  5: () => shell(`
    <div class="title-block compact">
      <p class="eyebrow">MINERALES DECLARADOS</p>
      <h2>Calcio y fósforo:<br><em>rangos mínimos–máximos.</em></h2>
    </div>
    <div class="mineral-grid">
      <div class="mineral-head"><span>FÓRMULA</span><span>CALCIO</span><span>FÓSFORO</span></div>
      ${products.map((p) => `<article><h3>${p.label}</h3><strong>${range(p, 'calcium')}</strong><strong>${range(p, 'phosphorus')}</strong></article>`).join('')}
    </div>
    <div class="range-key"><span>MÍN.</span><i></i><span>MÁX.</span></div>
    <p class="info-box">Cada rango muestra el mínimo y el máximo garantizados.</p>
  `),

  6: () => shell(`
    <div class="title-block table-title">
      <p class="eyebrow">TODO EN UNA MIRADA</p>
      <h2>Tabla comparativa</h2>
    </div>
    <div class="comparison-table">
      <div class="th">NUTRIENTE</div>${products.map((p) => `<div class="th product">${p.label}</div>`).join('')}
      <div class="row-label">Proteína <span>MÍN.</span></div>${products.map((p) => `<div>${value(p, 'protein', 'minimo')}</div>`).join('')}
      <div class="row-label">Grasa <span>MÍN.</span></div>${products.map((p) => `<div>${value(p, 'fat', 'minimo')}</div>`).join('')}
      <div class="row-label">Fibra <span>MÁX.</span></div>${products.map((p) => `<div>${value(p, 'fiber', 'maximo')}</div>`).join('')}
      <div class="row-label">Calcio <span>MÍN.–MÁX.</span></div>${products.map((p) => `<div class="range">${range(p, 'calcium')}</div>`).join('')}
      <div class="row-label">Fósforo <span>MÍN.–MÁX.</span></div>${products.map((p) => `<div class="range">${range(p, 'phosphorus')}</div>`).join('')}
    </div>
    <p class="table-note">Comparación del análisis garantizado declarado. No expresa cantidades exactas consumidas.</p>
  `, { dark: true }),

  7: () => shell(`
    <div class="closing-copy">
      <p class="eyebrow">UNA ELECCIÓN INDIVIDUAL</p>
      <h2>La fórmula correcta<br><em>depende del gato.</em></h2>
      <div class="vet-note">Los alimentos con objetivos específicos deben elegirse según la condición del gato y la recomendación veterinaria.</div>
      <p class="disclaimer">Esta comparación no reemplaza una evaluación profesional.</p>
    </div>
    <div class="cta-block">
      <span>DISTRIBUCIÓN MAYORISTA AYRES</span>
      <h3>¿Tenés pet shop<br>o veterinaria?</h3>
      <p>Sumá opciones para distintas necesidades con catálogo y acompañamiento comercial.</p>
      <b>QUIERO SER PARTE DEL EQUIPO AYRES →</b>
    </div>
  `, { dark: true }),
};

document.getElementById('slide').innerHTML = (slides[current] || slides[1])();
