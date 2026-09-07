# Colección de carruseles de productos AYRES

Cada carrusel contiene una portada, cuatro fichas de producto y una placa final CTA en formato `1080 × 1350`.

1. Gatos con alta proteína declarada.
2. Opciones para cachorros.
3. Adultos de razas pequeñas.
4. Cuatro alternativas para gatos adultos.
5. Distintas fórmulas para perros adultos.
6. Proteínas seleccionadas.
7. Formatos grandes para comparar.
8. Selección Mainstream.
9. Premium vs. Mainstream — perros adultos: 2 productos de cada línea.
10. Premium vs. Mainstream — gatos adultos: 2 productos de cada línea.
11. Perros con alta proteína declarada: cuatro fórmulas de crecimiento de distintas marcas.

Las cifras, ingredientes y presentaciones provienen de `infoproductos/productos.json`. Las fichas recomiendan verificar siempre la información en el envase.

La sexta placa dirige a `ayrespetsupply.com` e invita a usar el chatbot AYRES para recibir orientación de compra minorista.

## Regeneración

```bash
node CarruselesProductos/source/coleccion/build.cjs
```

Para regenerar únicamente un carrusel:

```bash
node CarruselesProductos/source/coleccion/build.cjs 11-perros-alta-proteina
```

## Stories de alta proteína

Los carruseles 01 y 11 incluyen una story de presentación y una story CTA en
formato `1080 × 1920`.

```bash
node CarruselesProductos/source/historias-gatos-alta-proteina/render.cjs
node CarruselesProductos/source/historias-perros-alta-proteina/render.cjs
```
