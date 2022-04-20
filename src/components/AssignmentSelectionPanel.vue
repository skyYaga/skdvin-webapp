<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-checkbox
          :input-value="assignment.assigned"
          :readonly="!isEditable"
          :disabled="!isEditable"
          :label="$d(getDate(day), 'dateYearMonthDayWeekdayLong')"
          @change="updateAssignment('assigned', $event)"
        ></v-checkbox
      ></v-row>
      <v-row>
        <v-checkbox
          v-if="assignment.assigned"
          :input-value="assignment.allday"
          :readonly="!isEditable"
          :disabled="!isEditable"
          class="pl-5 mt-n4"
          :label="$t('allDay')"
          @change="updateAssignment('allday', $event)"
        ></v-checkbox
      ></v-row>
      <v-row v-if="assignment.assigned && !assignment.allday">
        <v-col :lg="6" :sm="12">
          <v-text-field
            :value="assignment.from"
            class="pl-2 mt-n7"
            :label="$t('from')"
            placeholder="HH:MM"
            prepend-icon="mdi-clock-outline"
            :readonly="!isEditable"
            :disabled="!isEditable"
            :rules="rules"
            @input="updateAssignment('from', $event)"
          ></v-text-field>
        </v-col>
        <v-col :lg="6" :sm="12">
          <v-text-field
            :value="assignment.to"
            class="pl-2 mt-n7"
            :label="$t('to')"
            placeholder="HH:MM"
            prepend-icon="mdi-clock-outline"
            :readonly="!isEditable"
            :disabled="!isEditable"
            :rules="rules"
            @input="updateAssignment('to', $event)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-if="assignment.assigned"
            :value="assignment.note"
            class="pl-2 mt-n5"
            :label="$t('notes')"
            :readonly="!isEditable"
            :disabled="!isEditable"
            rows="1"
            outlined
            auto-grow
            @input="updateAssignment('note', $event)"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "AssignmentSelectionPanel",
  props: {
    assignment: {
      type: Object,
      default: () => {},
    },
    day: {
      type: String,
      default: () => DateTime().now().toJSDate(),
    },
    selfAssign: { type: Boolean, default: false },
    selfAssignmentMode: { type: String, default: "" },
  },
  data: () => ({
    initiallyAssigned: false,
  }),
  computed: {
    isEditable() {
      if (!this.selfAssign) {
        return true;
      }
      if (this.selfAssign && this.selfAssignmentMode === "WRITE_DELETE") {
        return true;
      }
      if (this.selfAssign && this.selfAssignmentMode === "NODELETE") {
        if (!this.initiallyAssigned) {
          return true;
        }
      }
      return false;
    },
    rules() {
      const rules = [];

      const rule = (v) =>
        v === null ||
        v === "" ||
        (v !== null &&
          /[0-9]{2}:[0-9]{2}/.test(v) &&
          DateTime.fromISO(v).isValid) ||
        this.$t("rules.invalidTime");
      rules.push(rule);

      if (
        this.assignment.from !== null &&
        this.assignment.to !== null &&
        this.assignment.from !== "" &&
        this.assignment.to !== ""
      ) {
        const beforeRule = () =>
          DateTime.fromISO(this.assignment.from) <
            DateTime.fromISO(this.assignment.to) ||
          this.$t("rules.fromSmallerTo");
        rules.push(beforeRule);
      }

      return rules;
    },
  },
  watch: {
    "assignment.from": "validateField",
    "assignment.to": "validateField",
  },
  created() {
    this.initiallyAssigned = this.assignment.assigned;
  },
  methods: {
    getDate(date) {
      return DateTime.fromISO(date).toJSDate();
    },
    allowedStep: (m) => m % 15 === 0,
    updateAssignment(field, value) {
      let tmpAssignment = JSON.parse(JSON.stringify(this.assignment));
      tmpAssignment[field] = value;
      if (tmpAssignment.allday) {
        tmpAssignment.from = null;
        tmpAssignment.to = null;
      }
      this.$emit("update-assignment", this.day, tmpAssignment);
    },
    validateField() {
      this.$refs.form.validate();
    },
  },
};
</script>
