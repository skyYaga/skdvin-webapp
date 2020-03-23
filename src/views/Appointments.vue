<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row dense>
        <v-alert type="info">
          <v-progress-circular indeterminate></v-progress-circular>
          {{ message }}
        </v-alert>
      </v-row>
    </div>
    <div v-if="!loading && authorized">
      <v-row dense><h1>Termine</h1></v-row>
      <v-row
        ><v-col :lg="4">
          <Calendar
            d-flex
            flex-wrap
            @input="menu = false"
            @handleDateSelection="dateSelected"
          /> </v-col
      ></v-row>
      <v-row v-for="time in getBookedTimes" :key="time" dense>
        <v-col cols="12"
          ><v-subheader> {{ time }} </v-subheader> <v-divider></v-divider
        ></v-col>
        <v-col
          v-for="appointment in getAppointmentsByTime(time)"
          :lg="3"
          :md="4"
          :sm="6"
          :key="appointment.appointmentId"
          ><AppointmentOverview :appointment="appointment"/></v-col
      ></v-row>
    </div>
    <div v-if="!loading && !authorized">
      <v-row dense>
        <v-alert type="error">{{ message }}</v-alert>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import AppointmentOverview from "../components/AppointmentOverview";
import Calendar from "../components/Calendar";
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "Appointments",
  components: {
    AppointmentOverview,
    Calendar
  },
  data: () => ({
    menu: false,
    loading: true,
    authorized: false
  }),
  async created() {
    await this.loadJumpdays();
    await this.loadAppointments();
  },
  computed: {
    ...mapState(["jumpdays", "appointments"]),
    getBookedTimes() {
      let times = this.$store.state.appointments.map(
        appointment =>
          appointment !== null && moment(appointment?.date).format("HH:mm")
      );
      let uniqueTimes = [...new Set(times)];
      return uniqueTimes;
    },
    date: {
      get: function() {
        if (typeof this.$route.query.date === "undefined") {
          return new Date().toISOString().substr(0, 10);
        }
        return this.$route.query.date;
      },
      set: function(date) {
        this.$router.push({
          name: "appointments",
          query: { date }
        });
      }
    },
    getDate() {
      if (this.date === "") {
        return "";
      }
      return this.$d(moment(this.date).toDate(), "dateYearMonthDayShort");
    }
  },
  methods: {
    ...mapActions(["getJumpdaysAction", "getAppointmentsAction"]),
    async loadJumpdays() {
      this.message = this.$t("jumpday.loading");
      let unauthorizedMessage = await this.getJumpdaysAction(
        await this.$auth.getTokenSilently()
      );
      if (unauthorizedMessage !== "") {
        this.message = this.$t("accessdenied");
        this.authorized = false;
      } else {
        this.message = "";
        this.authorized = true;
      }
      this.loading = false;
    },
    async loadAppointments() {
      if (this.authorized) {
        let token = await this.$auth.getTokenSilently();
        await this.getAppointmentsAction({ date: this.date, token });
      }
    },
    nowFormatted() {
      return moment().format("YYYY-MM-DD");
    },
    dateSelected(date) {
      this.date = date;
      this.loadAppointments();
    },
    getAppointmentsByTime(time) {
      return this.$store.state.appointments.filter(
        appointment => moment(appointment?.date).format("HH:mm") === time
      );
    }
  }
};
</script>
