<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="tandemmaster.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tandemmaster.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          type="tel"
          v-model="tandemmaster.tel"
          :label="$t('tel')"
          :rules="telRules"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tandemmaster.email"
          type="email"
          :label="$t('email.email')"
          :rules="emailRules"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-checkbox
        v-model="tandemmaster.handcam"
        :label="$t('handcam.handcam')"
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
};
</script>
