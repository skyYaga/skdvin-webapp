<template>
  <div>
    <h3>Springer*in {{ jumperNum }}</h3>
    <v-row
      ><v-col
        ><v-text-field
          v-model="jumper.firstName"
          label="Vorname"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col
        ><v-text-field
          v-model="jumper.lastName"
          label="Nachname"
          :rules="nameRules"
          required
        ></v-text-field
      ></v-col>
      <v-col
        ><v-text-field
          v-model="jumper.weight"
          label="Gewicht in kg"
          :rules="weightRules"
          type="number"
          required
        ></v-text-field
      ></v-col>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="jumper.dateOfBirth"
              :rules="dateOfBirthRules"
              label="Geburtsdatum"
              readonly
              required
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="jumper.dateOfBirth"
            :max="maxDate14years"
            min="1920-01-01"
            @change="save(jumper.dateOfBirth)"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    jumperNum: null
  },
  data: () => ({
    jumper: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      weight: ""
    },
    nameRules: [
      v => !!v || "Feld muss befüllt werden",
      v => (v && v.length <= 40) || "Wert darf aus maximal 40 Zeichen bestehen"
    ],
    weightRules: [
      v => !!v || "Gewicht muss angegeben werden",
      v => v <= 90 || "Gewicht inkl. Kleidung darf maximal 90kg betragen"
    ],
    dateOfBirthRules: [v => !!v || "Geburtsdatum muss angegeben werden"],
    menu: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    getJumper() {
      return this.jumper;
    }
  },
  computed: {
    maxDate14years() {
      return moment()
        .subtract(14, "years")
        .toDate()
        .toISOString()
        .substr(0, 10);
    }
  }
};
</script>

<style lang="scss" scoped></style>
