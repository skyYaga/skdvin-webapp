<template>
  <v-row
    v-if="
      typeof settings !== 'undefined' &&
      (('homepageHintTitle' in settings.commonSettings &&
        settings.commonSettings.homepageHintTitle !== '') ||
        (typeof settings.commonSettings !== 'undefined' &&
          'homepageHint' in settings.commonSettings &&
          settings.commonSettings.homepageHint !== ''))
    "
  >
    <v-col cols="12" md="5">
      <v-alert prominent type="info">
        <h3>{{ settings.commonSettings.homepageHintTitle }}</h3>
        <span style="white-space: pre-line">{{
          settings.commonSettings.homepageHint
        }}</span>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: { ...mapState(["settings"]) },
};
</script>
