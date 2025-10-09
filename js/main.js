// Función para toggle del menú móvil
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
}

// Cerrar menú móvil al hacer scroll
window.addEventListener('scroll', function() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav && mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
  }
});

// Efecto de transición del header al hacer scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  // Cambiar el fondo del header después de 50px de scroll
  if (scrollPosition > 50) {
    header.style.background = 'rgba(0,0,0,.85)';
  } else {
    header.style.background = 'rgba(0,0,0,1)';
  }
});

// Efecto de transición del hero al hacer scroll
window.addEventListener('scroll', function() {
  const heroBackground = document.querySelector('.hero-background');
  const heroOverlay = document.querySelector('.hero-overlay');
  const heroLogoOverlay = document.querySelector('.hero-logo-overlay');
  const heroInner = document.querySelector('.hero-inner');
  
  if (heroBackground && heroOverlay && heroLogoOverlay && heroInner) {
    const scrollPosition = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Calcular la opacidad basada en el scroll
    const fadeProgress = Math.min(1, scrollPosition / (heroHeight * 0.5));
    
    // Detectar si es móvil o tablet
    const isMobileOrTablet = window.innerWidth <= 980;
    
    // La imagen hero y el degradado desaparecen juntos
    heroBackground.style.opacity = 1 - fadeProgress;
    heroOverlay.style.opacity = 1 - fadeProgress;
    
    // En móvil/tablet, logo Y título desaparecen juntos
    if (isMobileOrTablet) {
      // El logo empieza visible y desaparece al hacer scroll
      heroLogoOverlay.style.opacity = 1 - fadeProgress;
      // El título TAMBIÉN desaparece al hacer scroll (igual que el logo)
      heroInner.querySelector('h1').style.opacity = 1 - fadeProgress;
    } else {
      // En desktop, el logo aparece gradualmente
      heroLogoOverlay.style.opacity = fadeProgress;
      
      // En desktop, mantener la opacidad del título en 1
      heroInner.querySelector('h1').style.opacity = 1;
      
      // Mover el título hacia abajo para que quede debajo del logo
      const titleOffset = 250 * fadeProgress; // Se mueve 250px hacia abajo
      heroInner.style.transform = `translateY(calc(-50% + ${titleOffset}px))`;
      
      // Reducir el tamaño del título gradualmente
      const fontSize = 5 - (2 * fadeProgress); // De 5rem a 3rem
      heroInner.querySelector('h1').style.fontSize = `${fontSize}rem`;
    }
  }
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const msg = document.getElementById('msg').value.trim();
  
  if (!msg) {
    alert('Por favor escribe un mensaje.');
    return;
  }
  
  // Construir el mensaje para WhatsApp
  const message = msg;
  
  // Número de WhatsApp del estudio (número de prueba)
  const whatsappNumber = '50768263176'; // Formato: código de país + número sin espacios ni símbolos
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Abrir WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  
  // Limpiar el formulario
  this.reset();
});

// Galería Carrusel
const totalImages = 8;

// Inicializar los puntos indicadores
function initDots() {
  const dotsContainer = document.getElementById('galleryDots');
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => scrollToImage(i);
    dotsContainer.appendChild(dot);
  }
}

// Actualizar puntos activos basado en el scroll
function updateDots() {
  const gallery = document.querySelector('.gallery-scroll');
  const scrollLeft = gallery.scrollLeft;
  const itemWidth = 125; // 250px / 2 por el overlap
  const currentIndex = Math.round(scrollLeft / itemWidth);
  
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Scroll a una imagen específica
function scrollToImage(index) {
  const gallery = document.querySelector('.gallery-scroll');
  const itemWidth = 125; // 250px / 2 por el overlap
  gallery.scrollTo({
    left: index * itemWidth,
    behavior: 'smooth'
  });
}

function scrollGallery(direction) {
  const gallery = document.querySelector('.gallery-scroll');
  const itemWidth = 125; // 250px / 2 por el overlap
  gallery.scrollBy({
    left: direction * itemWidth,
    behavior: 'smooth'
  });
  setTimeout(updateDots, 300);
}

// Listener para actualizar dots al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  initDots();
  const gallery = document.querySelector('.gallery-scroll');
  if (gallery) {
    gallery.addEventListener('scroll', updateDots);
  }
});

// Lightbox para ver imágenes completas
let currentImageIndex = 0;
const galleryImages = [
  'img/1.png',
  'img/1.png',
  'img/1.png',
  'img/1.png',
  'img/1.png',
  'img/1.png',
  'img/1.png',
  'img/1.png'
];

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightbox.classList.add('active');
  lightboxImg.src = galleryImages[index];
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll del body
}

function changeLightboxImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
  document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

// Cerrar lightbox con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
  // Navegar con flechas del teclado
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeLightboxImage(1);
    }
  }
});