/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import i18n from "./i18n";
import store from "../store";
import router from "../router";
import { auth0 } from "./auth0";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export function registerPlugins(app) {
  loadFonts();

  if (import.meta.env.NODE_ENV === "production") {
    Sentry.init({
      app,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: [import.meta.env.VITE_API_DOMAIN],
        }),
      ],
      tracesSampleRate: 0.3,
    });
  }

  app.use(auth0).use(vuetify).use(store).use(router).use(i18n);
}
