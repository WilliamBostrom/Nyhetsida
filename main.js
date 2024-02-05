import "./src/css/style.css";
import "./src/css/general.css";
import "./src/css/queries.css";
import "./src/css/login.css";

import "./src/js/script.js";
import "./src/js/utility/utility.js";
// import "./src/js/utility/login.js";

/* Testa kod sidor = tillfälliga */
import "./src/js/dennis.js";
// import "./src/js/luay.js";
import "./src/js/simon.js";
import "./src/js/william.js";
import "./src/js/firebase.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
