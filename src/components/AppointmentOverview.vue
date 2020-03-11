<template>
  <v-card :color="getColorForState">
    <v-card-title
      >{{ appointment.appointmentId }} {{ appointment.customer.firstName }}
      {{ appointment.customer.lastName }}</v-card-title
    >
    <v-card-text>
      <p>{{ appointment.tandem }}x Tandem</p>
      <p v-if="appointment.picOrVid > 0">
        {{ appointment.picOrVid }}x Foto oder Video
      </p>
      <p v-if="appointment.picAndVid > 0">
        {{ appointment.picAndVid }}x Foto und Video
      </p>
      <p v-if="appointment.handcam > 0">{{ appointment.handcam }}x Handcam</p>
    </v-card-text>
    <v-card-actions>
      <v-btn small @click="changeAppointmentState('ACTIVE')">Aktiv</v-btn>
      <v-btn small @click="changeAppointmentState('DONE')">Erledigt</v-btn>
      <v-btn small @click="changeAppointmentState('CONFIRMED')">Reset</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AppointmentOverview",
  props: {
    appointment: null
  },
  computed: {
    getColorForState() {
      let appointmentState = this.appointment.state;
      if (appointmentState === "UNCONFIRMED") {
        return "amber";
      }
      if (appointmentState === "ACTIVE") {
        return "light-green";
      }
      if (appointmentState === "DONE") {
        return "grey";
      }
      return "white";
    }
  },
  methods: {
    ...mapActions(["updateAppointmentStateAction"]),
    async changeAppointmentState(newState) {
      this.appointment.state = newState;

      let token = await this.$auth.getTokenSilently();
      await this.updateAppointmentStateAction({
        appointmentId: this.appointment.appointmentId,
        appointmentState: {
          state: newState
        },
        token
      });
    }
  }
};
</script>
