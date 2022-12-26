<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
      <v-footer
        ><v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            rounded
            class="mt-2"
          >
            {{ $t(link.name) }}
          </v-btn>
          <v-col class="py-2 text-center" cols="12">
            &copy; {{ new Date().getFullYear() }} —
            <strong>skdv.in / mydropzone.de</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
    <v-overlay :model-value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: { NavBar },
  data: function () {
    return {
      overlay: false,
      links: [
        {
          url: "https://skdv.in/datenschutzerklaerung/",
          name: "privacyStatement",
        },
        {
          url: "https://skdv.in/impressum/",
          name: "imprint",
        },
      ],
    };
  },
  computed: { ...mapState(["settings"]) },
  async created() {
    this.overlay = true;
    this.setLocaleAction(this.$i18n.locale);
    await this.loadCommonSettings();
    if (
      typeof this.settings.commonSettings !== "undefined" &&
      "dropzone" in this.settings.commonSettings
    ) {
      document.title = this.settings.commonSettings.dropzone.name;
    }
    this.overlay = false;
  },
  methods: {
    ...mapActions(["setLocaleAction", "getCommonSettingsAction"]),
    // Log the user in
    login() {
      this.$auth0.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth0.logout({
        returnTo: window.location.origin,
      });
    },
    async loadCommonSettings() {
      await this.getCommonSettingsAction();
    },
  },
};
</script>

<!--<style lang="sass">
@import '../node_modules/typeface-roboto/index.css'
</style>-->
