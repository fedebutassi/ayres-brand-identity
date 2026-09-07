# Tipografía — AYRES Pet Supply

## Fuente de autoridad

La referencia principal es el **Manual de marca AYRES** suministrado por el cliente y revisado el 7 de agosto de 2026. El manual identifica:

- **Florensa Demo Regular** como tipografía principal.
- **Arboria Bold** como tipografía secundaria.

El responsable del proyecto confirmó **Arboria Black** como denominación oficial. Además, el archivo localizado declara internamente `Arboria-Black` como familia y nombre PostScript. Por lo tanto, **Arboria Black** es la secundaria operativa vigente; “Arboria Bold” se conserva como una inconsistencia de nomenclatura del PDF, no como un peso alternativo aprobado.

## Sistema oficial

### Florensa Demo Regular — principal

- **Rol documentado:** tipografía principal del sistema de marca.
- **Peso documentado:** Regular.
- **Uso operativo:** primera opción para composiciones de marca y niveles principales cuando el manual o una pieza aprobada no indiquen otra cosa.
- **Límite:** el manual no define una escala completa de tamaños ni asigna explícitamente cada componente digital.

### Arboria Black — secundaria

- **Rol documentado:** tipografía secundaria del sistema de marca.
- **Denominación confirmada por el responsable y el archivo:** Black.
- **Rótulo inconsistente del manual:** Bold.
- **Uso operativo:** apoyo y contraste dentro de la jerarquía, sin reemplazar automáticamente a Florensa como familia principal.
- **Límite:** verificar licencia, versión y compatibilidad del archivo antes de preparar entregables finales o implementaciones web.

## Jerarquía de uso

Hasta que exista una especificación tipográfica más detallada:

1. Usar Florensa Demo Regular como familia principal.
2. Usar Arboria como familia secundaria de apoyo.
3. No inventar pesos, cursivas o variantes que no estén disponibles o aprobadas.
4. No deformar, condensar ni expandir caracteres para imitar otro peso.
5. Verificar legibilidad, contraste, espaciado y tamaño en el formato real.
6. Si una aplicación requiere texto extenso o una interfaz y las fuentes oficiales no ofrecen legibilidad o cobertura suficiente, solicitar una excepción antes de elegir una fuente auxiliar.

## Raleway y Poppins

Raleway y Poppins aparecen en implementaciones y piezas de producción del proyecto, pero **no son tipografías oficiales del manual de marca**.

- Preservar los materiales existentes que las utilicen.
- No regenerar ni sobrescribir piezas históricas por iniciativa propia.
- No emplearlas en piezas nuevas salvo excepción explícita y documentada.
- No mezclar el sistema Florensa/Arboria con Raleway/Poppins dentro de una misma pieza sin aprobación visual.

## Logotipo

El logotipo debe utilizarse como arte aprobado desde [`assets/`](assets/); no debe reconstruirse escribiendo “AYRES” con ninguna fuente instalada. Respetar las versiones, proporciones y área de seguridad descritas en [`LOGO.md`](LOGO.md) y en el manual original.

## Fuentes disponibles en materiales históricos

Se localizaron archivos de fuente dentro de una pieza histórica:

- [`Florensa-Demo.ttf`](social/carrusel-14-gastritis-gatos/assets/Florensa-Demo.ttf)
- [`Arboria-Black.ttf`](social/carrusel-14-gastritis-gatos/assets/Arboria-Black.ttf)

Su presencia permite reproducibilidad técnica, pero no demuestra por sí sola licencia, versión, peso interno ni autorización para redistribuirlos. No moverlos ni tratarlos como repositorio maestro sin una decisión expresa.

## Control final

- Confirmar que Florensa Demo Regular es la principal y Arboria Black la secundaria.
- No sustituir Arboria Black por Arboria Bold basándose sólo en el rótulo del PDF.
- Evitar sustituciones silenciosas.
- Comprobar acentos, eñes, números y signos necesarios en español.
- Revisar legibilidad en tamaño real y miniatura.
- Preservar originales y crear variantes sólo con autorización.
