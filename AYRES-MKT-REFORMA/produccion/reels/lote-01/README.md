# Reels — lote 01

Primer lote audiovisual de la reforma de contenidos de AYRES.

## Piezas terminadas

| ID | Tema | Archivo final |
|---|---|---|
| Reel 01 | ¿Más proteína significa mejor alimento? | `01-mas-proteina-significa-mejor/01-mas-proteina-significa-mejor-1080x1920.mp4` |
| Reel 02 | Mismo 28%, distinta fórmula | `02-mismo-28-distinta-formula/02-mismo-28-distinta-formula-1080x1920.mp4` |
| Reel 06 | ¿Qué significa proteína mínima? | `06-que-significa-proteina-minima/06-que-significa-proteina-minima-1080x1920.mp4` |
| Reel 08 | Cómo ordenar el sector cachorros | `08-categorias-sector-cachorros/08-categorias-sector-cachorros-1080x1920.mp4` |

Cada carpeta también contiene cinco escenas PNG finales en `frames/` y cinco estados de entrada en `motion/`.

## Especificaciones

- Formato final: MP4 vertical, 1080 × 1920 px.
- Duración: 17,5 segundos por Reel.
- Video: H.264.
- Audio: AAC con una identidad sonora original y discreta.
- Zona segura reforzada: 210 px superiores y 350 px inferiores, con títulos, envases, textos y CTA alejados de los controles de Instagram.
- Movimiento: entrada breve de 0,45 segundos para textos, productos y tarjetas, seguida por una placa estática.
- Transiciones: fundidos cortos entre escenas, sin acercamientos ni alejamientos.
- Tipografías sociales de AYRES: Florensa para titulares y texto editorial; Arboria Black para etiquetas, cifras, tarjetas y llamados a la acción. El render espera la carga efectiva de ambas fuentes antes de capturar.
- Contraste: tarjetas claras con texto oscuro fijo, incluso sobre escenas de fondo oscuro.
- Datos: extraídos de `infoproductos/productos.json`.
- Envases: recursos reales de `infoproductos/productosimg` y recortes existentes del proyecto.

## Sistema editable

Los archivos fuente se encuentran en:

`AYRES-MKT-REFORMA/source/reels-lote-01/`

El contenido de todas las piezas está centralizado en `content.cjs`. Para volver a generar las escenas:

```bash
node AYRES-MKT-REFORMA/source/reels-lote-01/render.cjs
```

Para reconstruir los cuatro videos a partir de las escenas:

```bash
bash AYRES-MKT-REFORMA/source/reels-lote-01/build-videos.sh
```

## Publicación

- Usar los textos sugeridos en `CAPTIONS.md`.
- El audio incluido permite publicar las piezas completas; también puede reemplazarse por música en tendencia desde Instagram sin modificar la edición visual.
- En Reel 08, el CTA operativo propuesto es recibir la palabra `CATÁLOGO` por mensaje directo.
- Verificar el envase vigente antes de publicar si el fabricante actualiza una fórmula.

## Alcance del lote

Los Reels 10, 11 y 12 continúan en espera, tal como se definió en el plan maestro. No se produjo ni se asumió disponibilidad de personas, instalaciones o procesos internos para esas piezas.
