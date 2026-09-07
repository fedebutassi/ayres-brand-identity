# Carrusel · Gato adulto, esterilizado o urinario

Carrusel educativo de 7 placas para Instagram, diseñado en 1080 × 1350 px. Compara el análisis garantizado declarado de tres productos Fawna sin precios ni afirmaciones de prevención, cura o tratamiento.

## Archivos

- `carousel-data.cjs`: lee y valida los productos, nutrientes y calificadores desde `infoproductos/productos.json`.
- `carousel.html`, `styles.css`, `slides.js`: composición visual de las siete placas.
- `render.cjs`: genera los PNG con Chrome headless.
- `output/`: artes finales.
- `CAPTION.md`: caption y texto alternativo sugeridos.

## Datos utilizados

| Nutriente | Adulto | Esterilizado | Urinario |
|---|---:|---:|---:|
| Proteína (mín.) | 35% | 38% | 35% |
| Grasa / extracto etéreo (mín.) | 12% | 9% | 12% |
| Fibra (máx.) | 3% | 5% | 4% |
| Calcio (mín.–máx.) | 1%–1,2% | 0,7%–1,1% | 0,6%–0,9% |
| Fósforo (mín.–máx.) | 0,6%–1% | 0,5%–0,8% | 0,4%–0,8% |

Fuente de producto: `infoproductos/productos.json`, versión 1.0, actualización declarada 2026-04-16. Los envases se cargan desde `infoproductos/productosimg/`.

## Criterio visual y editorial

Se aplicaron `VOICE_AND_TONE.md`, `COLORS.md`, `TYPOGRAPHY.md` y `VISUAL_STYLE.md`: español argentino, tono claro y neutral, paleta institucional restringida, Raleway para títulos y Poppins para texto. Los archivos de fuente están incluidos localmente para asegurar un render reproducible.

La placa final contiene la advertencia solicitada y evita atribuir efectos médicos a la fórmula urinaria.

## Render

Desde esta carpeta:

```bash
node render.cjs
```

El render valida que existan los tres productos, los cinco nutrientes con sus mínimos/máximos correctos y los tres envases PNG antes de producir las imágenes.
