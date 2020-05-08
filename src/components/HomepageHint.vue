<template>
  <v-row
    v-if="
      commonSettings.homepageHintTitle !== '' ||
      commonSettings.homepageHint !== ''
    "
  >
    <v-col cols="12" md="5">
      <v-alert prominent type="info">
        <h3>{{ commonSettings.homepageHintTitle }}</h3>
        <div>{{ commonSettings.homepageHint }}</div>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: { ...mapState(["commonSettings"]) },
};
</script>
