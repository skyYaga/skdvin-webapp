<template>
  <v-date-picker
    v-model="picker"
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
    };
  },

  computed: {
    functionEvents() {
      return this.dateFunctionEvents;
    },
  },

  methods: {
    dateFunctionEvents(date) {
      if (this.$store.state.jumpdays.map((j) => j.date).includes(date)) {
        return ["green"];
      }
      return false;
    },
    onDateSelection(date) {
      this.$emit("handleDateSelection", date);
    },
  },
};
</script>
