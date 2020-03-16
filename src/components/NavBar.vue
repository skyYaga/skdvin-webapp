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
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
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
          v-if="!$auth.loading && $auth.isAuthenticated"
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
          v-if="!$auth.loading && $auth.isAuthenticated"
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
          v-if="!$auth.loading && $auth.isAuthenticated"
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
      <v-toolbar-title>Fallschirm-Sport-Zentrum Haßfurt e.V.</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    drawer: null
  }),
  methods: {
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
