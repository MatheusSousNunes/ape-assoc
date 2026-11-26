document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. Cabeçalho Fixo e Mudança de Estilo ao Rolar (Sticky Header)
       ========================================================================== */
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==========================================================================
       2. Menu Mobile
       ========================================================================== */
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".nav-list a");

    function toggleMenu() {
        mobileBtn.classList.toggle("active");
        mainNav.classList.toggle("active");
        const expanded = mobileBtn.getAttribute("aria-expanded") === "true" || false;
        mobileBtn.setAttribute("aria-expanded", !expanded);
    }

    mobileBtn.addEventListener("click", toggleMenu);

    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mainNav.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       3. Galeria de Fotos (Lightbox)
       ========================================================================== */
    const galleryImages = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt; // Utiliza o alt como legenda provisória
        
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Impede a rolagem do fundo
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentIndex);
    }

    // Event Listeners da Galeria
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
        // Acessibilidade: abrir com teclado
        img.addEventListener("keydown", (e) => {
            if(e.key === 'Enter') openLightbox(index);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado no Lightbox
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    /* ==========================================================================
       4. Galeria de Vídeos (Lazy Load e Substituição de iframe)
       ========================================================================== */
    const videoContainers = document.querySelectorAll(".video-container");

    videoContainers.forEach(container => {
        const thumb = container.querySelector(".video-thumbnail");
        const videoId = container.getAttribute("data-video-id");

        thumb.addEventListener("click", () => {
            // Se houver um ID válido para o YouTube, substitui a imagem pelo iframe
            if(videoId && videoId !== "ID_DO_VIDEO_AQUI") {
                const iframe = document.createElement("iframe");
                iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
                iframe.setAttribute("allowfullscreen", "true");
                
                container.innerHTML = ""; // Limpa a miniatura
                container.appendChild(iframe);
            } else {
                alert("O ID do vídeo ainda não foi configurado.");
            }
        });
    });

    /* ==========================================================================
       5. Validação do Formulário de Contato
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Lógica simples de validação e feedback (sem backend)
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            
            if (nome === "" || email === "") {
                formStatus.style.color = "red";
                formStatus.textContent = "Por favor, preencha todos os campos obrigatórios.";
                return;
            }

            // Simula o envio
            formStatus.style.color = "green";
            formStatus.textContent = "Mensagem enviada com sucesso! Retornaremos em breve.";
            contactForm.reset();
            
            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);
        });
    }

    /* ==========================================================================
       6. Ano Automático no Rodapé
       ========================================================================== */
    const yearSpan = document.getElementById("currentYear");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});