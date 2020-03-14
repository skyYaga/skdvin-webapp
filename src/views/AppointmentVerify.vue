<template>
  <v-container
    fluid
    :style="{
      background:
        'center top no-repeat fixed url(' +
        require('../assets/tandem-background.jpeg') +
        ')',
      backgroundSize: 'cover',
      height: '100%'
    }"
  >
    <v-alert :type="alertType">
      <v-progress-circular v-if="!loaded" indeterminate></v-progress-circular
      >{{ message }}<br />
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AppointmentVerify",
  data: () => ({
    message: "",
    error: "",
    loaded: false,
    alertType: "info"
  }),
  async created() {
    await this.verifyAppointment();
  },
  computed: {
    getId() {
      return this.$route.query.id;
    },
    getToken() {
      return this.$route.query.token;
    }
  },
  methods: {
    ...mapActions(["verifyAppointmentAction"]),
    async verifyAppointment() {
      this.message = this.$t("appointment.verify");
      this.error = await this.verifyAppointmentAction({
        id: this.getId,
        token: this.getToken
      });

      this.loaded = true;

      if (this.error === "") {
        this.message = this.$t("appointment.confirmation.success");
        this.alertType = "success";
      } else {
        this.message = this.$t("appointment.confirmation.error");
        this.alertType = "error";
      }
    }
  }
};
</script>
