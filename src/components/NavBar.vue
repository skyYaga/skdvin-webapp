<template>
  <div>
    <v-navigation-drawer v-model="drawer">
      <v-list density="comfortable" nav>
        <v-list-item link :to="'/' + $i18n.locale + '/home'">
          <template #prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>{{ $t("home") }}</v-list-item-title>
        </v-list-item>
        <v-list-item link :to="'/' + $i18n.locale + '/faq'">
          <template #prepend>
            <v-icon>mdi-frequently-asked-questions</v-icon>
          </template>
          <v-list-item-title>{{ $t("faq.faq") }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isLoading && isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/jumpdays'"
        >
          <template #prepend>
            <v-icon>mdi-calendar-month</v-icon>
          </template>
          <v-list-item-title>{{ $t("jumpday.jumpdays") }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isLoading && isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/appointments'"
        >
          <template #prepend>
            <v-icon>mdi-calendar-today</v-icon>
          </template>
          <v-list-item-title>{{
            $t("appointment.appointments")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isLoading && isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/tandemmaster'"
        >
          <template #prepend>
            <v-icon>mdi-account-supervisor</v-icon>
          </template>
          <v-list-item-title>{{
            $t("tandemmaster.tandemmaster")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isLoading && isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/videoflyer'"
        >
          <template #prepend>
            <v-icon>mdi-camera</v-icon>
          </template>
          <v-list-item-title>{{
            $t("videoflyer.videoflyer")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isLoading && isAuthenticated && isAdminOrModerator"
          link
          :to="'/' + $i18n.locale + '/research'"
        >
          <template #prepend>
            <v-icon>mdi-magnify</v-icon>
          </template>
          <v-list-item-title>{{ $t("research.research") }}</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-if="!isLoading && isAuthenticated && isAdmin"
          value="Settings"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog-outline"
              :title="$t('settings.settings')"
            ></v-list-item>
          </template>

          <v-list-item link :to="'/' + $i18n.locale + '/settings/general'">
            <v-list-item-title>{{ $t("general") }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="'/' + $i18n.locale + '/settings/users'">
            <v-list-item-title>{{ $t("users") }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-if="!isLoading && isAuthenticated"
          link
          :to="'/' + $i18n.locale + '/profile'"
        >
          <template #prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>{{ $t("profile") }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isLoading && !isAuthenticated" link @click="login">
          <template #prepend>
            <v-icon>mdi-login</v-icon>
          </template>
          <v-list-item-title>{{ $t("login") }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isLoading && isAuthenticated" link @click="logout">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>{{ $t("logout") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="red">
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
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "NavBar",
  components: {
    LocaleChanger,
  },
  setup() {
    const { loginWithRedirect, logout, isLoading, isAuthenticated, user } =
      useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
      isLoading,
      isAuthenticated,
      user,
    };
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
      return roleUtil.isAdmin(this.user);
    },
    isAdminOrModerator() {
      return roleUtil.isAdminOrModerator(this.user);
    },
  },
  methods: {
    ...mapActions(["getCommonSettingsAction"]),
  },
};
</script>
