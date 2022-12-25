<template>
  <v-card>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Benutzer bearbeiten</v-card-title>
        <v-card-text
          ><p>{{ currentUser.email }}</p>
          <v-select
            v-model="currentUser.roles"
            :items="roles"
            attach
            chips
            :label="$t('roles')"
            multiple
            :menu-props="{ 'max-height': '100px' }"
          ></v-select
        ></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            :disabled="loading"
            :loading="loading"
            @click="updateUser"
            >{{ $t("save") }}</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="users"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :footer-props="footerProps"
      ><template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"> mdi-pencil </v-icon>
      </template>
      <template #[`item.roles`]="{ item }">
        <span v-for="role in item.roles" :key="role.id">
          <v-chip>{{ role.name }}</v-chip>
        </span>
      </template></v-data-table
    >
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      total: 0,
      options: {},
      footerProps: {
        itemsPerPageOptions: [3, 5, 8],
      },
      dialog: false,
      currentUser: {},
      headers: [
        { text: this.$t("email.email"), value: "email" },
        { text: this.$t("roles"), value: "roles" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ],
      hintText: "",
      hintColor: "",
      showHint: false,
      loading: true,
      roles: [],
      users: [],
    };
  },
  computed: {
    mappedRoles() {
      if (typeof this.currentUser.roles !== "undefined") {
        return this.currentUser.roles.map((r) => r.name);
      }
      return [];
    },
  },
  watch: {
    options: {
      handler() {
        this.loadUsers();
      },
      deep: true,
    },
  },
  async created() {
    await this.loadRoles();
  },
  methods: {
    ...mapActions(["getUsersAction", "getRolesAction", "updateUserAction"]),
    async loadUsers() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;

      let token = await this.$auth.getTokenSilently();
      let result = await this.getUsersAction({
        page: page - 1,
        itemsPerPage,
        token,
      });
      this.loading = false;
      if (result.payload != null) {
        this.users = result.payload.users;
        this.total = result.payload.total;
      }
    },
    async loadRoles() {
      this.loading = true;
      let result = await this.getRolesAction(
        await this.$auth.getTokenSilently()
      );
      this.loading = false;
      if (result.payload != null) {
        let viewRoles = [];

        result.payload.forEach((role) => {
          viewRoles.push({ text: role.name, value: role });
        });

        this.roles = viewRoles;
      }
    },
    editUser(item) {
      this.currentUser = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },
    async updateUser() {
      this.loading = true;
      let result = await this.updateUserAction({
        user: this.currentUser,
        token: await this.$auth.getTokenSilently(),
      });
      this.dialog = false;
      this.loading = false;
      if (result == "") {
        this.hintText = this.$t("user.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("user.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
      await this.loadUsers();
    },
  },
};
</script>
