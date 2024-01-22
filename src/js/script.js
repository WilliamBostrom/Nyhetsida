import axios from "axios";

let fetchData = [];
let checkingIndex = 0;
let isAtTop = false;

// Luays key
/* const API_KEY =
  "pub_364847766bd024d75ae2f1bd0f148a57c4faf&country=se&language=sv"; */

// WILLES NYCKEL
const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";

const searchQuery = "sverige";
const searchQuery1 = "aftonbladet";

const API_URL_LATEST = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery}&country=se&language=sv`;
const API_URL_TOP = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery1}&country=se&language=sv`;

const latestNews = document.getElementById("latestnews");
latestNews.addEventListener("click", async () => {
  await fetchNews(API_URL_LATEST);
});

// Toppnyheterknappen
const topNews = document.getElementById("topnews");
topNews.addEventListener("click", async () => {
  await fetchNews(API_URL_TOP);
});

async function fetchNews(API_URL) {
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
    findDuplicates(fetchData);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
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

fetchNews(API_URL_TOP);

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
    .join("");
}

// Sökfunktionalitet
const searchBox = document.querySelector(".main-nav-search-input");
searchBox.addEventListener("keyup", () => {
  const searchText = searchBox.value.toLowerCase();
  const newsBoxes = document.querySelectorAll(".news-secondary-box");

  newsBoxes.forEach((box) => {
    const title = box.querySelector(".heading-news").textContent.toLowerCase();
    if (title.includes(searchText)) {
      box.classList.remove("hidden");
    } else {
      box.classList.add("hidden");
    }
  });

  // Uppdaterar visningen för första artikeln
  if (firstMainHeader.innerText.toLowerCase().includes(searchText)) {
    firstMainImg.style.display = "";
    firstMainHeader.style.display = "";
    firstMainLorem.style.display = "";
  } else {
    firstMainImg.style.display = "none";
    firstMainHeader.style.display = "none";
    firstMainLorem.style.display = "none";
  }
});
