# Marketing AYRES 2026

Campaña visual para atraer nuevos seguidores, generar interacción y convertir interés en consultas B2C y oportunidades B2B para AYRES Pet Supply.

## Entregables

- `output/feed/`: 9 publicaciones verticales de `1080 × 1350`.
- `output/stories/`: 6 historias de `1080 × 1920`.
- `assets/generated/`: 3 fondos lifestyle originales creados para la campaña.
- `CAPTIONS.md`: copies, CTAs, hashtags y texto alternativo sugerido.
- `PROMPTS.md`: prompts utilizados para los fondos generados.
- `campaign.json`: contenido y objetivo de cada creatividad.
- `campaign.html`, `campaign.css`, `campaign.js`: sistema visual editable.
- `render.cjs`: generador de las piezas finales.

## Estrategia

La campaña combina cuatro funciones:

1. **Alcance:** emoción, mascotas con personalidad y mensajes fáciles de compartir.
2. **Interacción:** preguntas simples y llamados explícitos a comentar o responder.
3. **Confianza:** educación sobre etapa, tamaño, necesidades e ingredientes declarados.
4. **Conversión:** catálogo, asesoramiento, contacto directo y captación de comercios.

No todas las publicaciones venden. Primero construyen identificación y utilidad; después presentan AYRES como la cuenta que ayuda a comparar y elegir.

## Orden sugerido de publicación

### Semana 1 · Identificación y comunidad

- Lunes: `01-familia-que-espera`
- Miércoles: `02-quien-manda-en-casa`
- Viernes: `03-no-mires-solo-el-frente`
- Historias de apoyo: `10-story-segui-a-quienes-cuidan`, `11-story-equipo-perro-gato`, `12-story-tres-ingredientes`

### Semana 2 · Utilidad y descubrimiento

- Martes: `04-elegir-empieza-antes`
- Jueves: `05-setenta-y-una-opciones`
- Historia de apoyo: `13-story-descubri-catalogo`

### Semana 3 · Autoridad y conversación

- Martes: `06-comparar-tambien-es-cuidar`
- Viernes: `09-no-adivines`
- Historia de apoyo: `15-story-contanos-y-comparamos`

### Semana 4 · Captación comercial

- Martes: `07-pet-shop-mejores-razones`
- Jueves: `08-cordoba-nos-une`
- Historia de apoyo: `14-story-suma-ayres-negocio`

## Métricas principales

- Alcance: cuentas no seguidoras alcanzadas y visitas al perfil.
- Interacción: comentarios, respuestas a historias y compartidos.
- Utilidad: guardados en las piezas 03, 04 y 06.
- Conversión B2C: mensajes directos y clics hacia el sitio.
- Conversión B2B: consultas de pet shops, veterinarias y distribuidoras.

Comparar cada pieza contra el promedio de las últimas 10 publicaciones de la cuenta. Mantener los conceptos que superen el promedio de compartidos, guardados o consultas y producir nuevas variaciones del mismo ángulo.

## Regeneración

```bash
node marketing-2026/render.cjs
```

Para regenerar solamente algunas piezas:

```bash
node marketing-2026/render.cjs 01-familia-que-espera 09-no-adivines
```

Las piezas existentes se regeneran en su misma ubicación. Los productos, ingredientes y envases se obtienen de los activos y datos existentes del proyecto.
