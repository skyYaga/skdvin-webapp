/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

import { de, en } from "vuetify/locale";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: de,
    fallback: en,
    messages: { de, en },
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
