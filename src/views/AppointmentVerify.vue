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
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        color="primary"
      ></v-progress-circular
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
      this.message = "verifying appointment, please be patient...";
      this.error = await this.verifyAppointmentAction({
        id: this.getId,
        token: this.getToken
      });

      this.loaded = true;

      if (this.error === "") {
        this.message = "Termin erfolgreich bestätigt.";
        this.alertType = "success";
      } else {
        this.message = "Fehler beim Bestätigen des Termins.";
        this.alertType = "error";
      }
    }
  }
};
</script>
