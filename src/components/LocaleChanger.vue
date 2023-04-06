<template>
  <v-menu location="bottom left">
    <template #activator="{ props }">
      <v-btn :class="buttonClass" variant="text" v-bind="props">
        <v-icon start>mdi-translate</v-icon> {{ conditionalLang($i18n.locale) }}
        <v-icon end>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(lang, i) in availableLangs" :key="i">
        <v-list-item-title @click="changeLocale(lang)">{{
          longLang(lang)
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    availableLangs() {
      let selectedLang = this.$i18n.locale;
      return this.$i18n.availableLocales.filter(
        (l) => l.toUpperCase() !== selectedLang.toUpperCase()
      );
    },
    buttonClass() {
      if (this.$vuetify.display.name == "xs") {
        return "subtitle-1";
      }
      return "subtitle-1 text-capitalize";
    },
  },
  created() {
    this.$vuetify.locale.current.value = this.$i18n.locale;
  },
  methods: {
    ...mapActions(["setLocaleAction", "getCommonSettingsAction"]),
    async changeLocale(lang) {
      const to = this.$router.resolve({ params: { lang } });
      this.$i18n.locale = lang;
      this.$vuetify.locale.current.value = lang;
      this.setLocaleAction(this.$i18n.locale);
      await this.loadCommonSettings();
      this.$router.push(to.path);
    },
    conditionalLang(lang) {
      if (this.$vuetify.display.name == "xs") {
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
