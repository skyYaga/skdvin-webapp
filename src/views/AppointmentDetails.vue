<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row>
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </div>
    <div v-if="!loading">
      <v-row dense><h1>Termindetails</h1></v-row>
      <v-row>
        <v-col :lg="6" :sm="12"
          ><v-card
            ><CustomerDataForm
              ref="customerDataForm"
              class="pa-5"
              :buttonVisible="false"
              :appointment="localAppointment"/></v-card></v-col
        ><v-col :lg="6"
          ><v-card
            ><EditAppointmentAdminPanel
              ref="editAppointmentPanel"
              class="pa-5"
              :appointment="localAppointment"
              :slots="slots"
              :updating="updating"
              @onUpdateAppointment="updateAppointment"/></v-card
        ></v-col>
      </v-row>
    </div>
    <v-snackbar :color="hintColor" v-model="showHint" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        OK
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import CustomerDataForm from "../components/CustomerDataForm";
import EditAppointmentAdminPanel from "../components/EditAppointmentAdminPanel";
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "AppointmentDetails",
  components: {
    CustomerDataForm,
    EditAppointmentAdminPanel
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    loading: true,
    slots: null,
    localAppointment: {},
    valid: false,
    showHint: false,
    hintColor: "",
    hintText: "",
    updating: false
  }),
  async created() {
    await this.loadAppointment();
    await this.loadJumpdays();
    this.loadSlots(this.localAppointment.date);
  },
  computed: {
    ...mapState(["jumpdays"]),
    ...mapGetters(["getJumpdayByDate"])
  },
  methods: {
    ...mapActions([
      "getAppointmentAction",
      "getJumpdaysAction",
      "updateAppointmentAction"
    ]),
    async loadAppointment() {
      let token = await this.$auth.getTokenSilently();
      this.localAppointment = await this.getAppointmentAction({
        appointmentId: this.id,
        token
      });
      this.loading = false;
    },
    loadSlots(date) {
      this.slots = {
        ...this.getJumpdayByDate(
          moment(date).format("YYYY-MM-DD")
        ).slots.filter(slot => slot.time === moment(date).format("HH:mm"))[0]
      };
    },
    async loadJumpdays() {
      await this.getJumpdaysAction(await this.$auth.getTokenSilently());
    },
    async updateAppointment(appointment) {
      if (
        this.$refs.customerDataForm.validate() &&
        this.$refs.editAppointmentPanel.validate()
      ) {
        this.updating = true;
        let result = await this.updateAppointmentAction({
          appointment: this.localAppointment,
          token: await this.$auth.getTokenSilently()
        });
        this.updating = false;
        if (result.success) {
          this.hintText = "Termin erfolgreich aktualisiert";
          this.hintColor = "green";
        } else {
          this.hintText = "Fehler beim Aktualisieren des Termins";
          this.hintColor = "red";
        }
        this.showHint = true;
      }
    }
  }
};
</script>
