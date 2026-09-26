/* ════════════════════════════════════════════
   HEADER — scroll behaviour
════════════════════════════════════════════ */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


/* ════════════════════════════════════════════
   LANGUAGE SWITCHER
════════════════════════════════════════════ */
function toggleLang() {
  document.getElementById('langMenu').classList.toggle('open');
}

function selectLang(e, code) {
  e.preventDefault();
  document.getElementById('currentLang').textContent = code;
  document.getElementById('langMenu').classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-right')) {
    document.getElementById('langMenu').classList.remove('open');
  }
});


/* ════════════════════════════════════════════
   CAROUSEL PROGRESS INDICATORS
════════════════════════════════════════════ */
const carouselEl  = document.getElementById('heroCarousel');
const indicators  = document.querySelectorAll('#customProgress button');
const total       = indicators.length;

function resetSpan(btn) {
  const span = btn.querySelector('span');
  span.style.animation = 'none';
  span.style.width = '0%';
  span.offsetHeight; // force reflow
  span.style.animation = '';
}

function syncIndicators(activeIndex) {
  indicators.forEach((btn, i) => {
    const span = btn.querySelector('span');

    btn.classList.remove('active', 'visited', 'pending');
    span.style.animation = 'none';
    span.style.width = '0%';
    span.offsetHeight;

    if (i < activeIndex) {
      span.style.width = '100%';
      btn.classList.add('visited');

    } else if (i === activeIndex) {
      resetSpan(btn);
      btn.classList.add('active');

    } else {
      btn.classList.add('pending');
    }
  });
}

if (carouselEl) {
  carouselEl.addEventListener('slide.bs.carousel', (e) => {
    syncIndicators(e.to);
  });

  // Hover on indicator — jump to that slide
  indicators.forEach((btn, i) => {
    btn.addEventListener('mouseenter', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carouselEl);
      if (bsCarousel) bsCarousel.to(i);
    });
  });
}

syncIndicators(0);


/* ════════════════════════════════════════════
   MODEL CARDS — mouse parallax
════════════════════════════════════════════ */
const modelCards = document.querySelectorAll('.model-card:not(.coming-soon)');

modelCards.forEach(card => {
  const img = card.querySelector('img');

  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    img.style.transform = `scale(1.05) translate(${x * 14}px, ${y * 9}px)`;
  });

  card.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});

/* ════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════ */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

function openMenu(){

    menuBtn.classList.add("active");
    mobileMenu.classList.add("open");
    overlay.classList.add("show");

    /* Lock background */
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    /* Stop Swiper autoplay */
    if(window.swiper){
        swiper.autoplay.stop();
    }

}

function closeMenu(){

    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("open");
    overlay.classList.remove("show");

    /* Unlock background */
    document.body.style.overflow = "";
    document.body.style.touchAction = "";

    /* Resume Swiper */
    if(window.swiper){
        swiper.autoplay.start();
    }

}

menuBtn.addEventListener("click",()=>{

    if(mobileMenu.classList.contains("open")){

        closeMenu();

    }else{

        openMenu();

    }

});

overlay.addEventListener("click",closeMenu);



document.addEventListener("DOMContentLoaded", () => {

    const carousel =
        document.getElementById("HiTECHCarousel");

    if (!carousel) return;


    const slides =
        carousel.querySelectorAll(".product-slide");

    const progress =
        carousel.querySelectorAll(".progress-item");

    const previous =
        carousel.querySelector(".product-prev");

    const next =
        carousel.querySelector(".product-next");


    let currentSlide = 0;

    let autoPlay;


    /* =================================================
       SHOW SLIDE
    ================================================= */

    function showSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        progress.forEach((item, i) => {

            item.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;

    }


    /* =================================================
       NEXT
    ================================================= */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =================================================
       PREVIOUS
    ================================================= */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* =================================================
       AUTO PLAY
    ================================================= */

    function startAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = setInterval(
            nextSlide,
            4500
        );

    }


    function stopAutoPlay() {

        clearInterval(autoPlay);

    }


    /* =================================================
       BUTTONS
    ================================================= */

    next.addEventListener(
        "click",
        () => {

            nextSlide();

            startAutoPlay();

        }
    );


    previous.addEventListener(
        "click",
        () => {

            previousSlide();

            startAutoPlay();

        }
    );


    /* =================================================
       PROGRESS BUTTONS
    ================================================= */

    progress.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.slide
                    );

                showSlide(index);

                startAutoPlay();

            }
        );

    });


    /* =================================================
       PAUSE ON DESKTOP HOVER
    ================================================= */

    carousel.addEventListener(
        "mouseenter",
        stopAutoPlay
    );


    carousel.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* =================================================
       MOBILE SWIPE
    ================================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchStartX - touchEndX;


            if (Math.abs(distance) > 50) {

                if (distance > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }

                startAutoPlay();

            }

        },
        { passive: true }
    );


    /* =================================================
       START
    ================================================= */

    showSlide(0);

    startAutoPlay();

});


/* =========================================================
   HITECH UI/UX DESIGN SECTION
   Vanilla JavaScript only
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SECTION SCROLL REVEAL
    ====================================================== */

    const hitechUxSection =
        document.querySelector(".hitech-ux-section");

    if (hitechUxSection) {

        const hitechUxObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "hitech-ux-visible"
                            );

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        hitechUxObserver.observe(hitechUxSection);
    }


    /* =====================================================
       SMOOTH CTA SCROLL
    ====================================================== */

    const hitechUxCta =
        document.querySelector(".hitech-ux-cta");

    if (hitechUxCta) {

        hitechUxCta.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       SUBTLE MOUSE MOVEMENT
       Adds a premium depth effect to floating UI elements.
    ====================================================== */

    const hitechUxShowcase =
        document.querySelector(".hitech-ux-showcase");

    const hitechUxFloatingElements =
        document.querySelectorAll(
            ".hitech-ux-floating"
        );

    if (
        hitechUxShowcase &&
        hitechUxFloatingElements.length
    ) {

        hitechUxShowcase.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    hitechUxShowcase.getBoundingClientRect();

                const mouseX =
                    (event.clientX - rect.left) / rect.width;

                const mouseY =
                    (event.clientY - rect.top) / rect.height;

                const moveX =
                    (mouseX - 0.5) * 8;

                const moveY =
                    (mouseY - 0.5) * 8;

                hitechUxFloatingElements.forEach(
                    function (element, index) {

                        const multiplier =
                            index === 0 ? 1 : -0.7;

                        element.style.setProperty(
                            "--hitech-ux-mouse-x",
                            `${moveX * multiplier}px`
                        );

                        element.style.setProperty(
                            "--hitech-ux-mouse-y",
                            `${moveY * multiplier}px`
                        );

                    }
                );

            }
        );

        hitechUxShowcase.addEventListener(
            "mouseleave",
            function () {

                hitechUxFloatingElements.forEach(
                    function (element) {

                        element.style.setProperty(
                            "--hitech-ux-mouse-x",
                            "0px"
                        );

                        element.style.setProperty(
                            "--hitech-ux-mouse-y",
                            "0px"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       SERVICE CARD INTERACTION
    ====================================================== */

    const hitechUxCards =
        document.querySelectorAll(
            ".hitech-ux-card"
        );

    hitechUxCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.style.setProperty(
                    "--hitech-ux-card-scale",
                    "1.01"
                );

            }
        );

        card.addEventListener(
            "mouseleave",
            function () {

                this.style.setProperty(
                    "--hitech-ux-card-scale",
                    "1"
                );

            }
        );

    });


    /* =====================================================
       DASHBOARD CHART HOVER
    ====================================================== */

    const hitechUxChart =
        document.querySelector(
            ".hitech-ux-line-chart"
        );

    if (hitechUxChart) {

        hitechUxChart.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "scaleY(1.015)";

                this.style.transformOrigin =
                    "bottom";

            }
        );

        hitechUxChart.addEventListener(
            "mouseleave",
            function () {

                this.style.transform =
                    "scaleY(1)";

            }
        );

    }


    /* =====================================================
       MOBILE CHART BAR INTERACTION
    ====================================================== */

    const hitechUxBars =
        document.querySelectorAll(
            ".hitech-ux-mobile-bars i"
        );

    hitechUxBars.forEach(function (bar) {

        bar.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "translateY(-4px)";

            }
        );

        bar.addEventListener(
            "mouseleave",
            function () {

                this.style.transform =
                    "translateY(0)";

            }
        );

    });


    /* =====================================================
       DYNAMIC FLOATING MOVEMENT
       Uses CSS variables so the existing CSS animation
       remains smooth.
    ====================================================== */

    hitechUxFloatingElements.forEach(
        function (element) {

            element.style.setProperty(
                "--hitech-ux-mouse-x",
                "0px"
            );

            element.style.setProperty(
                "--hitech-ux-mouse-y",
                "0px"
            );

        }
    );

});

