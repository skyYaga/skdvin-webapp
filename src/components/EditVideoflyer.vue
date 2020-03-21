<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="videoflyer.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="videoflyer.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          type="tel"
          v-model="videoflyer.tel"
          :label="$t('tel')"
          :rules="telRules"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="videoflyer.email"
          type="email"
          :label="$t('email')"
          :rules="emailRules"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-checkbox
        v-model="videoflyer.picAndVid"
        :label="$t('picAndVid.picAndVid')"
      ></v-checkbox
    ></v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    videoflyer: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        picAndVid: false
      })
    }
  },
  data: function() {
    return {
      nameRules: [
        v => !!v || this.$i18n.t("rules.fieldHasToBeFilled"),
        v => (v && v.length <= 40) || this.$i18n.t("rules.max40Chars")
      ],
      emailRules: [
        v => !v || /.+@.+\..+/.test(v) || this.$i18n.t("rules.emailValid")
      ],
      telRules: [
        v =>
          !v ||
          (v && v.length > 0 && /[0-9 +-]{6,}$/.test(v)) ||
          this.$i18n.t("rules.telValid")
      ]
    };
  }
};
</script>
