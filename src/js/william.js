/* import axios from "axios";

const apiKey = "pub_36673e2a264d14a136dc8d64987d21585bdf5";
 */
import { isLoggedIn, usersData } from "./utility/login";
console.log(usersData);

/* const monitorBtn = document.getElementById("monitor");
const sectionNews = document.querySelector(".section-hero");
monitorBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    sectionNews.innerHTML = `<div class="container-2"><h1 class="heading-large">Bevakningar</h1><p class="text-normal"> Du behöver <a id="signup">logga in</a> för att se dina bevakningar.</p></div>`;
  } else {
    const userIndex = usersData.findIndex(
      (user) => user.name === usernameSignin.value
    );
    if (userIndex !== -1) {
      sectionNews.innerHTML = `<div class="container-2"><h1 class="heading-large">Bevakningar</h1><p class="text-normal"> Välkommen in ${usersData[userIndex].name}! Finns inga bevakningar att se än</p></div>`;
    } else {
      sectionNews.innerHTML = `<div class="container-2"><h1 class="heading-large">Bevakningar</h1><p class="text-normal"> Det finns inga bevakningar att se här än</p></div>`;
    }
  }
}); */

// function displayMonitor() {}
