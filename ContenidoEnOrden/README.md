# Contenido en orden — AYRES 2026

Biblioteca paralela del contenido generado en `marketing-2026`.

Los archivos originales permanecen en sus ubicaciones anteriores. Esta carpeta contiene copias verificadas y organizadas para búsqueda, publicación y futuras ediciones.

## Resumen

- **23 piezas finales** listas para Instagram.
- **8 recursos visuales generados**: fondos lifestyle y fotografías de ingredientes.
- **6 documentos** con captions, prompts, estrategia e ideas.
- **19 fuentes editables**: HTML, CSS, JavaScript, JSON y scripts de renderizado.
- **56 archivos copiados y verificados** en total.

## Estructura

### `01-Piezas-Finales`

- `AYRES-Institucional`: comunidad, educación, asesoramiento y contenido B2B.
- `Catalogo-Multimarca`: publicaciones e historias de descubrimiento de catálogo.
- `Productos/Comparativas`: ordenadas por combinación de marcas y especie.
- `Productos/Individuales`: ordenadas por marca, especie y enfoque educativo.

### `02-Recursos-Visuales`

- Fondos lifestyle de la campaña institucional.
- Fotografías generadas de ingredientes, separadas por comparativa, marca y producto.

### `03-Textos-y-Planificacion`

- Captions y estrategia de la campaña general.
- Prompts e ideas para la serie de ingredientes.

### `04-Fuentes-Editables`

- Plantillas, estilos, datos y scripts necesarios para modificar o regenerar las piezas.

### `00-INDICE`

- `MANIFIESTO.json`: ruta original, ruta de la copia, etiquetas y checksum SHA-256 de cada archivo.
- `organizar-contenido.cjs`: organizador reproducible para incorporar cambios futuros desde `marketing-2026`.

## Actualización

Después de modificar o generar contenido nuevo en `marketing-2026`, primero se debe agregar su clasificación al organizador y luego ejecutar:

```bash
node ContenidoEnOrden/00-INDICE/organizar-contenido.cjs
```

El proceso actualiza las copias sin borrar los originales ni eliminar contenido de esta biblioteca.
