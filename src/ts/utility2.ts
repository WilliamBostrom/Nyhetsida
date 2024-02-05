const mobileBtn = document.querySelector(".btn-mobile-nav") as HTMLButtonElement | null;
const menuIcon = document.querySelector('.icon-mobil-nav[name="menu"]') as HTMLOrSVGImageElement | null;
const closeIcon = document.querySelector('.icon-mobil-nav[name="close"]') as HTMLOrSVGImageElement | null;
const side_nav = document.querySelector(".side-nav") as HTMLDivElement | null;

let visible: boolean = false;

function openSideNav(): void {
  visible = true;
  if(menuIcon === null || closeIcon === null || side_nav === null){
    return
  }else{
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
  side_nav.style.display = "block";
  side_nav.style.opacity = "1";
  side_nav.style.zIndex = "1";
  side_nav.style.visibility = "visible";
  }
}

function closeSideNav(): void {
  visible = false;
  if(menuIcon === null || closeIcon === null || side_nav === null){
    return
  }else{
  menuIcon.style.display = "block";
  closeIcon.style.display = "none";
  side_nav.style.display = "none";
  side_nav.style.opacity = "0";
  side_nav.style.visibility = "hidden";
  }
}

mobileBtn?.addEventListener("click", function (e: Event):void {
  e.stopPropagation();
  if (!visible) {
    openSideNav();
  } else {
    closeSideNav();
  }
});

document.addEventListener("click", function (e: Event): void {
  if(side_nav === null || e.target === null){
    return
  }else{
  if (visible && e.target !== side_nav && !side_nav.contains(e.target as Node) && e.target !== mobileBtn) {
    closeSideNav();
  }
}
});

// uppdatera år i footer
const yearEl = document.querySelector(".year") as HTMLSpanElement;
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear.toString();

// Active nav-bar
const navLinksEl = document.querySelectorAll<HTMLAnchorElement>(".main-nav-link");

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
