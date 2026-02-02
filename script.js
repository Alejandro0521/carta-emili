// MÚSICA
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

// Función para actualizar el icono del botón según el estado real
function updateMusicUI() {
    if (!music || !musicBtn) return;
    if (music.paused) {
        musicBtn.innerHTML = '<span>🔇</span> <span class="text-xs font-bold hidden md:inline">Silencio</span>';
    } else {
        musicBtn.innerHTML = '<span>🎵</span> <span class="text-xs font-bold hidden md:inline">Sonando</span>';
    }
}

function toggleMusic() {
    if (!music) return;
    if (music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => updateMusicUI()).catch(err => console.log('Error al reproducir:', err));
        }
    } else {
        music.pause();
        updateMusicUI();
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
    });
}

// CURSOR MÁGICO
function createCursorTrail(x, y) {
    if (Math.random() > 0.3) return;
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    const shapes = ['❤️', '✨', '🌸', '💖'];
    trail.innerText = shapes[Math.floor(Math.random() * shapes.length)];
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    const size = Math.random() * 10 + 10;
    trail.style.fontSize = `${size}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
}
document.addEventListener('mousemove', (e) => createCursorTrail(e.clientX, e.clientY));
document.addEventListener('touchmove', (e) => createCursorTrail(e.touches[0].clientX, e.touches[0].clientY));

// APERTURA DE CARTA
function openLetter() {
    const envelope = document.getElementById('envelope');
    const startScreen = document.getElementById('start-screen');
    const letterContent = document.getElementById('letter-content');

    if (music && music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => updateMusicUI()).catch(error => console.log("Autoplay bloqueado por el navegador:", error));
        }
    }

    if (envelope) envelope.classList.add('open');

    setTimeout(() => {
        if (startScreen) {
            startScreen.style.opacity = '0';
            startScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                startScreen.style.display = 'none';
                if (letterContent) letterContent.classList.add('visible');
                createBurst();
            }, 500);
        }
    }, 800);
}

function closeLetter() {
    const envelope = document.getElementById('envelope');
    const startScreen = document.getElementById('start-screen');
    const letterContent = document.getElementById('letter-content');
    if (letterContent) letterContent.classList.remove('visible');
    setTimeout(() => {
        if (startScreen) {
            startScreen.style.display = 'block';
            void startScreen.offsetWidth;
            startScreen.style.opacity = '1';
            startScreen.style.pointerEvents = 'auto';
        }
        if (envelope) envelope.classList.remove('open');
    }, 500);
}

// PÉTALOS
function createPetal() {
    const container = document.getElementById('petals-container');
    if (!container) return;
    const petal = document.createElement('div');
    const isHeart = Math.random() > 0.7;
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 15 + 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    const colors = ['#ff99ac', '#ffccd5', '#ffb3c1', '#ffc8dd', '#ffafcc', '#ffdf00', '#ff7b00'];
    petal.style.backgroundColor = isHeart ? 'transparent' : colors[Math.floor(Math.random() * colors.length)];
    if (isHeart) {
        petal.innerHTML = '🌸';
        petal.style.fontSize = size + 'px';
        petal.style.border = 'none';
        petal.style.backgroundColor = 'transparent';
    }
    petal.style.animationDuration = Math.random() * 3 + 4 + 's';
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
}

function createBurst() { for(let i = 0; i < 30; i++) setTimeout(createPetal, i * 50); }
setInterval(createPetal, 300);

// FECHA
function setDateDisplay() {
    const dateDisplay = document.getElementById('date-display');
    if (!dateDisplay) return;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('es-ES', options);
    dateDisplay.textContent = today.charAt(0).toUpperCase() + today.slice(1);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setDateDisplay);
} else {
    setDateDisplay();
}

// SLIDESHOW DE FONDO
// Aquí defines EXCLUSIVAMENTE las imágenes que quieres en el carrusel.
// Asegúrate de que los nombres coincidan exactamente con los archivos
// que tienes en la carpeta del proyecto.
const FIXED_BG_IMAGES = [
    '4ta flor.jpeg',
    '5ta flor.jpeg',
    '6ta flor.jpeg',
    'photo_5044308548376005395_y.jpg'
];

function startBackgroundSlideshow(images, interval = 5000) {
    const container = document.getElementById('bg-slideshow');
    if (!container || !images || images.length === 0) return;

    // limpiar
    container.innerHTML = '';

    images.forEach((src, i) => {
        const el = document.createElement('div');
        el.className = 'bg-slide';
        // Entre comillas para permitir espacios en el nombre del archivo
        el.style.backgroundImage = `url("${src}")`;
        if (i === 0) el.classList.add('show');
        container.appendChild(el);
    });

    let idx = 0;
    const slides = container.querySelectorAll('.bg-slide');
    setInterval(() => {
        slides[idx].classList.remove('show');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('show');
    }, interval);
}

async function fetchImagesAndStart() {
    let images = FIXED_BG_IMAGES;

    // Intentar leer la lista desde images.json para que puedas
    // agregar/quitar fotos sin tocar el código.
    try {
        const res = await fetch('images.json', { cache: 'no-store' });
        if (res.ok) {
            const list = await res.json();
            if (Array.isArray(list) && list.length) {
                images = list;
            }
        }
    } catch (e) {
        console.warn('No se pudo cargar images.json, usando lista fija.', e);
    }

    if (images && images.length) {
        startBackgroundSlideshow(images, 6000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchImagesAndStart);
} else {
    fetchImagesAndStart();
}
