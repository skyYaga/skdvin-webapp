<template>
  <v-card :color="getColorForState">
    <v-card-title>
      <router-link
        v-slot="{ navigate }"
        :to="{
          name: 'appointment-details',
          params: { id: appointment.appointmentId },
        }"
        custom
      >
        <button
          role="link"
          class="button"
          @click="navigate"
          @keypress.enter="navigate"
        >
          {{ appointment.appointmentId }} {{ appointment.customer.firstName }}
          {{ appointment.customer.lastName }}
        </button>
      </router-link></v-card-title
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
      <v-textarea
        v-if="appointment.note !== ''"
        :value="appointment.note"
        disabled
        rows="1"
        auto-grow
        solo
        background-color="amber lighten-4"
        class="body-2"
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="mt-n5">
      <v-btn
        small
        :loading="loading"
        :disabled="loading"
        @click="changeAppointmentState('ACTIVE')"
        >{{ $t("active") }}</v-btn
      >
      <v-btn
        small
        :loading="loading"
        :disabled="loading"
        @click="changeAppointmentState('DONE')"
        >{{ $t("done") }}</v-btn
      >
      <v-btn
        small
        :loading="loading"
        :disabled="loading"
        @click="changeAppointmentState('CONFIRMED')"
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
    appointment: {
      type: Object,
      default: () => {},
    },
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
    },
  },
  methods: {
    ...mapActions(["updateAppointmentStateAction"]),
    async changeAppointmentState(newState) {
      this.loading = true;
      let token = await this.$auth.getTokenSilently();
      await this.updateAppointmentStateAction({
        appointmentId: this.appointment.appointmentId,
        appointmentState: {
          state: newState,
        },
        token,
      });
      this.loading = false;
    },
  },
};
</script>
