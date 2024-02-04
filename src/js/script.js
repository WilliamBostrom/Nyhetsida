import axios from "axios";

import selectedSvg from "/star-select.svg";
import starSvg from "/star-!select.svg";

import { isLoggedIn, usersData } from "./william.js";

let fetchData = [];
let checkingIndex = 0;
let isAtTop = false;
let userIndex;

const newMainCard = document.querySelector(".news-main-card");

// Luays key
/* const API_KEY = "pub_364847766bd024d75ae2f1bd0f148a57c4faf"; */
// WILLES NYCKEL
/* const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5"; */
// const apiKey = "pub_3689763523f92753a85b5bf7a4f2ffadb650a";

// DENNIS NYCKEL
const apiKey = "pub_36893493e88538fc3b8e75bdf04433cf20888";
/* const apiKey = "pub_36893493e88538fc3b8e75bdf04433cf20888"; */
const newsHeading = document.querySelector(".heading-small");
const searchQuery = "sverige";
export const searchQuery1 = "dn";
const searchInrikes = "inrikes";
const searchSport = "sport";
const searchUtrikes = "utrikes";
// const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";
const API_URL_TOP = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery1}&country=se&language=sv`;

export function buildApiUrl(category) {
  return `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${category}&country=se&language=sv`;
}

const latestNews = document.getElementById("latestnews");
latestNews.addEventListener("click", () => {
  updateContent(buildApiUrl(searchQuery));
  newsHeading.innerHTML = `
  Senaste nytt | <a href="">Chas News</a>
   `;
});

const topNews = document.getElementById("topnews");
topNews.addEventListener("click", () => {
  updateContent(buildApiUrl(searchQuery1));
  newsHeading.innerHTML = `
  Toppnyheter | <a href="">Chas News</a>
   `;
});

const domestic = document.querySelectorAll(".inrikes");

domestic.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchInrikes));
    newsHeading.innerHTML = `  
  Inrikes | <a href="">Chas News</a>
  `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

const sport = document.querySelectorAll(".sport");
sport.forEach(function (btn) {
  btn.addEventListener("click", function () {
    updateContent(buildApiUrl(searchSport));
    newsHeading.innerHTML = `
  Sport | <a href="">Chas News</a>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

