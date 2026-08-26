const legalNavToggle = document.querySelector(".nav-toggle");
const legalNavLinks = document.querySelector(".nav-links");

if (legalNavToggle && legalNavLinks) {
    legalNavToggle.addEventListener("click", function () {
        const isOpen = legalNavLinks.classList.toggle("open");
        legalNavToggle.setAttribute("aria-expanded", String(isOpen));
    });

    legalNavLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
            legalNavLinks.classList.remove("open");
            legalNavToggle.setAttribute("aria-expanded", "false");
        });
    });
}
