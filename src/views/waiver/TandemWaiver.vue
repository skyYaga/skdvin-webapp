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
        <v-form ref="form" v-model="valid">
          <v-row>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-col :cols="12"><div v-html="sanitizedWaiver"></div></v-col
          ></v-row>
          <v-row>
            <v-col :cols="12"><WaiverForm ref="waiverForm" /></v-col>
          </v-row>
          <v-row class="pa-3">
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="primary"
              @click="saveWaiver()"
              >{{ $t("save") }}</v-btn
            >
          </v-row>
        </v-form>
      </v-card-text></v-card
    >
  </v-container>
</template>

<script>
import WaiverForm from "../../components/waiver/WaiverCustomerForm.vue";
import { mapActions } from "vuex";
import DOMPurify from "dompurify";

export default {
  components: {
    WaiverForm,
  },
  data: () => ({
    valid: false,
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
    ...mapActions(["getWaiverSettingsAction", "saveWaiverAction"]),
    async loadWaiverSettings() {
      this.loading = true;
      const result = await this.getWaiverSettingsAction();
      if (result.payload != null) {
        this.waiver = result.payload;
      }
      this.loading = false;
    },
    async saveWaiver() {
      let valid = true;
      if (!this.$refs.form.validate()) {
        valid = false;
      }
      if (!this.$refs.waiverForm.validate()) {
        valid = false;
      }

      if (valid) {
        const waiver = this.$refs.waiverForm.getWaiver();
        this.loading = true;
        let result = await this.saveWaiverAction({
          waiver: waiver,
        });
        if (!result.success) {
          this.hintText = this.$t("waiver.save.error");
          this.hintColor = "red";
          this.showHint = true;
        } else {
          this.$router.push({
            name: "waiver-confirm",
          });
        }
        this.loading = false;
      }
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