/* =========================================================
   HITECH — OUR TECHNOLOGY WORK
   VANILLA JAVASCRIPT ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const section =
        document.querySelector(".hitech-tech-section");

    if (!section) {
        return;
    }

    const projects =
        Array.from(
            section.querySelectorAll(".hitech-tech-project")
        );

    const filterButtons =
        Array.from(
            section.querySelectorAll(".hitech-tech-filter-btn")
        );

    const indicators =
        Array.from(
            section.querySelectorAll(
                ".hitech-tech-indicators button"
            )
        );

    const previousButton =
        section.querySelector(".hitech-tech-prev");

    const nextButton =
        section.querySelector(".hitech-tech-next");

    const progressBar =
        section.querySelector(".hitech-tech-progress span");

    const stage =
        section.querySelector(".hitech-tech-stage");


    /* =====================================================
       CAROUSEL STATE
    ====================================================== */

    let currentProject = 0;

    let visibleProjects = projects.slice();

    let autoPlayTimer = null;

    let progressTimer = null;

    let isPaused = false;

    let touchStartX = 0;

    let touchEndX = 0;

    const autoPlayDuration = 6000;


    /* =====================================================
       FILTER INDICATORS
       Only the first six indicators represent the default
       project sequence. Filtering updates the active project.
    ====================================================== */

    function updateIndicators() {

        indicators.forEach(function (indicator) {

            const slideNumber =
                Number(
                    indicator.getAttribute("data-slide")
                );

            const project =
                visibleProjects[
                    slideNumber - 1
                ];

            const projectNumber =
                visibleProjects.indexOf(
                    visibleProjects[currentProject]
                ) + 1;

            indicator.classList.toggle(
                "active",
                slideNumber === projectNumber
            );

        });

    }


    /* =====================================================
       SHOW PROJECT
    ====================================================== */

    function showProject(index, direction = 1) {

        if (!visibleProjects.length) {
            return;
        }

        if (index < 0) {
            index =
                visibleProjects.length - 1;
        }

        if (index >= visibleProjects.length) {
            index = 0;
        }

        const nextProject =
            visibleProjects[index];

        projects.forEach(function (project) {
            project.classList.remove("active");
        });

        nextProject.classList.add("active");

        currentProject = index;

        updateProjectIndicators();

        restartProgressBar();

    }


    /* =====================================================
       PROJECT INDICATORS
    ====================================================== */

    function updateProjectIndicators() {

        indicators.forEach(function (indicator) {

            const indicatorNumber =
                Number(
                    indicator.getAttribute("data-slide")
                );

            const activeNumber =
                currentProject + 1;

            indicator.classList.toggle(
                "active",
                indicatorNumber === activeNumber
            );

        });

    }


    /* =====================================================
       NEXT PROJECT
    ====================================================== */

    function nextProject() {

        if (!visibleProjects.length) {
            return;
        }

        showProject(
            currentProject + 1,
            1
        );

    }


    /* =====================================================
       PREVIOUS PROJECT
    ====================================================== */

    function previousProject() {

        if (!visibleProjects.length) {
            return;
        }

        showProject(
            currentProject - 1,
            -1
        );

    }


    /* =====================================================
       FILTER PROJECTS
    ====================================================== */

    function filterProjects(category) {

        if (category === "all") {

            visibleProjects =
                projects.slice();

        } else {

            visibleProjects =
                projects.filter(function (project) {

                    return (
                        project.dataset.category ===
                        category
                    );

                });

        }


        /* -----------------------------------------------
           Hide indicators that don't represent the
           current filtered collection.
        ------------------------------------------------ */

        indicators.forEach(function (indicator, index) {

            indicator.style.display =
                index < visibleProjects.length
                    ? ""
                    : "none";

        });


        /* -----------------------------------------------
           Reset carousel position
        ------------------------------------------------ */

        currentProject = 0;

        projects.forEach(function (project) {

            project.classList.remove("active");

        });


        if (visibleProjects.length) {

            visibleProjects[0]
                .classList.add("active");

        }


        updateProjectIndicators();

        restartProgressBar();

    }


    /* =====================================================
       FILTER BUTTON EVENTS
    ====================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (filterButton) {

                        filterButton.classList.remove(
                            "active"
                        );

                    }
                );

                this.classList.add("active");

                const category =
                    this.getAttribute("data-filter");

                filterProjects(category);

            }
        );

    });


    /* =====================================================
       PREVIOUS / NEXT EVENTS
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextProject();

                restartAutoPlay();

            }
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                previousProject();

                restartAutoPlay();

            }
        );

    }


    /* =====================================================
       INDICATOR EVENTS
    ====================================================== */

    indicators.forEach(function (indicator) {

        indicator.addEventListener(
            "click",
            function () {

                const requestedSlide =
                    Number(
                        this.getAttribute(
                            "data-slide"
                        )
                    );

                const targetIndex =
                    requestedSlide - 1;

                if (
                    targetIndex >= 0 &&
                    targetIndex < visibleProjects.length
                ) {

                    showProject(targetIndex);

                    restartAutoPlay();

                }

            }
        );

    });


    /* =====================================================
       AUTOPLAY
    ====================================================== */

    function startAutoPlay() {

        stopAutoPlay();

        autoPlayTimer =
            setInterval(
                function () {

                    if (!isPaused) {
                        nextProject();
                    }

                },
                autoPlayDuration
            );

    }


    function stopAutoPlay() {

        if (autoPlayTimer) {

            clearInterval(
                autoPlayTimer
            );

            autoPlayTimer = null;

        }

    }


    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }


    /* =====================================================
       AUTOPLAY PROGRESS BAR
    ====================================================== */

    function restartProgressBar() {

        if (!progressBar) {
            return;
        }

        progressBar.style.transition =
            "none";

        progressBar.style.width =
            "0%";

        /*
         * Force browser repaint so the animation
         * can restart cleanly.
         */
        void progressBar.offsetWidth;

        progressBar.style.transition =
            `width ${autoPlayDuration}ms linear`;

        progressBar.style.width =
            "100%";

    }


    /* =====================================================
       PAUSE WHEN HOVERING
    ====================================================== */

    if (stage) {

        stage.addEventListener(
            "mouseenter",
            function () {

                isPaused = true;

                if (progressBar) {

                    progressBar.style.transition =
                        "none";

                }

            }
        );


        stage.addEventListener(
            "mouseleave",
            function () {

                isPaused = false;

                restartProgressBar();

            }
        );

    }


    /* =====================================================
       TOUCH / SWIPE SUPPORT
    ====================================================== */

    if (stage) {

        stage.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        stage.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            },
            {
                passive: true
            }
        );

    }


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;

        const minimumSwipe =
            45;

        if (
            Math.abs(swipeDistance) <
            minimumSwipe
        ) {
            return;
        }

        if (swipeDistance < 0) {

            nextProject();

        } else {

            previousProject();

        }

        restartAutoPlay();

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Only respond when the portfolio is visible
             * in the viewport.
             */

            const rect =
                section.getBoundingClientRect();

            const sectionVisible =
                rect.top <
                window.innerHeight &&
                rect.bottom > 0;

            if (!sectionVisible) {
                return;
            }


            if (event.key === "ArrowRight") {

                nextProject();

                restartAutoPlay();

            }


            if (event.key === "ArrowLeft") {

                previousProject();

                restartAutoPlay();

            }

        }
    );


    /* =====================================================
       SCROLL REVEAL
       IntersectionObserver
    ====================================================== */

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        section.classList.add(
                            "hitech-tech-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                        startAutoPlay();

                        restartProgressBar();

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealObserver.observe(section);


    /* =====================================================
       VISIBILITY API
       Pause autoplay if browser tab becomes hidden.
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {

                isPaused = true;

            } else {

                isPaused = false;

                restartProgressBar();

            }

        }
    );


    /* =====================================================
       DEMO BUTTONS
       These are intentionally non-navigational placeholders
       until real project URLs are supplied.
    ====================================================== */

    const demoButtons =
        section.querySelectorAll(
            ".hitech-tech-demo-button"
        );

    demoButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                 * The first real project has a live URL.
                 * Additional projects can receive their own
                 * URLs by adding:
                 *
                 * data-url="https://example.com"
                 *
                 * to the button.
                 */

                const projectUrl =
                    this.dataset.url;

                if (projectUrl) {

                    window.open(
                        projectUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            }
        );

    });


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    projects.forEach(function (project, index) {

        project.classList.toggle(
            "active",
            index === 0
        );

    });

    updateProjectIndicators();

});


