# Plantilla — Consejo chat AYRES

Genera dos variantes comparables de un consejo vertical de 1080 × 1920 px.
El contenido se mantiene separado de la composición mediante un archivo JSON.

```sh
node render.cjs /ruta/content.json /ruta/frames
# Para regenerar una sola variante: agregá `a` o `b` como tercer argumento.
zsh build-video.sh /ruta/frames /ruta/output slug-descriptivo
# Para construir una sola variante y conservar una revisión anterior:
zsh build-video.sh /ruta/frames /ruta/output slug-descriptivo a -v2
```

Los sonidos son tonos originales sintetizados durante el build. No se usa ni
se distribuye ningún audio propietario de un sistema operativo o aplicación.
