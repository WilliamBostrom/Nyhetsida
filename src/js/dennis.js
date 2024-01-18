import axios from "axios";

const url =
  "https://newsdata.io/api/1/news?apikey=pub_364847766bd024d75ae2f1bd0f148a57c4faf&country=se&language=sv";

async function getNews() {
  try {
    const response = await axios.get(url);
    const newsData = response.data;
    console.log(newsData.results);
  } catch (err) {
    console.error(err);
    alert("Fel uppstod! Försök igen om ett tag.", err);
  }
}

getNews()
