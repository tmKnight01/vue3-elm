import { createApp } from "vue";
import "./styles/common.scss";
import "vant/es/toast/style";
import router from "./router";
import App from "../App.vue";
import VConsole from "vconsole";
import "@/config/rem.js";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
new VConsole();
app.use(pinia);
app.use(router);
// app.use();
app.mount("#app");
