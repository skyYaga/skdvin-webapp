<template>
  <v-container fluid>
    <v-row dense>
      <v-col :lg="3" :md="4" :sm="12">
        <v-card>
          <v-card-title>{{ $t("tandem.book") }}</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-select
                v-model="appointment.tandem"
                :items="items"
                :rules="[v => !!v || $t('rules.atLeast1Tandem')]"
                :label="$t('tandem.count')"
                type="number"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
              >
              </v-select>
              <v-select
                v-model="appointment.picOrVid"
                :items="itemsZero"
                :rules="rules"
                :label="$t('picOrVid.count')"
                type="number"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
                ><InfoDialog
                  slot="append-outer"
                  :heading="$t('picOrVid.picOrVid')"
                  :text="$t('picOrVid.info')"
              /></v-select>
              <v-select
                v-model="appointment.picAndVid"
                :items="itemsZero"
                :rules="rules"
                :label="$t('picAndVid.count')"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
                ><InfoDialog
                  slot="append-outer"
                  :heading="$t('picAndVid.picAndVid')"
                  :text="$t('picAndVid.info')"
              /></v-select>
              <v-select
                v-model="appointment.handcam"
                :items="itemsZero"
                :rules="rules"
                :label="$t('handcam.count')"
                :disabled="slots !== null && appointment.selectedTime !== null"
                required
                ><InfoDialog
                  slot="append-outer"
                  :heading="$t('handcam.handcam')"
                  :text="$t('handcam.info')"
              /></v-select>
              <v-btn
                class="mr-4"
                @click="searchForSlots"
                :loading="loading"
                :disabled="
                  loading === true ||
                    (slots !== null && appointment.selectedTime !== null)
                "
                >{{ $t("search") }}</v-btn
              >
              <v-btn
                class="mr-4"
                @click="resetForm"
                v-if="slots !== null && appointment.selectedTime !== null"
                >{{ $t("reset") }}</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        :lg="6"
        :sm="12"
        v-if="slots !== null && appointment.selectedTime === null"
      >
        <v-card>
          <v-card-title>{{ $t("slot.available") }}</v-card-title>
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
            >{{ $t("reservationData") }}: {{ appointment.selectedDate }},
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
          <v-card-title>{{ $t("dataVerification") }}</v-card-title>
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
import InfoDialog from "./InfoDialog";

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
    slots: null,
    loading: false
  }),
  components: {
    CustomerDataForm,
    CustomerConfirmationForm,
    AvailableSlotsPanel,
    InfoDialog
  },
  computed: {
    rules() {
      const rules = [];

      const rule = v =>
        (!!v && v) <= this.appointment.tandem ||
        this.$t("rules.moreVideoThanTandem");

      const allVidsRule = v =>
        this.appointment.picOrVid +
          this.appointment.picAndVid +
          this.appointment.handcam <=
          this.appointment.tandem || this.$t("rules.moreVideoThanTandem");

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
      this.loading = true;
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
      this.loading = false;
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
