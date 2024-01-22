const mobileBtn = document.querySelector(".btn-mobile-nav");
const menuIcon = document.querySelector('.icon-mobil-nav[name="menu"]');
const closeIcon = document.querySelector('.icon-mobil-nav[name="close"]');
const side_nav = document.querySelector(".side-nav");

let visible = false;

mobileBtn.addEventListener("click", function () {
  visible = !visible;

  menuIcon.style.display = visible ? "none" : "block";
  closeIcon.style.display = visible ? "block" : "none";

  if (visible) {
    side_nav.style.display = "block";
    side_nav.style.opacity = 1;
    side_nav.style.zIndex = 1;
    side_nav.style.visibility = "visible";
  } else {
    side_nav.style.display = "none";
    side_nav.style.opacity = 0;
    side_nav.style.visibility = "hidden";
  }
});

// uppdatera år i footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Active nav-bar
const navLinksEl = document.querySelectorAll(".main-nav-link");

navLinksEl.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    document.querySelector(".activate").classList.remove("activate");
    navLink.classList.add("activate");
  });
});

// Här definierar jag funktionen som ändrar mellan ljus och mörkt läge
function toggleDarkMode() {
  toggle.classList.toggle("active");
  body.classList.toggle("active");

  // Här sparar jag valet i localStorage
  const darkModeEnabled = body.classList.contains("active");
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
toggle.addEventListener("click", toggleDarkMode);
