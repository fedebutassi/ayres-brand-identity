# Carrusel Marcas AYRES

Carrusel institucional de 7 placas para Instagram.

- Formato: PNG 1080 x 1350 px.
- Tema: marcas disponibles en el catálogo AYRES.
- Cantidad de marcas: 12, verificadas contra `infoproductos/productos.json`.
- Tipografías: Florensa y Arboria.
- Envases: recortes PNG con fondo transparente.
- CTA: `CATÁLOGO + tu localidad`.
- Sin precios.

## Archivos

- `carousel.html`: documento base.
- `carousel.js`: contenido y estructura de las placas.
- `styles.css`: diseño y tipografías.
- `render.cjs`: renderizador.
- `CAPTION.md`: texto sugerido para la publicación.
- `output/`: placas PNG finales.
- `stories/`: adaptación vertical de las siete placas, 1080 x 1920 px.
- `reel/frames/`: cuadros verticales utilizados para el video.
- `reel/marcas-ayres-reel-1080x1920.mp4`: Reel de 20,3 segundos con transiciones suaves.

## Renderizar nuevamente

```bash
node MarcasAyres/render.cjs
```

## Renderizar Stories y Reel

```bash
node MarcasAyres/render-vertical.cjs
```
