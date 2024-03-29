export {
  isLoggedIn,
  usersData,
  checkMail,
  checkRequired,
  checkInput,
  closeMembers,
  openLogin,
  closeLogin,
};
import axios from "axios";

///////////////////
// Bonus login
//////////////////

const bonusBtn = document.querySelector(".templates_create_btn");
const bonusContainer = document.querySelector(".bonus-mobile-container");
let bonusOpen = false;

// Funktion för att visa bonusContainer
function showBonusContainer() {
  bonusContainer.style.display = "block";
}

// Funktion för att dölja bonusContainer
function hideBonusContainer() {
  bonusContainer.style.display = "none";
}

// Hanterar fönstrets storleksändringar
function handleResize() {
  // Kontroll om fönstret är 1200px eller bredare
  if (window.innerWidth >= 1200) {
    // Om så är fallet, döljer bonus rutan
    hideBonusContainer();
  } else {
    // Om inte, visas bonus rutan om bonusOpen är true
    if (bonusOpen) {
      showBonusContainer();
    }
  }
}

// Klickhändelse för knappen
bonusBtn.addEventListener("click", () => {
  bonusOpen = !bonusOpen;
  if (bonusOpen) {
    showBonusContainer();
  } else {
    hideBonusContainer();
  }
});

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

//////////////////////
/* Modal bli medlem */
/////////////////////
const btnsOpenMember = document.querySelectorAll(".show-members");
const memberOverlay = document.querySelector(".member-overlay");
const memberContainer = document.querySelector(".signup-container");

// För varje bli member knapp
btnsOpenMember.forEach(function (btn) {
  btn.addEventListener("click", function () {
    openMembers();
    closeLogin();
  });
});

// Öppnar bli medlem
function openMembers() {
  memberContainer.classList.remove("hidden");
  memberOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

//Stänger bli medlem
function closeMembers() {
  memberContainer.classList.add("hidden");
  memberOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

// Om man trycker utanför rutan stängs den
memberOverlay.addEventListener("click", function () {
  closeMembers();
});

// Om man trycker Escape stängs member
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !memberContainer.classList.contains("hidden")) {
    closeMembers();
  }
});

/* /////////// */
/* BLI MEDLEM */
/* /////////// */

// const form = document.getElementById("signup-form")
const username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password");
// password2 = document.getElementById("password2");

let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

async function checkInput() {
  const allFields = [username, email, password, password2];

  const inputValid = await Promise.all(
    allFields.map(async (field) => {
      return field.parentElement.classList.contains("success");
    })
  );

  return inputValid;
}

// Kollar rutorna är fyllda
function checkRequired(inputAll) {
  inputAll.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `Obligatoriskt fält`);
    } else {
      showSuccess(input);
    }
  });
}

// Kolla att mailen är en mail
function checkMail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Ogiltig email");
  }
}

// Ser att lösenordet matchar
// function matchPassword(input1, input2) {
//   if (input1.value !== input2.value) {
//     showError(input2, "Lösenordet matchar inte");
//   } else {
//     showSuccess(input2);
//   }
// }

// Visa Error vid felaktiga rutor
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Lyckat skapat konto
async function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

////////////////////
/* MODAL LOGGA IN */
////////////////////
const formSignin = document.getElementById("signin-form"),
  usernameSignin = document.getElementById("username-signin"),
  loginPassword = document.getElementById("password-signin"),
  btnOpenLogin = document.querySelectorAll(".login"),
  signInOverlay = document.querySelector(".signin-overlay"),
  signInContainer = document.querySelector(".signin-container");

let isLoggedIn = false;
// let loginContainer = document.querySelector(".login-container");
// let welcome = document.querySelector(".welcome-in");

btnOpenLogin.forEach(function (btn) {
  btn.addEventListener("click", function () {
    openLogin();
  });
});

//Stänger logga in
function closeLogin() {
  signInContainer.classList.add("hidden-signin");
  signInOverlay.classList.add("hidden-signin");
  document.body.classList.remove("modal-open");
}

// Om man trycker utanför rutan stängs den
signInOverlay.addEventListener("click", function () {
  closeLogin();
});

// Om man trycker Escape stängs login
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !signInContainer.classList.contains("hidden")) {
    closeMembers();
  }
});

