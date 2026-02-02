Instrucciones rápidas (español):

- Generar la lista de imágenes (crea `images.json`):

```bash
node generate_images_list.js
```

- Servir los archivos estáticos (ejemplo con Python):

```bash
python3 -m http.server 8000
```

- Abrir en el navegador: `http://localhost:8000`

Notas:
- El script detecta `.jpg .jpeg .png .gif .webp` en la carpeta del proyecto.
- Si no quieres usar Node, puedes crear manualmente `images.json` con un array de rutas (por ejemplo `["foto1.jpg","foto2.jpg"]`).
 - Alternativa automática: el slideshow intenta detectar imágenes en la carpeta raíz buscando nombres comunes como `1.jpg`, `image1.jpg`, `IMG_1.jpg`, `photo1.jpg` y sus variantes (hasta 30). Si tus fotos están en la raíz y siguen un patrón numérico o nombres típicos, el slideshow las usará automáticamente sin pasos extra.
 - Si prefieres control total, ejecuta `node generate_images_list.js` para crear `images.json` con todas las imágenes detectadas.
