<template>
  <v-container fluid
    ><v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn> </v-snackbar
    ><v-row
      ><v-col
        ><h1>{{ $t("waiver.waiver") }}</h1></v-col
      ></v-row
    >
    <v-card
      ><v-card-text>
        <v-row>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-col :cols="12"><div v-html="sanitizedWaiver"></div></v-col
        ></v-row>
        <v-row
          ><v-col :cols="12"><Signature /></v-col></v-row></v-card-text
    ></v-card>
  </v-container>
</template>

<script>
import Signature from "../components/waiver/Signature.vue";
import { mapActions } from "vuex";
import DOMPurify from "dompurify";

export default {
  components: {
    Signature,
  },
  data: () => ({
    waiver: { tandemwaiver: "" },
    loading: true,
    showHint: false,
    hintText: "",
    hintColor: "",
  }),
  computed: {
    sanitizedWaiver() {
      return DOMPurify.sanitize(this.waiver.tandemwaiver);
    },
  },
  async created() {
    await this.loadWaiverSettings();
  },
  methods: {
    ...mapActions(["getWaiverSettingsAction"]),
    async loadWaiverSettings() {
      this.loading = true;
      const result = await this.getWaiverSettingsAction();
      if (result.payload != null) {
        this.waiver = result.payload;
      }
      this.loading = false;
    },
    async saveWaiver() {
      this.loading = true;
      //let result = await this.saveWaiverAction();
      this.loading = false;
      //this.handleHint(result);
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