/* ============================================================
   HiTECH PREMIUM SERVICES & ORDER
   Vanilla JavaScript
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ========================================================
       SERVICE DATA
    ======================================================== */

    const hitechOrderServices = {

        procurement: {
            name: "Procurement"
        },

        sourcing: {
            name: "Product Sourcing"
        },

        rmb: {
            name: "RMB Exchange"
        },

        web: {
            name: "Web Development"
        },

        webapp: {
            name: "Web Applications"
        },

        uiux: {
            name: "UI/UX Design"
        },

        mobile: {
            name: "Mobile Applications"
        }

    };


    /* ========================================================
       ELEMENTS
    ======================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".hitech-order-service-card"
        );

    const config =
        document.getElementById(
            "hitech-order-configurator"
        );

    const selectedName =
        document.getElementById(
            "hitech-order-selected-name"
        );

    const formContents =
        document.querySelectorAll(
            ".hitech-order-form-content"
        );

    const submitButton =
        document.getElementById(
            "hitech-order-submit"
        );

    const successState =
        document.getElementById(
            "hitech-order-success"
        );

    const resetButton =
        document.getElementById(
            "hitech-order-reset"
        );


    let selectedService = "procurement";

    let selectedRmbDirection = "buy";


    /* ========================================================
       SERVICE SELECTION
    ======================================================== */

    function hitechOrderSelectService(service) {

        const serviceData =
            hitechOrderServices[service];

        if (!serviceData) {
            return;
        }


        selectedService = service;


        /* Update cards */

        serviceCards.forEach(card => {

            const isActive =
                card.dataset.service === service;

            card.classList.toggle(
                "hitech-order-service-active",
                isActive
            );

        });


        /* Update title */

        selectedName.textContent =
            serviceData.name;


        /* Show correct configuration */

        formContents.forEach(content => {

            content.classList.toggle(
                "hitech-order-form-active",
                content.dataset.form === service
            );

        });


        /* Reset confirmation */

        successState.classList.remove(
            "hitech-order-success-visible"
        );


        /* Show configurator */

        config.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* ========================================================
       CARD EVENTS
    ======================================================== */

    serviceCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                hitechOrderSelectService(
                    card.dataset.service
                );

            }
        );

    });


    /* ========================================================
       CHOICE BUTTONS
    ======================================================== */

    const choiceButtons =
        document.querySelectorAll(
            ".hitech-order-choice-grid button"
        );


    choiceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const parent =
                    button.closest(
                        ".hitech-order-choice-grid"
                    );


                parent
                    .querySelectorAll("button")
                    .forEach(item => {

                        item.classList.remove(
                            "hitech-order-choice-selected"
                        );

                    });


                button.classList.add(
                    "hitech-order-choice-selected"
                );

            }
        );

    });


    /* ========================================================
       RMB ELEMENTS
    ======================================================== */

    const rmbButtons =
        document.querySelectorAll(
            ".hitech-order-rmb-choice"
        );

    const currencySymbol =
        document.getElementById(
            "hitech-order-currency-symbol"
        );

    const rmbAmount =
        document.getElementById(
            "hitech-order-rmb-amount"
        );

    const rmbRate =
        document.getElementById(
            "hitech-order-rmb-rate"
        );

    const rmbResult =
        document.getElementById(
            "hitech-order-rmb-result"
        );


    /* ========================================================
       RMB RATES

       These are intentionally NOT real-time rates.

       Replace null with your backend/API values.

       BUY:
       Naira required for 1 RMB.

       SELL:
       Naira received for 1 RMB.
    ======================================================== */

    const HITECH_RMB_BUY_RATE = null;

    const HITECH_RMB_SELL_RATE = null;


    /* ========================================================
       RMB DIRECTION
    ======================================================== */

    function hitechOrderSetRmbDirection(direction) {

        selectedRmbDirection =
            direction;


        rmbButtons.forEach(button => {

            button.classList.toggle(
                "hitech-order-rmb-choice-active",
                button.dataset.rmbDirection === direction
            );

        });


        if (direction === "buy") {

            currencySymbol.textContent =
                "₦";

            rmbRate.textContent =
                HITECH_RMB_BUY_RATE
                    ? `₦${HITECH_RMB_BUY_RATE.toLocaleString()} / ¥1`
                    : "RATE_PLACEHOLDER";

        }


        if (direction === "sell") {

            currencySymbol.textContent =
                "¥";

            rmbRate.textContent =
                HITECH_RMB_SELL_RATE
                    ? `₦${HITECH_RMB_SELL_RATE.toLocaleString()} / ¥1`
                    : "RATE_PLACEHOLDER";

        }


        hitechOrderCalculateRmb();

    }


    /* ========================================================
       RMB BUTTON EVENTS
    ======================================================== */

    rmbButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                hitechOrderSetRmbDirection(
                    button.dataset.rmbDirection
                );

            }
        );

    });


    /* ========================================================
       RMB CALCULATOR
    ======================================================== */

    function hitechOrderCalculateRmb() {

        const amount =
            parseFloat(
                rmbAmount.value
            );


        if (
            !amount ||
            amount <= 0
        ) {

            rmbResult.textContent =
                "—";

            return;

        }


        /* ================================================
           BUY RMB WITH NAIRA

           ₦ amount / ₦ per RMB = RMB
        ================================================= */

        if (
            selectedRmbDirection === "buy"
        ) {

            if (
                !HITECH_RMB_BUY_RATE
            ) {

                rmbResult.textContent =
                    "—";

                return;

            }


            const result =
                amount /
                HITECH_RMB_BUY_RATE;


            rmbResult.textContent =
                `¥${result.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`;

        }


        /* ================================================
           SELL RMB FOR NAIRA

           RMB amount × ₦ per RMB = Naira
        ================================================= */

        if (
            selectedRmbDirection === "sell"
        ) {

            if (
                !HITECH_RMB_SELL_RATE
            ) {

                rmbResult.textContent =
                    "—";

                return;

            }


            const result =
                amount *
                HITECH_RMB_SELL_RATE;


            rmbResult.textContent =
                `₦${result.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`;

        }

    }


    rmbAmount?.addEventListener(
        "input",
        hitechOrderCalculateRmb
    );


    /* ========================================================
       INITIAL RMB STATE
    ======================================================== */

    hitechOrderSetRmbDirection(
        "buy"
    );


    /* ========================================================
       BACKEND-READY SUBMISSION
    ======================================================== */

    async function hitechSubmitOrder(data) {

        /*
         * FRONTEND-ONLY PLACEHOLDER
         *
         * Later connect this to your backend:
         *
         * const response = await fetch(
         *     "/api/service-request",
         *     {
         *         method: "POST",
         *         headers: {
         *             "Content-Type": "application/json"
         *         },
         *         body: JSON.stringify(data)
         *     }
         * );
         *
         * return response.json();
         */


        console.log(
            "HiTECH service request:",
            data
        );


        /*
         * Simulate successful preparation.
         */

        return {
            success: true
        };

    }


    /* ========================================================
       COLLECT SELECTED OPTIONS
    ======================================================== */

    function hitechCollectOrderData() {

        const data = {

            service:
                hitechOrderServices[
                    selectedService
                ].name,

            name:
                document.getElementById(
                    "hitech-order-name"
                ).value.trim(),

            email:
                document.getElementById(
                    "hitech-order-email"
                ).value.trim(),

            rmbDirection:
                selectedRmbDirection

        };


        /* Collect text fields */

        const activeForm =
            document.querySelector(
                ".hitech-order-form-content.hitech-order-form-active"
            );


        if (activeForm) {

            activeForm
                .querySelectorAll(
                    "input, textarea"
                )
                .forEach(field => {

                    if (field.value.trim()) {

                        data[field.name] =
                            field.value.trim();

                    }

                });


            /* Collect selected choice */

            const selectedChoice =
                activeForm.querySelector(
                    ".hitech-order-choice-selected"
                );


            if (selectedChoice) {

                data.selectedOption =
                    selectedChoice.textContent.trim();

            }

        }


        /* RMB */

        if (
            selectedService === "rmb"
        ) {

            data.rmbAmount =
                rmbAmount.value;

            data.rmbRate =
                selectedRmbDirection === "buy"
                    ? HITECH_RMB_BUY_RATE
                    : HITECH_RMB_SELL_RATE;

        }


        return data;

    }


    /* ========================================================
       FORM VALIDATION
    ======================================================== */

    function hitechValidateOrder() {

        const name =
            document.getElementById(
                "hitech-order-name"
            ).value.trim();

        const email =
            document.getElementById(
                "hitech-order-email"
            ).value.trim();


        if (!name) {

            alert(
                "Please enter your name."
            );

            return false;

        }


        if (!email) {

            alert(
                "Please enter your email address."
            );

            return false;

        }


        return true;

    }


    /* ========================================================
       SUBMIT REQUEST
    ======================================================== */

    submitButton.addEventListener(
        "click",
        async () => {

            if (
                !hitechValidateOrder()
            ) {

                return;

            }


            const data =
                hitechCollectOrderData();


            submitButton.disabled =
                true;


            submitButton.querySelector(
                "span"
            ).textContent =
                "Preparing Request...";


            try {

                const result =
                    await hitechSubmitOrder(
                        data
                    );


                if (
                    result.success
                ) {

                    /*
                     * Hide configuration
                     */

                    document.querySelectorAll(
                        ".hitech-order-form-content, .hitech-order-basic-details, .hitech-order-submit-area"
                    ).forEach(element => {

                        element.style.display =
                            "none";

                    });


                    /*
                     * Show confirmation
                     */

                    successState.classList.add(
                        "hitech-order-success-visible"
                    );


                    /*
                     * Scroll confirmation
                     * into comfortable view.
                     */

                    setTimeout(() => {

                        successState.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }, 100);

                }

            } catch (error) {

                console.error(
                    "HiTECH request error:",
                    error
                );

                submitButton.disabled =
                    false;

                submitButton.querySelector(
                    "span"
                ).textContent =
                    "Submit Request";

                alert(
                    "Something went wrong. Please try again."
                );

            }

        }
    );


    /* ========================================================
       RESET / START ANOTHER REQUEST
    ======================================================== */

    resetButton.addEventListener(
        "click",
        () => {

            /*
             * Clear inputs
             */

            document
                .querySelectorAll(
                    ".hitech-order-input-group input, .hitech-order-input-group textarea"
                )
                .forEach(input => {

                    input.value = "";

                });


            /*
             * Clear choice buttons
             */

            choiceButtons.forEach(button => {

                button.classList.remove(
                    "hitech-order-choice-selected"
                );

            });


            /*
             * Hide confirmation
             */

            successState.classList.remove(
                "hitech-order-success-visible"
            );


            /*
             * Restore form visibility
             */

            document.querySelectorAll(
                ".hitech-order-form-content"
            ).forEach(content => {

                content.style.display = "";

            });


            document.querySelector(
                ".hitech-order-basic-details"
            ).style.display = "";

            document.querySelector(
                ".hitech-order-submit-area"
            ).style.display = "";


            /*
             * Restore button
             */

            submitButton.disabled =
                false;

            submitButton.querySelector(
                "span"
            ).textContent =
                "Submit Request";


            /*
             * Return to top of configurator
             */

            config.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );


    /* ========================================================
       INTERSECTION OBSERVER
    ======================================================== */

    const revealElements =
        document.querySelectorAll(
            ".hitech-order-reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "hitech-order-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* ========================================================
       INITIAL SERVICE
    ======================================================== */

    hitechOrderSelectService(
        "procurement"
    );

});


