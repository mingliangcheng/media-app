import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(pinia);
  return {
    app
  };
}
