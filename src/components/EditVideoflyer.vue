<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          :value="videoflyer.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
          @input="updateVideoflyer('firstName', $event)"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          :value="videoflyer.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
          @input="updateVideoflyer('lastName', $event)"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          :value="videoflyer.tel"
          type="tel"
          :label="$t('tel')"
          :rules="telRules"
          @input="updateVideoflyer('tel', $event)"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          :value="videoflyer.email"
          type="email"
          :label="$t('email.email')"
          :rules="emailRules"
          @input="updateVideoflyer('email', $event)"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-checkbox
        :checked="videoflyer.picAndVid"
        :label="$t('picAndVid.picAndVid')"
        @change="updateVideoflyer('picAndVid', $event)"
      ></v-checkbox
    ></v-row>
  </v-container>
</template>

<script>
import { telRules, emailRules, nameRules } from "../shared/rules";

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
    updateVideoflyer(field, value) {
      let tmpVideoflyer = JSON.parse(JSON.stringify(this.videoflyer));
      tmpVideoflyer[field] = value;
      this.$emit("update-videoflyer", tmpVideoflyer);
    },
  },
};
</script>