// Öppnar bli Logga in
function openLogin() {
  signInContainer.classList.remove("hidden-signin");
  signInOverlay.classList.remove("hidden-signin");
  document.body.classList.add("modal-open");
}
/////////////////////////////
/* FÖR ATT LOGGA IN OCH UT */
/////////////////////////////

//////// BONUS STYLING FÖR INLOGGAD

const apiKeyWeather = "f8a39f1388cb43adad4191756241601";
const weatherImg = document.getElementById("weather-img-b");
const weatherCond = document.getElementById("weather-condition-b");
const weatherTemp = document.getElementById("weather-temp-b");
const weatherImg2 = document.getElementById("weather-img");
const weatherCond2 = document.getElementById("weather-condition");
const weatherTemp2 = document.getElementById("weather-temp");

const dataCoord = {
  lat: null,
  lng: null,
};

async function getData() {
  let lat = dataCoord.lat || 59.32;
  let lng = dataCoord.lng || 18.05;
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeather}&q=${lat},${lng}&days=3`
    );
    if (response.status !== 200) throw new Error("Warning");

    const translatedCondition = translateWeatherCondition(
      response.data.current.condition.text
    );

    weatherCond.innerText = translatedCondition;
    weatherTemp.innerHTML = `${response.data.current.temp_c}°C`;
    weatherImg.src = response.data.current.condition.icon;
    weatherCond2.innerText = translatedCondition;
    weatherTemp2.innerHTML = `${response.data.current.temp_c}°C`;
    weatherImg2.src = response.data.current.condition.icon;
  } catch (err) {
    console.warn(err);
  }
}

export function getUserLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    dataCoord.lat = position.coords.latitude;
    dataCoord.lng = position.coords.longitude;
    getData();
  });
}

function translateWeatherCondition(condition) {
  const conditionMap = {
    Clear: "Klart",
    "Partly cloudy": "Molnigt",
    Cloudy: "Molnigt",
    Overcast: "Överlagt",
    Mist: "Dimma",
    Sunny: "Sol",
    "Patchy rain possible": "Möjligt med skurar",
    "Patchy snow possible": "Möjligt med snöfall",
    "Patchy sleet possible": "Möjligt med snöblandat regn",
    "Patchy freezing drizzle possible": "Möjligt med lätt isregn",
    "Thundery outbreaks possible": "Möjligt med åskskurar",
    "Blowing snow": "Snödrev",
    Blizzard: "Snöstorm",
    Fog: "Dimma",
    "Freezing fog": "Frostdimma",
    "Patchy light drizzle": "Lätt duggregn",
    "Light drizzle": "Lätt duggregn",
    "Freezing drizzle": "Lätt isregn",
    "Heavy freezing drizzle": "Kraftigt isregn",
    "Patchy light rain": "Lätt regn",
    "Light rain": "Lätt regn",
    "Moderate rain at times": "Måttligt regn ibland",
    "Moderate rain": "Måttligt regn",
    "Heavy rain at times": "Kraftigt regn ibland",
    "Heavy rain": "Kraftigt regn",
    "Light freezing rain": "Lätt isregn",
    "Moderate or heavy freezing rain": "Måttligt eller kraftigt isregn",
    "Light sleet": "Lätt snöblandat regn",
    "Moderate or heavy sleet": "Måttligt eller kraftigt snöblandat regn",
    "Patchy light snow": "Lätt snöfall",
    "Light snow": "Lätt snöfall",
    "Patchy moderate snow": "Måttligt snöfall ibland",
    "Moderate snow": "Måttligt snöfall",
    "Patchy heavy snow": "Kraftigt snöfall ibland",
    "Heavy snow": "Kraftigt snöfall",
    "Ice pellets": "Iskorn",
    "Light rain shower": "Lätt regnskur",
    "Moderate or heavy rain shower": "Måttlig eller kraftig regnskur",
    "Torrential rain shower": "Skyfall",
    "Light sleet showers": "Lätta snöblandade regnskurar",
    "Moderate or heavy sleet showers":
      "Måttliga eller kraftiga snöblandade regnskurar",
    "Light snow showers": "Lätta snöskurar",
    "Moderate or heavy snow showers": "Måttliga eller kraftiga snöskurar",
    "Light showers of ice pellets": "Lätta skurar av iskorn",
    "Moderate or heavy showers of ice pellets":
      "Måttliga eller kraftiga skurar av iskorn",
    "Patchy light rain with thunder": "Lätt regn med åska",
    "Moderate or heavy rain with thunder":
      "Måttligt eller kraftigt regn med åska",
    "Patchy light snow with thunder": "Lätt snöfall med åska",
    "Moderate or heavy snow with thunder":
      "Måttligt eller kraftigt snöfall med åska",
  };

  return conditionMap[condition] || condition;
}

const apiKey = "1402293712msh68149a58f5bf447p151227jsn91e431009d3d";
const symbol = "^OMX";
const region = "ST";
const url1 = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=${region}`;

