const logoPath = (name) => `../../../media/logos/${name}`;
const productPath = (id) => `assets/cutouts-exactos/${id}.png`;

const variants = {
  v02: {
    badge: 'PERROS + GATOS', eyebrow: 'DOS UNIVERSOS · UNA SELECCIÓN',
    title: 'Opciones para<br>perros y gatos', subtitle: 'Explorá productos según especie y etapa.',
    cta: 'Deslizá para conocer cada alternativa',
    logos: ['FAWNA-LOGO2.png', 'KONGO-LOGO-2.png'], labels: ['PERROS', 'GATOS'],
    products: ['fawna-adulto-mediano-grande', 'kongo-adultos-medianos-grandes', 'fawna-gato-adulto', 'kongo-gatos-adultos-carne-pollo'],
  },
  v03: {
    badge: 'GUÍA POR ETAPA', eyebrow: 'CACHORRO · ADULTO · SENIOR',
    title: 'Productos para<br>cada etapa', subtitle: 'Una guía visual para recorrer diferentes momentos.',
    cta: 'Deslizá para ver la información de cada producto',
    logos: ['COMPANY-LOGO.png', 'OLD-PRINCE-LOGO2.png', 'FAWNA-LOGO2.png'], labels: ['CACHORRO', 'ADULTO', 'SENIOR'],
    products: ['company-cachorros', 'op-pn-lamb-adult-small', 'fawna-adulto-senior'],
  },
  v04: {
    badge: 'OTRAS LÍNEAS', eyebrow: 'COMPANY · ORIGEN · VORAZ',
    title: 'Más marcas<br>para conocer', subtitle: 'Distintas presentaciones y composiciones declaradas.',
    cta: 'Conocé cada ficha en las siguientes placas',
    logos: ['COMPANY-LOGO.png', 'ORIGEN-COMPANY-LOGO.png', 'VORAZ-LOGO.webp'], labels: ['PERROS Y GATOS', 'DISTINTAS ETAPAS', 'MÚLTIPLES PRESENTACIONES'],
    products: ['company-gatos-adultos', 'origen-company-perro-adulto', 'voraz-perros-adultos-carne'],
  },
  v05: {
    badge: 'DATOS DEL ENVASE', eyebrow: 'INFORMACIÓN NUTRICIONAL',
    title: 'Mirá la proteína.<br>Compará el resto.', subtitle: 'Cada ficha reúne información declarada del producto.',
    cta: 'Deslizá para comparar las fichas completas',
    stats: ['39%', '32%', '30%'],
    products: ['fawna-gatito', 'op-pn-lamb-adult-small', 'kongo-gatos-adultos-salmon-atun'],
  },
  v06: {
    badge: 'SELECCIÓN AYRES', eyebrow: 'UNA SELECCIÓN · MUCHAS MARCAS',
    title: 'Productos<br>para descubrir', subtitle: 'Conocé marcas, composiciones y presentaciones.',
    cta: 'Deslizá para recorrer la selección',
    logos: ['FAWNA-LOGO2.png', 'OLD-PRINCE-LOGO2.png', 'KONGO-LOGO-2.png', 'COMPANY-LOGO.png', 'MAINTENANCES-LOGO2.png', 'NATURAL-MEAT-LOGO.png', 'ORIGEN-COMPANY-LOGO.png', 'VORAZ-LOGO.webp'],
    products: ['natural-meat-perros-adultos', 'maintenance-criadores-adulto', 'origen-company-gato-adulto'],
  },
};

const variantId = new URLSearchParams(window.location.search).get('variant') || 'v02';
const variant = variants[variantId];
if (!variant) throw new Error(`Variante inexistente: ${variantId}`);

const cover = document.querySelector('#cover');
cover.classList.add(`variant-${variantId}`);
document.querySelector('#badge').textContent = variant.badge;
document.querySelector('#eyebrow').textContent = variant.eyebrow;
document.querySelector('#title').innerHTML = variant.title;
document.querySelector('#subtitle').textContent = variant.subtitle;
document.querySelector('#cta').textContent = variant.cta;

document.querySelector('#logos').innerHTML = (variant.logos || []).map((logo) =>
  `<div class="logo-card"><img src="${logoPath(logo)}" alt=""></div>`
).join('');
document.querySelector('#labels').innerHTML = (variant.labels || []).map((label) =>
  `<span class="label">${label}</span>`
).join('');
document.querySelector('#products').innerHTML = variant.products.map((product, index) =>
  `<img class="pack pack-${index + 1}" src="${productPath(product)}" alt="">`
).join('');
document.querySelector('#stats').innerHTML = (variant.stats || []).map((stat) =>
  `<span class="stat">${stat}</span>`
).join('');
