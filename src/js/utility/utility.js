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

// Logga in

// skapa nya användare
