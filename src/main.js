import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import zhTW from "vee-validate/dist/locale/zh_TW";
import VueI18n from "vue-i18n";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap";
import "./bus";

Vue.use(VueAxios, axios);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "zhTW",
});

Vue.use(VeeValidate, {
  events: "input|blur",
  i18n,
  dictionary: {
    zhTW,
  },
});

Vue.component("Loading", Loading);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
