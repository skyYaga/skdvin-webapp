import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "de",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  allowComposition: true,
  messages: { de, en },
  dateTimeFormats: { de, en },
});
