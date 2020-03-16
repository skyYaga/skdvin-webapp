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

        <JumperDetailsForm
          ref="jumperDetails"
          :jumperNum="i"
          v-for="i in tandemSize"
          :key="i"
          :bookedJumper="getJumperIfAvailable(i)"
        />
        <v-row v-if="buttonVisible"
          ><v-btn class="mr-4" @click="validate">{{
            $t("continue")
          }}</v-btn></v-row
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
import JumperDetailsForm from "./JumperDetailsForm";

export default {
  props: {
    tandem: Number,
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
    validate() {
      if (this.$refs.form.validate()) {
        this.onCustomerDataFilled();
        return true;
      }
      return false;
    },
    onCustomerDataFilled() {
      this.customer.jumpers = [];
      this.$refs.jumperDetails.forEach(jd => {
        this.customer.jumpers.push(jd.getJumper());
      });
      this.$emit("handleCustomerDataFilled", this.customer);
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
      if (typeof this.appointment?.tandem !== "undefined") {
        return this.appointment.tandem;
      }
      return this.tandem;
    },
    customer() {
      if (typeof this.appointment?.customer !== "undefined") {
        return this.appointment.customer;
      }
      return {
        firstName: "",
        lastName: "",
        tel: "",
        email: "",
        zip: "",
        city: "",
        jumpers: []
      };
    }
  }
};
</script>
