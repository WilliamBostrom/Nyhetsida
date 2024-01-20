export { isLoggedIn, usersData };
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
  password = document.getElementById("password"),
  password2 = document.getElementById("password2");
/* let newUser = false; */
let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
form.addEventListener("submit", async (e) => {
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

    const userJSON = JSON.stringify(createdUser);
    usersData.push(createdUser);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    console.log(usersData);
    localStorage.setItem("currentUser", userJSON);

    closeMembers();
    openLogin();
    createUser(createdUser);
  }
});

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
let welcome = document.querySelector(".new-side-random-shit");

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
/* För att logga in */

formSignin.addEventListener("submit", (e) => {
  e.preventDefault();
  const storedUserJSON = localStorage.getItem("usersData");

  if (storedUserJSON) {
    const usersArray = JSON.parse(storedUserJSON);
    const matchingUser = usersArray.find((user) => {
      return (
        usernameSignin.value === user.name &&
        loginPassword.value === user.password
      );
    });
    let newName =
      matchingUser.name.charAt(0).toUpperCase() + matchingUser.name.slice(1);

    if (matchingUser) {
      // Inloggning lyckad
      isLoggedIn = true;
      alert(`Välkommen in ${newName}`);
      loginContainer.innerHTML = `<a class="main-nav-btn nav-cta logout" href="#cta">Logga ut</a>`;
      welcome.innerHTML = ` <span
      ><p class="text-normal">
        <b>Välkommen in ${newName}!</b>
      </p>
      <p class="text-normal">
        Tryck på en kategori för att lägga till i dina bevakningar.
      </p></span
    >`;
      closeLogin();
      // Logga ut
      const btnLogOut = document.querySelector(".logout");
      btnLogOut.addEventListener("click", () => {
        alert("Du är utloggad");
        isLoggedIn = false;
        loginContainer.innerHTML = `<a class="main-nav-btn nav-cta login" href="#cta">Logga in</a>`;
      });
    } else {
      showError(usernameSignin, "Felaktigt användarnamn eller lösenord");
    }
  } else {
    showError(usernameSignin, "Ingen användare hittad");
  }
});

//////// BONUS STYLING FÖR INLOGGAD

const dataCoord = {
  lat: null,
  lng: null,
};
async function getData() {
  let lat = dataCoord.lat;
  let lng = dataCoord.lng;
  await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=3`
  )
    .then((res) => {
      if (!res.ok) throw new Error("Warning");
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    dataCoord.lat = position.coords.latitude;
    dataCoord.lng = position.coords.longitude;
    getData();
  });
}
getUserLocation();
