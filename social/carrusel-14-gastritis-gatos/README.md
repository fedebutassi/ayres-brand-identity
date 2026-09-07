# Carrusel 14 — Gastritis en gatos

Carrusel social de siete placas en formato Instagram 4:5 (`1080 × 1350 px`).

Tipografía principal: **Florensa Demo**. Tipografía secundaria para etiquetas,
numeración y acentos: **Arboria Black**.

## Estructura

- `carousel.html`: documento de render.
- `slides.js`: contenido y composición de las siete placas.
- `styles/`: sistema visual del carrusel.
- `assets/`: logo, tipografía y fotografías fuente.
- `output/`: PNG finales.
- `preview.cjs`: genera una vista general de control de las siete placas.

## Render local

El render usa Playwright. Desde esta carpeta:

```sh
NODE_PATH=/ruta/a/node_modules node render.cjs
```

Los archivos existentes de `output/` se reemplazan al volver a renderizar.
