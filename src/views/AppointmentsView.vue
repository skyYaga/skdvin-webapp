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
      <v-row dense
        ><h1>{{ $t("appointment.appointments") }}</h1></v-row
      >
      <v-row
        ><v-col :cols="12" :lg="4" :md="4" :sm="12">
          <CalendarPicker
            d-flex
            flex-wrap
            :date="date"
            @input="menu = false"
            @handle-date-selection="dateSelected"
            @handle-month-change="loadJumpdays"
          />
        </v-col>
        <v-col v-if="jumpday.jumping" :cols="12" :lg="8" :md="8" :sm="12">
          <JumpdayAppointmentStatsPanel :jumpday="jumpday" />
        </v-col>
      </v-row>
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
          :key="appointment.appointmentId"
          :lg="3"
          :md="4"
          :sm="6"
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
import AppointmentOverview from "../components/AppointmentOverview.vue";
import AvailableTandemmasterPanel from "../components/AvailableTandemmasterPanel.vue";
import AvailableVideoflyerPanel from "../components/AvailableVideoflyerPanel.vue";
import JumpdayAppointmentStatsPanel from "../components/appointments/JumpdayAppointmentStatsPanel.vue";
import CalendarPicker from "../components/CalendarPicker.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { DateTime } from "luxon";

export default {
  name: "AppointmentsView",
  components: {
    AppointmentOverview,
    CalendarPicker,
    AvailableTandemmasterPanel,
    AvailableVideoflyerPanel,
    JumpdayAppointmentStatsPanel,
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
  computed: {
    ...mapState(["jumpdays", "appointments"]),
    ...mapGetters(["getJumpdayByDate"]),
    getBookedTimes() {
      let times = this.$store.state.appointments.map(
        (appointment) =>
          appointment !== null &&
          DateTime.fromISO(appointment?.date).toFormat("HH:mm")
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
        this.$router
          .push({
            name: "appointments",
            query: { date },
          })
          .catch((err) => {
            // Ignore the vuex err regarding navigating to the page they are already on.
            if (
              err.name !== "NavigationDuplicated" &&
              !err.message.includes(
                "Avoided redundant navigation to current location"
              )
            ) {
              // eslint-disable-next-line
              console.error(err);
            }
          });
      },
    },
    getDate() {
      if (this.date === "") {
        return "";
      }
      return this.$d(
        DateTime.fromISO(this.date).toJSDate(),
        "dateYearMonthDayShort"
      );
    },
  },
  async created() {
    await this.loadJumpdays(DateTime.now().toFormat("yyyy-MM"));
    this.loadJumpday();
    await this.loadAppointments();
  },
  methods: {
    ...mapActions(["getJumpdaysAction", "getAppointmentsAction"]),
    async loadJumpdays(yearMonth) {
      this.message = this.$t("jumpday.loading");
      let unauthorizedMessage = await this.getJumpdaysAction({
        yearMonth: yearMonth,
        token: await this.$auth.getTokenSilently(),
      });
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
      return DateTime.now().toISODate();
    },
    dateSelected(date) {
      this.date = date;
      this.loadAppointments();
      this.loadJumpday();
    },
    getAppointmentsByTime(time) {
      return this.$store.state.appointments.filter(
        (appointment) =>
          DateTime.fromISO(appointment?.date).toFormat("HH:mm") === time
      );
    },
  },
};
</script>
