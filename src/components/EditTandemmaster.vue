<template>
  <v-container>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpTandemmaster.firstName"
          :label="$t('firstName')"
          :rules="nameRules"
          required
          @update:model-value="updateTandemmaster()"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpTandemmaster.lastName"
          :label="$t('lastName')"
          :rules="nameRules"
          required
          @update:model-value="updateTandemmaster()"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpTandemmaster.tel"
          type="tel"
          :label="$t('tel')"
          :rules="telRules"
          @update:model-value="updateTandemmaster()"
        ></v-text-field></v-col
      ><v-col :lg="6"
        ><v-text-field
          v-model="tmpTandemmaster.email"
          type="email"
          :label="$t('email.email')"
          :rules="emailRules"
          @update:model-value="updateTandemmaster()"
        ></v-text-field></v-col
    ></v-row>
    <v-row dense
      ><v-col :lg="6"
        ><v-checkbox
          v-model="tmpTandemmaster.handcam"
          :label="$t('handcam.handcam')"
          @update:model-value="updateTandemmaster()"
        ></v-checkbox
      ></v-col>
      <v-col :lg="6"
        ><v-checkbox
          v-model="tmpTandemmaster.favorite"
          :label="$t('favorite')"
          @update:model-value="updateTandemmaster()"
        ></v-checkbox
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  nameRules,
  emailRulesOptional,
  telRulesOptional,
} from "../shared/rules";

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
  emits: ["update-tandemmaster"],
  data: function () {
    return {
      nameRules: nameRules(this.$i18n),
      telRules: telRulesOptional(this.$i18n),
      emailRules: emailRulesOptional(this.$i18n),
      tmpTandemmaster: JSON.parse(JSON.stringify(this.tandemmaster)),
    };
  },
  watch: {
    tandemmaster(val) {
      this.tmpTandemmaster = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    updateTandemmaster() {
      this.$emit("update-tandemmaster", this.tmpTandemmaster);
    },
  },
};
</script>
