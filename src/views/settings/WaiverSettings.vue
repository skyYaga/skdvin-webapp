<template>
  <v-container fluid>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn> </v-snackbar
    ><v-row
      ><v-col
        ><h1>{{ $t("waiver.waiver") }}</h1></v-col
      ></v-row
    >
    <v-row
      ><v-col><WaiverSettingsPanel /></v-col
    ></v-row>
    <v-row dense
      ><v-spacer></v-spacer
      ><v-btn
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="saveSettings"
        >{{ $t("save") }}</v-btn
      ></v-row
    >
  </v-container>
</template>

<script>
import WaiverSettingsPanel from "../../components/settings/WaiverSettingsPanel.vue";
import { mapActions } from "vuex";

export default {
  components: { WaiverSettingsPanel },
  data: () => ({
    loading: true,
    showHint: false,
    hintText: "",
    hintColor: "",
  }),
  async created() {
    await this.loadSettings();
  },
  methods: {
    ...mapActions([
      "getSettingsAction",
      "saveSettingsAction",
      "updateSettingsAction",
    ]),
    async loadSettings() {
      this.loading = true;
      await this.getSettingsAction(await this.$auth.getTokenSilently());
      this.loading = false;
    },
    async saveSettings() {
      this.loading = true;
      let result = await this.updateSettingsAction({
        token: await this.$auth.getTokenSilently(),
      });
      this.loading = false;
      this.handleHint(result);
    },
    async handleHint(result) {
      if (result.success) {
        this.hintText = this.$t("settings.save.successful");
        this.hintColor = "green";
        await this.loadSettings();
      } else {
        this.hintText = this.$t("settings.save.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
  },
};
</script>
