// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".navlinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
}

// Current year
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}
