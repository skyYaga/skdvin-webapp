<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn :class="buttonClass" color="primary" depressed v-on="on">
        <v-icon left>mdi-translate</v-icon> {{ conditionalLang($i18n.locale) }}
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="(lang, i) in availableLangs" :key="i">
          <v-list-item-content>
            <v-list-item-title
              @click="changeLocale(lang)"
              v-text="longLang(lang)"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  created() {
    this.$vuetify.lang.current = this.$i18n.locale;
  },
  computed: {
    availableLangs() {
      let selectedLang = this.$i18n.locale;
      return this.$i18n.availableLocales.filter(
        (l) => l.toUpperCase() !== selectedLang.toUpperCase()
      );
    },
    buttonClass() {
      if (this.$vuetify.breakpoint.name == "xs") {
        return "subtitle-1";
      }
      return "subtitle-1 text-capitalize";
    },
  },
  methods: {
    ...mapActions(["setLocaleAction", "getCommonSettingsAction"]),
    async changeLocale(lang) {
      const to = this.$router.resolve({ params: { lang } });
      this.$i18n.locale = lang;
      this.$vuetify.lang.current = lang;
      this.setLocaleAction(this.$i18n.locale);
      await this.loadCommonSettings();
      this.$router.push(to.location);
    },
    conditionalLang(lang) {
      if (this.$vuetify.breakpoint.name == "xs") {
        switch (lang) {
          case "de":
            return lang;
          case "en":
            return lang;
          default:
            return "";
        }
      }
      return this.longLang(lang);
    },
    longLang(lang) {
      if (lang === "de") {
        return this.$t("Deutsch");
      }
      if (lang === "en") {
        return this.$t("English");
      }
      return "";
    },
    async loadCommonSettings() {
      await this.getCommonSettingsAction();
    },
  },
};
</script>
