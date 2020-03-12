<template>
  <div>
    <v-alert type="info" v-if="slots.length === 0"
      >Keine freien Slots gefunden.</v-alert
    >
    <v-expansion-panels>
      <v-expansion-panel v-for="slot in slots" :key="slot.date">
        <v-expansion-panel-header>{{ slot.date }}</v-expansion-panel-header>
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
  </div>
</template>

<script>
export default {
  props: {
    slots: Array
  },
  methods: {
    selectSlot(date, time) {
      this.$emit("onSlotSelected", date, time);
    }
  }
};
</script>
