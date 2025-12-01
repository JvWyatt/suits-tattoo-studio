/* ===================================================================
   Suits Tattoo Studio - Main JavaScript
   Refactored: Event delegation, BEM class names, accessibility
   =================================================================== */

// ==========================================================================
// Mobile Menu Management
// ==========================================================================
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.toggle('is-active');
  }
}

// Close mobile menu on scroll
window.addEventListener('scroll', function() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav && mobileNav.classList.contains('is-active')) {
    mobileNav.classList.remove('is-active');
  }
});

// ==========================================================================
// Header Background on Scroll
// ==========================================================================
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const scrollPosition = window.scrollY;
  
  // Change header background after 50px of scroll
  if (scrollPosition > 50) {
    header.style.background = 'rgba(0,0,0,.85)';
  } else {
    header.style.background = 'rgba(0,0,0,1)';
  }
});

// ==========================================================================
// Hero Section Scroll Effects
// ==========================================================================
window.addEventListener('scroll', function() {
  const heroBackground = document.querySelector('.hero__background');
  const heroOverlay = document.querySelector('.hero__overlay');
  const heroLogoOverlay = document.querySelector('.hero__logo-overlay');
  const heroContent = document.querySelector('.hero__content');
  
  if (!heroBackground || !heroOverlay || !heroLogoOverlay || !heroContent) return;
  
  const scrollPosition = window.scrollY;
  const hero = document.querySelector('.hero');
  const heroHeight = hero ? hero.offsetHeight : 0;
  
  // Calculate opacity based on scroll
  const fadeProgress = Math.min(1, scrollPosition / (heroHeight * 0.5));
  
  // Detect if mobile or tablet
  const isMobileOrTablet = window.innerWidth <= 980;
  
  // Hero image and overlay fade together
  heroBackground.style.opacity = 1 - fadeProgress;
  heroOverlay.style.opacity = 1 - fadeProgress;
  
  const heroTitle = heroContent.querySelector('.hero__title');
  
  if (isMobileOrTablet) {
    // On mobile/tablet, logo AND title disappear together
    heroLogoOverlay.style.opacity = 1 - fadeProgress;
    if (heroTitle) {
      heroTitle.style.opacity = 1 - fadeProgress;
    }
  } else {
    // On desktop, logo appears gradually
    heroLogoOverlay.style.opacity = fadeProgress;
    
    // On desktop, keep title opacity at 1
    if (heroTitle) {
      heroTitle.style.opacity = 1;
      
      // Gradually reduce title font size
      const fontSize = 5 - (2 * fadeProgress); // From 5rem to 3rem
      heroTitle.style.fontSize = `${fontSize}rem`;
    }
    
    // Move title down to position below logo
    const titleOffset = 250 * fadeProgress; // Move 250px down
    heroContent.style.transform = `translateY(calc(-50% + ${titleOffset}px))`;
  }
});

// ==========================================================================
// Booking Form - Service Options
// ==========================================================================
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

/**
 * Update service detail options based on selected category
 * @param {string} category - The selected service category
 */
function updateServiceDetailOptions(category) {
  const detailSelect = document.getElementById('serviceDetail');
  if (!detailSelect) return;

  detailSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = category 
    ? `Selecciona un servicio de ${category} (opcional)` 
    : 'Selecciona un servicio (opcional)';
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

/**
 * Handle booking form submission and WhatsApp redirect
 * @param {Event} e - Form submit event
 */
function handleBookingFormSubmit(e) {
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
    message = `Hola, mi nombre es ${customerName}. Me gustaría consultar sobre un ${categoryText.toLowerCase()}.`;
  }

  const whatsappNumber = '50768263176';
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

  // Clear form
  e.target.reset();
  updateServiceDetailOptions('');
}

// ==========================================================================
// Gallery Management
// ==========================================================================
const galleryImages = Array.from({ length: 27 }, (_, index) => {
  const id = String(index + 1).padStart(3, '0');
  return `img/portafoil/imagen${id}.webp`;
});

/**
 * Render gallery items from images array
 */
function renderGallery() {
  const galleryScroll = document.getElementById('galleryScroll');
  if (!galleryScroll) return;

  galleryScroll.innerHTML = '';

  galleryImages.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    item.setAttribute('data-index', index);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Ver tatuaje ${index + 1}`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tatuaje ${index + 1}`;
    img.loading = 'lazy';

    item.appendChild(img);
    galleryScroll.appendChild(item);
  });

  galleryScroll.scrollLeft = 0;
}

