# Carruseles de productos AYRES

Dos carruseles de feed en formato `1080 × 1350`, ordenados según el pedido. Cada uno incluye una portada y una ficha por marca con imagen del envase, proteína mínima, extracto etéreo, primeros ingredientes declarados y presentaciones.

## Carrusel Premium

1. Portada Premium
2. Fawna — Fawna Gatito — 39% proteína mínima
3. Old Prince — Proteínas Noveles Cordero Adulto Razas Pequeñas — 32%
4. Maintenance — Criadores Gatos Adultos — 28%
5. Natural Meat — Perros Cachorros — 27%
6. Company — Gatitos — 34%
7. Origen by Company — Gatos Adultos — 29%
8. High Pro Criadores — Cordero Cachorros — 28%

## Carrusel Mainstream

1. Portada Mainstream
2. Kongo — Cachorros Todas las Razas — 26% proteína mínima
3. Voraz — Perros Cachorros — 22%
4. Carnix — Perros Adultos — 18%
5. Cereales — Perros Adultos — 14%
6. Caudillo — Perros Adultos — 18%

## Fuentes y criterio

- Datos nutricionales: `infoproductos/productos.json`.
- Imágenes de envases: recursos ya preparados en `social/2026/pruebas-productos-ayres`.
- No se agregaron beneficios ni claims comerciales no declarados.
- Cada ficha recomienda verificar la información en el envase.

## Regenerar portadas

Desde la raíz del repositorio:

```bash
node CarruselesProductos/source/render.cjs
```

Las fichas internas se reutilizan desde las placas de producto ya generadas para conservar su calidad y exactitud.
