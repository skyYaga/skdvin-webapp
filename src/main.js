import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import the Auth0 configuration
let domain = process.env.VUE_APP_AUTH0_DOMAIN;
let clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;
let audience = process.env.VUE_APP_AUTH0_AUDIENCE;

// Import the plugin here
import { Auth0Plugin } from "./auth";

import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
