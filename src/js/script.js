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

