<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row
          ><v-col
            ><v-text-field
              v-model="customer.firstName"
              :label="$t('firstName')"
              :rules="nameRules"
              required
            ></v-text-field></v-col
          ><v-col
            ><v-text-field
              v-model="customer.lastName"
              :label="$t('lastName')"
              :rules="nameRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col
            ><v-text-field
              type="tel"
              v-model="customer.tel"
              :label="$t('tel')"
              :rules="telRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col
            ><v-text-field
              v-model="customer.email"
              type="email"
              :label="$t('email')"
              :rules="emailRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col :lg="2" :sm="3"
            ><v-text-field
              v-model="customer.zip"
              :label="$t('zip')"
              :rules="zipRules"
              required
            ></v-text-field></v-col
          ><v-col
            ><v-text-field
              v-model="customer.city"
              :label="$t('city')"
              :rules="nameRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row v-if="isAdmin"
          ><v-col
            ><v-checkbox
              v-model="adminBooking"
              :label="$t('booking.admin')"
            ></v-checkbox></v-col
        ></v-row>
        <v-row v-if="!adminBooking"
          ><v-col>
            <JumperDetailsForm
              ref="jumperDetails"
              :jumperNum="i"
              v-for="i in tandemSize"
              :key="i"
              :bookedJumper="getJumperIfAvailable(i)"/></v-col
        ></v-row>
        <v-textarea
          v-if="isAdmin"
          :label="$t('notes')"
          outlined
          v-model="appointment.note"
        ></v-textarea>
        <v-row v-if="buttonVisible"
          ><v-btn class="mr-4" @click="back">{{ $t("back") }}</v-btn
          ><v-spacer></v-spacer
          ><v-btn class="mr-4" @click="validate" color="primary">{{
            $t("continue")
          }}</v-btn></v-row
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
import JumperDetailsForm from "./JumperDetailsForm";
import { roleUtil } from "../shared/roles";

export default {
  props: {
    appointment: Object,
    buttonVisible: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    JumperDetailsForm
  },
  data: function() {
    return {
      adminBooking: false,
      valid: false,
      nameRules: [
        v => !!v || this.$i18n.t("rules.fieldHasToBeFilled"),
        v => (v && v.length <= 40) || this.$i18n.t("rules.max40Chars")
      ],
      zipRules: [
        v => !!v || this.$i18n.t("rules.zipNeeded"),
        v => v.length === 5 || this.$i18n.t("rules.zip5digit"),
        v => !isNaN(v) || this.$i18n.t("rules.zipNumbers")
      ],
      emailRules: [
        v => !!v || this.$i18n.t("rules.emailNeeded"),
        v => /.+@.+\..+/.test(v) || this.$i18n.t("rules.emailValid")
      ],
      telRules: [
        v => !!v || this.$i18n.t("rules.telNeeded"),
        v =>
          (v && v.length > 0 && /[0-9 +-]{6,}$/.test(v)) ||
          this.$i18n.t("rules.telValid")
      ]
    };
  },
  methods: {
    back() {
      this.onCustomerDataFilled();
      this.$emit("onCustomerDataBack", this.customer);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.onCustomerDataFilled();
        this.$emit("onCustomerDataContinue", this.customer);
        return true;
      }
      return false;
    },
    onCustomerDataFilled() {
      this.customer.jumpers = [];
      if (!this.adminBooking) {
        this.$refs.jumperDetails.forEach(jd => {
          this.customer.jumpers.push(jd.getJumper());
        });
      }
    },
    getJumperIfAvailable(i) {
      if (typeof this.appointment?.customer !== "undefined") {
        return this.appointment.customer.jumpers[i - 1];
      }
      return null;
    }
  },
  computed: {
    tandemSize() {
      return this.appointment.tandem;
    },
    customer() {
      return this.appointment.customer;
    },
    isAdmin() {
      return roleUtil.isAdmin(this.$auth);
    }
  }
};
</script>
