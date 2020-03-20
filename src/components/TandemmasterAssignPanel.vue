<template>
  <v-row>
    <v-snackbar :color="hintColor" v-model="showHint" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-col>
      <v-card>
        <v-card-title>{{
          $t("tandemmaster.assign", {
            firstName: tandemmaster.firstName,
            lastName: tandemmaster.lastName
          })
        }}</v-card-title>
        {{ message }}
        <v-row class="ma-1">
          <v-col v-for="month in jumpMonths" :key="month" :lg="3">
            <v-card
              ><v-card-title>{{
                $d(getDate(month), "dateYearMonthLong")
              }}</v-card-title
              ><v-card-text
                ><v-checkbox
                  v-for="day in jumpdaysInMonth(month)"
                  v-model="tandemmasterDetails.assignments[day]"
                  :key="day"
                  :label="$d(getDate(day), 'dateYearMonthDayWeekdayLong')"
                ></v-checkbox></v-card-text
            ></v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="ma-6"
            @click="updateAssignments"
            :disabled="loading"
            :loading="loading"
            >{{ $t("update") }}</v-btn
          ></v-row
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    tandemmaster: Object
  },
  data: () => ({
    message: "",
    loading: false,
    tandemmasterDetails: {},
    showHint: false,
    hintText: "",
    hintColor: ""
  }),
  async created() {
    this.loading = true;
    await this.loadTandemmaster();
    this.loading = false;
  },
  watch: {
    tandemmaster: "loadTandemmaster"
  },
  computed: {
    jumpMonths() {
      if (typeof this.tandemmasterDetails.assignments === "undefined") {
        return [];
      }
      return [
        ...new Set(
          Object.keys(this.tandemmasterDetails.assignments)
            .filter(assignment =>
              moment(assignment.date).isSameOrAfter(moment())
            )
            .map(date => moment(date).format("YYYY-MM"))
        )
      ].sort(function(a, b) {
        if (a === null) return 1;
        if (b === null) return -1;
        return moment(a).toDate() - moment(b).toDate();
      });
    }
  },
  methods: {
    ...mapActions([
      "getTandemmasterDetailsAction",
      "updateTandemmasterAssigmentsAction"
    ]),
    async loadTandemmaster() {
      this.message = this.$t("tandemmaster.loading");
      let result = await this.getTandemmasterDetailsAction({
        tandemmasterId: this.tandemmaster.id,
        token: await this.$auth.getTokenSilently()
      });
      this.tandemmasterDetails = result.payload;
      this.message = "";
    },
    getDate(month) {
      return moment(month).toDate();
    },
    jumpdaysInMonth(month) {
      return Object.keys(this.tandemmasterDetails.assignments)
        .filter(date => moment(date).isSame(moment(month), "month"))
        .map(date => date)
        .sort(function(a, b) {
          if (a === null) return 1;
          if (b === null) return -1;
          return moment(a).toDate() - moment(b).toDate();
        });
    },
    async updateAssignments() {
      let result = await this.updateTandemmasterAssigmentsAction({
        tandemmasterDetails: this.tandemmasterDetails,
        token: await this.$auth.getTokenSilently()
      });
      if (result.success) {
        this.hintText = this.$t("tandemmaster.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("tandemmaster.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    }
  }
};
</script>
