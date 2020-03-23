<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
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
  methods: {
    ...mapActions(["setLocaleAction"]),
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
