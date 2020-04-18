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
          $t("videoflyer.assignment", {
            firstName: videoflyer.firstName,
            lastName: videoflyer.lastName,
          })
        }}</v-card-title>
        {{ message }}
        <v-row class="ma-1" v-if="editable">
          <v-col
            ><v-btn @click="selectAll">{{ $t("jumpday.selectAll") }}</v-btn>
            <v-btn class="ml-2" @click="selectNone">{{
              $t("jumpday.selectNone")
            }}</v-btn></v-col
          >
        </v-row>
        <v-row class="ma-1">
          <v-col
            v-for="month in jumpMonths()"
            :key="month"
            :lg="3"
            :md="4"
            :sm="6"
            :cols="12"
          >
            <v-card
              ><v-card-title>{{
                $d(getDate(month), "dateYearMonthLong")
              }}</v-card-title
              ><v-card-text
                ><AssignmentSelectionPanel
                  class="mt-n5"
                  v-for="day in jumpdaysInMonth(month)"
                  :key="day"
                  :assignment="videoflyerDetails.assignments[day]"
                  :day="day"
                  :editable="editable"
                >
                </AssignmentSelectionPanel></v-card-text
            ></v-card>
          </v-col>
        </v-row>
        <v-row v-if="editable">
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
import { converters } from "../shared/converters";
import AssignmentSelectionPanel from "./AssignmentSelectionPanel";

export default {
  props: {
    videoflyer: Object,
    selfAssign: { type: Boolean, default: false },
    editable: { type: Boolean, default: true },
  },
  components: {
    AssignmentSelectionPanel,
  },
  data: () => ({
    message: "",
    loading: false,
    videoflyerDetails: {},
    showHint: false,
    hintText: "",
    hintColor: "",
  }),
  async created() {
    this.loading = true;
    await this.loadVideoflyer();
    this.loading = false;
  },
  watch: {
    videoflyer: "loadVideoflyer",
  },
  methods: {
    ...mapActions([
      "getVideoflyerDetailsAction",
      "updateVideoflyerAssigmentsAction",
      "updateMeVideoflyerAssigmentsAction",
    ]),
    async loadVideoflyer() {
      this.message = this.$t("videoflyer.loading");

      if (this.selfAssign) {
        this.videoflyerDetails = this.videoflyer;
      } else {
        let result = await this.getVideoflyerDetailsAction({
          videoflyerId: this.videoflyer.id,
          token: await this.$auth.getTokenSilently(),
        });
        this.videoflyerDetails = result.payload;
      }

      this.message = "";
    },
    getDate(month) {
      return moment(month).toDate();
    },
    jumpMonths() {
      return converters.sortedJumpMonths(this.videoflyerDetails);
    },
    jumpdaysInMonth(month) {
      return converters.sortedJumpdaysInMonth(this.videoflyerDetails, month);
    },
    async updateAssignments() {
      let result;
      if (this.selfAssign) {
        result = await this.updateMeVideoflyerAssigmentsAction({
          videoflyerDetails: this.videoflyerDetails,
          token: await this.$auth.getTokenSilently(),
        });
      } else {
        result = await this.updateVideoflyerAssigmentsAction({
          videoflyerDetails: this.videoflyerDetails,
          token: await this.$auth.getTokenSilently(),
        });
      }

      if (result.success) {
        this.hintText = this.$t("videoflyer.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("videoflyer.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    selectAll() {
      Object.entries(this.videoflyerDetails.assignments).forEach(
        ([date, assignment]) => {
          assignment.assigned = true;
        }
      );
    },
    selectNone() {
      Object.entries(this.videoflyerDetails.assignments).forEach(
        ([date, assignment]) => {
          assignment.assigned = false;
        }
      );
    },
  },
};
</script>
