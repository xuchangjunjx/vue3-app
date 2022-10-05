import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/style/global.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
