/* import axios from "axios";

async function fetchNews() {
  const apiKey =
    "pub_364847766bd024d75ae2f1bd0f148a57c4faf&country=se&language=sv";
  const API_URL = `https://newsdata.io/api/1/news?apikey=${apiKey}`;

  try {
    const response = await axios.get(API_URL);
    const newsData = response.data;
    displayNews(newsData);
    console.log(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(newsData) {
  const newsContainer = document.querySelector(".news-main");
  newsContainer.innerHTML = "";

  if (newsData && newsData.results) {
    newsData.results.forEach((newsItem) => {
      const article = document.createElement("article");
      article.className = "news-item";

      if (newsItem.image_url) {
        const image = document.createElement("img");
        image.src = newsItem.image_url;
        article.appendChild(image);
      }

      const content = document.createElement("div");
      content.innerHTML = `<h2>${newsItem.title}</h2> <p>${newsItem.description}</p> <a href="${newsItem.link}" target="_blank">Läs mer</a>`;
      article.appendChild(content);

      newsContainer.appendChild(article);
    });
  } else {
    console.error("Invalid news data structure:", newsData);
  }
}

// Sökfunktionalitet
const searchBox = document.querySelector(".main-nav-search-input");
searchBox.addEventListener("keyup", () => {
  const searchText = searchBox.value.toLowerCase();
  const newsItems = document.querySelectorAll(".news-item");

  newsItems.forEach((item) => {
    const title = item.querySelector("h2").textContent.toLowerCase();
    if (title.includes(searchText)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchNews();
});
*/