/**
 * Scroll gallery in given direction
 * @param {number} direction - -1 for left, 1 for right
 */
function scrollGallery(direction) {
  const gallery = document.querySelector('.gallery__scroll');
  if (!gallery || !galleryImages.length) return;
  
  const itemWidth = 125; // 250px / 2 for overlap
  gallery.scrollBy({
    left: direction * itemWidth,
    behavior: 'smooth'
  });
}

// ==========================================================================
// Lightbox Management
// ==========================================================================
let currentImageIndex = 0;

/**
 * Open lightbox at specified image index
 * @param {number} index - Image index to display
 */
function openLightbox(index) {
  if (!galleryImages.length) return;
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (!lightbox || !lightboxImg) return;
  
  const clampedIndex = Math.max(0, Math.min(galleryImages.length - 1, index));
  currentImageIndex = clampedIndex;
  
  lightbox.classList.add('is-active');
  lightboxImg.src = galleryImages[clampedIndex];
  lightboxImg.alt = `Tatuaje ${clampedIndex + 1}`;
  
  document.body.style.overflow = 'hidden';
}

/**
 * Close the lightbox modal
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  lightbox.classList.remove('is-active');
  document.body.style.overflow = '';
}

/**
 * Navigate lightbox images
 * @param {number} direction - -1 for previous, 1 for next
 */
function changeLightboxImage(direction) {
  if (!galleryImages.length) return;
  
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
  
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) {
    lightboxImg.src = galleryImages[currentImageIndex];
    lightboxImg.alt = `Tatuaje ${currentImageIndex + 1}`;
  }
}

// ==========================================================================
// Event Listeners - Keyboard Navigation
// ==========================================================================
document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  }
  
  // Navigate with arrow keys when lightbox is active
  if (lightbox.classList.contains('is-active')) {
    if (e.key === 'ArrowLeft') {
      changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeLightboxImage(1);
    }
  }
});

// ==========================================================================
// DOM Ready - Initialize
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery
  renderGallery();

  // Set up service category change listener
  const serviceCategorySelect = document.getElementById('serviceCategory');
  if (serviceCategorySelect) {
    updateServiceDetailOptions('');
    serviceCategorySelect.addEventListener('change', function() {
      updateServiceDetailOptions(this.value);
    });
  }

  // Set up booking form submit listener
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingFormSubmit);
  }

  // Set up mobile menu toggle
  const menuToggle = document.querySelector('.header__menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Set up mobile nav link listeners (close menu on click)
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  // Set up gallery navigation buttons
  const galleryBtnPrev = document.querySelector('.gallery__btn--prev');
  const galleryBtnNext = document.querySelector('.gallery__btn--next');
  
  if (galleryBtnPrev) {
    galleryBtnPrev.addEventListener('click', () => scrollGallery(-1));
  }
  if (galleryBtnNext) {
    galleryBtnNext.addEventListener('click', () => scrollGallery(1));
  }

  // Set up gallery item click listeners (event delegation)
  const galleryScroll = document.getElementById('galleryScroll');
  if (galleryScroll) {
    galleryScroll.addEventListener('click', function(e) {
      const galleryItem = e.target.closest('.gallery__item');
      if (galleryItem) {
        const index = parseInt(galleryItem.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          openLightbox(index);
        }
      }
    });

    // Keyboard support for gallery items
    galleryScroll.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const galleryItem = e.target.closest('.gallery__item');
        if (galleryItem) {
          e.preventDefault();
          const index = parseInt(galleryItem.getAttribute('data-index'), 10);
          if (!isNaN(index)) {
            openLightbox(index);
          }
        }
      }
    });
  }

  // Set up lightbox controls
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxBtnPrev = document.querySelector('.lightbox__btn--prev');
  const lightboxBtnNext = document.querySelector('.lightbox__btn--next');

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    // Close lightbox when clicking backdrop
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxBtnPrev) {
    lightboxBtnPrev.addEventListener('click', () => changeLightboxImage(-1));
  }

  if (lightboxBtnNext) {
    lightboxBtnNext.addEventListener('click', () => changeLightboxImage(1));
  }
});