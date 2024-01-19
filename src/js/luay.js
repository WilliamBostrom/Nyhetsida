

import axios from "axios";


let fetchData = [];
let checkingIndex = 0;
async function fetchNews() {
  const apiKey =
    "pub_364847766bd024d75ae2f1bd0f148a57c4faf&country=se&language=sv";
  const API_URL = `https://newsdata.io/api/1/news?apikey=${apiKey}`;

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
  console.error("Error fetching news:", error)
}
}
fetchNews();

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
    if(checkingIndex >= 1) {
      return `<div class="news-secondary-box">
      <div class="news-secondary-textbox">
      <h3 class="heading-news">${news.title}</h3>
      <p class="text-normal">${news.description}</p>
      <a href="${news.link}" target="_blank">Läs mer</a></div>
      <img class="small-img" src="${news.img}" alt="" srcset="" width="40%" height="40%"/>
</div>`;
    }
  })
  .join();
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
