import selectedSvg from "/star-select.svg";
import starSvg from "/star-!select.svg";

import {
  checkMail,
  checkRequired,
  closeMembers,
  openLogin,
  closeLogin,
  getUserLocation,
} from "./login.js";

import {
  displayFetchis,
  updateContent,
  buildApiUrl,
  searchQuery1,
} from "./script.js";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const formSignin = document.getElementById("signin-form"),
  emailSignin = document.getElementById("login-email"),
  loginPassword = document.getElementById("login-password"),
  signupForm = document.getElementById("signup-form"),
  username = document.getElementById("username"),
  signupEmail = document.getElementById("email"),
  signupPassword = document.getElementById("password"),
  loginBtns = document.querySelectorAll(".login"),
  logoutBtn = document.querySelector(".logout"),
  memberBtns = document.querySelectorAll(".show-members");

let favouritesButtonClicked = false;

// ------------------------
// Api till firestore
// ------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBycJj-1so7RhAz_rD5XESAc7fGc0qvopA",
  authDomain: "chas-news.firebaseapp.com",
  projectId: "chas-news",
  storageBucket: "chas-news.appspot.com",
  messagingSenderId: "654182847008",
  appId: "1:654182847008:web:a2d79a0cbd6a6c420a2245",
};

// ------------------------
// Hämtar app, databas, auth, collections
// ------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db = getFirestore();

const favouritesCollection = collection(db, "favourites");
//Auth -login
const auth = getAuth(app);

// ------------------------
// När favoritknapp trycks skickas data till Auth
// ------------------------
const setupFavoritesListener = (userId, onDataReceived) => {
  const userFavouritesCollection = collection(
    db,
    "users",
    userId,
    "favourites"
  );

  return onSnapshot(
    userFavouritesCollection,
    (snapshot) => {
      console.log(snapshot.docs);
      if (favouritesButtonClicked) {
        onDataReceived(snapshot.docs);
      }
    },
    (error) => {
      console.error("Error getting documents: ", error);
    }
  );
};

// ------------------------
// Lyssnar efter om inloggad/utloggad
// ------------------------

const desktopWelcome = document.querySelector(".dekstop-welcome");
const newsHeading = document.querySelector(".news-side-check");
const desktopMember = document.querySelector(".new-side-random-shit");
const bonusBtn = document.querySelector(".templates_create_btn");

auth.onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    getUserLocation();
    if (favouritesButtonClicked) {
      const getFavourites = setupFavoritesListener(userId);
    }

    if (bonusBtn) {
      bonusBtn.classList.add("auth");
    }

    desktopMember.style.display = "none";
    desktopWelcome.style.display = "block";
    newsHeading.innerHTML = `<h3 class="heading-medium">Välkommen in</h3>`;
    memberBtns.forEach((btn) => (btn.style.display = "none"));
    loginBtns.forEach((btn) => (btn.style.display = "none"));
    logoutBtn.style.display = "block";
  } else {
    if (favouritesButtonClicked) {
      setupFavourites([]);
    }

    desktopWelcome.style.display = "none";
    newsHeading.innerHTML = `<h3 class="heading-medium">Logga in</h3>`;
    desktopMember.style.display = "block";
    memberBtns.forEach((btn) => (btn.style.display = "flex"));
    loginBtns.forEach((btn) => (btn.style.display = "flex"));
    logoutBtn.style.display = "none";

    if (bonusBtn) {
      bonusBtn.classList.remove("auth");
    }
  }
});

// ------------------------
/* Skapa nya favoriter */
// ------------------------

window.favourite = async function (event) {
  const selectedStarIcon = event.target;
  const selectedNewsBox = selectedStarIcon.closest(
    ".news-main-card, .news-secondary-box"
  );

  const user = auth.currentUser; // Hämtar den inloggade

  if (selectedNewsBox && user) {
    const userId = user.uid; // Hämtar inloggades UID
    const userFavouritesCollection = collection(
      db,
      "users",
      userId,
      "favourites"
    );

    await addDoc(userFavouritesCollection, {
      title:
        selectedNewsBox.querySelector(".heading-large, .heading-news")
          ?.textContent || "",
      img:
        selectedNewsBox.querySelector(".news-main-card-img, .small-img")?.src ||
        null,
      link: selectedNewsBox.querySelector("a.btn-text")?.href || "",
      content:
        selectedNewsBox.querySelector(".text-normal")?.textContent || null,
    });
  }
};

// ------------------------
/* Databas */
// ------------------------

const colRef = collection(db, "favourites");

