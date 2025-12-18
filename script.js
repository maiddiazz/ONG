document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const menuBtnCompacto = document.querySelector('.menu-btn-compacto');
    const scrollPoint = 10; 

    //MENÚ COMPACTO ---
    if (menuBtnCompacto) {
        menuBtnCompacto.addEventListener('click', function(event) {
            event.preventDefault(); 
            body.classList.toggle('menu-force-show');
        });
    }

    // ======================================================
    //  SCROLL
    // ====================================================

    const heroContainer = document.querySelector('.container-hero');
    const titleContent = document.querySelector('.parallax-content');

    const endEffectScroll = 30;     
    const initialScale = 0.9;       
    const maxVerticalMove = 15;     
    const maxMove = 120;            
    const stopAt = 900;            

    window.addEventListener('scroll', () => {
        const scrollAmount = window.scrollY;

        if (scrollAmount > scrollPoint) {
            body.classList.add('scroll-activo');
            if (body.classList.contains('menu-force-show')) {
                body.classList.remove('menu-force-show');
            }
        } else {
            body.classList.remove('scroll-activo');
            body.classList.remove('menu-force-show'); 
        }
        
        //ZOOM IN---
        if (heroContainer && titleContent) {
            let currentScale = initialScale; 
            let movementY = 0;
            
            if (scrollAmount >= startEffectScroll && scrollAmount <= endEffectScroll) {
                const scrollProgress = (scrollAmount - startEffectScroll) / (endEffectScroll - startEffectScroll);
                
                currentScale = initialScale + ( (1 - initialScale) * scrollProgress);
                
                movementY = scrollProgress * maxVerticalMove * -1; 
                
            } else if (scrollAmount > endEffectScroll) {
                currentScale = 1;
                movementY = maxVerticalMove * -1;
            } else {                
                currentScale = initialScale;
                movementY = 0;
            }
            
            heroContainer.style.transform = `translateY(${movementY}px) scale(${currentScale})`;
                titleContent.style.transform = `translateY(${maxMove}px)`;

        }
        
            const y = window.scrollY;

            if (y < stopAt) {
                const move = (y / stopAt) * maxMove;
                titleContent.style.transform = `translateY(${move}px)`;
            } else {
                titleContent.style.transform = `translateY(${maxMove}px)`;
            }

        if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            document.body.classList.add('scroll-activo');
        } else {
            document.body.classList.remove('scroll-activo');
        }
        } else {
            document.body.classList.remove('scroll-activo');
        }


    }); // FIN del window.addEventListener('scroll')


    //ANIMACIONES DE NOSOTROS
    const animatedElements = document.querySelectorAll('.animate-in, .animate-in-delay-1, .animate-in-delay-2, .animate-in-delay-3, .animate-in-delay-4');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    const statsSection = document.querySelector('.estadisticas-seccion');
    const counters = document.querySelectorAll('.contador');
    
    if (statsSection && counters.length > 0) {
        let hasAnimated = false; 

        function animateCounter(element, target) {
            let current = 0;
            const duration = 1000; 
            const frameRate = 10; 
            const totalFrames = duration / frameRate;
            const increment = target / totalFrames;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    element.textContent = target; 
                    clearInterval(timer);
                } else {
                    element.textContent = Math.ceil(current);
                }
            }, frameRate);
        }

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        animateCounter(counter, target);
                    });
                    
                    hasAnimated = true; 
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
    /////////////////////////////////////////////////
    const openModalBtn = document.querySelector('.btn-cta.primary');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const volunteerModal = document.getElementById('volunteerModal');
    const volunteerForm = document.querySelector('.volunteer-form');
    const successMessage = document.getElementById('successMessage');

    if (openModalBtn && closeModalBtn && volunteerModal) {
        
        function openModal() {
            volunteerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            volunteerModal.classList.remove('active');
            document.body.style.overflow = '';
            volunteerForm.classList.remove('hide');
            successMessage.classList.remove('show');
            volunteerForm.reset();
        }

        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        closeModalBtn.addEventListener('click', closeModal);

        volunteerModal.addEventListener('click', (e) => {
            if (e.target === volunteerModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && volunteerModal.classList.contains('active')) {
                closeModal();
            }
        });

        if (volunteerForm && successMessage) {
            volunteerForm.addEventListener('submit', (e) => {
                e.preventDefault(); 
                
                // Simulación de envío exitoso
                volunteerForm.classList.add('hide');
                successMessage.classList.add('show');
            });
        }
    }


    //----------------PESTAÑAS MISION VISION---------------------------
    const botones = document.querySelectorAll('.boton-tab');
    const contenidos = document.querySelectorAll('.contenido-tab');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(b => b.classList.remove('activo'));
            contenidos.forEach(c => c.classList.remove('activo'));

            boton.classList.add('activo');

            const idParaActivar = boton.getAttribute('data-tab');
            document.getElementById(idParaActivar).classList.add('activo');
        });
    });

