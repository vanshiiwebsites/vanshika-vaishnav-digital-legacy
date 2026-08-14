"use strict";

/* =========================================
   VANSHIKA VAISHNAV — DIGITAL LEGACY
   Main JavaScript
========================================= */


/* ---------- Select Elements ---------- */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navLinksContainer = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const backToTopButton = document.getElementById("backToTop");
const currentYearElement = document.getElementById("currentYear");


/* ---------- Set Current Year ---------- */

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


/* ---------- Mobile Navigation ---------- */

function closeMobileMenu() {
    if (!menuButton || !navLinksContainer) {
        return;
    }

    menuButton.classList.remove("active");
    navLinksContainer.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
}

function openMobileMenu() {
    if (!menuButton || !navLinksContainer) {
        return;
    }

    menuButton.classList.add("active");
    navLinksContainer.classList.add("open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
}

if (menuButton && navLinksContainer) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen =
            navLinksContainer.classList.contains("open");

        if (menuIsOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}


/* ---------- Close Menu After Link Click ---------- */

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});


/* ---------- Close Menu with Escape Key ---------- */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


/* ---------- Close Menu When Clicking Outside ---------- */

document.addEventListener("click", (event) => {
    if (!menuButton || !navLinksContainer) {
        return;
    }

    const clickedInsideMenu =
        navLinksContainer.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMobileMenu();
    }
});


/* ---------- Reset Navigation on Larger Screens ---------- */

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        closeMobileMenu();
    }
});


/* ---------- Header and Back-to-Top State ---------- */

function updateScrollControls() {
    const pageScroll = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", pageScroll > 35);
    }

    if (backToTopButton) {
        backToTopButton.classList.toggle(
            "visible",
            pageScroll > 550
        );
    }
}

window.addEventListener("scroll", updateScrollControls, {
    passive: true
});

updateScrollControls();


/* ---------- Back to Top ---------- */

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ---------- Reveal Elements on Scroll ---------- */

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* ---------- Highlight Active Navigation Link ---------- */

function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 160;
    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navigationLinks.forEach((link) => {
        const targetId = link
            .getAttribute("href")
            .replace("#", "");

        link.classList.toggle(
            "active",
            targetId === currentSectionId
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("load", updateActiveNavigation);


/* ---------- Smooth Internal Navigation ---------- */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetSelector =
                link.getAttribute("href");

            if (
                !targetSelector ||
                targetSelector === "#"
            ) {
                return;
            }

            const targetElement =
                document.querySelector(targetSelector);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const destination =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: destination,
                behavior: "smooth"
            });
        });
    });


/* ---------- Ensure Hero is Visible Immediately ---------- */

window.addEventListener("load", () => {
    const heroRevealElements =
        document.querySelectorAll(
            "#home .reveal"
        );

    heroRevealElements.forEach((element) => {
        element.classList.add("visible");
    });
});
