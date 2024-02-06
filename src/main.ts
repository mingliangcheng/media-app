import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import pinia from "@/store";

export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(pinia);
  return {
    app
  };
}
