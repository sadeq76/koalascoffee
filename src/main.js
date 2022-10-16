//main styles
import "./assets/styles/reset.scss";
import "./assets/styles/icons.scss";
import "./assets/styles/components.scss";
import "./assets/styles/utilities.scss";
import "./assets/styles/animations.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");

//resize app
const appDiv = document.getElementById("app").style;
appDiv.height = document.documentElement.clientHeight + "px";
window.addEventListener(
  "resize",
  () => (appDiv.height = document.documentElement.clientHeight + "px")
);
