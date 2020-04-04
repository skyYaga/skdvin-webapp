<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="false">
      <div class="mb-5">
        {{ $t("slot.availableAt", { date: getDate(), time: getTime() }) }}:
        <ul>
          <li>
            {{ $t("tandem.tandems") }}: <br /><strong>{{
              getTandemAvailable
            }}</strong>
            {{ $t("additionalBookable") }} <br />({{ $t("totalSlots") }}:
            {{ maxBookableSlots.tandem }})
          </li>
          <li>
            {{ $t("picOrVid.picOrVid") }}: <br /><strong>{{
              getPicOrVidAvailable
            }}</strong>
            {{ $t("additionalBookable") }} <br />({{ $t("totalSlots") }}:
            {{ maxBookableSlots.picOrVid }})
          </li>
          <li>
            {{ $t("picAndVid.picAndVid") }}: <br /><strong>{{
              getPicAndVidAvailable
            }}</strong>
            {{ $t("additionalBookable") }} <br />({{ $t("totalSlots") }}:
            {{ maxBookableSlots.picAndVid }})
          </li>
          <li>
            {{ $t("handcam.handcam") }}: <br /><strong>{{
              getHandcamAvailable
            }}</strong>
            {{ $t("additionalBookable") }} <br />({{ $t("totalSlots") }}:
            {{ maxBookableSlots.handcam }})
          </li>
        </ul>
      </div>
      <SlotSelectionForm
        :appointment="appointment"
        :maxBookableSlots="maxBookableSlots"
      />
    </v-form>
  </div>
</template>

<script>
import moment from "moment";
import SlotSelectionForm from "./SlotSelectionForm";

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
  components: {
    SlotSelectionForm
  },
  data: () => ({
    valid: true,
    maxBookableSlots: {}
  }),
  computed: {
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
