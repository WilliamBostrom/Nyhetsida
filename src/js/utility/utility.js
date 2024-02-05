"use strict";
const mobileBtn = document.querySelector(".btn-mobile-nav");
const menuIcon = document.querySelector('.icon-mobil-nav[name="menu"]');
const closeIcon = document.querySelector('.icon-mobil-nav[name="close"]');
const side_nav = document.querySelector(".side-nav");
let visible = false;
function openSideNav() {
    visible = true;
    if (menuIcon === null || closeIcon === null || side_nav === null) {
        return;
    }
    else {
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
        side_nav.style.display = "block";
        side_nav.style.opacity = "1";
        side_nav.style.zIndex = "1";
        side_nav.style.visibility = "visible";
    }
}
function closeSideNav() {
    visible = false;
    if (menuIcon === null || closeIcon === null || side_nav === null) {
        return;
    }
    else {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
        side_nav.style.display = "none";
        side_nav.style.opacity = "0";
        side_nav.style.visibility = "hidden";
    }
}
mobileBtn === null || mobileBtn === void 0 ? void 0 : mobileBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!visible) {
        openSideNav();
    }
    else {
        closeSideNav();
    }
});
document.addEventListener("click", function (e) {
    if (side_nav === null || e.target === null) {
        return;
    }
    else {
        if (visible && e.target !== side_nav && !side_nav.contains(e.target) && e.target !== mobileBtn) {
            closeSideNav();
        }
    }
});
// uppdatera år i footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear.toString();
// Active nav-bar
const navLinksEl = document.querySelectorAll(".main-nav-link");
navLinksEl.forEach((navLink) => {
    navLink.addEventListener("click", () => {
        var _a;
        (_a = document.querySelector(".activate")) === null || _a === void 0 ? void 0 : _a.classList.remove("activate");
        navLink.classList.add("activate");
    });
});
// Här definierar jag funktionen som ändrar mellan ljus och mörkt läge
function toggleDarkMode() {
    toggle === null || toggle === void 0 ? void 0 : toggle.classList.toggle("active");
    body === null || body === void 0 ? void 0 : body.classList.toggle("active");
    // Här sparar jag valet i localStorage
    const darkModeEnabled = body === null || body === void 0 ? void 0 : body.classList.contains("active");
    localStorage.setItem("darkMode", darkModeEnabled ? "enabled" : "disabled");
}
// Här hämtar jag body-elementet och knappen
const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
// Kontrollerar om det finns en sparad preferens i localStorage när sidan laddas
const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";
// Om det finns en sparad preferens, tillämpa den
if (isDarkModeEnabled) {
    toggleDarkMode();
}
// Lyssnare på knappen om den aktiverar/inaktiverar mörkt läge
toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", toggleDarkMode);
