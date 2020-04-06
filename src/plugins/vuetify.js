import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
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
