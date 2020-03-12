<template>
  <v-container fluid>
    <v-row dense>
      <v-col :lg="3" :md="4" :sm="12">
        <v-card>
          <v-card-title>Tandemsprung buchen</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-select
                v-model="appointment.tandem"
                :items="items"
                :rules="[
                  v =>
                    !!v || 'Es muss mindestens 1 Tandemsprung ausgewählt werden'
                ]"
                label="Anzahl Tandemsprünge"
                type="number"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
              ></v-select>
              <v-select
                v-model="appointment.picOrVid"
                :items="itemsZero"
                :rules="rules"
                label="Anzahl Foto oder Video"
                type="number"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
              ></v-select>
              <v-select
                v-model="appointment.picAndVid"
                :items="itemsZero"
                :rules="rules"
                label="Anzahl Foto und Video"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
              ></v-select>
              <v-select
                v-model="appointment.handcam"
                :items="itemsZero"
                :rules="rules"
                label="Anzahl Handcam"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
              ></v-select>
              <v-btn
                class="mr-4"
                @click="searchForSlots"
                :disabled="slots !== null && appointment.selectedTime !== null"
                >Suchen</v-btn
              >
              <v-btn
                class="mr-4"
                @click="resetForm"
                v-if="slots !== null && appointment.selectedTime !== null"
                >Zurücksetzen</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="slots !== null && appointment.selectedTime === null">
        <v-card>
          <v-card-title>Verfügbare Zeitslots</v-card-title>
          <v-card-text>
            <AvailableSlotsPanel :slots="slots" @onSlotSelected="selectSlot" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-if="
          appointment.selectedTime !== null && appointment.customer === null
        "
      >
        <v-card>
          <v-card-title
            >Reservierungsdaten: {{ appointment.selectedDate }},
            {{ appointment.selectedTime }}</v-card-title
          >
          <v-card-text>
            <CustomerDataForm
              @handleCustomerDataFilled="updateCustomer"
              :tandem="appointment.tandem"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-if="
          appointment.selectedTime !== null && appointment.customer !== null
        "
      >
        <v-card>
          <v-card-title>Datenüberprüfung</v-card-title>
          <v-card-text>
            <CustomerConfirmationForm :appointment="appointment" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import CustomerDataForm from "./CustomerDataForm";
import CustomerConfirmationForm from "./CustomerConfirmationForm";
import AvailableSlotsPanel from "./AvailableSlotsPanel";

export default {
  data: () => ({
    valid: true,
    appointment: {
      selectedDate: null,
      selectedTime: null,
      tandem: null,
      picOrVid: 0,
      picAndVid: 0,
      handcam: 0,
      customer: null
    },
    items: [1, 2, 3, 4, 5],
    itemsZero: [0, 1, 2, 3, 4, 5],
    lazy: false,
    slots: null
  }),
  components: {
    CustomerDataForm,
    CustomerConfirmationForm,
    AvailableSlotsPanel
  },
  computed: {
    rules() {
      const rules = [];

      const rule = v =>
        (!!v && v) <= this.appointment.tandem ||
        "Mehr Videobuchungen als Tandemsprünge";

      const allVidsRule = v =>
        this.appointment.picOrVid +
          this.appointment.picAndVid +
          this.appointment.handcam <=
          this.appointment.tandem || "Mehr Videobuchungen als Tandemsprünge";

      rules.push(rule);
      rules.push(allVidsRule);

      return rules;
    }
  },
  watch: {
    appointment: {
      tandem: "validate",
      picOrVid: "validate",
      picAndVid: "validate",
      handcam: "validate"
    }
  },
  methods: {
    ...mapActions(["searchSlotsAction"]),
    async searchForSlots() {
      let query = {
        tandem: this.appointment.tandem,
        picOrVid: this.appointment.picOrVid,
        picAndVid: this.appointment.picAndVid,
        handcam: this.appointment.handcam
      };
      this.slots = await this.searchSlotsAction(query);
      this.slots = this.slots.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },
    selectSlot(date, time) {
      this.appointment.selectedDate = date;
      this.appointment.selectedTime = time;
    },
    resetForm() {
      this.slots = null;
      this.appointment.selectedDate = null;
      this.appointment.selectedTime = null;
    },
    validate() {
      this.$refs.form.validate();
    },
    updateCustomer(customer) {
      this.appointment.customer = customer;
    }
  }
};
</script>
