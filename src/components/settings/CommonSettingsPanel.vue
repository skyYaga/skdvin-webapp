<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("settings.common") }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="tmpCommonSettings.selfAssignmentMode"
                :label="$t('selfassignment.mode')"
                :items="selfassignmentItems"
                @change="updateCommonSettings()"
              ></v-select
            ></v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="tmpCommonSettings.picAndVidEnabled"
                :label="$t('picAndVid.enabled')"
                @change="updateCommonSettings()"
              ></v-checkbox
            ></v-col> </v-row></v-card-text
      ></v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    commonSettings: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      tmpCommonSettings: JSON.parse(JSON.stringify(this.commonSettings)),
      selfassignmentItems: [
        { text: this.$t("selfassignment.readonly"), value: "READONLY" },
        { text: this.$t("selfassignment.nodelete"), value: "NODELETE" },
        { text: this.$t("selfassignment.write-delete"), value: "WRITE_DELETE" },
      ],
    };
  },
  watch: {
    commonSettings(val) {
      this.tmpCommonSettings = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    updateCommonSettings() {
      this.$emit("update-common-settings", this.tmpCommonSettings);
    },
  },
};
</script>
