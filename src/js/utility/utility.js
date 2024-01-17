const mobileBtn = document.querySelector(".btn-mobile-nav");
const menuIcon = document.querySelector('.icon-mobil-nav[name="menu"]');
const closeIcon = document.querySelector('.icon-mobil-nav[name="close"]');
const side_nav = document.querySelector(".side-nav");

let visible = false;

mobileBtn.addEventListener("click", function () {
  visible = !visible; // Toggle the value between true and false on each click

  menuIcon.style.display = visible ? "none" : "block";
  closeIcon.style.display = visible ? "block" : "none";

  // Toggle styles for side_nav based on the value of 'visible'
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
