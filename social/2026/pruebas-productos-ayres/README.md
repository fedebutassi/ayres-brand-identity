# Placas de producto AYRES

Sistema de placas de producto creado con los PNG de `infoproductos/productosimg`, los logos de `media/logos` y los datos de `infoproductos/productos.json`.

## Salidas

- `output/productos`: 71 placas de feed, 1080 × 1350.
- `output/productos-ingredientes`: 71 placas de feed centradas en ingredientes, 1080 × 1350.
- `output/stories`: 71 fichas verticales, 1080 × 1920.
- `output/carrusel`: seis portadas de marcas, 1080 × 1350, preparadas para combinar con las fichas de feed.

## Variantes de portada

- Selección general de cinco marcas.
- Opciones para perros y gatos, con composición dividida.
- Productos organizados por etapa: cachorro, adulto y senior.
- Company, Origen y Voraz con composición editorial.
- Comparación visual de proteína mínima.
- Variante de fichas centrada en los tres ingredientes principales declarados.
- Mosaico de ocho marcas con selección de productos.

## Recursos reutilizados

- Identidad, tipografías y logotipo existentes de AYRES.
- Logos de Fawna, Old Prince, Kongo, Maintenance y Natural Meat para la portada de marcas.
- Imagen exacta de cada envase con fondo transparente.
- Nombre, categoría, composición, ingredientes y presentaciones declarados en `productos.json`.

## Fichas centradas en ingredientes

Generar la serie completa en formato `1080 × 1350`:

```bash
node social/2026/pruebas-productos-ayres/render-ingredients.cjs
```

Para generar solamente productos específicos, pasar sus IDs al final del comando.
Las salidas se guardan en `output/productos-ingredientes/` sin sobrescribir las fichas originales.

## Criterio

- Sin promesas comerciales ni beneficios agregados.
- Los datos destacados provienen de `productos.json`.
- Se indica “proteína mínima” y “primeros ingredientes declarados”.
- La variante de ingredientes omite la comparación nutricional y jerarquiza los tres primeros ingredientes en el orden declarado.
- El pie recomienda verificar siempre el envase.
- Los PNG se amplían sin modificar el diseño ni el texto del envase.
- Cada producto se encuadra dentro de un contenedor seguro, sin salirse de la placa.

## Regeneración

```bash
python3 social/2026/pruebas-productos-ayres/prepare-cutouts.py
node social/2026/pruebas-productos-ayres/render.cjs
node social/2026/pruebas-productos-ayres/render-ingredients.cjs
node social/2026/pruebas-productos-ayres/render-stories.cjs
node social/2026/pruebas-productos-ayres/render-brand-cover.cjs
node social/2026/pruebas-productos-ayres/render-brand-cover-variants.cjs
```

Para regenerar solamente algunos productos, agregar sus IDs:

```bash
python3 social/2026/pruebas-productos-ayres/prepare-cutouts.py fawna-gatito op-pn-lamb-adult-small
node social/2026/pruebas-productos-ayres/render.cjs fawna-gatito op-pn-lamb-adult-small
node social/2026/pruebas-productos-ayres/render-stories.cjs fawna-gatito op-pn-lamb-adult-small
```

Los archivos finales se guardan en carpetas separadas dentro de `output`.
