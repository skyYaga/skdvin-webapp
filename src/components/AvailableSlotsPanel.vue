<template>
  <div>
    <v-alert v-if="slots.length === 0" type="info">{{
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
import { DateTime } from "luxon";

export default {
  props: {
    slots: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getMonthsForSlots() {
      let arrayOfSlots = [
        ...new Set(
          this.slots
            .filter((slot) => !DateTime.fromISO(slot.date) < DateTime.now()) // Today or later
            .map((slot) => DateTime.fromISO(slot.date).toFormat("yyyy-MM"))
        ),
      ];
      return arrayOfSlots.sort(function (a, b) {
        if (a === null) return 1;
        if (b === null) return -1;
        return DateTime.fromISO(a).toJSDate() - DateTime.fromISO(b).toJSDate();
      });
    },
  },
  methods: {
    selectSlot(date, time) {
      this.$emit("on-slot-selected", date, time);
    },
    getDate(date) {
      return DateTime.fromISO(date).toJSDate();
    },
    slotsInMonth(month) {
      return this.slots
        .filter(
          (slot) =>
            DateTime.fromISO(slot.date).hasSame(
              DateTime.fromISO(month),
              "month"
            ) && !DateTime.fromISO(slot.date) < DateTime.now()
        )
        .sort(function (a, b) {
          if (a === null) return 1;
          if (b === null) return -1;
          return (
            DateTime.fromISO(a.date).toJSDate() -
            DateTime.fromISO(b.date).toJSDate()
          );
        });
    },
  },
};
</script>
