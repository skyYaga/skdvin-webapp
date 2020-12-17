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
        <v-card-title class="headline">Benutzer bearbeiten</v-card-title>
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

    <v-data-table :headers="headers" :items="users" :loading="loading"
      ><template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"> mdi-pencil </v-icon>
      </template>
      <template #[`item.roles`]="{ item }">
        <span v-for="role in item.roles" :key="role.id">
          <v-chip>{{ role.name }}</v-chip>
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
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
  async created() {
    await this.loadUsers();
    await this.loadRoles();
  },
  methods: {
    ...mapActions(["getUsersAction", "getRolesAction", "updateUserAction"]),
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
    updateRoleSelection(event) {
      console.log(event);
      this.currentUser.roles;
    },
  },
};
</script>
