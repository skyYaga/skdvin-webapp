<template>
  <v-date-picker
    v-model="picker"
    v-model:picker-date="pickerDate"
    :landscape="landscape"
    :reactive="reactive"
    :full-width="fullWidth"
    :show-current="showCurrent"
    :type="month ? 'month' : 'date'"
    :multiple="multiple"
    :readonly="readonly"
    :disabled="disabled"
    :events="enableEvents ? functionEvents : null"
    :first-day-of-week="1"
    :locale="$i18n.locale"
    @click:date="onDateSelection"
  ></v-date-picker>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  emits: ["handle-date-selection", "handle-month-change"],
  data() {
    return {
      picker: this.date,
      landscape: false,
      reactive: false,
      fullWidth: false,
      showCurrent: true,
      month: false,
      multiple: false,
      readonly: false,
      disabled: false,
      enableEvents: true,
      pickerDate: null,
    };
  },

  computed: {
    functionEvents() {
      return this.dateFunctionEvents;
    },
  },

  watch: {
    pickerDate(val) {
      this.onMonthChange(val);
    },
  },

  methods: {
    dateFunctionEvents(date) {
      if (
        this.$store.state.jumpday.jumpdays.map((j) => j.date).includes(date)
      ) {
        return ["green"];
      }
      return false;
    },
    onDateSelection(date) {
      this.$emit("handle-date-selection", date);
    },
    onMonthChange(yearMonth) {
      this.$emit("handle-month-change", yearMonth);
    },
  },
};
</script>
