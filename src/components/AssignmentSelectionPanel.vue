<template>
  <v-container>
    <v-row>
      <v-checkbox
        v-model="assignment.assigned"
        :label="$d(getDate(day), 'dateYearMonthDayWeekdayLong')"
      ></v-checkbox
    ></v-row>
    <v-row>
      <v-checkbox
        class="pl-5 mt-n4"
        v-if="assignment.assigned"
        v-model="assignment.allday"
        :label="$t('allDay')"
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
          <template v-slot:activator="{ on }">
            <v-text-field
              class="pl-2 mt-n7"
              v-model="assignment.from"
              :label="$t('from')"
              prepend-icon="mdi-clock-outline"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="fromPicker"
            v-model="assignment.from"
            min="9:00"
            :max="assignment.to"
            :allowed-minutes="allowedStep"
            full-width
            format="24hr"
            @click:minute="$refs.from.save(assignment.from)"
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
          <template v-slot:activator="{ on }">
            <v-text-field
              class="pl-2 mt-n7"
              v-model="assignment.to"
              :label="$t('to')"
              prepend-icon="mdi-clock-outline"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="toPicker"
            v-model="assignment.to"
            :min="assignment.from"
            max="20:00"
            :allowed-minutes="allowedStep"
            full-width
            format="24hr"
            @click:minute="$refs.to.save(assignment.to)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "AssignmentSelectionPanel",
  props: {
    assignment: Object,
    day: String,
  },
  data: () => ({
    fromPicker: false,
    toPicker: false,
  }),
  methods: {
    getDate(month) {
      return moment(month).toDate();
    },
    allowedStep: (m) => m % 15 === 0,
  },
};
</script>
