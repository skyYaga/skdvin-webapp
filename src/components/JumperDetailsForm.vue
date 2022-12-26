<template>
  <div>
    <h3>Springer*in {{ jumperNum }}</h3>
    <v-row
      ><v-col cols="6" :lg="4"
        ><v-text-field
          v-model="jumper.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col cols="6" :lg="4"
        ><v-text-field
          v-model="jumper.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field
      ></v-col>
      <v-col cols="6" :lg="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              v-model="getDate"
              :rules="dateOfBirthRules"
              :label="$t('dateOfBirth')"
              readonly
              required
              v-on="on"
            >
              <template v-if="isAdmin" #append-outer>
                <v-icon color="red" @click="removeJumper"
                  >mdi-minus-circle</v-icon
                >
              </template>
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="jumper.dateOfBirth"
            v-model:active-picker="activePicker"
            :max="maxDate14years"
            min="1920-01-01"
            :locale="$i18n.locale"
            @change="save(jumper.dateOfBirth)"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="mt-n10"
      ><v-col v-if="!isAdmin" cols="6" :lg="4"
        ><v-checkbox
          v-model="weightConfirmed"
          :label="$t('weightMax90')"
          :rules="weightRules"
        ></v-checkbox></v-col
      ><v-col v-if="!isAdmin" cols="6" :lg="4"
        ><v-checkbox
          v-model="sizeConfirmed"
          :label="$t('sizeMax190')"
          :rules="sizeRules"
        ></v-checkbox></v-col
      ><v-col cols="6" :lg="4"
        ><v-checkbox v-model="jumper.voucher" :label="$t('voucher.voucher')"
          ><InfoDialog
            slot="append"
            :heading="$t('voucher.voucher')"
            :text="$t('voucher.info')" /></v-checkbox></v-col
    ></v-row>
    <v-row
      ><v-col
        ><v-alert v-if="!isAdmin && isMinor" text type="error" prominent>
          <div class="text-h6">{{ $t("minors") }}</div>
          <i18n path="transportationHint" tag="div">
            <template #url>
              <a
                :href="
                  settings.commonSettings.dropzone.transportationAgreementUrl
                "
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
import { DateTime } from "luxon";
import { roleUtil } from "../shared/roles";
import { mapState } from "vuex";
import InfoDialog from "./InfoDialog.vue";

export default {
  components: {
    InfoDialog,
  },
  props: {
    jumperNum: {
      type: Number,
      default: 0,
    },
    bookedJumper: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  emits: ["on-remove-jumper"],
  data: function () {
    return {
      jumper: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        voucher: false,
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
      activePicker: null,
    };
  },
  computed: {
    ...mapState(["settings"]),
    maxDate14years() {
      return DateTime.now()
        .minus({ years: 14 })
        .toJSDate()
        .toISOString()
        .substr(0, 10);
    },
    isMinor() {
      if (
        typeof this.jumper.dateOfBirth !== "undefined" &&
        this.jumper.dateOfBirth !== ""
      ) {
        if (
          DateTime.fromISO(this.jumper.dateOfBirth).plus({ years: 18 }) >
          DateTime.now()
        ) {
          return true;
        }
      }
      return false;
    },
    getDate() {
      if (
        typeof this.jumper.dateOfBirth === "undefined" ||
        this.jumper.dateOfBirth === ""
      ) {
        return "";
      }
      return this.$d(
        DateTime.fromISO(this.jumper.dateOfBirth).toJSDate(),
        "dateYearMonthDayShort"
      );
    },
    isAdmin() {
      return roleUtil.isAdmin(this.$auth);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    bookedJumper: function (newJumper) {
      this.jumper = newJumper;
    },
  },
  created() {
    if (this.bookedJumper != null) {
      this.jumper = this.bookedJumper;
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    getJumper() {
      return this.jumper;
    },
    removeJumper() {
      this.$emit("on-remove-jumper", this.jumperNum);
    },
  },
};
</script>
