@@ -0,0 +1,407 @@
// UX/UI Academy - JavaScript Interactivity
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Navegación móvil
    function initMobileNavigation() {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Sistema de tabs para ejercicios
    function initTabSystem() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remover clase active de todos los botones y paneles
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Agregar clase active al botón clickeado y su panel correspondiente
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                // Animación de entrada
                const activePanel = document.getElementById(tabId);
                activePanel.style.opacity = '0';
                activePanel.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    activePanel.style.opacity = '1';
                    activePanel.style.transform = 'translateY(0)';
                    activePanel.style.transition = 'all 0.3s ease';
                }, 50);
            });
        });
    }
    
    // Smooth scrolling para navegación
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Altura del navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animación de la grilla del hero
    function initHeroGridAnimation() {
        let animationInterval;
        
        function animateGrid() {
            const inactiveItems = Array.from(gridItems).filter(item => !item.classList.contains('active'));
            const activeItems = Array.from(gridItems).filter(item => item.classList.contains('active'));
            
            if (inactiveItems.length > 0 && activeItems.length > 0) {
                // Remover una activa aleatoria
                const randomActive = activeItems[Math.floor(Math.random() * activeItems.length)];
                randomActive.classList.remove('active');
                
                // Activar una inactiva aleatoria
                const randomInactive = inactiveItems[Math.floor(Math.random() * inactiveItems.length)];
                randomInactive.classList.add('active');
            }
        }
        
        // Iniciar animación cuando el hero esté visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationInterval = setInterval(animateGrid, 2000);
                } else {
                    clearInterval(animationInterval);
                }
            });
        });
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }
    
    // Animación de entrada para elementos
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.principle-card, .timeline-item, .resource-category');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease';
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }
    
    // Destacar sección activa en navegación
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveNav() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                } else if (navLink) {
                    navLink.classList.remove('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Llamar una vez al cargar
    }
    
    // Efectos de hover para cards
    function initCardEffects() {
        const cards = document.querySelectorAll('.principle-card, .exercise-card, .resource-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Botones interactivos
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.cta-button, .exercise-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Efecto de ripple
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.height, rect.width);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Parallax suave para elementos
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.design-grid, .timeline-marker');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.style.transform = `translateY(${rate * 0.1}px)`;
                }
            });
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        window.addEventListener('scroll', updateParallax);
    }
    
    // Contador animado para estadísticas (si se añaden)
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Lazy loading para imágenes (si se añaden)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Funcionalidad de búsqueda (si se añade)
    function initSearchFunctionality() {
        const searchInput = document.querySelector('#search-input');
        const searchResults = document.querySelector('#search-results');
        
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                // Implementar lógica de búsqueda aquí
                console.log('Searching for:', query);
            });
        }
    }
    
    // Dark mode toggle (futuro)
    function initDarkModeToggle() {
        const darkModeToggle = document.querySelector('#dark-mode-toggle');
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
            
            // Cargar preferencia guardada
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }
    
    // Inicializar todas las funcionalidades
    function init() {
        initMobileNavigation();
        initTabSystem();
        initSmoothScrolling();
        initHeroGridAnimation();
        initScrollAnimations();
        initActiveNavigation();
        initCardEffects();
        initButtonEffects();
        initParallaxEffects();
        initCounterAnimation();
        initLazyLoading();
        initSearchFunctionality();
        initDarkModeToggle();
        
        // Mostrar mensaje de bienvenida en consola
        console.log('🎨 UX/UI Academy - Plataforma de aprendizaje inicializada correctamente');
        console.log('📚 Explora los principios, herramientas y ejercicios para dominar el diseño UX/UI');
    }
    
    // CSS para efecto ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        }
        
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Ejecutar inicialización
    init();
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', function() {
        // Cerrar menú móvil si se redimensiona a desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Prevenir scroll cuando el menú móvil está abierto
    function preventBodyScroll() {
        const menuObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navMenu.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
        
        menuObserver.observe(navMenu, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    preventBodyScroll();
});
