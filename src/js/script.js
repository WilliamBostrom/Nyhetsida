import axios from "axios";

import selectedSvg from "/star-select.svg";
import starSvg from "/star-!select.svg";

let fetchData = [];
let checkingIndex = 0;

// Luays key
// const apiKey = "pub_364847766bd024d75ae2f1bd0f148a57c4faf";
// const apiKey = "pub_364847766bd024d75ae2f1bd0f148a57c4fafa";
// // WILLES NYCKEL
// const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";
// const apiKey = "pub_3689763523f92753a85b5bf7a4f2ffadb650a";

// //Simons
// const apiKey = "pub_3677850ce73d96f2586086f013ecb9f63081f";

// DENNIS NYCKEL
const apiKey = "pub_36893493e88538fc3b8e75bdf04433cf20888a";
// const apiKey = "pub_36893493e88538fc3b8e75bdf04433cf20888";
const newsHeading = document.querySelector(".heading-small");
const searchQuery = "sverige";
export const searchQuery1 = "dn";
const searchInrikes = "inrikes";
const searchSport = "sport";
const searchUtrikes = "utrikes";
const searchTech = "tech";
const searchEkonomi = "ekonomi";
const searchPolitik = "politik";
// const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";
const API_URL_TOP = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery1}&country=se&language=sv`;

export function buildApiUrl(category) {
  return `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${category}&country=se&language=sv`;
}

const latestNews = document.getElementById("latestnews");
latestNews.addEventListener("click", () => {
  updateContent(buildApiUrl(searchQuery));
  newsHeading.innerHTML = `
  Senaste nytt
   `;
});

const topNews = document.getElementById("topnews");
topNews.addEventListener("click", () => {
  updateContent(buildApiUrl(searchQuery1));
  newsHeading.innerHTML = `
  Toppnyheter 
   `;
});

const domestic = document.querySelectorAll(".inrikes");

domestic.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchInrikes));
    newsHeading.innerHTML = `  
    <div class="center-img-heading">
    <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicInrikes.png&w=48&q=75" alt="bild på inrikes" width="50%" height="50%">
  <h3 class="heading-small">
  Inrikes</h3>
</div>
  `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

const sport = document.querySelectorAll(".sport");
sport.forEach(function (btn) {
  btn.addEventListener("click", function () {
    updateContent(buildApiUrl(searchSport));
    newsHeading.innerHTML = `
    <div class="center-img-heading">
      <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicSport.png&w=48&q=75" alt="bild på inrikes" width="50%" height="50%">
    <h3 class="heading-small">
    Sport</h3>
  </div>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

const utrikes = document.querySelectorAll(".utrikes");
utrikes.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchUtrikes));
    newsHeading.innerHTML = `
    <div class="center-img-heading">
    <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicUtrikes.png&w=48&q=75" alt="bild på inrikes" width="50%" height="50%">
  <h3 class="heading-small">
  Utrikes</h3>
</div>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});
const tech = document.querySelectorAll(".tech");
tech.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchTech));
    newsHeading.innerHTML = `
    <div class="center-img-heading">
    <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicTech.png&w=48&q=75" alt="bild på tech" width="50%" height="50%">
  <h3 class="heading-small">
  Tech</h3>
</div>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});
const ekonomi = document.querySelectorAll(".ekonomi");
ekonomi.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchEkonomi));
    newsHeading.innerHTML = `
    <div class="center-img-heading">
    <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicEkonomi.png&w=64&q=75" alt="bild på ekonomi" width="50%" height="50%">
  <h3 class="heading-small">
  Ekonomi</h3>
</div>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});
const politik = document.querySelectorAll(".politik");
politik.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateContent(buildApiUrl(searchPolitik));
    newsHeading.innerHTML = `
    <div class="center-img-heading">
    <img class="img-heading" src="https://omni.se/_next/image?url=https%3A%2F%2Fstorage.omni.se%2Fcategory_icons%2Fomni%2FicPolitik.png&w=64&q=75" alt="bild på ekonomi" width="50%" height="50%">
  <h3 class="heading-small">
  Politik</h3>
</div>
   `;
    document.querySelector(".activate").classList.remove("activate");
  });
});

async function fetchNews(API_URL) {
  try {
    const response = await axios.get(API_URL);
    // console.log(response);
    const newsData = response.data;
    // console.log(newsData);
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
  // console.log("Set: ", seenTitles);

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
                ? `<img id="first-main-img" class="news-main-card-img" src="${news.img}" alt="bild" srcset="" width="100%" />`
                : ""
            }
            <div class="star-container">
            <img class="star-icon" src="${starSvg}" alt="svg bild" />
            <img class="selected-star-icon" src="${selectedSvg}" alt="svg bild" onclick="window.favourite(event)" />
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
              <img class="star-icon" src="${starSvg}" alt="svg bild" />
              <img class="selected-star-icon" src="${selectedSvg}" alt="svg bild" onclick="window.favourite(event)" />
            </div>
            ${
              news.img !== null && news.img !== undefined
                ? `<img class="small-img" src="${
                    news.img || ""
                  }" alt="nyhet bild" srcset="" width="40%" height="40%"/>`
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