const savedDocs = () => {
  getDocs(colRef)
    .then((snapshot) => {
      let favs = [];
      snapshot.docs.forEach((doc) => {
        favs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(favs);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// ------------------------
// Bli medlem
// ------------------------

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  checkRequired([username, signupEmail, signupPassword]);
  checkMail(email);

  // get user info
  const memberEmail = signupEmail.value;
  const memberPassword = signupPassword.value;
  // sign up user
  try {
    const auth = getAuth(app);
    const cred = await createUserWithEmailAndPassword(
      auth,
      memberEmail,
      memberPassword
    );

    // Skapar en ny collection för varje user
    await setDoc(doc(db, "users", cred.user.uid), {
      favourites: [],
    });

    // Återställa input i "" ?
    closeMembers();
  } catch (error) {
    console.error(error.message);
  }
});

// ------------------------
/* Logga ut */
// ------------------------

const logout = document.querySelector(".logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// ------------------------
// Logga in
// ------------------------

formSignin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = emailSignin.value;
  const password = loginPassword.value;
  // handleLogin(username, password);
  try {
    const auth = getAuth(app);
    const cred = await signInWithEmailAndPassword(auth, username, password);
    // console.log(cred.user);
    // Återställa input i "" ?
    closeLogin();
    // Additional logic for successful sign-in if needed
  } catch (error) {
    console.error(error.message);
  }
});

// ------------------------
// Visa favoriter
// ------------------------
const setupFavourites = (data) => {
  document.querySelector(".activate").classList.remove("activate");
  favouritesBtn.classList.add("activate");
  const newsHeading = document.querySelector(".heading-small");
  newsHeading.innerHTML = `  <h3 class="heading-small">
  Favoriter | <a href="">Chas News</a>
   </h3>
   `;
  const newsSecondary = document.querySelector(".news-secondary");

  newsSecondary.innerHTML = "";

  const user = auth.currentUser;

  if (!user) {
    newsSecondary.innerHTML = `<h3 class="heading-news">Logga in för att spara favoriter</h3>`;
  } else if (data.length > 0) {
    data.forEach((doc, index) => {
      const favourites = doc.data();
      newsSecondary.innerHTML += `
        <div class="news-secondary-box" data-index="${index}">
          <div class="news-secondary-textbox">
            <h3 class="heading-news">${favourites.title}</h3>
            ${
              favourites.description !== null &&
              favourites.description !== undefined
                ? `<p class="text-normal">${favourites.description}</p>`
                : ""
            }
            <a class="btn-text" href="${
              favourites.link
            }" target="_blank">Läs mer &rarr;</a>
          </div>
          <div class="star-container2">
          <img class="star-icon" src="${selectedSvg}" alt="svg bild"  />
          <img class="selected-star-icon delete" src="${starSvg}" alt="svg bild" onclick="deleteButtonPressed(event)"/>
          </div>
          ${
            favourites.img !== null && favourites.img !== undefined
              ? `<img class="small-img" src="${
                  favourites.img || ""
                }" alt="nyhets bild" srcset="" width="40%" height="40%"/>`
              : ""
          }
        </div>`;
    });
  } else {
    newsSecondary.innerHTML = `<h3 class="heading-news">Finns inga favoriter sparade</h3>`;
  }
};

// ------------------------
// Favorit knappen
// ------------------------
const favouritesBtn = document.getElementById("favourites");
favouritesBtn.addEventListener("click", () => {
  favouritesButtonClicked = true;

  document.querySelector(".activate").classList.remove("activate");
  favouritesBtn.classList.add("activate");

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  if (userId) {
    const userFavouritesCollection = collection(
      db,
      "users",
      userId,
      "favourites"
    );

    const getFavourites = setupFavoritesListener(userId, (data) => {
      setupFavourites(data);
    });
  } else {
    setupFavourites([]);
  }
});

window.deleteButtonPressed = async (event) => {
  try {
    const selectedStarIcon = event.target;
    const selectedNewsBox = selectedStarIcon.closest(".news-secondary-box");
    const index = selectedNewsBox ? selectedNewsBox.dataset.index : null;

    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const userFavouritesCollection = collection(
      db,
      "users",
      userId,
      "favourites"
    );

    const querySnapshot = await getDocs(userFavouritesCollection);
    const favourites = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (index >= 0 && index < favourites.length) {
      const docIdToDelete = favourites[index].id;
      const docRef = doc(userFavouritesCollection, docIdToDelete);

      await deleteDoc(docRef);
      console.log("Favorite borttagen");
    } else {
      console.error("no index");
    }
  } catch (error) {
    console.error("Error in deleting:", error);
  }
};

// ------------------------
// Visar orginalfetchen när sidan laddas
// ------------------------
updateContent(buildApiUrl(searchQuery1), () => {
  setupFavourites([]); // Skicka en tom array för att inte visa favoriter direkt till vanliga fetchen i script
});