fetch(url1, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const prices = data.prices;
    const firstClose = prices[0].close;
    const lastClose = prices[prices.length - 1].close;
    const totalPercentageChange = ((lastClose - firstClose) / firstClose) * 100;

    const dailyChange =
      ((lastClose - prices[prices.length - 2].close) /
        prices[prices.length - 2].close) *
      100;
    const weeklyChange =
      ((lastClose - prices[prices.length - 6].close) /
        prices[prices.length - 6].close) *
      100;
    const yearlyChange =
      ((lastClose - prices[0].close) / prices[0].close) * 100;

    const dailyElements = document.querySelectorAll(".daily");
    const weeklyElements = document.querySelector(".weekly");
    const yearlyElements = document.querySelectorAll(".yearly");

    dailyElements.forEach((element) => {
      element.textContent = `${dailyChange.toFixed(2)} %`;
      element.style.color = dailyChange >= 0 ? "#0474ca" : "#d0184d";
    });

    weeklyElements.textContent = `${weeklyChange.toFixed(2)} %`;
    weeklyElements.style.color = weeklyChange >= 0 ? "#0474ca" : "#d0184d";

    yearlyElements.forEach((element) => {
      element.textContent = `${yearlyChange.toFixed(2)} %`;
      element.style.color = yearlyChange >= 0 ? "#0474ca" : "#d0184d";
    });
  })
  .catch((error) => console.error("Fetch error:", error));

/* NAMNSDAGAR */
const url = "/namnsdagar.json";
const time = document.querySelector(".time");

// Funktion för att hämta dagens namnsdag och uppdatera klockan
function fetchTodaysNameDay() {
  const today = new Date();
  const monthsInSwedish = {
    1: "Januari",
    2: "Februari",
    3: "Mars",
    4: "April",
    5: "Maj",
    6: "Juni",
    7: "Juli",
    8: "Augusti",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "December",
  };
  const month = monthsInSwedish[today.getMonth() + 1];
  const year = today.getFullYear();
  const day = today.getDate();
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");
  const dateString = `${day}:e ${month} ${year}`;

  // Uppdaterar klockan med timmar, minuter och sekunder
  time.innerHTML = `${hours}:${minutes}:${seconds}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const names = json[month][day];
      const nameDayText = `Namnsdag: ${names.join(", ")}`;

      // Uppdatera HTML med de hämtade datumen och namnen
      document.getElementById("date").innerText = dateString;
      document.getElementById("nameDay").innerText = nameDayText;
      document.getElementById("dateBonus").innerText = dateString;
      document.getElementById("nameDayBonus").innerText = nameDayText;
    })
    .catch((error) => console.error(error));
}

// Funktion för att uppdatera klockan varje sekund
function updateClock() {
  const today = new Date();
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");
  time.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// Funktion för att kontrollera om vi ska visa det vanliga eller bonus välkomstområdet baserat på fönsterstorlek
function toggleWelcomeDisplay() {
  const welcomeName = document.getElementById("welcomeName");
  const welcomeNameBonus = document.getElementById("welcomeNameBonus");

  if (window.innerWidth <= 1200) {
    welcomeName.style.display = "none";
    welcomeNameBonus.style.display = "block";
  } else {
    welcomeName.style.display = "flex";
    welcomeNameBonus.style.display = "none";
    bonusContainer.style.display = "none";
  }
}

// Lyssna på DOMContentLoaded för att köra kod när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
  fetchTodaysNameDay(); // Hämta dagens namnsdagar
  toggleWelcomeDisplay(); // Kontrollera om vi ska visa det vanliga eller bonus välkomstområdet

  // Uppdatera klockan första gången sidan laddas
  updateClock();

  // Starta en intervall för att uppdatera klockan varje sekund
  setInterval(updateClock, 1000);
});

// Lyssna på fönstrets ändringar för att uppdatera välkomstområdet när fönstret ändras storlek
window.addEventListener("resize", toggleWelcomeDisplay);
