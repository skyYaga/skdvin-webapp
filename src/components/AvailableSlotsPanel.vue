<template>
  <div>
    <v-alert type="info" v-if="slots.length === 0">{{
      $t("slot.noFreeFound")
    }}</v-alert>
    <v-expansion-panels>
      <v-expansion-panel v-for="month in getMonthsForSlots" :key="month.date">
        <v-expansion-panel-header>{{
          $d(getDate(month), "dateYearMonthLong")
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="slot in slotsInMonth(month)"
              :key="slot.date"
            >
              <v-expansion-panel-header>{{
                $d(getDate(slot.date), "dateYearMonthDayWeekdayLong")
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item
                    v-for="time in slot.times"
                    :key="time"
                    :link="true"
                    @click="selectSlot(slot.date, time)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ time }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    slots: Array
  },
  computed: {
    getMonthsForSlots() {
      return [
        ...new Set(
          this.slots
            .filter(slot => moment(slot.date).isSameOrAfter(moment()))
            .map(slot => moment(slot.date).format("YYYY-MM"))
        )
      ].sort(function(a, b) {
        if (a === null) return 1;
        if (b === null) return -1;
        return moment(a).toDate() - moment(b).toDate();
      });
    }
  },
  methods: {
    selectSlot(date, time) {
      this.$emit("onSlotSelected", date, time);
    },
    getDate(date) {
      return moment(date).toDate();
    },
    slotsInMonth(month) {
      return this.slots
        .filter(
          slot =>
            moment(slot.date).isSame(moment(month), "month") &&
            moment(slot.date).isSameOrAfter(moment())
        )
        .sort(function(a, b) {
          if (a === null) return 1;
          if (b === null) return -1;
          return moment(a.date).toDate() - moment(b.date).toDate();
        });
    }
  }
};
</script>
