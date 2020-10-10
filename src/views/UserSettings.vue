<template>
  <v-container fluid>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn> </v-snackbar
    ><v-row
      ><v-col
        ><h1>{{ $t("settings.settings") }}</h1></v-col
      ></v-row
    >
    <v-row
      ><v-col><UserTable :users="users" /></v-col
    ></v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import UserTable from "../components/settings/UserTable.vue";

export default {
  components: { UserTable },
  data: () => ({
    showHint: false,
    hintText: "",
    hintColor: "",
    loading: true,
    users: [],
  }),
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions(["getUsersAction"]),
    async loadUsers() {
      this.loading = true;
      let result = await this.getUsersAction(
        await this.$auth.getTokenSilently()
      );
      this.loading = false;
      if (result.payload != null) {
        this.users = result.payload;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
