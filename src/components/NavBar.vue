<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("home") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/faq">
          <v-list-item-action>
            <v-icon>mdi-frequently-asked-questions</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("faq.faq") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="
            !$auth.loading && $auth.isAuthenticated && (isAdmin || isModerator)
          "
          to="/jumpdays"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("jumpday.jumpdays") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="
            !$auth.loading && $auth.isAuthenticated && (isAdmin || isModerator)
          "
          to="/appointments"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-today</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("appointment.appointments")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="
            !$auth.loading && $auth.isAuthenticated && (isAdmin || isModerator)
          "
          to="/tandemmaster"
        >
          <v-list-item-action>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("tandemmaster.tandemmaster")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="
            !$auth.loading && $auth.isAuthenticated && (isAdmin || isModerator)
          "
          to="/videoflyer"
        >
          <v-list-item-action>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("videoflyer.videoflyer")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="!$auth.loading && $auth.isAuthenticated && isAdmin"
          to="/settings"
        >
          <v-list-item-action>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("settings.settings") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="!$auth.loading && $auth.isAuthenticated"
          to="/profile"
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("profile") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="!$auth.loading && !$auth.isAuthenticated"
          @click="login"
        >
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("login") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          v-if="!$auth.loading && $auth.isAuthenticated"
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("logout") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="red" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ getName }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roleUtil } from "../shared/roles";

export default {
  name: "NavBar",
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapGetters(["getCommonSettings"]),
    getName() {
      let commonSettings = this.getCommonSettings();
      if (typeof commonSettings.dropzone !== "undefined") {
        return commonSettings.dropzone.name;
      }
      return "";
    },
    isAdmin() {
      return roleUtil.isAdmin(this.$auth);
    },
    isModerator() {
      return roleUtil.isModerator(this.$auth);
    },
  },
  methods: {
    ...mapActions(["getCommonSettingsAction"]),
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
