/* import axios from "axios";

const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";
 */
import { isLoggedIn, usersData } from "./utility/login";

const monitorBtn = document.getElementById("monitor");
const favouritesBtn = document.getElementById("favourites");
const sectionNews = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");

let isMonitorClicked = false;
let isFavouritesClicked = false;
let newContent = document.createElement("div");
// Funktion för att hantera innehållet
async function handleContentClick(title, message) {
  if (!isLoggedIn) {
    sectionHero.style.display = "none";
    newContent.className = "container-nocontent";
    newContent.innerHTML = `<h1 class="heading-large">${title}</h1><p class="text-normal"> Du behöver <a class="btn-link">logga in</a> för att se ${message}.</p>`;
    sectionNews.parentNode.insertBefore(newContent, sectionNews.nextSibling);
  } else {
    const usernameSignin = document.getElementById("username-signin");
    const userIndex = await usersData.findIndex(
      (user) => user.name === usernameSignin.value
    );
    let content;

    if (userIndex !== -1) {
      content = `<h1 class="heading-large">${title}</h1><p class="text-normal"> Finns inga ${message} att se än</p>`;
    } else {
      content = `<h1 class="heading-large">${title}</h1><p class="text-normal"> Det finns inga ${message} att se här än</p>`;
    }
    newContent.className = "container-nocontent";
    newContent.innerHTML = content;

    sectionNews.parentNode.insertBefore(newContent, sectionNews.nextSibling);
  }
}

// Bevakningsknappen
monitorBtn.addEventListener("click", () => {
  if (!isMonitorClicked) {
    isMonitorClicked = true;
    isFavouritesClicked = false;
    newContent.innerHTML = "";
    handleContentClick("Bevakningar", "dina bevakningar");
  } else {
    return;
  }
});

// Favoritknappen
favouritesBtn.addEventListener("click", () => {
  if (!isFavouritesClicked) {
    isFavouritesClicked = true;
    isMonitorClicked = false;
    handleContentClick("Favoriter", "dina favoriter");
  } else {
    return;
  }
});

/////////////////////////////////
/* TILLFÄLLIG TOPPNYHETSKNAPP */
/////////////////////////////////

const topNews = document.getElementById("topnews");
topNews.addEventListener("click", () => {
  sectionHero.style.display = "block";
  if (newContent) {
    newContent.innerHTML = "";
  }
  isFavouritesClicked = false;
  isMonitorClicked = false;
});

// Början på filtrera ut "Bevakningar"
/* 
// Hämta en lista med alla element som har klassen "monitor-image"
const imageElements = document.querySelectorAll(".star-container");

imageElements.forEach(function (element) {
  element.addEventListener("click", function () {
    monitorThis(element);
  });
});

let monitorQuery;
function monitorThis(element) {
  const itemStatus = element.getAttribute("data-item-inrikes");
  monitorQuery = itemStatus;
  console.log(monitorQuery);
}
 */
