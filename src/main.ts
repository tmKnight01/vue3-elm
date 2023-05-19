import { createApp } from "vue";
import "./styles/common.scss";
import "vant/es/toast/style";
import router from "./router";
import App from "../App.vue";
import "@/config/rem.js";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
