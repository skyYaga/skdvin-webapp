<template>
  <v-container>
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
        <v-menu
          ref="from"
          v-model="fromPicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="assignment.from"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="assignment.from"
              class="pl-2 mt-n7"
              :label="$t('from')"
              prepend-icon="mdi-clock-outline"
              readonly
              v-on="on"
              @input="updateAssignment('from', $event)"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="fromPicker"
            :value="assignment.from"
            :disabled="!isEditable"
            :readonly="!isEditable"
            min="9:00"
            :max="assignment.to"
            :allowed-minutes="allowedStep"
            full-width
            format="24hr"
            @click:minute="$refs.from.save(assignment.from)"
            @input="updateAssignment('from', $event)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col :lg="6" :sm="12">
        <v-menu
          ref="to"
          v-model="toPicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="assignment.to"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="assignment.to"
              class="pl-2 mt-n7"
              :label="$t('to')"
              prepend-icon="mdi-clock-outline"
              readonly
              v-on="on"
              @input="updateAssignment('to', $event)"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="toPicker"
            :value="assignment.to"
            :disabled="!isEditable"
            :readonly="!isEditable"
            :min="assignment.from"
            max="20:00"
            :allowed-minutes="allowedStep"
            full-width
            format="24hr"
            @click:minute="$refs.to.save(assignment.to)"
            @input="updateAssignment('to', $event)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
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
    fromPicker: false,
    toPicker: false,
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
      this.$emit("update-assignment", this.day, tmpAssignment);
    },
  },
};
</script>
