<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.waiverCustomer.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.waiverCustomer.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.waiverCustomer.street"
          :label="$t('streetAdress')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="waiver.waiverCustomer.zip"
          :label="$t('zip')"
          :rules="zipRules"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.waiverCustomer.city"
          :label="$t('city')"
          :rules="nameRules"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.waiverCustomer.tel"
          :label="$t('tel')"
          :rules="telRules"
          required
        ></v-text-field>
      </v-col>
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
            </v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="waiver.waiverCustomer.dateOfBirth"
            :max="maxDate14years"
            min="1920-01-01"
            :locale="$i18n.locale"
            @change="save(waiver.waiverCustomer.dateOfBirth)"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row
      ><v-col cols="12" md="4">
        <v-text-field
          v-model="waiver.appointmentId"
          :label="$t('appointment.idOptional')"
          type="number"
        ></v-text-field> </v-col
    ></v-row>
    <v-row>
      <v-col
        ><v-checkbox
          v-model="healthInformation"
          :label="$t('gdpr.health', { dz: getCommonSettings().dropzone.name })"
          required
          :rules="gdprRules"
        ></v-checkbox
      ></v-col>
    </v-row>
    <v-row>
      <v-col
        ><v-checkbox
          v-model="waiver.gdprSocial"
          :label="$t('gdpr.social', { dz: getCommonSettings().dropzone.name })"
        ></v-checkbox
      ></v-col>
    </v-row>
    <v-row class="pl-3"
      ><v-col cols="12">
        <p>{{ $t("signature.signature") }}</p>
        <Signature ref="signature" /></v-col
    ></v-row>
    <v-row v-if="isMinor"
      ><v-col>
        <v-alert type="info">{{ $t("signature.minorsNeedParent") }}</v-alert>
      </v-col></v-row
    >
    <v-row v-if="isMinor" class="pl-3"
      ><v-col cols="12" md="6">
        <p>{{ $t("signature.parent1") }}</p>
        <Signature ref="parentSignature1" /></v-col
      ><v-col cols="12" md="6">
        <p>{{ $t("signature.parent2") }}</p>
        <Signature ref="parentSignature2" /></v-col
    ></v-row>
  </div>
</template>

<script>
import Signature from "../../components/waiver/Signature.vue";
import {
  telRules,
  nameRules,
  dateOfBirthRules,
  zipRules,
  gdprRules,
} from "../../shared/rules";
import { DateTime } from "luxon";
import { mapGetters } from "vuex";

export default {
  components: {
    Signature,
  },
  data: function () {
    return {
      menu: false,
      waiver: {
        waiverCustomer: {
          firstName: "",
          lastName: "",
          tel: "",
          zip: "",
          city: "",
          street: "",
          dateOfBirth: "",
        },
        appointmentId: "",
        gdprSocial: false,
      },
      healthInformation: false,
      dateOfBirthRules: dateOfBirthRules(this.$i18n),
      nameRules: nameRules(this.$i18n),
      telRules: telRules(this.$i18n),
      zipRules: zipRules(this.$i18n),
      gdprRules: gdprRules(this.$i18n),
    };
  },
  computed: {
    ...mapGetters(["getCommonSettings"]),
    maxDate14years() {
      return DateTime.now().minus({ years: 14 }).toISODate();
    },
    isMinor() {
      if (this.waiver.waiverCustomer.dateOfBirth !== "") {
        if (
          DateTime.fromISO(this.waiver.waiverCustomer.dateOfBirth).plus({
            years: 18,
          }) > DateTime.now()
        ) {
          return true;
        }
      }
      return false;
    },
    getDate() {
      if (this.waiver.waiverCustomer.dateOfBirth === "") {
        return "";
      }
      return this.$d(
        DateTime.fromISO(this.waiver.waiverCustomer.dateOfBirth).toJSDate(),
        "dateYearMonthDayShort"
      );
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      let valid = true;
      if (!this.$refs.signature.validate()) {
        valid = false;
      }
      if (this.isMinor) {
        if (!this.$refs.parentSignature1.validate()) {
          valid = false;
        }
        if (!this.$refs.parentSignature2.validate()) {
          valid = false;
        }
      }
      return valid;
    },
    getWaiver() {
      this.waiver.signature = this.$refs.signature.getSignature();
      if (this.isMinor) {
        this.waiver.parentSignature1 = this.$refs.parentSignature1.getSignature();
        this.waiver.parentSignature2 = this.$refs.parentSignature2.getSignature();
      }
      return this.waiver;
    },
  },
};
</script>
