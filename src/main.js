import Vue from "vue";
import App from "./App.vue";
import router from "./router/routes";
import store from "./store";
import vuetify from "./plugins/vuetify";
// Globally declaring axios
import axios from "axios";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
