<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view />
      <v-footer padless
        ><v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            text
            rounded
            class="mt-2"
          >
            {{ link.name }}
          </v-btn>
          <v-col class="py-2 text-center" cols="12">
            &copy; {{ new Date().getFullYear() }} —
            <strong>skdv.in</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { NavBar },
  created() {
    this.setLocaleAction(this.$i18n.locale);
  },
  data: function () {
    return {
      links: [
        {
          url: "https://skdv.in/datenschutzerklaerung/",
          name: this.$i18n.t("privacyStatement"),
        },
        {
          url: "https://skdv.in/impressum/",
          name: this.$i18n.t("imprint"),
        },
      ],
    };
  },
  methods: {
    ...mapActions(["setLocaleAction"]),
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