/* =========================================================
   HITECH PRODUCTS
   PRODUCT DATABASE + SEARCH + FILTER + PAGINATION
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: 1,
        name: "Avatr 11 2024",
        image: "img/1.jpg",
        category: "Vehicles",
        description:
            "Futuristic luxury electric vehicle combining advanced technology, comfort and modern design."
    },

    {
        id: 2,
        name: "Xiaomi SU7",
        image: "img/2.jpg",
        category: "Vehicles",
        description:
            "Next-generation electric vehicle designed around intelligent mobility and high performance."
    },

    {
        id: 3,
        name: "BYD SEAL U DM-i",
        image: "img/3.jpg",
        category: "Vehicles",
        description:
            "Modern electrified vehicle offering efficient transportation and advanced driving technology."
    },

    {
        id: 4,
        name: "Electric Vehicle",
        image: "img/4.jpg",
        category: "Vehicles",
        description:
            "Modern electric mobility solution designed for efficient and sustainable transportation."
    },

    {
        id: 5,
        name: "Premium Vehicle",
        image: "img/5.jpg",
        category: "Vehicles",
        description:
            "Premium transportation solution combining contemporary styling with practical performance."
    },

    {
        id: 6,
        name: "Commercial Vehicle",
        image: "img/6.jpg",
        category: "Vehicles",
        description:
            "Reliable commercial transportation solution for modern business and logistics applications."
    },

    {
        id: 7,
        name: "Heavy Truck",
        image: "img/7.jpg",
        category: "Vehicles",
        description:
            "Powerful heavy-duty truck engineered for demanding transportation and logistics operations."
    },

    {
        id: 8,
        name: "Electric Truck",
        image: "img/8.jpg",
        category: "Vehicles",
        description:
            "Efficient electric commercial vehicle designed for cleaner and smarter transportation."
    },

    {
        id: 9,
        name: "Logistics Truck",
        image: "img/9.jpg",
        category: "Vehicles",
        description:
            "Dependable logistics vehicle designed to support commercial transportation requirements."
    },

    {
        id: 10,
        name: "Agricultural Tractor",
        image: "img/10.jpg",
        category: "Agriculture",
        description:
            "Agricultural machinery designed to improve productivity across demanding farming operations."
    },

    {
        id: 11,
        name: "Farm Machinery",
        image: "img/11.jpg",
        category: "Agriculture",
        description:
            "Practical agricultural equipment sourced for modern farming and field operations."
    },

    {
        id: 12,
        name: "Harvesting Equipment",
        image: "img/12.jpg",
        category: "Agriculture",
        description:
            "Efficient harvesting equipment designed to support commercial agricultural productivity."
    },

    {
        id: 13,
        name: "Combine Harvester",
        image: "img/13.jpg",
        category: "Agriculture",
        description:
            "High-capacity agricultural machinery for efficient crop harvesting and field operations."
    },

    {
        id: 14,
        name: "Agricultural Equipment",
        image: "img/14.jpg",
        category: "Agriculture",
        description:
            "Reliable machinery and equipment for a wide range of agricultural applications."
    },

    {
        id: 15,
        name: "Farm Equipment",
        image: "img/15.jpg",
        category: "Agriculture",
        description:
            "Modern farming equipment selected for performance, durability and operational efficiency."
    },

    {
        id: 16,
        name: "Excavator",
        image: "img/16.jpg",
        category: "Construction",
        description:
            "Heavy-duty excavator engineered for demanding construction and earthmoving applications."
    },

    {
        id: 17,
        name: "Crawler Excavator",
        image: "img/17.jpg",
        category: "Construction",
        description:
            "Powerful tracked excavator designed for stability, digging performance and demanding sites."
    },

    {
        id: 18,
        name: "Wheel Loader",
        image: "img/18.jpg",
        category: "Construction",
        description:
            "Versatile construction machine designed for loading, handling and material movement."
    },

    {
        id: 19,
        name: "Construction Machinery",
        image: "img/19.jpg",
        category: "Construction",
        description:
            "Heavy machinery selected for demanding construction, infrastructure and development projects."
    },

    {
        id: 20,
        name: "Earthmoving Equipment",
        image: "img/20.jpg",
        category: "Construction",
        description:
            "Durable earthmoving equipment built to perform across demanding construction environments."
    },

    {
        id: 21,
        name: "Industrial Machine",
        image: "img/21.jpg",
        category: "Industrial",
        description:
            "Industrial equipment designed to support efficient manufacturing and commercial operations."
    },

    {
        id: 22,
        name: "Industrial Equipment",
        image: "img/22.jpg",
        category: "Industrial",
        description:
            "Reliable industrial technology sourced for businesses requiring dependable equipment."
    },

    {
        id: 23,
        name: "Factory Equipment",
        image: "img/23.jpg",
        category: "Industrial",
        description:
            "Professional equipment designed for modern factories, production environments and facilities."
    },

    {
        id: 24,
        name: "Processing Machine",
        image: "img/24.jpg",
        category: "Processing",
        description:
            "Modern processing machinery designed to improve production efficiency and consistency."
    },

    {
        id: 25,
        name: "Food Processing Equipment",
        image: "img/25.jpg",
        category: "Processing",
        description:
            "Processing equipment suitable for modern food production and commercial processing operations."
    },

    {
        id: 26,
        name: "Production Machine",
        image: "img/26.jpg",
        category: "Processing",
        description:
            "Production machinery designed for reliable operation and scalable commercial applications."
    },

    {
        id: 27,
        name: "Packaging Equipment",
        image: "img/27.jpg",
        category: "Processing",
        description:
            "Efficient packaging equipment designed for modern production and distribution environments."
    },

    {
        id: 28,
        name: "Material Handling Equipment",
        image: "img/28.jpg",
        category: "Equipment",
        description:
            "Equipment designed to improve material movement, handling and operational efficiency."
    },

    {
        id: 29,
        name: "Power Equipment",
        image: "img/29.jpg",
        category: "Equipment",
        description:
            "Reliable equipment solutions sourced for commercial, industrial and operational applications."
    },

    {
        id: 30,
        name: "Specialized Equipment",
        image: "img/30.jpg",
        category: "Equipment",
        description:
            "Specialized equipment selected to support demanding professional and industrial requirements."
    },

    {
        id: 31,
        name: "Industrial Vehicle",
        image: "img/31.jpg",
        category: "Equipment",
        description:
            "Industrial transportation equipment designed for demanding commercial environments."
    },

    {
        id: 32,
        name: "Heavy Equipment",
        image: "img/32.jpg",
        category: "Equipment",
        description:
            "Heavy-duty equipment designed to deliver dependable performance across demanding applications."
    },

    {
        id: 33,
        name: "Commercial Machinery",
        image: "img/33.jpg",
        category: "Industrial",
        description:
            "Commercial machinery sourced to support modern businesses and industrial operations."
    },

    {
        id: 34,
        name: "Advanced Machinery",
        image: "img/34.jpg",
        category: "Industrial",
        description:
            "Advanced machinery combining modern engineering with dependable commercial performance."
    },

    {
        id: 35,
        name: "Specialized Machine",
        image: "img/35.jpg",
        category: "Equipment",
        description:
            "Specialized machine solution designed for professional applications and demanding operations."
    },

    {
        id: 36,
        name: "Professional Equipment",
        image: "img/36.jpg",
        category: "Equipment",
        description:
            "Professional-grade equipment selected for performance, durability and practical business use."
    }

];


/* =========================================================
   SETTINGS
========================================================= */

const productsPerPage = 12;

let currentPage = 1;

let activeCategory = "All";

let searchTerm = "";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("hitechProductGrid");

const pagination =
    document.getElementById("hitechPagination");

const searchInput =
    document.getElementById("hitechProductSearch");

const clearSearch =
    document.getElementById("hitechClearSearch");

const searchBox =
    document.querySelector(".hitech-products-search");

const filters =
    document.querySelectorAll(".hitech-products-filter");

const resultsText =
    document.getElementById("hitechResultsText");

const pageText =
    document.getElementById("hitechPageText");

const emptyState =
    document.getElementById("hitechEmptyState");

const resetButton =
    document.getElementById("hitechResetProducts");

const productCount =
    document.getElementById("hitechProductCount");


/* =========================================================
   PRODUCT COUNTER
========================================================= */

