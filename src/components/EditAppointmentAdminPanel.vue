<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="false">
      <div class="mb-5">
        {{ $t("slot.availableAt", { date: getDate(), time: getTime() }) }}:
        <ul>
          <li>
            {{ $t("tandem.tandems") }}: {{ getTandemAvailable }} (={{
              $t("bookable")
            }}: {{ maxBookableSlots.tandem }})
          </li>
          <li>
            {{ $t("picOrVid.picOrVid") }}: {{ getPicOrVidAvailable }} (={{
              $t("bookable")
            }}: {{ maxBookableSlots.picOrVid }})
          </li>
          <li>
            {{ $t("picAndVid.picAndVid") }}: {{ getPicAndVidAvailable }} (={{
              $t("bookable")
            }}: {{ maxBookableSlots.picAndVid }})
          </li>
          <li>
            {{ $t("handcam.handcam") }}: {{ getHandcamAvailable }} (={{
              $t("bookable")
            }}: {{ maxBookableSlots.handcam }})
          </li>
        </ul>
      </div>
      <v-select
        v-model="appointment.tandem"
        :items="items"
        :rules="[
          v => !!v || $t('rules.atLeast1Tandem'),
          availableSlotsRule,
          moreTandemThanVideoRule
        ]"
        :label="$t('tandem.tandems')"
        type="number"
        required
      ></v-select>
      <v-select
        v-model="appointment.picOrVid"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        :label="$t('picOrVid.picOrVid')"
        type="number"
        required
      ></v-select>
      <v-select
        v-model="appointment.picAndVid"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        :label="$t('picAndVid.picAndVid')"
        required
      ></v-select>
      <v-select
        v-model="appointment.handcam"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        :label="$t('handcam.handcam')"
        required
      ></v-select>
    </v-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    appointment: {
      type: Object,
      default: () => ({
        tandem: 0,
        picOrVid: 0,
        picAndVid: 0,
        handcam: 0
      })
    },
    slots: Object,
    update: { type: Boolean, default: () => false }
  },
  data: () => ({
    valid: true,
    items: [1, 2, 3, 4, 5],
    itemsZero: [0, 1, 2, 3, 4, 5],
    maxBookableSlots: {}
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
    getTandemAvailable() {
      return this.slots?.tandemAvailable;
    },
    getPicOrVidAvailable() {
      return this.slots?.picOrVidAvailable;
    },
    getPicAndVidAvailable() {
      return this.slots?.picAndVidAvailable;
    },
    getHandcamAvailable() {
      return this.slots?.handcamAvailable;
    }
  },
  watch: {
    appointment: "validate",
    slots: function() {
      this.calculateMaxBookableSlots();
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        return true;
      }
      return false;
    },
    getDate() {
      return moment(this.appointment.date).format("DD.MM.YYYY");
    },
    getTime() {
      return moment(this.appointment.date).format("HH:mm");
    },
    calculateMaxBookableSlots() {
      this.maxBookableSlots = {
        tandem: this.slots?.tandemAvailable + this.appointment.tandem,
        picOrVid: this.slots?.picOrVidAvailable + this.appointment.picOrVid,
        picAndVid: this.slots?.picAndVidAvailable + this.appointment.picAndVid,
        handcam: this.slots?.handcamAvailable + this.appointment.handcam
      };
    }
  }
};
</script>
