<template>
  <v-container fluid
    ><v-row
      ><v-col
        ><h1>{{ $t("settings.settings") }}</h1></v-col
      ></v-row
    ><v-row
      ><v-col
        ><CommonSettingsPanel
          :commonSettings="settings.commonSettings" /></v-col></v-row
    ><v-row
      ><v-col
        ><AdminSettingsPanel
          :adminSettings="settings.adminSettings" /></v-col></v-row
    ><v-row dense
      ><v-spacer></v-spacer
      ><v-btn
        color="primary"
        @click="saveSettings"
        :loading="loading"
        :disabled="loading"
        >{{ $t("save") }}</v-btn
      ></v-row
    ></v-container
  >
</template>

<script>
import { mapActions } from "vuex";
import AdminSettingsPanel from "../components/settings/AdminSettingsPanel";
import CommonSettingsPanel from "../components/settings/CommonSettingsPanel";

export default {
  components: {
    AdminSettingsPanel,
    CommonSettingsPanel,
  },
  data: () => ({
    loading: true,
    settings: {
      adminSettings: {
        tandemsFrom: "10:00",
        tandemsTo: "18:00",
        interval: "1:30",
        tandemCount: 5,
        picOrVidCount: 2,
        picAndVidCount: 0,
        handcamCount: 0,
      },
      commonSettings: {
        de: {
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
            {
              id: 2,
              question: "Example question 2?",
              answer: "Example answer 2",
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
            {
              id: 2,
              question: "Example question 2?",
              answer: "Example answer 2",
            },
          ],
        },
      },
    },
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
      let result = await this.getSettingsAction(
        await this.$auth.getTokenSilently()
      );
      this.loading = false;
      if (result.payload != null) {
        this.settings = result.payload;
      }
    },
    async saveSettings() {
      this.loading = true;
      let result;
      if (this.settings.id == null) {
        result = await this.saveSettingsAction({
          settings: this.settings,
          token: await this.$auth.getTokenSilently(),
        });
      } else {
        result = await this.updateSettingsAction({
          settings: this.settings,
          token: await this.$auth.getTokenSilently(),
        });
      }
      this.loading = false;
      if (result.payload != null) {
        this.settings = result.payload;
      }
    },
  },
};
</script>