productCount.textContent =
    `${products.length}+`;


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    return products.filter(product => {

        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const search =
            searchTerm.toLowerCase().trim();

        const matchesSearch =
            !search ||
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;

    });

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts =
        getFilteredProducts();

    const totalProducts =
        filteredProducts.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalProducts /
                productsPerPage
            )
        );


    /* make sure page remains valid */

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const start =
        (currentPage - 1) *
        productsPerPage;

    const end =
        start +
        productsPerPage;

    const visibleProducts =
        filteredProducts.slice(
            start,
            end
        );


    /* clear */

    productGrid.innerHTML = "";


    /* empty */

    if (totalProducts === 0) {

        emptyState.classList.add("visible");

        pagination.innerHTML = "";

        resultsText.textContent =
            "0 PRODUCTS FOUND";

        pageText.textContent =
            "PAGE 00 / 00";

        return;

    }


    emptyState.classList.remove("visible");


    /* results */

    resultsText.textContent =
        `${totalProducts} PRODUCTS FOUND`;


    pageText.textContent =
        `PAGE ${String(currentPage).padStart(2,"0")} / ${String(totalPages).padStart(2,"0")}`;


    /* cards */

    visibleProducts.forEach(
        (product, index) => {

            const card =
                createProductCard(
                    product
                );

            productGrid.appendChild(card);


            /* stagger animation */

            setTimeout(() => {

                card.classList.add(
                    "hitech-visible"
                );

            }, index * 55);

        }
    );


    renderPagination(totalPages);

}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "hitech-products-card";


    card.innerHTML = `

        <div class="hitech-products-card-image">

            <span class="hitech-products-card-number">
                ${String(product.id).padStart(2,"0")}
            </span>

            <span class="hitech-products-card-category">
                ${product.category.toUpperCase()}
            </span>

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

        </div>


        <div class="hitech-products-card-content">

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <button
                type="button"
                class="hitech-products-view"
                data-product-id="${product.id}"
            >

                <span>
                    VIEW DETAILS
                </span>

                <span>
                    →
                </span>

            </button>

        </div>

    `;


    return card;

}


/* =========================================================
   PAGINATION
========================================================= */

function renderPagination(totalPages) {

    pagination.innerHTML = "";


    if (totalPages <= 1) {
        return;
    }


    /* previous */

    const previous =
        createPageButton(
            "←",
            currentPage > 1,
            () => {

                if (currentPage > 1) {

                    currentPage--;

                    updateProducts();

                }

            }
        );

    previous.classList.add("arrow");

    pagination.appendChild(previous);


    /* numbers */

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            createPageButton(
                String(i).padStart(2,"0"),
                true,
                () => {

                    currentPage = i;

                    updateProducts();

                }
            );


        if (i === currentPage) {

            button.classList.add(
                "active"
            );

        }


        pagination.appendChild(button);

    }


    /* next */

    const next =
        createPageButton(
            "→",
            currentPage < totalPages,
            () => {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    updateProducts();

                }

            }
        );

    next.classList.add("arrow");

    pagination.appendChild(next);

}


/* =========================================================
   CREATE PAGE BUTTON
========================================================= */

function createPageButton(
    text,
    enabled,
    callback
) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "hitech-products-page-button";

    button.textContent = text;

    button.disabled = !enabled;

    button.addEventListener(
        "click",
        callback
    );

    return button;

}


/* =========================================================
   UPDATE PRODUCTS
========================================================= */

function updateProducts() {

    productGrid.style.opacity = "0";

    productGrid.style.transform =
        "translateY(10px)";


    setTimeout(() => {

        renderProducts();

        productGrid.style.transition =
            "opacity .35s ease, transform .35s ease";

        requestAnimationFrame(() => {

            productGrid.style.opacity = "1";

            productGrid.style.transform =
                "translateY(0)";

        });

    }, 180);

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            activeCategory =
                filter.dataset.category;


            currentPage = 1;

            updateProducts();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value;


        currentPage = 1;


        if (
            searchTerm.trim()
        ) {

            searchBox.classList.add(
                "has-value"
            );

        } else {

            searchBox.classList.remove(
                "has-value"
            );

        }


        updateProducts();

    }
);


/* =========================================================
   CLEAR SEARCH
========================================================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchTerm = "";

        currentPage = 1;

        searchBox.classList.remove(
            "has-value"
        );

        updateProducts();

        searchInput.focus();

    }
);


/* =========================================================
   RESET
========================================================= */

resetButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchTerm = "";

        activeCategory = "All";

        currentPage = 1;


        filters.forEach(filter => {

            filter.classList.remove(
                "active"
            );

        });


        document
            .querySelector(
                '.hitech-products-filter[data-category="All"]'
            )
            .classList.add("active");


        searchBox.classList.remove(
            "has-value"
        );


        updateProducts();

    }
);


/* =========================================================
   PRODUCT MODAL
========================================================= */

const modal =
    document.getElementById(
        "hitechProductModal"
    );

const modalImage =
    document.getElementById(
        "hitechModalImage"
    );

const modalTitle =
    document.getElementById(
        "hitechModalTitle"
    );

const modalDescription =
    document.getElementById(
        "hitechModalDescription"
    );

const modalNumber =
    document.getElementById(
        "hitechModalNumber"
    );

const modalCategory =
    document.getElementById(
        "hitechModalCategory"
    );

const modalCategoryBottom =
    document.getElementById(
        "hitechModalCategoryBottom"
    );

const modalProductNumber =
    document.getElementById(
        "hitechModalProductNumber"
    );

const modalClose =
    document.getElementById(
        "hitechModalClose"
    );

const modalBackdrop =
    document.querySelector(
        ".hitech-products-modal-backdrop"
    );


/* =========================================================
   OPEN MODAL
========================================================= */

function openProductModal(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;

    modalTitle.textContent =
        product.name;

    modalDescription.textContent =
        product.description;

    modalNumber.textContent =
        String(product.id)
        .padStart(2,"0");

    modalCategory.textContent =
        product.category.toUpperCase();

    modalCategoryBottom.textContent =
        product.category;

    modalProductNumber.textContent =
        `HITECH-${String(product.id).padStart(3,"0")}`;


    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   CARD CLICK
========================================================= */

productGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".hitech-products-view"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.productId
            );


        openProductModal(id);

    }
);


/* =========================================================
   CLOSE EVENTS
========================================================= */

modalClose.addEventListener(
    "click",
    closeProductModal
);


modalBackdrop.addEventListener(
    "click",
    closeProductModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeProductModal();

        }

    }
);


/* =========================================================
   REQUEST BUTTON
========================================================= */

document
    .getElementById(
        "hitechRequestProduct"
    )
    .addEventListener(
        "click",
        () => {

            const productName =
                modalTitle.textContent;

            /*
             * You can connect this button
             * to your service/order page later.
             */

            window.location.href =
                `contact.html?product=${encodeURIComponent(productName)}`;

        }
    );


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "hitech-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


/* =========================================================
   INITIAL RENDER
========================================================= */

renderProducts();


/* =========================================================
   OBSERVE CARDS
========================================================= */

