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

/* För att logga in */
const formSignin = document.getElementById("signin-form"),
  usernameSignin = document.getElementById("username-signin"),
  loginPassword = document.getElementById("password-signin"),
  btnOpenLogin = document.querySelectorAll(".login"),
  signInOverlay = document.querySelector(".signin-overlay"),
  signInContainer = document.querySelector(".signin-container");

let isLoggedIn = false;
let loginContainer = document.querySelector(".login-container");

console.log(loginContainer);

////////////////////
/* MODAL LOGGA IN */
////////////////////

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

formSignin.addEventListener("submit", (e) => {
  e.preventDefault();
  const storedUserJSON = localStorage.getItem("currentUser");

  if (storedUserJSON) {
    const storedUser = JSON.parse(storedUserJSON);
    if (
      usernameSignin.value === storedUser.name &&
      loginPassword.value === storedUser.password
    ) {
      // Inloggning lyckad
      isLoggedIn = true;
      alert(`Välkommen in ${storedUser.name}`);
      loginContainer.innerHTML = `<a class="main-nav-btn nav-cta logout" href="#cta">Logga ut</a>`;
      closeLogin();
      //Logga ut
      const btnLogOut = document.querySelector(".logout");
      btnLogOut.addEventListener("click", (e) => {
        e.preventDefault();
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

/* /////////// */
/* BLI MEDLEM */
/* /////////// */

const form = document.getElementById("signup-form"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  password2 = document.getElementById("password2");
let newUser = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkMail(email);
  matchPassword(password, password2);

  const inputValid = await checkInput();

  if (inputValid.every((isValid) => isValid)) {
    const createdUser = new NewUser(
      username.value,
      password.value,
      email.value
    );

    const userJSON = JSON.stringify(createdUser);

    localStorage.setItem("currentUser", userJSON);

    closeMembers();
    closeMembers();
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

// Skapar nya användare
class NewUser {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.favorites = [];
  }
}

// Sparar datan i localstorage

const storedUserJSON = localStorage.getItem("currentUser");
if (storedUserJSON) {
  const storedUser = JSON.parse(storedUserJSON);
  console.log(storedUser);
}
