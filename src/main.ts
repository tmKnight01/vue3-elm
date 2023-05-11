import { createApp } from "vue";
import "./styles/common.scss";
import router from './router'
import App from '../App.vue'
import "@/config/rem.js";


createApp(App).use(router).mount("#app");
