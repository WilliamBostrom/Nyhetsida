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

const form = document.getElementById("signup-form"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password");
// password2 = document.getElementById("password2");

let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
/* form.addEventListener("submit", async (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkMail(email);
  matchPassword(password, password2);

  const inputValid = await checkInput();

  if (inputValid.every((isValid) => isValid)) {
    const createdUser = {
      name: username.value,
      password: password.value,
      email: email.value,
      favorites: [],
    };

    // const userJSON = JSON.stringify(createdUser);
    usersData.push(createdUser);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    // localStorage.setItem("currentUser", userJSON);

    closeMembers();
    openLogin();
    createUser(createdUser);
  }
}); */

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
function matchPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Lösenordet matchar inte");
  } else {
    showSuccess(input2);
  }
}

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

function createUser(createdUser) {
  console.log(createdUser);

  // Lägga till saker för användaren
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
let loginContainer = document.querySelector(".login-container");
let welcome = document.querySelector(".welcome-in");

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
/* 
const welcomeName = document.querySelector(".welcome-name");

function handleLogin(username, password) {
  const storedUserJSON = localStorage.getItem("usersData");

  if (storedUserJSON) {
    const usersArray = JSON.parse(storedUserJSON);
    const matchingUser = usersArray.find((user) => {
      return username === user.name && password === user.password;
    });
    let newName =
      matchingUser.name.charAt(0).toUpperCase() + matchingUser.name.slice(1);

    if (matchingUser) {
      // Inloggning lyckad
      isLoggedIn = true;
      getUserLocation();
      alert(`Välkommen in ${newName}`);
      welcome.style.display = "block";
      loginContainer.innerHTML = `<a class="main-nav-btn nav-cta logout" href="#cta">Logga ut</a>`;
      welcomeName.innerHTML = `${newName}`;
      closeLogin();

      // Logga ut
      const btnLogOut = document.querySelector(".logout");
      btnLogOut.addEventListener("click", () => {
        alert("Du är utloggad");
        isLoggedIn = false;
        welcome.style.display = "none";
        loginContainer.innerHTML = `<a class="main-nav-btn nav-cta login" href="#cta">Logga in</a>`;
      });
    } else {
      showError(usernameSignin, "Felaktigt användarnamn eller lösenord");
    }
  } else {
    showError(usernameSignin, "Ingen användare hittad");
  }
} */

/* formSignin.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameSignin.value;
  const password = loginPassword.value;
  handleLogin(username, password);
}); */

//////// BONUS STYLING FÖR INLOGGAD
/* 
const apiKeyWeather = "f8a39f1388cb43adad4191756241601";
const weatherImg = document.getElementById("weather-img");
const weatherCond = document.getElementById("weather-condition");
const weatherTemp = document.getElementById("weather-temp");

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
    weatherTemp.innerText = response.data.current.temp_c;
    weatherImg.src = response.data.current.condition.icon;
  } catch (err) {
    console.warn(err);
  }
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    dataCoord.lat = position.coords.latitude;
    dataCoord.lng = position.coords.longitude;
    getData();
  });
}

getUserLocation();

function translateWeatherCondition(condition) {
  const conditionMap = {
    Clear: "Klart",
    "Partly cloudy": "Delvis molnigt",
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

let channels = [];
let currentChannelIndex = 0;
let audioPlayer = document.querySelector('audio'); 
let mp3Player = document.querySelector('.mp3-player');
// Här hämtar jag kanaldata från en SR radio med hjälp av Axios.
axios.get('http://api.sr.se/api/v2/channels?format=json&size=100')
  .then(response => {
    channels = response.data.channels;
    console.log(channels)
    updatePlayer(currentChannelIndex);
  })
  .catch(error => {
    console.error('Ett fel inträffade:', error);
  });

// Här lägger jag till eventlyssnare för att hantera kontrollknappar för kanalbyte och för att stoppa radion.
document.querySelector('.prev-btn').addEventListener('click', prevChannel);
document.querySelector('.next-btn').addEventListener('click', nextChannel);
document.querySelector('.play-btn').addEventListener('click', togglePlay);

// Här definierar jag en funktion för att uppdatera spelaren med aktuell kanal.
function updatePlayer(channelIndex) {
  const channel = channels[channelIndex];

  // Uppdaterar bilden och bakgrundsfärgen som följer med i anropet för spelaren.
  const player = document.querySelector('.mp3-player');
  player.style.backgroundImage = `url(${channel.image})`;
  player.style.backgroundColor = `#${channel.color}`;
  player.style.backgroundSize = '90%';
  
  audioPlayer.src = channel.liveaudio.url;
  audioPlayer.play();
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
  if (audioPlayer.paused) {
    audioPlayer.play();
    document.querySelector('.play-btn i').classList.remove('fa-play');
    document.querySelector('.play-btn i').classList.add('fa-pause');
    mp3Player.classList.add('rotate-background');
  } else {
    audioPlayer.pause();
    document.querySelector('.play-btn i').classList.remove('fa-pause');
    document.querySelector('.play-btn i').classList.add('fa-play');
    mp3Player.classList.remove('rotate-background'); 
  }
} */
