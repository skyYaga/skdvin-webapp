<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("waiver.waiver") }}</v-card-title
        ><v-card-text>
          <v-tabs
            ><v-tab
              v-for="(waiverSetting, index) in settings.waiverSettings"
              :key="index"
              >{{ index }}</v-tab
            >
            <v-tab-item
              v-for="(waiverSetting, index) in settings.waiverSettings"
              :key="index"
              ><Editor
                :editor-html="waiverSetting.tandemwaiver"
                @editor-update="
                  updateSettingsStore(index, $event)
                " /></v-tab-item
          ></v-tabs> </v-card-text
      ></v-card>
    </v-form>
  </v-container>
</template>

<script>
import Editor from "../Editor.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    Editor,
  },
  computed: {
    settings: {
      get() {
        if (this.$store.state.settings.settings.waiverSettings !== null) {
          return this.$store.state.settings.settings;
        }
        return {
          waiverSettings: {
            de: { tandemwaiver: "Tandemwaiver Text <strong>DE</strong>" },
            en: { tandemwaiver: "Tandemwaiver Text <strong>EN</strong>" },
          },
        };
      },
    },
  },
  methods: {
    ...mapMutations(["updateWaiverSettings"]),
    updateSettingsStore(lang, e) {
      this.updateWaiverSettings({ lang: lang, tandemwaiver: e });
    },
  },
};
</script>
