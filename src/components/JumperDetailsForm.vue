<template>
  <div>
    <h3>Springer*in {{ jumperNum }}</h3>
    <v-row
      ><v-col :lg="3" :sm="6"
        ><v-text-field
          v-model="jumper.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col :lg="3" :sm="6"
        ><v-text-field
          v-model="jumper.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field
      ></v-col>
      <v-col :lg="3" :sm="6"
        ><v-text-field
          v-model="jumper.weight"
          :label="$t('weightInKg')"
          :rules="weightRules"
          type="number"
          required
        ></v-text-field
      ></v-col>
      <v-col :lg="3" :sm="6">
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
              :rules="dateOfBirthRules"
              :label="$t('dateOfBirth')"
              readonly
              required
              v-on="on"
              v-model="getDate"
            >
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="jumper.dateOfBirth"
            :max="maxDate14years"
            min="1920-01-01"
            :locale="$i18n.locale"
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
    jumperNum: null,
    bookedJumper: null
  },
  created() {
    if (this.bookedJumper != null) {
      this.jumper = this.bookedJumper;
    }
  },
  data: function() {
    return {
      jumper: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        weight: ""
      },
      nameRules: [
        v => !!v || this.$i18n.t("rules.fieldHasToBeFilled"),
        v => (v && v.length <= 40) || this.$i18n.t("rules.max40Chars")
      ],
      weightRules: [
        v => !!v || this.$i18n.t("rules.weightNeeded"),
        v => v <= 90 || this.$i18n.t("rules.weightMax90")
      ],
      dateOfBirthRules: [v => !!v || this.$i18n.t("rules.dateOfBirthNeeded")],
      menu: false
    };
  },
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
    },
    getDate() {
      if (this.jumper.dateOfBirth === "") {
        return "";
      }
      return this.$d(
        moment(this.jumper.dateOfBirth).toDate(),
        "dateYearMonthDayShort"
      );
    }
  }
};
</script>
