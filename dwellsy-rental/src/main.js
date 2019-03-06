import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

window.axios = require("axios");
window.axios.defaults.headers.common["Content-Type"] = "application/json";

Vue.component("NavBar", require("./components/NavBar.vue").default);

Vue.use(Vuetify);

Vue.store = Vue.prototype.$apiURL = "http://localhost:3000/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
