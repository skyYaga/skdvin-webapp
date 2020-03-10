<template>
  <v-row justify="space-around">
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
      @click:date="onDateSelection"
    ></v-date-picker>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      fullWidth: false,
      showCurrent: true,
      month: false,
      multiple: false,
      readonly: false,
      disabled: false,
      enableEvents: true
    };
  },

  computed: {
    functionEvents() {
      return this.dateFunctionEvents;
    }
  },

  methods: {
    dateFunctionEvents(date) {
      if (this.$store.state.jumpdays.map(j => j.date).includes(date)) {
        return ["green"];
      }
      return false;
    },
    onDateSelection(date) {
      this.$emit("handleDateSelection", date);
    }
  }
};
</script>
