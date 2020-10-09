<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          :value="tandemmaster.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
          @input="updateTandemmaster('firstName', $event)"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          :value="tandemmaster.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
          @input="updateTandemmaster('lastName', $event)"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          :value="tandemmaster.tel"
          type="tel"
          :label="$t('tel')"
          :rules="telRules"
          @input="updateTandemmaster('tel', $event)"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          :value="tandemmaster.email"
          type="email"
          :label="$t('email.email')"
          :rules="emailRules"
          @input="updateTandemmaster('email', $event)"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-checkbox
        :checked="tandemmaster.handcam"
        :label="$t('handcam.handcam')"
        @change="updateTandemmaster('handcam', $event)"
      ></v-checkbox
    ></v-row>
  </v-container>
</template>

<script>
import { telRules, emailRules, nameRules } from "../shared/rules";

export default {
  props: {
    tandemmaster: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        handcam: false,
      }),
    },
  },
  data: function () {
    return {
      nameRules: nameRules(this.$i18n),
      emailRules: emailRules(this.$i18n),
      telRules: telRules(this.$i18n),
    };
  },
  methods: {
    updateTandemmaster(field, value) {
      let tmpTandemmaster = JSON.parse(JSON.stringify(this.tandemmaster));
      tmpTandemmaster[field] = value;
      this.$emit("update-tandemmaster", tmpTandemmaster);
    },
  },
};
</script>
