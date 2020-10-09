<template>
  <v-form>
    <v-select
      :value="appointment.tandem"
      :items="items"
      :rules="[
        (v) => !!v || $t('rules.atLeast1Tandem'),
        availableSlotsRule,
        moreTandemThanVideoRule,
      ]"
      :label="$t('tandem.tandems')"
      type="number"
      required
      @change="updateAppointment('tandem', $event)"
    ></v-select>
    <v-select
      :value="appointment.picOrVid"
      :items="itemsZero"
      :rules="[availableSlotsRule, moreTandemThanVideoRule]"
      :label="$t('picOrVid.picOrVid')"
      type="number"
      required
      @change="updateAppointment('picOrVid', $event)"
    ></v-select>
    <v-select
      :value="appointment.picAndVid"
      :items="itemsZero"
      :rules="[availableSlotsRule, moreTandemThanVideoRule]"
      :label="$t('picAndVid.picAndVid')"
      required
      @change="updateAppointment('picAndVid', $event)"
    ></v-select>
    <v-select
      :value="appointment.handcam"
      :items="itemsZero"
      :rules="[availableSlotsRule, moreTandemThanVideoRule]"
      :label="$t('handcam.handcam')"
      required
      @change="updateAppointment('handcam', $event)"
    ></v-select>
  </v-form>
</template>

<script>
export default {
  props: {
    appointment: Object,
    maxBookableSlots: Object,
  },
  data: () => ({
    items: [1, 2, 3, 4, 5],
    itemsZero: [0, 1, 2, 3, 4, 5],
  }),
  computed: {
    availableSlotsRule() {
      if (this.update) {
        return (
          (this.appointment.tandem <= this.maxBookableSlots.tandem &&
            this.appointment.picOrVid <= this.maxBookableSlots.picOrVid &&
            this.appointment.picAndVid <= this.maxBookableSlots.picOrVid &&
            this.appointment.handcam <= this.maxBookableSlots.picOrVid) ||
          this.$t("rules.notEnoughFreeSlots")
        );
      }
      return true;
    },
    moreTandemThanVideoRule(v) {
      if (v > this.appointment.tandem) {
        return this.$t("rules.moreVideoThanTandem");
      }
      if (
        this.appointment.picOrVid +
          this.appointment.picAndVid +
          this.appointment.handcam >
        this.appointment.tandem
      ) {
        return this.$t("rules.moreVideoThanTandem");
      }
      return true;
    },
  },
  methods: {
    updateAppointment(field, value) {
      let tmpAppointment = JSON.parse(JSON.stringify(this.appointment));
      tmpAppointment[field] = value;
      this.$emit("update-appointment", tmpAppointment);
    },
  },
};
</script>
