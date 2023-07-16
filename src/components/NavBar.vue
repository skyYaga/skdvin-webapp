<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link :to="'/' + $i18n.locale + '/home'">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("home") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/' + $i18n.locale + '/faq'">
          <v-list-item-action>
            <v-icon>mdi-frequently-asked-questions</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("faq.faq") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/jumpdays'"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("jumpday.jumpdays") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/appointments'"
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
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/legacy-vouchers'"
        >
          <v-list-item-action>
            <v-icon>mdi-file-certificate</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t("voucher.legacy-vouchers")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/tandemmaster'"
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
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/videoflyer'"
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
          v-if="!$auth.loading && $auth.isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/research'"
        >
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("research.research") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="!$auth.loading && $auth.isAuthenticated && isAdmin"
          :value="false"
          prepend-icon="mdi-cog-outline"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{
                $t("settings.settings")
              }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="'/' + $i18n.locale + '/settings/general'">
            <v-list-item-content>
              <v-list-item-title>{{ $t("general") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/' + $i18n.locale + '/settings/users'">
            <v-list-item-content>
              <v-list-item-title>{{ $t("users") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="!$auth.loading && $auth.isAuthenticated"
          link
          :to="'/' + $i18n.locale + '/profile'"
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("profile") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loading && !$auth.isAuthenticated"
          link
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
          v-if="!$auth.loading && $auth.isAuthenticated"
          link
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
      <v-spacer></v-spacer>
      <LocaleChanger />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roleUtil } from "../shared/roles";
import LocaleChanger from "../components/LocaleChanger.vue";

export default {
  name: "NavBar",
  components: {
    LocaleChanger,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters(["getCommonSettings"]),
    getName() {
      let commonSettings = this.getCommonSettings();
      if (
        typeof commonSettings !== "undefined" &&
        "dropzone" in commonSettings &&
        "name" in commonSettings.dropzone
      ) {
        return commonSettings.dropzone.name;
      }
      return "";
    },
    isAdmin() {
      return roleUtil.isAdmin(this.$auth);
    },
    isAdminOrModerator() {
      return roleUtil.isAdminOrModerator(this.$auth);
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
