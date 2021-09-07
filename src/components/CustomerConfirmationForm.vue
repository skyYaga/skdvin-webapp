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
        <v-row v-if="!isAdminOrModerator" class="mb-3"
          ><h2>{{ $t("jumpregulations.heading") }}</h2></v-row
        >
        <v-row v-if="!isAdminOrModerator">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <ul v-html="$t('jumpregulations.text')"></ul>
        </v-row>
        <v-row v-if="!isAdminOrModerator">
          <v-checkbox
            :rules="[(v) => !!v || $t('rules.acceptRegulations')]"
            :label="$t('jumpregulations.accept')"
          ></v-checkbox>
        </v-row>
        <v-row v-if="!isAdminOrModerator">
          <v-checkbox :rules="[(v) => !!v || $t('rules.privacyPolicy')]"
            ><template #label
              ><div>
                <i18n
                  path="privacyPolicy.accept"
                  tag="label"
                  for="privacyPolicy.privacyPolicy"
                >
                  <a
                    href="https://skdv.in/datenschutzerklaerung/"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    >{{ $t("privacyPolicy.privacyPolicy") }}</a
                  >
                </i18n>
              </div></template
            ></v-checkbox
          >
        </v-row>
        <v-row
          ><v-btn
            class="mr-4 mt-3"
            :loading="loading"
            :disabled="loading"
            @click="back"
            >{{ $t("back") }}</v-btn
          ><v-spacer></v-spacer
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
import AppointmentDetailsPanel from "./AppointmentDetailsPanel.vue";
import { roleUtil } from "../shared/roles";

export default {
  components: {
    AppointmentDetailsPanel,
  },
  props: {
    appointment: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: () => ({
    valid: false,
    loading: false,
  }),
  computed: {
    isAdminOrModerator() {
      return roleUtil.isAdminOrModerator(this.$auth);
    },
  },
  methods: {
    ...mapActions(["addAppointmentAction", "addAdminAppointmentAction"]),
    async saveAppointment() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        let result;
        if (roleUtil.isAdminOrModerator(this.$auth)) {
          result = await this.addAdminAppointmentAction({
            appointment: this.appointment,
            token: await this.$auth.getTokenSilently(),
          });
        } else {
          result = await this.addAppointmentAction(this.appointment);
        }
        this.onAppointmentSaved(result);
      }
      this.loading = false;
    },
    onAppointmentSaved(result) {
      let message = "";
      if (!result.success) {
        message = result.message;
      }

      this.$router.push({
        name: "appointment-confirm",
        query: {
          message: message,
          noemail: roleUtil.isAdminOrModerator(this.$auth),
        },
      });
    },
    back() {
      this.$emit("on-customer-confirmation-back", this.customer);
    },
  },
};
</script>
