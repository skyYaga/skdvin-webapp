<template>
  <v-dialog slot="append-outer" v-model="dialog" width="300"
    ><template #activator="{ on }"
      ><v-icon v-on="on">mdi-information</v-icon></template
    ><v-card>
      <v-card-title>{{ heading }}</v-card-title>
      <v-card-text>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="sanitizedText"></div>
        <p class="pt-5">
          {{ $t("pricelist.infos") }}
          <a :href="pricelist" target="_blank" rel="noopener noreferrer">{{
            $t("pricelist.pricelist")
          }}</a>
        </p>
      </v-card-text>
      <v-card-actions
        ><v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          {{ $t("ok") }}
        </v-btn></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>

<script>
import { mapGetters } from "vuex";
import DOMPurify from "dompurify";

export default {
  props: {
    heading: {
      type: String,
      default: "",
    },
    text: { type: String, default: "" },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters(["getCommonSettings"]),
    commonSettings() {
      return this.getCommonSettings();
    },
    pricelist() {
      let commonSettings = this.getCommonSettings();
      if (typeof commonSettings?.dropzone?.priceListUrl !== "undefined") {
        return commonSettings.dropzone.priceListUrl;
      }
      return "";
    },
    sanitizedText() {
      return DOMPurify.sanitize(this.text);
    },
  },
};
</script>
