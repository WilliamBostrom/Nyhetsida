/* import axios from "axios";

const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5"; */

/* import { isLoggedIn, usersData } from "./utility/login";

const monitorBtn = document.getElementById("monitor");
const favouritesBtn = document.getElementById("favourites");
const sectionNews = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");

let isMonitorClicked = false;
let isFavouritesClicked = false;
let newContent = document.createElement("div");
let userIndex;

// Funktion för att hantera innehållet
async function handleContentClick(title, message) {
  if (!isLoggedIn) {
    sectionHero.style.display = "none";
    newContent.className = "container-nocontent";
    newContent.innerHTML = `<h1 class="heading-large">${title}</h1><p class="text-normal"> Du behöver <a class="btn-link">logga in</a> för att se ${message}.</p>`;
    sectionNews.parentNode.insertBefore(newContent, sectionNews.nextSibling);
  } else {
    const usernameSignin = document.getElementById("username-signin");
    userIndex = await usersData.findIndex(
      (user) => user.name === usernameSignin.value
    );

    const storedUsersData = JSON.parse(localStorage.getItem("usersData")) || [];
    if (storedUsersData.length > 0 && storedUsersData[userIndex]) {
      usersData[userIndex] = storedUsersData[userIndex];
    }

    DisplayPerson(userIndex);
    let content;
    if (userIndex !== -1) {
      sectionHero.style.display = "none";
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
monitorBtn.addEventListener("click", async () => {
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

// Början på filtrera ut "Bevakningar"

const imageElements = document.querySelectorAll(".star-container");
imageElements.forEach(function (element) {
  element.addEventListener("click", function () {
    const usernameSignin = document.getElementById("username-signin");
    const userIndex = usersData.findIndex(
      (user) => user.name === usernameSignin.value
    );
    monitorThis(element, userIndex);
  });
});

// Uppdaterad monitorThis-funktion med userIndex
function monitorThis(element, userIndex) {
  const itemStatus = element.getAttribute("data-item-status");
  let monitorQuery = itemStatus;
  const storedUsersData = JSON.parse(localStorage.getItem("usersData")) || [];
  if (storedUsersData[userIndex].monitor.includes(monitorQuery)) {
    return;
  } else {
    storedUsersData[userIndex].monitor.push(monitorQuery);
    localStorage.setItem("usersData", JSON.stringify(storedUsersData));
  }
  DisplayPerson(userIndex);
}

function DisplayPerson(userIndex) {
  console.log(usersData[userIndex]);
  let monitor = usersData[userIndex].monitor;

  if (monitor.length > 0) {
    const firstValue = monitor[0];
    const secondValue = monitor[1];
    console.log("Första:", firstValue);
    console.log("Andra:", secondValue);
  } else {
    console.log("Inga favoriter tillagda ännu.");
  }
}

import axios from "axios";

const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";

const latestNews = document.getElementById("latestnews");

const searchQuery = "sverige";
const searchQuery1 = "aftonbladet";

// Toppnyheterknappen
const topNews = document.getElementById("topnews");
topNews.addEventListener("click", async () => {
  await fetchNews(API_URL_TOP);
  sectionHero.style.display = "block";
  if (newContent) {
    newContent.innerHTML = "";
  }
  isFavouritesClicked = false;
  isMonitorClicked = false;
});

const API_URL_LATEST = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery}&country=se&language=sv`;
const API_URL_TOP = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery1}&country=se&language=sv`;

latestNews.addEventListener("click", async () => {
  await fetchNews(API_URL_LATEST);
});

let fetchData = [];
let checkingIndex = 0;

const fetchNews = async function (API_URL) {
  try {
    const response = await axios.get(API_URL);
    const newsData = response.data;
    console.log(newsData);
    fetchData = newsData.results.map((news) => ({
      title: news.title,
      img: news.image_url,
      source: news.source_id,
      link: news.link,
      description: news.description,
    }));
    console.log(fetchData);
    displayFetchis(fetchData, checkingIndex);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
fetchNews(API_URL_LATEST);

const firstMainImg = document.getElementById("first-main-img");
const firstMainHeader = document.getElementById("first-main-heading");
const firstMainLorem = document.getElementById("first-main-lorem");

function displayFetchis(fetchData, checkingIndex) {
  firstMainImg.src = fetchData[checkingIndex].img;
  firstMainHeader.innerText = fetchData[checkingIndex].title;
  firstMainLorem.innerText = fetchData[checkingIndex].description;

  const newsSecondary = document.querySelector(".news-secondary");
  newsSecondary.innerHTML = fetchData
    .map((news, checkingIndex) => {
      if (checkingIndex >= 1) {
        return `<div class="news-secondary-box">
      <div class="news-secondary-textbox">
      <h3 class="heading-news">${news.title}</h3>
      <p class="text-normal">${news.description}</p>
      <a class="btn-text" href="${
        news.link
      }" target="_blank">Läs mer &rarr;</a></div>
      <img class="small-img" src="${
        news.img || ""
      }" alt="" srcset="" width="40%" height="40%"/>
</div>`;
      }
    })
    .join();
}
 */
