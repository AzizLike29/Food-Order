import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "vue-toast-notification/dist/theme-default.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/main.css";

Vue.use(VueToast);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
