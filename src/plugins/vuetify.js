import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import en from "vuetify/es5/locale/en";
import de from "vuetify/es5/locale/de";

export default new Vuetify({
  lang: {
    locales: { en, de },
  },
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#f44336",
        secondary: "#607d8b",
        accent: "#3f51b5",
        error: "#ff5722",
        warning: "#ff9800",
        info: "#03a9f4",
        success: "#4caf50",
      },
    },
  },
});
