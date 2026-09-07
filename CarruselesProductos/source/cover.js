const productBase = '../../social/2026/pruebas-productos-ayres/assets/cutouts-exactos';

const carousels = {
  premium: {
    badge: 'CARRUSEL · 8 PLACAS',
    eyebrow: 'SELECCIÓN AYRES · PREMIUM',
    title: 'Marcas premium<br>para conocer',
    subtitle: 'Proteína mínima, ingredientes y presentaciones declaradas.',
    cta: 'Deslizá para ver una ficha por marca',
    brands: [
      'FAWNA',
      'OLD PRINCE',
      'MAINTENANCE',
      'NATURAL MEAT',
      'COMPANY',
      'ORIGEN BY COMPANY',
      'HIGH PRO CRIADORES',
    ],
    products: [
      { id: 'fawna-gatito', protein: '39%' },
      { id: 'op-pn-lamb-adult-small', protein: '32%' },
      { id: 'company-gatitos', protein: '34%' },
    ],
  },
  mainstream: {
    badge: 'CARRUSEL · 6 PLACAS',
    eyebrow: 'SELECCIÓN AYRES · MAINSTREAM',
    title: 'Opciones de todos<br>los días',
    subtitle: 'Compará composición, ingredientes y presentaciones.',
    cta: 'Deslizá para ver una ficha por marca',
    brands: ['KONGO', 'VORAZ', 'CARNIX', 'CEREALES', 'CAUDILLO'],
    products: [
      { id: 'kongo-cachorros-todas-razas', protein: '26%' },
      { id: 'voraz-perros-cachorros', protein: '22%' },
      { id: 'carnix-perros-adultos', protein: '18%' },
    ],
  },
};

const params = new URLSearchParams(window.location.search);
const carouselId = params.get('carousel') || 'premium';
const carousel = carousels[carouselId];

if (!carousel) throw new Error(`Carrusel inexistente: ${carouselId}`);

const cover = document.querySelector('#cover');
cover.classList.add(`cover-${carouselId}`);
document.querySelector('#badge').textContent = carousel.badge;
document.querySelector('#eyebrow').textContent = carousel.eyebrow;
document.querySelector('#title').innerHTML = carousel.title;
document.querySelector('#subtitle').textContent = carousel.subtitle;
document.querySelector('#cta').textContent = carousel.cta;

document.querySelector('#brands').innerHTML = carousel.brands
  .map((brand, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${brand}</span>`)
  .join('');

document.querySelector('#products').innerHTML = carousel.products
  .map(({ id, protein }, index) => `
    <div class="product product-${index + 1}">
      <em>${protein}<small>PROTEÍNA MÍN.</small></em>
      <img src="${productBase}/${id}.png" alt="">
    </div>`)
  .join('');