////////////////////////PROYECTOS FILTRO/////////////////////////////////////////
        const botonesPROY = document.querySelectorAll('.boton-filtro');
        const proyectos = document.querySelectorAll('.tarjeta-proyecto');

        botonesPROY.forEach(btn => {
            btn.addEventListener('click', () => {
                botonesPROY.forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                const filtro = btn.getAttribute('data-tipo');

                proyectos.forEach(proy => {
                    if (filtro === 'todos' || proy.getAttribute('data-tipo') === filtro) {
                        proy.style.display = 'flex';
                    } else {
                        proy.style.display = 'none';
                    }
                });
            });
        });

/////////////////////////////////////////////////////////////////////////////////////////GALERIA//////////////////////////////////////////////////////////
    let indiceCarrusel = 0;
    let indiceLightbox = 0;
    
    const imagenes = document.querySelectorAll('.foto-item img');
    const track = document.getElementById('galeriaTrack');
    const lightbox = document.getElementById('lightbox');
    const imgAmpliada = document.getElementById('img-ampliada');

    window.moverCarrusel = function(direccion) {
        const totalFotos = imagenes.length;
        const fotosVisibles = window.innerWidth < 768 ? 1 : 3; 
        const maxIndice = totalFotos - fotosVisibles;

        indiceCarrusel += direccion;

        if (indiceCarrusel < 0) indiceCarrusel = 0;
        if (indiceCarrusel > maxIndice) indiceCarrusel = maxIndice;

        const anchoItem = track.parentElement.offsetWidth / fotosVisibles;
        track.style.transform = `translateX(-${indiceCarrusel * anchoItem}px)`;
    };

    // Lightbox ---
    window.abrirLightbox = function(index) {
        indiceLightbox = index;
        actualizarImagenLightbox();
        lightbox.style.display = 'flex';
    };

    window.cambiarImagenLightbox = function(direccion) {
        indiceLightbox += direccion;
        if (indiceLightbox >= imagenes.length) indiceLightbox = 0;
        if (indiceLightbox < 0) indiceLightbox = imagenes.length - 1;
        actualizarImagenLightbox();
    };

    function actualizarImagenLightbox() {
        imgAmpliada.src = imagenes[indiceLightbox].src;
    }

    window.cerrarLightbox = function() {
        lightbox.style.display = 'none';
    };

    /********************SWITCH */
    const toggle = document.getElementById('modoClaroToggle');

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    });

});

function mostrarTab(event, tabId) {
    const contenidos = document.querySelectorAll('.tab-content-text');
    contenidos.forEach(texto => {
        texto.classList.remove('active');
    });

    const botones = document.querySelectorAll('.tab-item');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    event.currentTarget.classList.add('active');
}

document.querySelector('.contacto-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const boton = document.querySelector('.btn-enviar-mensaje');
    boton.style.display = 'none';

    const aviso = document.getElementById('mensaje-exito');
    aviso.style.display = 'block';

    this.reset();
});


function actualizarCalculos() {
    const numArboles = document.getElementById('treeInput').value;
    const precioPorArbol = 6.55; 
    const sqmPorArbol = 4; 

    const precios = document.querySelectorAll('.valor-precio');
    const arbolesRef = document.querySelectorAll('.valor-trees');
    const sqmRef = document.querySelectorAll('.valor-sqm');

    precios.forEach(el => {
        el.innerText = `€ ${(numArboles * precioPorArbol).toFixed(2)}`;
    });

    arbolesRef.forEach(el => {
        el.innerText = numArboles;
    });

    sqmRef.forEach(el => {
        el.innerText = numArboles * sqmPorArbol;
    });
}


