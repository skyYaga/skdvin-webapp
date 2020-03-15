<template>
  <v-card :color="getColorForState">
    <v-card-title
      ><router-link
        tag="button"
        class="button"
        :to="{
          name: 'appointment-details',
          params: { id: appointment.appointmentId }
        }"
        >{{ appointment.appointmentId }} {{ appointment.customer.firstName }}
        {{ appointment.customer.lastName }}</router-link
      ></v-card-title
    >
    <v-card-text>
      <p>{{ appointment.tandem }}x {{ $t("tandem.tandem") }}</p>
      <p v-if="appointment.picOrVid > 0">
        {{ appointment.picOrVid }}x {{ $t("picOrVid.picOrVid") }}
      </p>
      <p v-if="appointment.picAndVid > 0">
        {{ appointment.picAndVid }}x {{ $t("picAndVid.picAndVid") }}
      </p>
      <p v-if="appointment.handcam > 0">
        {{ appointment.handcam }}x {{ $t("handcam.handcam") }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        small
        @click="changeAppointmentState('ACTIVE')"
        :disabled="loading"
        >{{ $t("active") }}</v-btn
      >
      <v-btn
        small
        @click="changeAppointmentState('DONE')"
        :disabled="loading"
        >{{ $t("done") }}</v-btn
      >
      <v-btn
        small
        @click="changeAppointmentState('CONFIRMED')"
        :disabled="loading"
        >{{ $t("reset") }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AppointmentOverview",
  props: {
    appointment: Object
  },
  data: () => ({ loading: false }),
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
      this.loading = true;
      let token = await this.$auth.getTokenSilently();
      await this.updateAppointmentStateAction({
        appointmentId: this.appointment.appointmentId,
        appointmentState: {
          state: newState
        },
        token
      });
      this.loading = false;
    }
  }
};
</script>