setTimeout(() => {

    document
        .querySelectorAll(
            ".hitech-products-card"
        )
        .forEach(card => {

            observer.observe(card);

        });

}, 100);
/* =========================================================
   HITECH CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function handleNavbar() {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbar
    );


    handleNavbar();



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                 Close mobile Bootstrap menu
                */

                const navigation =
                    document.querySelector(
                        "#mainNavigation"
                    );


                if (
                    navigation &&
                    navigation.classList.contains("show")
                ) {

                    const navbarToggle =
                        document.querySelector(
                            ".navbar-toggler"
                        );


                    if (navbarToggle) {

                        navbarToggle.click();

                    }

                }

            }
        );

    });



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form =
        document.querySelector(
            "#contact-form"
        );


    if (!form) return;


    const submitButton =
        document.querySelector(
            "#submitButton"
        );


    const submitText =
        document.querySelector(
            "#submitText"
        );


    const submitLoader =
        document.querySelector(
            "#submitLoader"
        );


    const submitIcon =
        document.querySelector(
            "#submitIcon"
        );


    const successMessage =
        document.querySelector(
            "#formSuccess"
        );


    const errorMessage =
        document.querySelector(
            "#formError"
        );



    /* =====================================================
       FORM ELEMENTS
    ===================================================== */

    const nameInput =
        document.querySelector("#name");


    const emailInput =
        document.querySelector("#email");


    const phoneInput =
        document.querySelector("#phone");


    const serviceInput =
        document.querySelector("#service");


    const subjectInput =
        document.querySelector("#subject");


    const messageInput =
        document.querySelector("#message");



    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */


    function showSuccess() {

        successMessage.classList.add("show");

        errorMessage.classList.remove("show");


        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }



    function showError() {

        errorMessage.classList.add("show");

        successMessage.classList.remove("show");

    }



    function hideMessages() {

        successMessage.classList.remove("show");

        errorMessage.classList.remove("show");

    }



    function setLoading(isLoading) {


        if (isLoading) {

            submitButton.disabled = true;

            submitButton.classList.add(
                "loading"
            );

        } else {

            submitButton.disabled = false;

            submitButton.classList.remove(
                "loading"
            );

        }

    }



    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }



    /* =====================================================
       FIELD VALIDATION
    ===================================================== */

    function setFieldError(
        input,
        message
    ) {

        const field =
            input.closest(
                ".form-field"
            );


        if (!field) return;


        const error =
            field.querySelector(
                ".field-error"
            );


        field.classList.add(
            "invalid"
        );

        field.classList.remove(
            "valid"
        );


        if (error) {

            error.textContent =
                message;

        }

    }



    function setFieldValid(input) {

        const field =
            input.closest(
                ".form-field"
            );


        if (!field) return;


        const error =
            field.querySelector(
                ".field-error"
            );


        field.classList.remove(
            "invalid"
        );

        field.classList.add(
            "valid"
        );


        if (error) {

            error.textContent =
                "";

        }

    }



    function validateForm() {

        let valid = true;


        /* NAME */

        if (
            !nameInput.value.trim()
        ) {

            setFieldError(
                nameInput,
                "Please enter your name."
            );

            valid = false;

        } else {

            setFieldValid(
                nameInput
            );

        }



        /* EMAIL */

        if (
            !emailInput.value.trim()
        ) {

            setFieldError(
                emailInput,
                "Please enter your email."
            );

            valid = false;

        }

        else if (
            !isValidEmail(
                emailInput.value.trim()
            )
        ) {

            setFieldError(
                emailInput,
                "Please enter a valid email."
            );

            valid = false;

        }

        else {

            setFieldValid(
                emailInput
            );

        }



        /* SERVICE */

        if (
            !serviceInput.value
        ) {

            setFieldError(
                serviceInput,
                "Please select a service."
            );

            valid = false;

        } else {

            setFieldValid(
                serviceInput
            );

        }



        /* SUBJECT */

        if (
            !subjectInput.value.trim()
        ) {

            setFieldError(
                subjectInput,
                "Please enter a subject."
            );

            valid = false;

        } else {

            setFieldValid(
                subjectInput
            );

        }



        /* MESSAGE */

        if (
            !messageInput.value.trim()
        ) {

            setFieldError(
                messageInput,
                "Please enter your message."
            );

            valid = false;

        } else if (
            messageInput.value.trim().length < 10
        ) {

            setFieldError(
                messageInput,
                "Please provide a little more detail."
            );

            valid = false;

        } else {

            setFieldValid(
                messageInput
            );

        }


        return valid;

    }



    /* =====================================================
       LIVE VALIDATION
    ===================================================== */

    const inputs = [
        nameInput,
        emailInput,
        phoneInput,
        serviceInput,
        subjectInput,
        messageInput
    ];


    inputs.forEach(function (input) {

        if (!input) return;


        input.addEventListener(
            "input",
            function () {

                hideMessages();


                const field =
                    input.closest(
                        ".form-field"
                    );


                if (!field) return;


                /*
                 Validate only if user
                 has already entered something
                */

                if (
                    input.value.trim()
                ) {

                    if (
                        input === emailInput
                    ) {

                        if (
                            isValidEmail(
                                input.value.trim()
                            )
                        ) {

                            setFieldValid(
                                input
                            );

                        }

                    }

                    else if (
                        input === messageInput
                    ) {

                        if (
                            input.value.trim().length >= 10
                        ) {

                            setFieldValid(
                                input
                            );

                        }

                    }

                    else {

                        setFieldValid(
                            input
                        );

                    }

                }

            }
        );

    });



    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            hideMessages();


            /*
             Validate first
            */

            const isValid =
                validateForm();


            if (!isValid) {

                const firstError =
                    form.querySelector(
                        ".invalid input, .invalid select, .invalid textarea"
                    );


                if (firstError) {

                    firstError.focus();

                }


                return;

            }


            /*
             Start loading
            */

            setLoading(true);


            try {


                /*
                 Collect form data
                */

                const formData =
                    new FormData(form);


                /*
                 Send directly to Formspree
                */

                const response =
                    await fetch(
                        form.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /*
                 Check response
                */

                if (
                    response.ok
                ) {


                    /*
                     Success
                    */

                    form.reset();


                    /*
                     Remove validation
                     states
                    */

                    inputs.forEach(
                        function (input) {

                            if (!input) return;


                            const field =
                                input.closest(
                                    ".form-field"
                                );


                            if (!field) return;


                            field.classList.remove(
                                "valid"
                            );

                            field.classList.remove(
                                "invalid"
                            );


                            const error =
                                field.querySelector(
                                    ".field-error"
                                );


                            if (error) {

                                error.textContent =
                                    "";

                            }

                        }
                    );


                    showSuccess();


                } else {


                    /*
                     Formspree returned
                     an error
                    */

                    let errorText =
                        "";


                    try {

                        const data =
                            await response.json();


                        if (
                            data &&
                            data.errors &&
                            data.errors.length
                        ) {

                            errorText =
                                data.errors
                                    .map(
                                        error =>
                                            error.message
                                    )
                                    .join(" ");

                        }

                    } catch (error) {

                        /*
                         Ignore JSON parsing
                         error
                        */

                    }


                    showError();


                    if (errorText) {

                        const errorParagraph =
                            errorMessage.querySelector(
                                "p"
                            );


                        if (errorParagraph) {

                            errorParagraph.textContent =
                                errorText;

                        }

                    }

                }


            } catch (error) {


                /*
                 Network error
                */

                console.error(
                    "Form submission error:",
                    error
                );


                showError();


            } finally {


                /*
                 Stop loading
                */

                setLoading(false);

            }

        }
    );



    /* =====================================================
       PREVENT ACCIDENTAL DOUBLE SUBMISSION
    ===================================================== */

    let isSubmitting = false;


    form.addEventListener(
        "submit",
        function () {

            if (isSubmitting) {

                return;

            }


            isSubmitting = true;


            setTimeout(
                function () {

                    isSubmitting = false;

                },
                5000
            );

        }
    );


    /* =====================================================
       ESCAPE KEY
       CLOSE FORM MESSAGES
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                hideMessages();

            }

        }
    );


});
/* =========================================================
   HITECH CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       NAVBAR
    ====================================================== */

    const navbar =
        document.getElementById("mainNavbar");


    function handleNavbarScroll() {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );


    handleNavbarScroll();



    /* =====================================================
       MOBILE NAVBAR CLOSE
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            "#navbarMenu .nav-link, #navbarMenu .nav-cta"
        );


    const navbarMenu =
        document.getElementById(
            "navbarMenu"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth < 992 &&
                    navbarMenu.classList.contains("show")
                ) {

                    const toggle =
                        document.querySelector(
                            ".navbar-toggler"
                        );


                    if (toggle) {

                        toggle.click();

                    }

                }

            }
        );

    });



    /* =====================================================
       FORM
    ====================================================== */

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    const nameInput =
        document.getElementById("name");


    const emailInput =
        document.getElementById("email");


    const phoneInput =
        document.getElementById("phone");


    const serviceInput =
        document.getElementById("service");


    const subjectInput =
        document.getElementById("subject");


    const messageInput =
        document.getElementById("messageText");


    const sendButton =
        document.getElementById(
            "sendButton"
        );


    const successMessage =
        document.getElementById(
            "successMessage"
        );


    const errorMessage =
        document.getElementById(
            "errorMessage"
        );



    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }



    /* =====================================================
       ERROR HANDLING
    ====================================================== */

    function showFieldError(
        input,
        message
    ) {

        const wrapper =
            input.closest(
                ".col-md-6, .col-12"
            );


        if (!wrapper) return;


        const inputBox =
            wrapper.querySelector(
                ".input-group-custom"
            );


        const error =
            wrapper.querySelector(
                ".error-text"
            );


        if (inputBox) {

            inputBox.classList.add(
                "invalid"
            );

        }


        if (error) {

            error.textContent =
                message;

        }

    }



    function clearFieldError(input) {

        const wrapper =
            input.closest(
                ".col-md-6, .col-12"
            );


        if (!wrapper) return;


        const inputBox =
            wrapper.querySelector(
                ".input-group-custom"
            );


        const error =
            wrapper.querySelector(
                ".error-text"
            );


        if (inputBox) {

            inputBox.classList.remove(
                "invalid"
            );

        }


        if (error) {

            error.textContent =
                "";

        }

    }



    /* =====================================================
       VALIDATE FORM
    ====================================================== */

    function validateForm() {

        let valid = true;


        /* NAME */

        if (
            !nameInput.value.trim()
        ) {

            showFieldError(
                nameInput,
                "Please enter your name."
            );

            valid = false;

        } else {

            clearFieldError(
                nameInput
            );

        }



        /* EMAIL */

        if (
            !emailInput.value.trim()
        ) {

            showFieldError(
                emailInput,
                "Please enter your email."
            );

            valid = false;

        }

        else if (
            !validEmail(
                emailInput.value.trim()
            )
        ) {

            showFieldError(
                emailInput,
                "Please enter a valid email."
            );

            valid = false;

        }

        else {

            clearFieldError(
                emailInput
            );

        }



        /* SERVICE */

        if (
            !serviceInput.value
        ) {

            showFieldError(
                serviceInput,
                "Please select a service."
            );

            valid = false;

        } else {

            clearFieldError(
                serviceInput
            );

        }



        /* SUBJECT */

        if (
            !subjectInput.value.trim()
        ) {

            showFieldError(
                subjectInput,
                "Please enter a subject."
            );

            valid = false;

        } else {

            clearFieldError(
                subjectInput
            );

        }



        /* MESSAGE */

        if (
            !messageInput.value.trim()
        ) {

            showFieldError(
                messageInput,
                "Please enter your message."
            );

            valid = false;

        }

        else if (
            messageInput.value.trim().length < 10
        ) {

            showFieldError(
                messageInput,
                "Please provide more details."
            );

            valid = false;

        }

        else {

            clearFieldError(
                messageInput
            );

        }


        return valid;

    }



    /* =====================================================
       HIDE ALERTS
    ====================================================== */

    function hideAlerts() {

        successMessage.classList.remove(
            "show"
        );

        errorMessage.classList.remove(
            "show"
        );

    }



    /* =====================================================
       LOADING STATE
    ====================================================== */

    function setLoading(state) {

        if (state) {

            sendButton.disabled =
                true;

            sendButton.classList.add(
                "loading"
            );

        } else {

            sendButton.disabled =
                false;

            sendButton.classList.remove(
                "loading"
            );

        }

    }



    /* =====================================================
       SUBMIT FORM
    ====================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            hideAlerts();


            /*
             Validate
            */

            if (
                !validateForm()
            ) {

                const firstInvalid =
                    form.querySelector(
                        ".invalid"
                    );


                if (firstInvalid) {

                    const input =
                        firstInvalid.querySelector(
                            "input, select, textarea"
                        );


                    if (input) {

                        input.focus();

                    }

                }


                return;

            }


            /*
             Start loading
            */

            setLoading(true);


            try {


                /*
                 Create form data
                */

                const formData =
                    new FormData(form);


                /*
                 Submit to Formspree
                */

                const response =
                    await fetch(
                        form.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /*
                 Success
                */

                if (
                    response.ok
                ) {

                    form.reset();


                    /*
                     Remove errors
                    */

                    form.querySelectorAll(
                        ".input-group-custom"
                    ).forEach(
                        function (box) {

                            box.classList.remove(
                                "invalid"
                            );

                        }
                    );


                    form.querySelectorAll(
                        ".error-text"
                    ).forEach(
                        function (error) {

                            error.textContent =
                                "";

                        }
                    );


                    successMessage.classList.add(
                        "show"
                    );


                    /*
                     Scroll to success
                    */

                    successMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                } else {


                    /*
                     Formspree error
                    */

                    errorMessage.classList.add(
                        "show"
                    );

                }


            } catch (error) {


                console.error(
                    "HiTECH contact form error:",
                    error
                );


                errorMessage.classList.add(
                    "show"
                );


            } finally {

                setLoading(false);

            }

        }
    );



    /* =====================================================
       LIVE FIELD VALIDATION
    ====================================================== */

    const fields = [
        nameInput,
        emailInput,
        phoneInput,
        serviceInput,
        subjectInput,
        messageInput
    ];


    fields.forEach(function (field) {

        if (!field) return;


        field.addEventListener(
            "input",
            function () {

                hideAlerts();


                /*
                 Remove error once
                 user starts correcting
                */

                const wrapper =
                    field.closest(
                        ".col-md-6, .col-12"
                    );


                if (!wrapper) return;


                const inputBox =
                    wrapper.querySelector(
                        ".input-group-custom"
                    );


                const error =
                    wrapper.querySelector(
                        ".error-text"
                    );


                if (
                    field.value.trim()
                ) {

                    if (inputBox) {

                        inputBox.classList.remove(
                            "invalid"
                        );

                    }


                    if (error) {

                        error.textContent =
                            "";

                    }

                }

            }
        );

    });



    /* =====================================================
       SELECT VALIDATION
    ====================================================== */

    serviceInput.addEventListener(
        "change",
        function () {

            hideAlerts();

            clearFieldError(
                serviceInput
            );

        }
    );



    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                hideAlerts();

            }

        }
    );

});
/* =========================================================
   HITECH ABOUT PAGE JAVASCRIPT
   NO FRAMEWORK DEPENDENCY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENT REFERENCES
    ====================================================== */

    const header =
        document.getElementById(
            "hitechAboutHeader"
        );


    const mobileTrigger =
        document.getElementById(
            "hitechAboutMobileTrigger"
        );


    const mobileNavigation =
        document.getElementById(
            "hitechAboutMobileNavigation"
        );


    const mobileClose =
        document.getElementById(
            "hitechAboutMobileClose"
        );


    const backTop =
        document.getElementById(
            "hitechAboutBackTop"
        );


    const currentYear =
        document.getElementById(
            "hitechAboutCurrentYear"
        );



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function openMobileMenu() {

        if (!mobileNavigation) {
            return;
        }


        mobileNavigation.classList.add(
            "open"
        );


        mobileNavigation.setAttribute(
            "aria-hidden",
            "false"
        );


        if (mobileTrigger) {

            mobileTrigger.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        document.body.style.overflow =
            "hidden";

    }


    function closeMobileMenu() {

        if (!mobileNavigation) {
            return;
        }


        mobileNavigation.classList.remove(
            "open"
        );


        mobileNavigation.setAttribute(
            "aria-hidden",
            "true"
        );


        if (mobileTrigger) {

            mobileTrigger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        document.body.style.overflow =
            "";

    }


    if (mobileTrigger) {

        mobileTrigger.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    if (mobileNavigation) {

        mobileNavigation.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    mobileNavigation
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    document
        .querySelectorAll(
            ".hitech-about-mobile-navigation-links a"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            }
        );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function updateBackTop() {

        if (!backTop) {
            return;
        }


        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    updateBackTop();


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       HERO MOUSE PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(
            ".hitech-about-hero"
        );


    const heroVisual =
        document.querySelector(
            ".hitech-about-hero-visual"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        hero &&
        heroVisual &&
        !reducedMotion
    ) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth < 992
                ) {
                    return;
                }


                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - 0.5;


                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - 0.5;


                heroVisual.style.transform =
                    `
                    translate(
                        ${x * 7}px,
                        ${y * 7}px
                    )
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                heroVisual.style.transform =
                    "";

            }
        );

    }



    /* =====================================================
       SERVICE CARD INTERACTION
    ====================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".hitech-about-service-card"
        );


    serviceCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.style.zIndex =
                        "5";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.zIndex =
                        "";

                }
            );

        }
    );



    /* =====================================================
       INTERNAL SMOOTH LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );



    /* =====================================================
       MOBILE RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >= 992
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       SAFETY FALLBACK
       IMPORTANT:
       Text is already visible through CSS.
       This JavaScript does NOT control visibility.
    ====================================================== */

    document
        .querySelectorAll(
            ".hitech-about-service-card, " +
            ".hitech-about-why-card, " +
            ".hitech-about-value-card, " +
            ".hitech-about-process-card"
        )
        .forEach(
            function (element) {

                element.setAttribute(
                    "data-hitech-ready",
                    "true"
                );

            }
        );


});
/* =========================================================
   HITECH HOMEPAGE
   COMPLETELY ISOLATED JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRODUCT CAROUSEL
       Completely independent from existing carousel logic
    ===================================================== */

    const carousel =
        document.getElementById(
            "hitechHomeProductCarousel"
        );

    if (carousel) {

        const slides =
            carousel.querySelectorAll(
                ".hitech-home-product-slide"
            );

        const progressButtons =
            carousel.querySelectorAll(
                ".hitech-home-product-progress button"
            );

        const prevButton =
            document.getElementById(
                "hitechHomeProductPrev"
            );

        const nextButton =
            document.getElementById(
                "hitechHomeProductNext"
            );


        let currentSlide = 0;

        let autoplayTimer = null;


        /* =================================================
           SHOW SLIDE
        ================================================= */

        function showSlide(index) {

            if (!slides.length) {
                return;
            }


            if (index < 0) {

                index =
                    slides.length - 1;

            }


            if (index >= slides.length) {

                index = 0;

            }


            currentSlide = index;


            /* Slides */

            slides.forEach(
                (slide, slideIndex) => {

                    slide.classList.toggle(
                        "active",
                        slideIndex === currentSlide
                    );

                }
            );


            /* Progress */

            progressButtons.forEach(
                (button, buttonIndex) => {

                    button.classList.toggle(
                        "active",
                        buttonIndex === currentSlide
                    );

                }
            );

        }


        /* =================================================
           NEXT
        ================================================= */

        function nextSlide() {

            showSlide(
                currentSlide + 1
            );

        }


        /* =================================================
           PREVIOUS
        ================================================= */

        function previousSlide() {

            showSlide(
                currentSlide - 1
            );

        }


        /* =================================================
           BUTTONS
        ================================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();

                    restartAutoplay();

                }
            );

        }


        if (prevButton) {

            prevButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    restartAutoplay();

                }
            );

        }


        /* =================================================
           NUMBERED INDICATORS
        ================================================= */

        progressButtons.forEach(
            (button, index) => {

                button.addEventListener(
                    "click",
                    function () {

                        showSlide(index);

                        restartAutoplay();

                    }
                );

            }
        );


        /* =================================================
           AUTOPLAY
        ================================================= */

        function startAutoplay() {

            stopAutoplay();


            autoplayTimer =
                setInterval(
                    function () {

                        nextSlide();

                    },
                    6000
                );

        }


        function stopAutoplay() {

            if (autoplayTimer) {

                clearInterval(
                    autoplayTimer
                );

                autoplayTimer = null;

            }

        }


        function restartAutoplay() {

            stopAutoplay();

            startAutoplay();

        }


        /* =================================================
           PAUSE WHILE HOVERING
        ================================================= */

        carousel.addEventListener(
            "mouseenter",
            function () {

                stopAutoplay();

            }
        );


        carousel.addEventListener(
            "mouseleave",
            function () {

                startAutoplay();

            }
        );


        /* =================================================
           TOUCH / SWIPE
        ================================================= */

        let touchStartX = 0;

        let touchEndX = 0;


        carousel.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        carousel.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }


                restartAutoplay();

            },
            { passive: true }
        );


        /* =================================================
           KEYBOARD CONTROL
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !carousel.matches(":hover")
                ) {
                    return;
                }


                if (
                    event.key === "ArrowRight"
                ) {

                    nextSlide();

                    restartAutoplay();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousSlide();

                    restartAutoplay();

                }

            }
        );


        /* INITIAL */

        showSlide(0);

        startAutoplay();

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "hitechHomeBackTop"
        );


    function updateBackTop() {

        if (!backTop) {
            return;
        }


        if (window.scrollY > 700) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );


    updateBackTop();


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       INTERNAL HOMEPAGE LINKS
    ===================================================== */

    document
        .querySelectorAll(
            ".hitech-home-root a[href^='#']"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute("href");


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );

});

/* =========================================================
   HAZOOND ABOUT EXPERIENCE
   Completely isolated vanilla JavaScript
========================================================= */

(() => {

    "use strict";


    const HazoondAboutExperience = {

        root: null,

        mobileMenu: null,

        menuToggle: null,

        mobileClose: null,

        backTop: null,

        valueCards: [],

        valueTitle: null,

        valueDescription: null,


        /* =================================================
           VALUE CONTENT
        ================================================= */

        values: {

            reliability: {
                title: "Reliability",
                description:
                    "We focus on dependable services and professional solutions."
            },

            innovation: {
                title: "Innovation",
                description:
                    "We combine creative thinking with modern technology to solve problems."
            },

            global: {
                title: "Global Connection",
                description:
                    "We help connect businesses with products, services and international opportunities."
            },

            customer: {
                title: "Customer Focus",
                description:
                    "We prioritize communication, convenience and customer satisfaction."
            },

            professional: {
                title: "Professionalism",
                description:
                    "We approach every project with responsibility and attention to detail."
            },

            technology: {
                title: "Technology Driven",
                description:
                    "We combine business knowledge with modern digital technologies."
            }

        },


        /* =================================================
           INITIALIZATION
        ================================================= */

        init() {

            this.root =
                document.querySelector(
                    ".haz-about-root"
                );

            if (!this.root) {
                return;
            }


            this.mobileMenu =
                this.root.querySelector(
                    "#hazAboutMobileMenu"
                );


            this.menuToggle =
                this.root.querySelector(
                    "#hazAboutMenuToggle"
                );


            this.mobileClose =
                this.root.querySelector(
                    "#hazAboutMobileClose"
                );


            this.backTop =
                this.root.querySelector(
                    "#hazAboutBackTop"
                );


            this.valueCards = [
                ...this.root.querySelectorAll(
                    ".haz-about-value-card"
                )
            ];


            this.valueTitle =
                this.root.querySelector(
                    "#hazAboutValueTitle"
                );


            this.valueDescription =
                this.root.querySelector(
                    "#hazAboutValueDescription"
                );


            this.setCurrentYear();

            this.initMobileNavigation();

            this.initValueSystem();

            this.initBackToTop();

            this.initScrollReveal();

            this.initSmoothAnchors();

            this.initHeroInteraction();

            this.preventExternalBodyThemeInterference();

        },


        /* =================================================
           CURRENT YEAR
        ================================================= */

        setCurrentYear() {

            const yearElement =
                this.root.querySelector(
                    "#hazAboutYear"
                );

            if (!yearElement) {
                return;
            }

            yearElement.textContent =
                new Date().getFullYear();

        },


        /* =================================================
           MOBILE NAVIGATION
        ================================================= */

        initMobileNavigation() {

            if (
                !this.mobileMenu ||
                !this.menuToggle
            ) {
                return;
            }


            const openMenu = () => {

                this.mobileMenu.classList.add(
                    "is-open"
                );

                this.mobileMenu.setAttribute(
                    "aria-hidden",
                    "false"
                );

                this.menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                document.documentElement.style
                    .overflow = "hidden";

            };


            const closeMenu = () => {

                this.mobileMenu.classList.remove(
                    "is-open"
                );

                this.mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

                this.menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.documentElement.style
                    .overflow = "";

            };


            this.menuToggle.addEventListener(
                "click",
                openMenu
            );


            this.mobileClose?.addEventListener(
                "click",
                closeMenu
            );


            this.mobileMenu
                .querySelectorAll("a")
                .forEach(link => {

                    link.addEventListener(
                        "click",
                        closeMenu
                    );

                });


            document.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Escape" &&
                        this.mobileMenu.classList
                            .contains("is-open")
                    ) {

                        closeMenu();

                    }

                }
            );

        },


        /* =================================================
           VALUE SYSTEM
        ================================================= */

        initValueSystem() {

            if (
                !this.valueCards.length ||
                !this.valueTitle ||
                !this.valueDescription
            ) {
                return;
            }


            this.valueCards.forEach(card => {

                const activate =
                    () => {

                        this.valueCards.forEach(
                            currentCard => {

                                currentCard.classList.toggle(
                                    "is-active",
                                    currentCard === card
                                );

                            }
                        );


                        const key =
                            card.dataset.value;


                        const valueData =
                            this.values[key];


                        if (!valueData) {
                            return;
                        }


                        this.valueTitle.textContent =
                            valueData.title;


                        this.valueDescription.textContent =
                            valueData.description;

                    };


                card.addEventListener(
                    "click",
                    activate
                );


                card.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            activate();

                        }

                    }
                );

            });

        },


        /* =================================================
           BACK TO TOP
        ================================================= */

        initBackToTop() {

            if (!this.backTop) {
                return;
            }


            const updateVisibility =
                () => {

                    if (
                        window.scrollY > 650
                    ) {

                        this.backTop.classList.add(
                            "is-visible"
                        );

                    } else {

                        this.backTop.classList.remove(
                            "is-visible"
                        );

                    }

                };


            window.addEventListener(
                "scroll",
                updateVisibility,
                { passive: true }
            );


            this.backTop.addEventListener(
                "click",
                () => {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


            updateVisibility();

        },


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        initScrollReveal() {

            if (
                !("IntersectionObserver" in window)
            ) {

                return;

            }


            const elements =
                this.root.querySelectorAll(
                    ".haz-about-story-principle, " +
                    ".haz-about-direction-card, " +
                    ".haz-about-service-item, " +
                    ".haz-about-core-value, " +
                    ".haz-about-process-step"
                );


            elements.forEach(
                element => {

                    element.classList.add(
                        "haz-about-reveal"
                    );

                }
            );


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: .14
                    }
                );


            elements.forEach(
                element => {

                    observer.observe(element);

                }
            );

        },


        /* =================================================
           SMOOTH INTERNAL LINKS
        ================================================= */

        initSmoothAnchors() {

            const anchors =
                this.root.querySelectorAll(
                    'a[href^="#"]'
                );


            anchors.forEach(anchor => {

                anchor.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            anchor
                                .getAttribute("href")
                                ?.substring(1);


                        if (!targetId) {
                            return;
                        }


                        const target =
                            this.root.querySelector(
                                `#${CSS.escape(targetId)}`
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const header =
                            this.root.querySelector(
                                ".haz-about-header"
                            );


                        const offset =
                            header
                                ? header.offsetHeight + 15
                                : 15;


                        const targetTop =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            offset;


                        window.scrollTo({
                            top: targetTop,
                            behavior: "smooth"
                        });

                    }
                );

            });

        },


        /* =================================================
           HERO MICRO INTERACTION
        ================================================= */

        initHeroInteraction() {

            const visual =
                this.root.querySelector(
                    ".haz-about-hero-visual"
                );


            const frame =
                this.root.querySelector(
                    ".haz-about-hero-frame"
                );


            if (
                !visual ||
                !frame
            ) {
                return;
            }


            const reduceMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                );


            if (reduceMotion.matches) {
                return;
            }


            visual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        visual.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left)
                        / rect.width
                        - .5;


                    const y =
                        (event.clientY - rect.top)
                        / rect.height
                        - .5;


                    frame.style.transform =
                        `perspective(1100px)
                         rotateY(${x * 4}deg)
                         rotateX(${y * -3}deg)`;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    frame.style.transform = "";

                }
            );

        },


        /* =================================================
           PROTECT PAGE FROM BLACK GLOBAL THEME
        ================================================= */

        preventExternalBodyThemeInterference() {

            /*
             * Intentionally scoped.
             * We do not modify body/html globally.
             * The page establishes its own background
             * through .haz-about-root and its sections.
             */

            this.root.style.background =
                "#FFFDFC";

            this.root.style.color =
                "#2A1810";

        }

    };


    /* =====================================================
       SAFE START
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => {
                HazoondAboutExperience.init();
            },
            {
                once: true
            }
        );

    } else {

        HazoondAboutExperience.init();

    }

})();
