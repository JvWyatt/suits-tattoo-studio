# Suits Tattoo Studio 🎨

Sitio web profesional para estudio de tatuajes con diseño responsive y moderno.

## ✨ Características

### 🎯 Optimizaciones Implementadas

#### Responsive Design
- **Móviles pequeños** (< 400px): Optimizado para dispositivos compactos
- **Móviles** (400px - 580px): Diseño adaptado para Samsung A56 y similares
- **Tablets** (581px - 980px): Layout ajustado para tablets
- **Desktop** (> 980px): Experiencia completa de escritorio

#### Menú de Navegación
- Menú hamburguesa animado para móviles y tablets
- Navegación tradicional para desktop
- Cierre automático del menú al hacer scroll
- Transiciones suaves

#### Rendimiento
- Optimización de imágenes
- Fuentes precargadas (preconnect)
- Renderizado optimizado con `will-change`
- Suavizado de fuentes mejorado

#### Formulario de Contacto
- Campo único con mensaje predeterminado editable
- Tamaño optimizado para equilibrar con iconos
- Envío directo a WhatsApp
- Validación de campos

#### Galería
- Carrusel responsive con overlapping cards
- Lightbox para vista completa de imágenes
- Navegación con flechas y puntos indicadores
- Ajuste automático según tamaño de pantalla

## 📱 Breakpoints

```css
/* Móviles muy pequeños */
@media (max-width: 400px) { ... }

/* Móviles estándar (Samsung A56) */
@media (max-width: 580px) { ... }

/* Tablets */
@media (min-width: 581px) and (max-width: 980px) { ... }

/* Desktop */
@media (min-width: 981px) { ... }
```

## 🎨 Características del Diseño

- **Colores**: Púrpura (#9b3fae) como acento principal
- **Tipografías**: 
  - Títulos: Merriweather (serif)
  - Cuerpo: Open Sans (sans-serif)
- **Efectos**: 
  - Transiciones suaves
  - Efectos hover interactivos
  - Sombras y degradados
  - Animaciones sutiles

## 📞 Contacto

- **WhatsApp**: +507 6826 3176 (número de prueba)
- **Instagram**: @suitstattoostudio
- **Ubicación**: [Google Maps](https://maps.app.goo.gl/8Xqtq3FTCpxeCQS36)

## 🚀 Estructura del Proyecto

```
suits-tattoo-studio/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos optimizados y responsive
├── js/
│   └── main.js        # Funcionalidades interactivas
├── img/               # Recursos gráficos
│   ├── logo.png
│   ├── hero.png
│   ├── background.png
│   ├── artist.png
│   └── 1.png
└── README.md          # Documentación
```

## 💡 Mejoras Implementadas

### HTML
- Meta tags optimizados (viewport, theme-color, description)
- Preconnect para fuentes de Google
- Menú móvil con navegación hamburguesa
- Logo como enlace al inicio

### CSS
- Sistema de diseño responsive completo
- Optimización de rendimiento con `will-change`
- Suavizado de fuentes mejorado
- Media queries específicas para diferentes dispositivos
- Estilos para menú hamburguesa animado

### JavaScript
- Toggle del menú móvil
- Cierre automático del menú al hacer scroll
- Formulario simplificado con envío a WhatsApp
- Carrusel de galería con navegación
- Lightbox interactivo

## 🔧 Tecnologías

- HTML5 semántico
- CSS3 con Flexbox y Grid
- JavaScript vanilla (sin dependencias)
- Google Fonts
- Diseño Mobile-First

## 📝 Notas

- El sitio está optimizado para dispositivos Samsung A56 (360x800px) y similares
- Todas las imágenes se ajustan automáticamente al tamaño de pantalla
- Los inputs tienen tamaño de fuente de 16px para evitar zoom automático en iOS
- El background es fijo con efecto parallax en desktop

---

Desarrollado con ❤️ para Suits Tattoo Studio
