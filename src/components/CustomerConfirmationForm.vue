<template>
  <div>
    <v-container>
      <v-row>
        <AppointmentDetailsPanel
          :appointment="appointment"
        ></AppointmentDetailsPanel
      ></v-row>
      <v-divider class="my-10"></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row class="mb-3"
          ><h2>{{ $t("jumpregulations.heading") }}</h2></v-row
        >
        <v-row>
          <ul v-html="$t('jumpregulations.text')"></ul>
        </v-row>
        <v-row>
          <v-checkbox
            :rules="[v => !!v || $t('rules.acceptRegulations')]"
            :label="$t('jumpregulations.accept')"
          ></v-checkbox>
        </v-row>
        <v-row>
          <v-checkbox
            :rules="[v => !!v || $t('rules.privacyPolicy')]"
            :label="$t('acceptPrivacyPolicy')"
          ></v-checkbox>
        </v-row>
        <v-row
          ><v-btn
            class="mr-4 mt-3"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="saveAppointment"
            >{{ $t("book") }}</v-btn
          ></v-row
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppointmentDetailsPanel from "./AppointmentDetailsPanel";

export default {
  props: {
    appointment: null
  },
  components: {
    AppointmentDetailsPanel
  },
  data: () => ({
    valid: false,
    loading: false
  }),
  methods: {
    ...mapActions(["addAppointmentAction"]),
    async saveAppointment() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        let message = await this.addAppointmentAction(this.appointment);
        this.onAppointmentSaved(message);
      }
      this.loading = false;
    },
    onAppointmentSaved(message) {
      this.$router.push({
        name: "appointment-confirm",
        query: { message: message }
      });
    }
  }
};
</script>
