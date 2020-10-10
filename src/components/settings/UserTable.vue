<template>
  <v-card>
    <v-data-table :headers="headers" :items="users"></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    users: { type: Array, default: () => [] },
  },
  data() {
    return {
      headers: [
        { text: this.$t("email.email"), value: "email" },
        { text: this.$t("roles"), value: "roles" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
