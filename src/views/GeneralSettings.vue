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
    ><v-row
      ><v-col
        ><AdminSettingsPanel
          :admin-settings="tmpSettings.adminSettings"
          @update-admin-settings="updateAdminSettings" /></v-col></v-row
    ><v-row
      ><v-col
        ><CommonSettingsPanel
          :common-settings="tmpSettings.commonSettings"
          @update-common-settings="updateCommonSettings" /></v-col></v-row
    ><v-row
      ><v-col
        ><LanguageSettingsPanel
          :language-settings="tmpSettings.languageSettings"
          @update-language-settings="updateLanguageSettings" /></v-col></v-row
    ><v-row dense
      ><v-spacer></v-spacer
      ><v-btn
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="saveSettings"
        >{{ $t("save") }}</v-btn
      ></v-row
    ></v-container
  >
</template>

<script>
import { mapActions } from "vuex";
import AdminSettingsPanel from "../components/settings/AdminSettingsPanel.vue";
import LanguageSettingsPanel from "../components/settings/LanguageSettingsPanel.vue";
import CommonSettingsPanel from "../components/settings/CommonSettingsPanel.vue";

export default {
  components: {
    AdminSettingsPanel,
    LanguageSettingsPanel,
    CommonSettingsPanel,
  },
  data: () => ({
    showHint: false,
    hintText: "",
    hintColor: "",
    loading: true,
    tmpSettings: {
      adminSettings: {
        tandemsFrom: "10:00",
        tandemsTo: "18:00",
        interval: "1:30",
        tandemCount: 5,
        picOrVidCount: 2,
        picAndVidCount: 0,
        handcamCount: 0,
      },
      languageSettings: {
        de: {
          dropzone: {
            name: "Beispiel DZ",
            priceListUrl: "https://example.com",
          },
          faq: [
            {
              id: 1,
              question: "Beispielfrage 1?",
              answer: "Beispielantwort 1",
            },
          ],
        },
        en: {
          dropzone: {
            name: "Example DZ",
            priceListUrl: "https://example.com",
          },
          faq: [
            {
              id: 1,
              question: "Example question 1?",
              answer: "Example answer 1",
            },
          ],
        },
      },
    },
    commonSettings: {},
  }),
  async created() {
    await this.loadSettings();
  },
  methods: {
    ...mapActions([
      "getSettingsAction",
      "getCommonSettingsAction",
      "saveSettingsAction",
      "updateSettingsAction",
    ]),
    async loadSettings() {
      this.loading = true;
      let result = await this.getSettingsAction(
        await this.$auth.getTokenSilently()
      );
      this.loading = false;
      if (result.payload != null) {
        this.tmpSettings = JSON.parse(JSON.stringify(result.payload));
      }
    },
    async loadCommonSettings() {
      await this.getCommonSettingsAction();
    },
    async saveSettings() {
      this.loading = true;
      let result;
      if (this.tmpSettings.id == null) {
        result = await this.saveSettingsAction({
          settings: this.tmpSettings,
          token: await this.$auth.getTokenSilently(),
        });
      } else {
        result = await this.updateSettingsAction({
          settings: this.tmpSettings,
          token: await this.$auth.getTokenSilently(),
        });
      }
      if (result.payload != null) {
        this.tmpSettings = JSON.parse(JSON.stringify(result.payload));
      }
      this.loading = false;
      this.handleHint(result);
    },
    async handleHint(result) {
      if (result.success) {
        this.hintText = this.$t("settings.save.successful");
        this.hintColor = "green";
        await this.loadCommonSettings();
      } else {
        this.hintText = this.$t("settings.save.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    updateAdminSettings(adminSettings) {
      this.tmpSettings.adminSettings = adminSettings;
    },
    updateCommonSettings(commonSettings) {
      this.tmpSettings.commonSettings = commonSettings;
    },
    updateLanguageSettings(languageSettings) {
      this.tmpSettings.languageSettings = languageSettings;
    },
  },
};
</script>
