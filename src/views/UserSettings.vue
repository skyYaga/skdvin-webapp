<template>
  <v-container fluid>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn variant="text" @click="showHint = false">
        {{ $t("ok") }}
      </v-btn> </v-snackbar
    ><v-row
      ><v-col
        ><h1>{{ $t("users") }}</h1></v-col
      ></v-row
    >
    <v-row
      ><v-col><UserTable /></v-col
    ></v-row>
  </v-container>
</template>

<script>
import UserTable from "../components/settings/UserTable.vue";

export default {
  components: { UserTable },
  data: () => ({
    showHint: false,
    hintText: "",
    hintColor: "",
  }),
};
</script>
