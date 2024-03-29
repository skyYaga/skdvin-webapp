<template>
  <v-row>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-col>
      <v-card>
        <v-card-title>{{
          $t("tandemmaster.assignment", {
            firstName: tandemmaster.firstName,
            lastName: tandemmaster.lastName,
          })
        }}</v-card-title>
        <v-card-text>
          <v-row v-if="editable" class="ma-1">
            <v-col
              ><v-btn @click="selectAll">{{ $t("jumpday.selectAll") }}</v-btn>
              <v-btn class="ml-2" @click="selectNone">{{
                $t("jumpday.selectNone")
              }}</v-btn></v-col
            >
          </v-row>
          <v-row v-if="loading" dense>
            <v-alert type="info">
              <v-progress-circular indeterminate></v-progress-circular>
              {{ message }}
            </v-alert>
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
                    v-for="day in jumpdaysInMonth(month)"
                    :key="day"
                    class="mt-n5"
                    :assignment="tandemmasterDetails.assignments[day]"
                    :day="day"
                    :self-assign="selfAssign"
                    :self-assignment-mode="selfAssignmentMode"
                    @update-assignment="updateLocalTandemmasterAssignment"
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
              :disabled="loading || updating"
              :loading="loading || updating"
              @click="updateAssignments"
              >{{ $t("update") }}</v-btn
            ></v-row
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { DateTime } from "luxon";
import { converters } from "../shared/converters";
import AssignmentSelectionPanel from "./AssignmentSelectionPanel.vue";

export default {
  components: {
    AssignmentSelectionPanel,
  },
  props: {
    tandemmaster: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selfAssign: { type: Boolean, default: false },
    selfAssignmentMode: { type: String, default: "" },
  },
  data: () => ({
    message: "",
    loading: false,
    updating: false,
    tandemmasterDetails: {},
    showHint: false,
    hintText: "",
    hintColor: "",
  }),
  computed: {
    editable() {
      return this.selfAssignmentMode !== "READONLY";
    },
  },
  watch: {
    tandemmaster: "loadTandemmaster",
  },
  async created() {
    this.loading = true;
    await this.loadTandemmaster();
    this.loading = false;
  },
  methods: {
    ...mapActions([
      "getTandemmasterDetailsAction",
      "updateTandemmasterAssigmentsAction",
      "updateMeTandemmasterAssigmentsAction",
    ]),
    async loadTandemmaster() {
      this.message = this.$t("tandemmaster.loading");

      if (this.selfAssign) {
        this.tandemmasterDetails = this.tandemmaster;
      } else {
        let result = await this.getTandemmasterDetailsAction({
          tandemmasterId: this.tandemmaster.id,
          token: await this.$auth.getTokenSilently(),
        });
        this.tandemmasterDetails = result.payload;
      }

      this.message = "";
    },
    getDate(month) {
      return DateTime.fromISO(month).toJSDate();
    },
    jumpMonths() {
      return converters.sortedJumpMonths(this.tandemmasterDetails);
    },
    jumpdaysInMonth(month) {
      return converters.sortedJumpdaysInMonth(this.tandemmasterDetails, month);
    },
    async updateAssignments() {
      this.updating = true;
      let result;
      if (this.selfAssign) {
        result = await this.updateMeTandemmasterAssigmentsAction({
          tandemmasterDetails: this.tandemmasterDetails,
          token: await this.$auth.getTokenSilently(),
        });
      } else {
        result = await this.updateTandemmasterAssigmentsAction({
          tandemmasterDetails: this.tandemmasterDetails,
          token: await this.$auth.getTokenSilently(),
        });
      }
      if (result.success) {
        this.hintText = this.$t("tandemmaster.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("tandemmaster.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
      this.updating = false;
    },
    selectAll() {
      Object.values(this.tandemmasterDetails.assignments).forEach(
        (assignment) => {
          assignment.assigned = true;
        }
      );
    },
    selectNone() {
      Object.values(this.tandemmasterDetails.assignments).forEach(
        (assignment) => {
          assignment.assigned = false;
        }
      );
    },
    updateLocalTandemmasterAssignment(day, assignment) {
      this.tandemmasterDetails.assignments[day] = assignment;
    },
  },
};
</script>
