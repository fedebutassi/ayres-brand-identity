# Matriz de aprobaciones — AYRES Pet Supply

Actualizada: 8 de agosto de 2026.

## Objetivo

Definir qué rol debe revisar cada tipo de contenido antes de producirlo o publicarlo. Los nombres de las personas responsables todavía no fueron asignados; hasta entonces, la aprobación debe quedar registrada por rol.

## Roles

- **Dueño de la marca / cliente:** posicionamiento, claims institucionales, excepciones sensibles y decisiones finales de marca.
- **Responsable editorial / publicación:** prepara y publica contenido rutinario con autonomía operativa; consulta al dueño de la marca cuando la pieza introduce claims, excepciones o riesgos relevantes.
- **Comercial / operaciones:** cobertura, stock, precios, promociones, rutas, entrega, atención y capacidad operativa.
- **Producto / catálogo:** nombres, presentaciones, ingredientes, análisis garantizados, etiquetas y vigencia del catálogo. Para productos fabricados por BAIRES, contrasta el envase vigente y la ficha oficial del fabricante; el JSON local es un snapshot fechado.
- **Profesional veterinario o nutricional:** condiciones individuales, síntomas, diagnóstico, tratamiento, prevención, dietas especiales, conclusiones clínicas e interpretaciones sensibles de salud o nutrición.
- **Dirección visual:** manual de marca, tipografías, color, logos, composición, accesibilidad y consistencia.
- **Social / contenidos:** formato, calendario, estado, duplicados, CTA, moderación y métricas.

## Matriz

| Tipo de pieza o decisión | Revisión obligatoria | Revisión adicional cuando corresponda | Bloqueo automático |
|---|---|---|---|
| Posicionamiento, propuesta de valor o campaña | Dueño de la marca / cliente | Comercial; social; visual | Objetivo, público o claim crítico sin definir |
| Copy institucional | Dueño de la marca / cliente | Comercial; producto | Cobertura, trayectoria o cifra fuera del registro |
| Precio, promoción, stock o condición comercial | Comercial / operaciones | Dueño de la marca / cliente | Dato sin fecha o vigencia |
| Cobertura, localidad, ruta o entrega | Comercial / operaciones | Dueño de la marca / cliente | Promesa geográfica no confirmada |
| Producto, presentación o ingrediente | Producto / catálogo | Dueño de la marca / cliente | Diferencia entre catálogo y etiqueta vigente |
| Transcripción literal de análisis garantizado | Producto / catálogo | Responsable editorial | Fuente primaria no vigente, mínimo/máximo ausente o diferencia entre fuentes |
| Alfabetización de etiqueta sin recomendación individual ni conclusión clínica | Responsable editorial / publicación y Producto / catálogo | Profesional si el texto deriva efectos de salud, calidad clínica o elección para un animal concreto | Fuente no identificada, dato alterado o salto interpretativo |
| Salud, nutrición sensible o condición médica | Profesional veterinario/nutricional | Producto; dirección / marca | Sin fuente confiable o revisión profesional |
| Certificación, laboratorio o proceso fabril | Dueño de la marca / cliente y titular de la evidencia | Producto; legal/compliance si existe | Fuente primaria, sujeto o vigencia ausentes |
| Pieza visual de marca | Dirección visual | Dueño de la marca si hay excepción | Logo alterado, fuente no aprobada o contraste insuficiente |
| Publicación social rutinaria sin claims sensibles | Responsable editorial / publicación | Social; visual | Estado suspendido, condicionado o duplicado no justificado |
| Campaña o publicación con claim sensible | Dueño de la marca / cliente | Revisores según claim | Claim ausente del registro o revisión requerida incompleta |
| Filmación de personas, clientes o instalaciones | Dueño de la marca / cliente y operaciones | Personas involucradas / autorización de imagen | Permisos o protección de datos no resueltos |
| Respuesta informativa de producto | Producto / catálogo | Profesional si hay condición individual | Se transforma en diagnóstico o prescripción |

## Estados de aprobación

- **Borrador:** se puede revisar; no producir ni publicar como final.
- **En revisión:** asignado a los roles correspondientes.
- **Condicionado:** requiere evidencia, permiso, métrica o decisión concreta.
- **Aprobado para producción:** permite crear la pieza, no publicarla.
- **Aprobado para publicar:** canal, versión y fecha definidos.
- **Publicado:** existe evidencia de publicación.
- **Suspendido:** no avanzar hasta una nueva decisión explícita.
- **Archivado:** se conserva como antecedente; no se reutiliza automáticamente.

## Registro de aprobación

Cada aprobación debe incluir:

- identificador de pieza;
- versión o archivo exacto;
- canal y fecha prevista;
- claims utilizados;
- rol y nombre de quien aprueba;
- fecha de aprobación;
- condiciones o vencimiento;
- evidencia o enlace al registro.

La aprobación se asienta en [`CONTENT-REGISTER.md`](CONTENT-REGISTER.md). No usar mensajes informales ambiguos como sustituto de “aprobado para publicar”.

## Autonomía editorial acordada

El responsable editorial puede publicar contenido rutinario cuando:

- reutiliza mensajes y claims ya aprobados;
- no introduce precios, promociones, cobertura específica ni condiciones nuevas;
- no contiene afirmaciones médicas, nutricionales o fabriles sensibles;
- respeta el manual, la extensión cromática operativa y los estados de producción;
- la pieza no está condicionada, suspendida ni pendiente de un permiso.

Consultar al dueño de la marca cuando aparezca un claim nuevo, una excepción visual, una campaña institucional, una promesa comercial relevante o un riesgo reputacional.

## Escalamiento

- Si dos fuentes competentes difieren, suspender el claim y escalar al dueño de la marca.
- Si el contenido puede influir en una decisión de salud, escalar a revisión profesional.
- La lectura literal de etiqueta y el análisis garantizado no escalan por defecto: escalan cuando se transforman en recomendación individual, diagnóstico, prescripción, promesa de salud o conclusión clínica.
- Si una pieza depende de stock, cobertura o logística, escalar a Comercial / operaciones.
- Si usa una excepción tipográfica, cromática o de logo, escalar a Dirección visual y documentarla.
- Si no existe una persona asignada al rol requerido, mantener el estado condicionado.

## Separación de responsabilidades

- Estrategia define por qué, para quién y con qué objetivo.
- Social define distribución, formato, calendario y conversación.
- Copy define el mensaje y sus versiones.
- Dirección visual define la expresión gráfica y el QA.
- Ninguna disciplina aprueba por sí sola claims que pertenecen a producto, operaciones o salud.
