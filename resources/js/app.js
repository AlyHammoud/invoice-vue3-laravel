import "./bootstrap";

import { createApp } from "vue";
import router from "./Router/router";
import { createPinia } from "pinia";

const pinia = createPinia();

import App from "./App.vue";

createApp(App)
    .use(router)
    .use(pinia)
    .mount("#app");
