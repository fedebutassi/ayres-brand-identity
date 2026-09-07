# Ingredientes principales — representación visual

Colección de 71 publicaciones de producto en formato Instagram `1080 × 1350`, inspiradas en la pieza `05-premium-fawna-gatito-1080x1350.png`.

## Organización

- Primer nivel: marca.
- Segundo nivel: `Perros` o `Gatos`.
- Nombre de archivo: `ayres-ingredientes-visuales-{producto-id}-1080x1350.png`.

## Contenido de cada publicación

- Fotografía cenital de las fuentes de los tres primeros ingredientes.
- Denominación y orden exactos declarados en `infoproductos/productos.json`.
- Envase real del producto.
- Proteína y extracto etéreo mínimos, y fibra máxima, cuando están declarados.
- Presentaciones disponibles.
- Hasta tres ingredientes adicionales destacados, sin promesas de salud.

## Criterio visual

Los 71 productos forman 21 combinaciones visuales de ingredientes. Las fotografías se reutilizan únicamente cuando las fuentes alimentarias son equivalentes. La forma procesada siempre se conserva en el texto: por ejemplo, la fotografía puede mostrar pollo mientras la declaración indica “harina de pollo”.

Las imágenes no sustituyen la etiqueta ni representan cantidades o proporciones de la fórmula.

## Archivos auxiliares

- `MANIFIESTO.json`: producto, marca, especie, primeros ingredientes, fotografía utilizada y checksum.
- `_recursos/fotografias`: 16 fotografías que cubren 18 escenas visuales distintas.
- `_produccion`: datos, plantilla y renderizador reproducible.

## Regeneración

```bash
node IngredProdVisual/_produccion/render-visual-products.cjs
```

Para regenerar productos específicos, agregar sus IDs al final del comando.