// Funktion för att initiera en radio med lyssnare och datahämtning
function initializeRadio(
  audioPlayerSelector,
  nextBtnSelector,
  playBtnSelector,
  prevBtnSelector,
  mp3PlayerSelector
) {
  let channels = [];
  let currentChannelIndex = 0;
  let audioPlayer = document.querySelector(audioPlayerSelector);
  let mp3Player = document.querySelector(mp3PlayerSelector);
  let mp3PlayerBonus = document.querySelector(".mp3-player-bonus");
  mp3Player.style.backgroundImage =
    'url("https://static-cdn.sr.se/images/132/2186745_512_512.jpg")';
  mp3PlayerBonus.style.backgroundImage =
    'url("https://static-cdn.sr.se/images/132/2186745_512_512.jpg")';
  mp3PlayerBonus.style.backgroundPosistion = "center";
  let isPlaying = false;

  // Hämta kanaldata
  axios
    .get("https://api.sr.se/api/v2/channels?format=json&size=100")
    .then((response) => {
      // console.log(response);
      channels = response.data.channels;
    })
    .catch((error) => {
      console.error("Ett fel inträffade:", error);
    });

  // Lägg till lyssnare för kontrollknappar
  document
    .querySelector(nextBtnSelector)
    .addEventListener("click", nextChannel);
  document
    .querySelector(prevBtnSelector)
    .addEventListener("click", prevChannel);
  document.querySelector(playBtnSelector).addEventListener("click", togglePlay);

  // Funktion för att uppdatera spelaren med aktuell kanal
  function updatePlayer(channelIndex) {
    const channel = channels[channelIndex];
    mp3Player.style.backgroundImage = `url(${channel.image})`;
    mp3Player.style.backgroundColor = `#${channel.color}`;
    mp3Player.style.backgroundSize = "90%";
    audioPlayer.src = channel.liveaudio.url;
    if (isPlaying) {
      audioPlayer.play();
    }
  }

  // Funktion för att byta kanal bakåt
  function prevChannel() {
    if (currentChannelIndex > 0) {
      currentChannelIndex--;
    } else {
      currentChannelIndex = channels.length - 1;
    }
    updatePlayer(currentChannelIndex);
  }

  // Funktion för att byta kanal framåt
  function nextChannel() {
    if (currentChannelIndex < channels.length - 1) {
      currentChannelIndex++;
    } else {
      currentChannelIndex = 0;
    }
    updatePlayer(currentChannelIndex);
  }

  // Funktion för att byta mellan uppspelning och paus
  function togglePlay() {
    const playBtnIcon = document.querySelector(playBtnSelector + " i");
    if (!isPlaying) {
      isPlaying = true;
      updatePlayer(currentChannelIndex);
      mp3Player.classList.add("rotate-background");
      playBtnIcon.classList.remove("fa-play");
      playBtnIcon.classList.add("fa-pause");
    } else {
      isPlaying = false;
      audioPlayer.pause();
      mp3Player.classList.remove("rotate-background");
      playBtnIcon.classList.remove("fa-pause");
      playBtnIcon.classList.add("fa-play");
    }
  }
}

// Initiera den första radion för desktop-layouten
initializeRadio(
  ".welcome-radio audio",
  ".controls .next-btn",
  ".controls .play-btn",
  ".controls .prev-btn",
  ".welcome-radio .mp3-player"
);

// Initiera den andra radion för mobil-layouten
initializeRadio(
  ".welcome-bonus .welcome-radio-bonus audio",
  ".bonus-control-btn.bonus-next-btn",
  ".bonus-control-btn.bonus-play-btn",
  ".bonus-control-btn.bonus-prev-btn",
  ".welcome-bonus .welcome-radio-bonus .mp3-player-bonus"
);
/* 

// Kod för att hämta citat
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let bigBtn = document.getElementById("btn"); // Knapp för stor skärm
let smallBtn = document.getElementById("bonus-q-btn"); // Knapp för liten skärm

const url = "https://api.quotable.io/random";

let getQuote = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.content);
      console.log(data.author);
      quote.innerText = data.content;
      author.innerText = data.author;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

// Funktion för att hämta citat när sidan laddas
window.addEventListener("load", () => {
  getQuote();
});
 */
// Lyssnare för båda knapparna
/* bigBtn.addEventListener("click", () => {
  getQuote();
}); */
/* 
smallBtn.addEventListener("click", () => {
  getQuote();
}); */

const openModalButtonFooter = document.getElementById("openModalButton");
const openModalButtonSideNav = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");

function openModalHandler() {
  modal.style.display = "block";
}

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

openModalButtonFooter.addEventListener("click", openModalHandler);
openModalButtonSideNav.addEventListener("click", openModalHandler);
