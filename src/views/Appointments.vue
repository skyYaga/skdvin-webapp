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
      <v-row v-if="jumpday.jumping"
        ><v-col :cols="12" :md="6" :lg="6"
          ><AvailableTandemmasterPanel
            :tandemmasters="jumpday.tandemmaster" /></v-col
        ><v-col :cols="12" :md="6" :lg="6"
          ><AvailableVideoflyerPanel :videoflyers="jumpday.videoflyer" /></v-col
      ></v-row>
      <v-row v-for="time in getBookedTimes" :key="time" dense class="pt-4">
        <v-col cols="12"
          ><v-subheader class="display-1"> {{ time }} </v-subheader>
          <v-divider></v-divider
        ></v-col>
        <v-col
          v-for="appointment in getAppointmentsByTime(time)"
          :lg="3"
          :md="4"
          :sm="6"
          :key="appointment.appointmentId"
          ><AppointmentOverview :appointment="appointment" /></v-col
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
import AvailableTandemmasterPanel from "../components/AvailableTandemmasterPanel";
import AvailableVideoflyerPanel from "../components/AvailableVideoflyerPanel";
import Calendar from "../components/Calendar";
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Appointments",
  components: {
    AppointmentOverview,
    Calendar,
    AvailableTandemmasterPanel,
    AvailableVideoflyerPanel,
  },
  data: () => ({
    menu: false,
    loading: true,
    authorized: false,
    jumpday: {
      date: null,
      jumping: false,
    },
  }),
  async created() {
    await this.loadJumpdays();
    this.loadJumpday();
    await this.loadAppointments();
  },
  computed: {
    ...mapState(["jumpdays", "appointments"]),
    ...mapGetters(["getJumpdayByDate"]),
    getBookedTimes() {
      let times = this.$store.state.appointments.map(
        (appointment) =>
          appointment !== null && moment(appointment?.date).format("HH:mm")
      );
      let uniqueTimes = [...new Set(times)];
      return uniqueTimes;
    },
    date: {
      get: function () {
        if (typeof this.$route.query.date === "undefined") {
          return new Date().toISOString().substr(0, 10);
        }
        return this.$route.query.date;
      },
      set: function (date) {
        this.$router.push({
          name: "appointments",
          query: { date },
        });
      },
    },
    getDate() {
      if (this.date === "") {
        return "";
      }
      return this.$d(moment(this.date).toDate(), "dateYearMonthDayShort");
    },
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
    loadJumpday() {
      if (this.authorized) {
        let loadedJumpday = { ...this.getJumpdayByDate(this.date) };

        if (
          Object.entries(loadedJumpday).length === 0 &&
          loadedJumpday.constructor === Object
        ) {
          this.jumpday = {
            jumping: false,
            date: this.date,
          };
        } else {
          this.jumpday = JSON.parse(JSON.stringify(loadedJumpday));
        }
      }
    },
    nowFormatted() {
      return moment().format("YYYY-MM-DD");
    },
    dateSelected(date) {
      this.date = date;
      this.loadAppointments();
      this.loadJumpday();
    },
    getAppointmentsByTime(time) {
      return this.$store.state.appointments.filter(
        (appointment) => moment(appointment?.date).format("HH:mm") === time
      );
    },
  },
};
</script>