const utrikes = document.querySelectorAll(".utrikes");
utrikes.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchUtrikes));
    newsHeading.innerHTML = `
  Utrikes | <a href="">Chas News</a>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

async function fetchNews(API_URL) {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    const newsData = response.data;
    console.log(newsData);
    fetchData = newsData.results.map((news) => ({
      title: news.title,
      img: news.image_url,
      source: news.source_id,
      link: news.link,
      description: news.description,
      date: news.pubDate,
    }));
    return fetchData;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

export async function updateContent(API_URL) {
  try {
    const fetchData = await fetchNews(API_URL);
    findDuplicates(fetchData);
  } catch (error) {
    console.error("Error updating content:", error);
  }
}

// ... (Din övriga kod)

const sortByNewestDateButton = document.getElementById("sortByNewestDate");
const sortByOldestDateButton = document.getElementById("sortByOldestDate");
const sortByFirstAlfabetButton = document.getElementById("sortByFirstAlfabet");
const sortByLastAlfabetButton = document.getElementById("sortByLastAlfabet");

sortByNewestDateButton.addEventListener("click", () => {
  sortArticlesByNewestDate();
});

sortByOldestDateButton.addEventListener("click", () => {
  sortArticlesByOldestDate();
});

sortByFirstAlfabetButton.addEventListener("click", () => {
  sortArticlesByFirstAlfabet();
});

sortByLastAlfabetButton.addEventListener("click", () => {
  sortArticlesByLastAlfabet();
});

// Funktionen sorterar arrayen från senaste till äldsta
function sortArticlesByNewestDate() {
  fetchData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  displayFetchis(fetchData);
}

// Funktionen sorterar arrayen från äldsta till senaste
function sortArticlesByOldestDate() {
  fetchData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  displayFetchis(fetchData);
}

// Funktionen sorterar arrayen efter artikelns första alfabet
function sortArticlesByFirstAlfabet() {
  fetchData.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  displayFetchis(fetchData);
}

// Funktionen sorterar arrayen efter artikelns sista alfabet
function sortArticlesByLastAlfabet() {
  fetchData.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleB.localeCompare(titleA);
  });

  displayFetchis(fetchData);
}

// Funktion för att ta bort dubletter
function findDuplicates(fetchData) {
  const seenTitles = new Set();
  console.log("Set: ", seenTitles);

  const removedDuplicates = fetchData.filter((article) => {
    if (seenTitles.has(article.title)) {
      // Om dublett hittas så exkluderas objektet ur den nya arrayen
      return false;
    }
    // Lägg till titeln för att kunna se visade titlar
    seenTitles.add(article.title);
    // ingen dublett hittad
    return true;
  });

  if (removedDuplicates.length > 0) {
    displayFetchis(removedDuplicates, checkingIndex);
  } else {
    displayFetchis(fetchData, checkingIndex);
  }
}

// Lägger till en händelselyssnare för att kolla när man scrollar till toppen
/* window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    // Du är vid toppen av sidan
    isAtTop = true;
  } else {
    isAtTop = false;
  }

  if (isAtTop) {
    // Om man är vid toppen, görs en uppdatering och nya nyhetsartiklar trillar in så slipper man uppdatera sidan
    fetchNews();
  }
});

*/

// fetchNews(API_URL_TOP);
updateContent(buildApiUrl(searchQuery1));
export function displayFetchis(fetchData) {
  const newsSecondary = document.querySelector(".news-secondary");

  newsSecondary.innerHTML = "";

  fetchData
    .map((news, index) => {
      if (index % 3 === 0) {
        newsSecondary.innerHTML += `
          <div class="news-main-card">
            ${
              news.img !== null && news.img !== undefined
                ? `<img id="first-main-img" class="news-main-card-img" src="${news.img}" alt="" srcset="" width="100%" />`
                : ""
            }
            <div class="star-container">
            <img class="star-icon" src="${starSvg}" alt="" />
            <img class="selected-star-icon" src="${selectedSvg}" alt="" onclick="window.favourite(event)" />
          </div>
            <div>
              <h3 class="heading-large" id="first-main-heading">${
                news.title
              }</h3>
            </div>
            <div>
              ${
                news.description !== null && news.description !== undefined
                  ? `<div><p class="text-normal" id="first-main-lorem">${news.description}</p></div>`
                  : ""
              }
            </div>
            <a class="btn-text" href="${
              news.link
            }" target="_blank">Läs mer &rarr;</a>
          </div>`;
      } else {
        newsSecondary.innerHTML += `
          <div class="news-secondary-box">
            <div class="news-secondary-textbox">
              <h3 class="heading-news">${news.title}</h3>
              ${
                news.description !== null && news.description !== undefined
                  ? `<p class="text-normal">${news.description}</p>`
                  : ""
              }
              <a class="btn-text" href="${
                news.link
              }" target="_blank">Läs mer &rarr;</a>
            </div>
            <div class="star-container2">
              <img class="star-icon" src="${starSvg}" alt="" />
              <img class="selected-star-icon" src="${selectedSvg}" alt="" onclick="window.favourite(event)" />
            </div>
            ${
              news.img !== null && news.img !== undefined
                ? `<img class="small-img" src="${
                    news.img || ""
                  }" alt="" srcset="" width="40%" height="40%"/>`
                : ""
            }
          </div>`;
      }
    })
    .join("");
}

// Sökfunktionen som ansvarar för att båda main-nav-search-input och side-nav-search-input fungerar
function performSearch(searchText) {
  const lowercaseSearchText = searchText.toLowerCase();
  const newsBoxes = document.querySelectorAll(".news-secondary-box");
  const mainCards = document.querySelectorAll(".news-main-card");

  const searchForElements = [...newsBoxes, ...mainCards];

  searchForElements.forEach((element) => {
    const title = element
      .querySelector(".heading-news, .heading-large")
      .textContent.toLowerCase();
    element.classList.toggle("hidden", !title.includes(lowercaseSearchText));
  });
}

const searchBoxes = document.querySelectorAll(
  ".main-nav-search-input, .side-nav-search-input"
);

searchBoxes.forEach((searchBox) => {
  searchBox.addEventListener("keyup", () => {
    const searchText = searchBox.value;
    performSearch(searchText);
  });
});

/* INLOGGAD */
/* 
const favouritesBtn = document.getElementById("favourites");
const sectionNews = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");

let isFavouritesClicked = false;
let newContent = document.createElement("div");
 */
// Funktion för att hantera innehållet
/* async function handleContentClick(title, message) {
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
} */

// Favoritknappen
/* favouritesBtn.addEventListener("click", () => {
  if (!isFavouritesClicked) {
    isFavouritesClicked = true;
    handleContentClick("Favoriter", "favoriter");
  } else {
    return;
  }
}); */

/* FÖR FAVORITER */
/* 
let favArray = [];
window.favourite = async function (index) {
  if (!isLoggedIn) {
    alert("Måste logga in först");
  } else {
    let confirmFav = confirm("Lägg till i favoriter");
    if (confirmFav) {
      let copiedNews = { ...fetchData[index] };
      favArray.push(copiedNews);
      console.log(copiedNews);
      console.log(favArray);
      const usernameSignin = document.getElementById("username-signin");
      const usernameValue = usernameSignin.value;
      const storedUsersData =
        JSON.parse(localStorage.getItem("usersData")) || [];
      userIndex = storedUsersData.findIndex(
        (user) => user.name === usernameValue
      );

      if (userIndex >= 0) {
        storedUsersData[userIndex].favorites.push(copiedNews);
        localStorage.setItem("usersData", JSON.stringify(storedUsersData));
        alert("Nyheter har lagts till i favoriter!");
      }
    }
  }
};
 */
let channels = [];
let currentChannelIndex = 0;
let audioPlayer = document.querySelector("audio");
let mp3Player = document.querySelector(".mp3-player");
let isPlaying = false;

// Här hämtar jag kanaldata från en SR radio med hjälp av Axios.
axios
  .get("https://api.sr.se/api/v2/channels?format=json&size=100")
  .then((response) => {
    channels = response.data.channels;
  })
  .catch((error) => {
    console.error("Ett fel inträffade:", error);
  });

// Här lägger jag till eventlyssnare för att hantera kontrollknappar för kanalbyte och för att stoppa radion.
document.querySelector(".prev-btn").addEventListener("click", prevChannel);
document.querySelector(".next-btn").addEventListener("click", nextChannel);
document.querySelector(".play-btn").addEventListener("click", togglePlay);

// Här definierar jag en funktion för att uppdatera spelaren med aktuell kanal.
function updatePlayer(channelIndex) {
  const channel = channels[channelIndex];

  // Uppdaterar bilden och bakgrundsfärgen som följer med i anropet för spelaren.
  const player = document.querySelector(".mp3-player");
  player.style.backgroundImage = `url(${channel.image})`;
  player.style.backgroundColor = `#${channel.color}`;
  player.style.backgroundSize = "90%";

  audioPlayer.src = channel.liveaudio.url;
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Här definierar jag funktionen för att byta kanal bakåt.
function prevChannel() {
  if (currentChannelIndex > 0) {
    currentChannelIndex--;
  } else {
    currentChannelIndex = channels.length - 1;
  }
  updatePlayer(currentChannelIndex);
}
// Här definierar jag funktionen för att byta kanal framåt.
function nextChannel() {
  if (currentChannelIndex < channels.length - 1) {
    currentChannelIndex++;
  } else {
    currentChannelIndex = 0;
  }
  updatePlayer(currentChannelIndex);
}

