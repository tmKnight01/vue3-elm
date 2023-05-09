import { createApp } from "vue";
// import './style.css'
import "./styles/common.scss";
// import App from './App.vue'
import Home from "@/pages/Home.vue";
import "@/config/rem.js";

createApp(Home).mount("#app");
