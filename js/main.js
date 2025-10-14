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

const serviceOptions = {
  Tattoo: [
    { value: 'Blackwork', label: 'Blackwork' },
    { value: 'Diseños personalizados', label: 'Diseños personalizados' },
    { value: 'Cover-up artístico', label: 'Cover-up artístico' }
  ],
  Piercing: [
    { value: 'Piercing de lóbulo', label: 'Piercing de lóbulo' },
    { value: 'Piercing de cartílago', label: 'Piercing de cartílago' },
    { value: 'Piercing septum', label: 'Piercing septum' }
  ]
};

function updateServiceDetailOptions(category) {
  const detailSelect = document.getElementById('serviceDetail');
  if (!detailSelect) return;

  detailSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = category ? `Selecciona un servicio de ${category} (opcional)` : 'Selecciona un servicio (opcional)';
  placeholder.selected = true;
  detailSelect.appendChild(placeholder);

  const options = serviceOptions[category];

  if (category && Array.isArray(options)) {
    options.forEach(({ value, label }) => {
      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.textContent = label;
      detailSelect.appendChild(optionElement);
    });
    detailSelect.disabled = false;
  } else {
    detailSelect.disabled = true;
  }
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nameInput = document.getElementById('customerName');
  const serviceCategorySelect = document.getElementById('serviceCategory');
  const serviceDetailSelect = document.getElementById('serviceDetail');
  const customerName = nameInput.value.trim();
  const selectedCategory = serviceCategorySelect.value;
  const selectedDetail = serviceDetailSelect.value;

  if (!customerName) {
    alert('Por favor escribe tu nombre.');
    nameInput.focus();
    return;
  }

  if (!selectedCategory) {
    alert('Por favor selecciona una categoría de servicio.');
    serviceCategorySelect.focus();
    return;
  }

  const categoryText = serviceCategorySelect.options[serviceCategorySelect.selectedIndex]?.text || selectedCategory;
  const detailText = selectedDetail
    ? (serviceDetailSelect.options[serviceDetailSelect.selectedIndex]?.text || selectedDetail)
    : '';

  let message;
  if (selectedDetail) {
    message = `Hola, mi nombre es ${customerName}. Me gustaría consultar sobre un ${detailText}.`;
  } else {
    message = `Hola, mi nombre es ${customerName}. Me gustaría consultar sobre un ${categoryText.toLowerCase()} .`;
  }

  // Número de WhatsApp del estudio (número de prueba)
  const whatsappNumber = '50768263176'; // Formato: código de país + número sin espacios ni símbolos

  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);

  // Abrir WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

  // Limpiar el formulario
  this.reset();
  updateServiceDetailOptions('');
});

// Galería Carrusel
const galleryImages = Array.from({ length: 27 }, (_, index) => {
  const id = String(index + 1).padStart(3, '0');
  return `img/portafoil/imagen${id}.webp`;
});

function renderGallery() {
  const galleryScroll = document.getElementById('galleryScroll');
  if (!galleryScroll) return;

  galleryScroll.innerHTML = '';

  galleryImages.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.onclick = () => openLightbox(index);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tatuaje ${index + 1}`;
    img.loading = 'lazy';

    item.appendChild(img);
    galleryScroll.appendChild(item);
  });

  galleryScroll.scrollLeft = 0;
  currentImageIndex = 0;
}

function scrollGallery(direction) {
  const gallery = document.querySelector('.gallery-scroll');
  if (!gallery) return;
  if (!galleryImages.length) return;
  const itemWidth = 125; // 250px / 2 por el overlap
  gallery.scrollBy({
    left: direction * itemWidth,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderGallery();

  const serviceCategorySelect = document.getElementById('serviceCategory');
  if (serviceCategorySelect) {
    updateServiceDetailOptions('');
    serviceCategorySelect.addEventListener('change', function() {
      updateServiceDetailOptions(this.value);
    });
  }
});

// Lightbox para ver imágenes completas
let currentImageIndex = 0;
function openLightbox(index) {
  if (!galleryImages.length) return;
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightbox.classList.add('active');
  const clampedIndex = Math.max(0, Math.min(galleryImages.length - 1, index));
  lightboxImg.src = galleryImages[clampedIndex];
  currentImageIndex = clampedIndex;
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll del body
}

function changeLightboxImage(direction) {
  if (!galleryImages.length) return;
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