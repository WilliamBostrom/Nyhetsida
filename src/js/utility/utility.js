////
// Början för få fram extra meny

const mobileBtn = document.querySelector(".btn-mobile-nav");
const menuIcon = document.querySelector('.icon-mobil-nav[name="menu"]');
const closeIcon = document.querySelector('.icon-mobil-nav[name="close"]');
let visible = false;

mobileBtn.addEventListener("click", function () {
  visible = !visible; // Byter värdet mellan true och false vid varje klick

  menuIcon.style.display = visible ? "none" : "block";
  closeIcon.style.display = visible ? "block" : "none";
});
