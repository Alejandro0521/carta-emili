const fs = require('fs');
const path = require('path');

// Script simple para generar `images.json` con todas las imágenes en el directorio
// Uso: node generate_images_list.js

const exts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const dir = process.cwd();

try {
  const files = fs.readdirSync(dir);
  const images = files.filter(f => exts.has(path.extname(f).toLowerCase()))
                      .map(f => encodeURI(f));

  fs.writeFileSync(path.join(dir, 'images.json'), JSON.stringify(images, null, 2));
  console.log('images.json generado con', images.length, 'imagenes.');
} catch (err) {
  console.error('Error al generar images.json:', err);
  process.exit(1);
}
