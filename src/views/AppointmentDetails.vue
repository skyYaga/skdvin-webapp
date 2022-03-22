<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row>
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </div>
    <div v-if="!loading">
      <v-row dense
        ><h1>{{ $t("appointment.details") }}</h1></v-row
      >
      <v-row>
        <v-col cols="12" :lg="6" :sm="12"
          ><v-card
            ><CustomerDataForm
              ref="customerDataForm"
              class="pa-5"
              :button-visible="false"
              :appointment="localAppointment"
              @remove-jumper="removeJumperFromAppointment"
              @update-appointment-note="updateAppointmentNote"
            /> </v-card></v-col
        ><v-col :lg="6"
          ><AvailableSlotsPanel
            v-if="availableSlots.length > 0 && !slotSelected"
            class="pb-5"
            :slots="availableSlots"
            @on-slot-selected="selectSlot"
          />
          <v-card
            ><EditAppointmentAdminPanel
              v-if="availableSlots.length === 0 && !slotSelected"
              ref="editAppointmentPanel"
              class="pa-5"
              :appointment="localAppointment"
              :slots="slots"
              @update-appointment="localAppointment = $event"
            />
            <div v-if="slotSelected" class="pa-5">
              {{
                $t("appointment.newselected", {
                  date: getDate(),
                  time: getTime(),
                })
              }}
              <ul>
                <li>
                  {{ $t("tandem.tandems") }}: {{ localAppointment.tandem }}
                </li>
                <li>
                  {{ $t("picOrVid.picOrVid") }}: {{ localAppointment.picOrVid }}
                </li>
                <li>
                  {{ $t("picAndVid.picAndVid") }}:
                  {{ localAppointment.picAndVid }}
                </li>
                <li>
                  {{ $t("handcam.handcam") }}: {{ localAppointment.handcam }}
                </li>
              </ul>
            </div>
            <v-btn
              v-if="availableSlots.length === 0"
              class="ml-4 mb-4"
              :loading="updating"
              :disabled="updating"
              color="primary"
              @click="updateAppointment"
              >{{ $t("update") }}</v-btn
            >
            <v-btn
              v-if="availableSlots.length === 0 && !slotSelected"
              class="ml-4 mb-4"
              :loading="updating"
              :disabled="updating"
              @click="searchForSlots"
              >{{ $t("slot.searchnew") }}</v-btn
            ><v-btn
              v-if="availableSlots.length === 0 && !slotSelected"
              class="ml-4 mb-4"
              :loading="updating"
              :disabled="updating"
              @click.stop="showDeletionDialog = true"
              >{{ $t("appointment.delete.message") }}</v-btn
            ><v-btn
              v-if="availableSlots.length > 0 && !slotSelected"
              class="ma-4"
              :loading="updating"
              :disabled="updating"
              @click="reset"
              >{{ $t("reset") }}</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="ma-3" @click="backToOverview">{{
          $t("appointment.overview.back")
        }}</v-btn>
      </v-row>
    </div>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false"> OK </v-btn>
    </v-snackbar>
    <div class="text-center">
      <v-dialog v-model="showDeletionDialog" width="500">
        <v-card>
          <v-card-title class="headline" primary-title>
            {{ $t("appointment.delete.question") }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteAppointment">
              {{ $t("delete") }}
            </v-btn>
            <v-btn color="primary" text @click="showDeletionDialog = false">
              {{ $t("cancel") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import CustomerDataForm from "../components/CustomerDataForm.vue";
import EditAppointmentAdminPanel from "../components/EditAppointmentAdminPanel.vue";
import AvailableSlotsPanel from "../components/AvailableSlotsPanel.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { DateTime } from "luxon";

export default {
  name: "AppointmentDetails",
  components: {
    CustomerDataForm,
    EditAppointmentAdminPanel,
    AvailableSlotsPanel,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    loading: true,
    slots: null,
    localAppointment: {},
    valid: false,
    showHint: false,
    hintColor: "",
    hintText: "",
    updating: false,
    availableSlots: [],
    slotSelected: false,
    showDeletionDialog: false,
  }),
  computed: {
    ...mapState(["jumpdays"]),
    ...mapGetters(["getJumpdayByDate"]),
  },
  async created() {
    await this.loadPage();
  },
  methods: {
    async loadPage() {
      await this.loadAppointment();
      await this.loadSlots(this.localAppointment.date);
    },
    ...mapActions([
      "getAppointmentAction",
      "getJumpdaysAction",
      "updateAppointmentAction",
      "updateAdminAppointmentAction",
      "searchSlotsAction",
      "deleteAppointmentAction",
    ]),
    async loadAppointment() {
      let token = await this.$auth.getTokenSilently();
      this.localAppointment = await this.getAppointmentAction({
        appointmentId: this.id,
        token,
      });
      this.loading = false;
    },
    async loadSlots(date) {
      await this.loadJumpdays(date);

      this.slots = {
        ...this.getJumpdayByDate(
          DateTime.fromISO(date).toISODate()
        ).slots.filter(
          (slot) => slot.time === DateTime.fromISO(date).toFormat("HH:mm")
        )[0],
      };
    },
    async loadJumpdays(date) {
      this.message = this.$t("jumpday.loading");
      let unauthorizedMessage = await this.getJumpdaysAction({
        yearMonth: DateTime.fromISO(date).toFormat("yyyy-MM"),
        token: await this.$auth.getTokenSilently(),
      });
      if (unauthorizedMessage !== "") {
        this.message = this.$t("accessdenied");
        this.authorized = false;
      } else {
        this.message = "";
        this.authorized = true;
      }
      this.loading = false;
    },
    async updateAppointment() {
      if (!this.slotSelected && !this.$refs.editAppointmentPanel.validate()) {
        return false;
      }
      if (this.$refs.customerDataForm.validate()) {
        this.updating = true;
        let result;
        if (this.$refs.customerDataForm.adminBooking) {
          result = await this.updateAdminAppointmentAction({
            appointment: this.localAppointment,
            token: await this.$auth.getTokenSilently(),
          });
        } else {
          result = await this.updateAppointmentAction({
            appointment: this.localAppointment,
            token: await this.$auth.getTokenSilently(),
          });
        }
        this.updating = false;
        if (result.success) {
          this.hintText = this.$t("appointment.update.successful");
          this.hintColor = "green";
        } else {
          this.hintText = this.$t("appointment.update.error");
          this.hintColor = "red";
        }
        this.showHint = true;
        await this.reset();
      }
    },
    async deleteAppointment() {
      this.updating = true;
      this.showDeletionDialog = false;
      let result = await this.deleteAppointmentAction({
        appointmentId: this.localAppointment.appointmentId,
        token: await this.$auth.getTokenSilently(),
      });
      if (result.success) {
        this.backToOverview();
      } else {
        this.updating = false;
        this.hintText = this.$t("appointment.delete.error");
        this.hintColor = "red";
        this.showHint = true;
      }
    },
    async searchForSlots() {
      if (
        this.$refs.customerDataForm.validate() &&
        this.$refs.editAppointmentPanel.validate()
      ) {
        let query = {
          tandem: this.localAppointment.tandem,
          picOrVid: this.localAppointment.picOrVid,
          picAndVid: this.localAppointment.picAndVid,
          handcam: this.localAppointment.handcam,
        };
        this.availableSlots = await this.searchSlotsAction(query);
        this.availableSlots = this.availableSlots.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
      }
    },
    selectSlot(date, time) {
      this.localAppointment.date = DateTime.fromISO(date + "T" + time).toUTC();
      this.loadSlots(this.localAppointment.date);
      this.slotSelected = true;
      this.availableSlots = [];
    },
    getDate() {
      return DateTime.fromISO(this.localAppointment.date).toFormat(
        "dd.MM.yyyy"
      );
    },
    getTime() {
      return DateTime.fromISO(this.localAppointment.date).toFormat("HH:mm");
    },
    async reset() {
      await this.loadPage();
      this.slotSelected = false;
      this.availableSlots = [];
    },
    backToOverview() {
      this.$router.push({
        name: "appointments",
        query: {
          date: DateTime.fromISO(this.localAppointment.date).toISODate(),
        },
      });
    },
    removeJumperFromAppointment(num) {
      this.localAppointment.customer.jumpers.splice(num - 1, 1);
      this.localAppointment.tandem--;
    },
    updateAppointmentNote(note) {
      this.localAppointment.note = note;
    },
  },
};
</script>