// Här definierar jag en funktion för att byta mellan uppspelning och paus.
function togglePlay() {
  if (!isPlaying) {
    isPlaying = true;
    updatePlayer(currentChannelIndex);
    document.querySelector(".play-btn i").classList.remove("fa-play");
    document.querySelector(".play-btn i").classList.add("fa-pause");
    mp3Player.classList.add("rotate-background");
  } else {
    isPlaying = false;
    audioPlayer.pause();
    document.querySelector(".play-btn i").classList.remove("fa-pause");
    document.querySelector(".play-btn i").classList.add("fa-play");
    mp3Player.classList.remove("rotate-background");
  }
}

const btnLogOut = document.querySelector(".logout");
btnLogOut.addEventListener("click", () => {
  stopRadio();
});

function stopRadio() {
  isPlaying = false;
  audioPlayer.pause();
  document.querySelector(".play-btn i").classList.remove("fa-pause");
  document.querySelector(".play-btn i").classList.add("fa-play");
  mp3Player.classList.remove("rotate-background");
}

let qoute = document.getElementById("qoute");
let author = document.getElementById("author");
let btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";

let getQoute = () => {
  fetch(url).then((data) =>
    data.json().then((item) => {
      console.log(item.content);
      console.log(item.author);
      qoute.innerText = item.content;
      author.innerText = item.author;
    })
  );
};

window.addEventListener("load", getQoute);
btn.addEventListener("click", getQoute);

const openModalButton = document.getElementById("openModalButton");
const modal = document.getElementById("myModal");

openModalButton.addEventListener("click", function () {
  modal.style.display = "block";
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
