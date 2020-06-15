<template>
  <div>
    <h3>Springer*in {{ jumperNum }}</h3>
    <v-row
      ><v-col :lg="4" :sm="6"
        ><v-text-field
          v-model="jumper.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col :lg="4" :sm="6"
        ><v-text-field
          v-model="jumper.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field
      ></v-col>
      <v-col :lg="4" :sm="6">
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
              <template v-if="isAdmin" v-slot:append-outer>
                <v-icon color="red" @click="removeJumper"
                  >mdi-minus-circle</v-icon
                >
              </template>
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
    <v-row v-if="!isAdmin" class="mt-n10"
      ><v-col :lg="6"
        ><v-checkbox
          v-model="weightConfirmed"
          :label="$t('weightMax90')"
          :rules="weightRules"
        ></v-checkbox></v-col
      ><v-col :lg="6"
        ><v-checkbox
          v-model="sizeConfirmed"
          :label="$t('sizeMax190')"
          :rules="sizeRules"
        ></v-checkbox></v-col
    ></v-row>
    <v-row
      ><v-col
        ><v-alert v-if="!isAdmin && isMinor" text type="error" prominent>
          <div class="title">{{ $t("minors") }}</div>
          <i18n path="transportationHint" tag="div">
            <template v-slot:url>
              <a
                :href="commonSettings.dropzone.transportationAgreementUrl"
                target="_blank"
                rel="noopener noreferrer"
                >{{ $t("transportationAgreement.download") }}</a
              >
            </template>
          </i18n>
        </v-alert></v-col
      ></v-row
    >
  </div>
</template>

<script>
import moment from "moment";
import { roleUtil } from "../shared/roles";
import { mapState } from "vuex";

export default {
  props: {
    jumperNum: Number,
    bookedJumper: Object,
  },
  created() {
    if (this.bookedJumper != null) {
      this.jumper = this.bookedJumper;
    }
  },
  data: function () {
    return {
      jumper: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
      },
      weightConfirmed: false,
      sizeConfirmed: false,
      nameRules: [
        (v) => !!v || this.$i18n.t("rules.fieldHasToBeFilled"),
        (v) => (v && v.length <= 40) || this.$i18n.t("rules.max40Chars"),
      ],
      weightRules: [(v) => !!v || this.$i18n.t("rules.weight")],
      sizeRules: [(v) => !!v || this.$i18n.t("rules.size")],
      dateOfBirthRules: [(v) => !!v || this.$i18n.t("rules.dateOfBirthNeeded")],
      menu: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    bookedJumper: function (newJumper, oldJumper) {
      this.jumper = newJumper;
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    getJumper() {
      return this.jumper;
    },
    removeJumper() {
      this.$emit("onRemoveJumper", this.jumperNum);
    },
  },
  computed: {
    ...mapState(["commonSettings"]),
    maxDate14years() {
      return moment()
        .subtract(14, "years")
        .toDate()
        .toISOString()
        .substr(0, 10);
    },
    isMinor() {
      if (this.jumper.dateOfBirth !== "") {
        if (moment(this.jumper.dateOfBirth).add(18, "y").isAfter(moment())) {
          return true;
        }
      }
      return false;
    },
    getDate() {
      if (this.jumper.dateOfBirth === "") {
        return "";
      }
      return this.$d(
        moment(this.jumper.dateOfBirth).toDate(),
        "dateYearMonthDayShort"
      );
    },
    isAdmin() {
      return roleUtil.isAdmin(this.$auth);
    },
  },
};
</script>
