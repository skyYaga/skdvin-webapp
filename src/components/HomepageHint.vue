<template>
  <v-row
    v-if="
      (typeof commonSettings !== 'undefined' &&
        'homepageHintTitle' in commonSettings &&
        commonSettings.homepageHintTitle !== '') ||
      ('homepageHint' in commonSettings && commonSettings.homepageHint !== '')
    "
  >
    <v-col cols="12" md="5">
      <v-alert prominent type="info">
        <h3>{{ commonSettings.homepageHintTitle }}</h3>
        <span style="white-space: pre-line;">{{
          commonSettings.homepageHint
        }}</span>
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
