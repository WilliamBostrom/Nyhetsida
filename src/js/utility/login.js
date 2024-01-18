/* Modal bli medlem */
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

/* Här ska jag börja bygga på obj som datan från registrerade hamnar */

/* BLI MEDLEM */

const form = document.getElementById("signup-form"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  password2 = document.getElementById("password2");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkMail(email);
  matchPassword(password, password2);

  const inputValid = await checkInput();

  if (inputValid) {
    closeMembers();

    const obj = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    createUser(obj);
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
      showError(input, `Användarnamn är nödvändig`);
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

function createUser(obj) {
  console.log(obj);
}
