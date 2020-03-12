<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="false">
      <div class="mb-5">
        Am {{ getDate() }} um {{ getTime() }} Uhr verfügbare Slots:
        <ul>
          <li>
            Tandem: {{ getTandemAvailable }} (=buchbar:
            {{ maxBookableSlots.tandem }})
          </li>
          <li>
            Foto oder Video: {{ getPicOrVidAvailable }} (=buchbar:
            {{ maxBookableSlots.picOrVid }})
          </li>
          <li>
            Foto und Video: {{ getPicAndVidAvailable }} (=buchbar:
            {{ maxBookableSlots.picAndVid }})
          </li>
          <li>
            Handcam: {{ getHandcamAvailable }} (=buchbar:
            {{ maxBookableSlots.handcam }})
          </li>
        </ul>
      </div>
      <v-select
        v-model="appointment.tandem"
        :items="items"
        :rules="[
          v => !!v || 'Es muss mindestens 1 Tandemsprung ausgewählt werden',
          availableSlotsRule,
          moreTandemThanVideoRule
        ]"
        label="Tandems"
        type="number"
        required
      ></v-select>
      <v-select
        v-model="appointment.picOrVid"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        label="Foto oder Video"
        type="number"
        required
      ></v-select>
      <v-select
        v-model="appointment.picAndVid"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        label="Foto und Video"
        required
      ></v-select>
      <v-select
        v-model="appointment.handcam"
        :items="itemsZero"
        :rules="[availableSlotsRule, moreTandemThanVideoRule]"
        label="Handcam"
        required
      ></v-select>
      <v-btn class="mr-4" @click="searchForSlots" :disabled="updating"
        >Neuen Slot suchen</v-btn
      >
      <v-btn class="mr-4" @click="updateAppointment" :disabled="updating"
        >Aktualisieren</v-btn
      >
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
    updating: { type: Boolean, default: () => false }
  },
  data: () => ({
    valid: true,
    items: [1, 2, 3, 4, 5],
    itemsZero: [0, 1, 2, 3, 4, 5],
    update: false,
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
          "Nicht genügend freie Slots"
        );
      }
      return true;
    },
    moreTandemThanVideoRule(v) {
      if (v > this.appointment.tandem) {
        return "Mehr Videobuchungen als Tandemsprünge";
      }
      if (
        this.appointment.picOrVid +
          this.appointment.picAndVid +
          this.appointment.handcam >
        this.appointment.tandem
      ) {
        return "Mehr Videobuchungen als Tandemsprünge";
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
    searchForSlots() {
      this.update = false;
    },
    updateAppointment() {
      this.update = true;
      this.onUpdateAppointment();
      if (this.$refs.form.validate()) {
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        return true;
      }
      return false;
    },
    onUpdateAppointment() {
      this.$emit("onUpdateAppointment", this.appointment);
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
