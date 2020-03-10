<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row
          ><v-col
            ><v-text-field
              v-model="customer.firstName"
              label="Vorname"
              :rules="nameRules"
              required
            ></v-text-field></v-col
          ><v-col
            ><v-text-field
              v-model="customer.lastName"
              label="Nachname"
              :rules="nameRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col
            ><v-text-field
              type="tel"
              v-model="customer.tel"
              label="Telefon"
              :rules="telRules"
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col
            ><v-text-field
              v-model="customer.email"
              type="email"
              label="E-Mail"
              :rules="emailRules"
              required
            ></v-text-field></v-col
        ></v-row>
        <v-row
          ><v-col :cols="2"
            ><v-text-field
              v-model="customer.zip"
              label="PLZ"
              :rules="zipRules"
              required
            ></v-text-field></v-col
          ><v-col
            ><v-text-field
              v-model="customer.city"
              label="Wohnort"
              :rules="nameRules"
              required
            ></v-text-field></v-col
        ></v-row>

        <JumperDetailsForm
          ref="jumperDetails"
          :jumperNum="i"
          v-for="i in tandem"
          :key="i"
        />
        <v-row><v-btn class="mr-4" @click="validate">Weiter</v-btn></v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import JumperDetailsForm from "./JumperDetailsForm";

export default {
  props: {
    tandem: null
  },
  components: {
    JumperDetailsForm
  },
  data: () => ({
    valid: false,
    customer: {
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
      zip: "",
      city: "",
      jumpers: []
    },
    nameRules: [
      v => !!v || "Feld muss befüllt werden",
      v => (v && v.length <= 40) || "Wert darf aus maximal 40 Zeichen bestehen"
    ],
    zipRules: [
      v => !!v || "PLZ wird benötigt",
      v => v.length === 5 || "PLZ muss 5-stellig sein",
      v => !isNaN(v) || "PLZ darf nur aus Zahlen bestehen"
    ],
    emailRules: [
      v => !!v || "E-mail wird benötigt",
      v => /.+@.+\..+/.test(v) || "E-mail muss gültig sein"
    ],
    telRules: [
      v => !!v || "Es wird eine Telefonnummer benötigt",
      v =>
        (v.length > 0 && /[0-9 +-]{6,}$/.test(v)) ||
        "Telefonnummer muss gültig sein"
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.onCustomerDataFilled();
      }
    },
    onCustomerDataFilled() {
      this.$refs.jumperDetails.forEach(jd => {
        this.customer.jumpers.push(jd.getJumper());
      });
      this.$emit("handleCustomerDataFilled", this.customer);
    }
  }
};
</script>
