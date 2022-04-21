<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpVideoflyer.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
          @input="updateVideoflyer()"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpVideoflyer.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
          @input="updateVideoflyer()"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpVideoflyer.tel"
          type="tel"
          :label="$t('tel')"
          :rules="telRules"
          @input="updateVideoflyer()"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpVideoflyer.email"
          type="email"
          :label="$t('email.email')"
          :rules="emailRules"
          @input="updateVideoflyer()"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-checkbox
          v-model="tmpVideoflyer.picAndVid"
          :label="$t('picAndVid.picAndVid')"
          @change="updateVideoflyer()"
        ></v-checkbox
      ></v-col>
      <v-col :lg="6"
        ><v-checkbox
          v-model="tmpVideoflyer.favorite"
          :label="$t('favorite')"
          @change="updateVideoflyer()"
        ></v-checkbox></v-col
    ></v-row>
  </v-container>
</template>

<script>
import {
  telRulesOptional,
  emailRulesOptional,
  nameRules,
} from "../shared/rules";

export default {
  props: {
    videoflyer: {
      type: Object,
      default: () => ({
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        picAndVid: false,
        favorite: false,
      }),
    },
  },
  data: function () {
    return {
      nameRules: nameRules(this.$i18n),
      emailRules: emailRulesOptional(this.$i18n),
      telRules: telRulesOptional(this.$i18n),
      tmpVideoflyer: JSON.parse(JSON.stringify(this.videoflyer)),
    };
  },
  watch: {
    videoflyer(val) {
      this.tmpVideoflyer = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    updateVideoflyer() {
      this.$emit("update-videoflyer", this.tmpVideoflyer);
    },
  },
};
</script>
