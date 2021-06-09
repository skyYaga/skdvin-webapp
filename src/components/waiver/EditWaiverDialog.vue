<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t("waiver.edit") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            :disabled="loading"
            :loading="loading"
            @click="saveWaiver"
          >
            {{ $t("save") }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-card class="my-4">
          <v-card-title>{{ $t("jumperData") }}</v-card-title>
          <v-card-text>
            <v-row
              ><v-col>
                {{ editedWaiver.waiverCustomer.firstName }}
                {{ editedWaiver.waiverCustomer.lastName }}<br />
                {{ editedWaiver.waiverCustomer.street }}<br />
                {{ editedWaiver.waiverCustomer.zip }}
                {{ editedWaiver.waiverCustomer.city }}<br />
                {{ editedWaiver.waiverCustomer.dateOfBirth }}<br />
                {{ editedWaiver.waiverCustomer.tel }} </v-col
              ><v-col cols="12" md="6">
                <p>{{ $t("signature.signature") }}</p>
                <Signature :signature="editedWaiver.signature" /></v-col
            ></v-row>
            <v-row v-if="isMinor"
              ><v-col cols="12" md="6">
                <p>{{ $t("signature.parent1") }}</p>
                <Signature :signature="editedWaiver.parentSignature1" /></v-col
              ><v-col cols="12" md="6">
                <p>{{ $t("signature.parent2") }}</p>
                <Signature :signature="editedWaiver.parentSignature2" /></v-col
            ></v-row>
          </v-card-text>
        </v-card>
        <WaiverTandemmasterAssignment
          :waiver="editedWaiver"
          @tandemmaster-selected="setTandemmaster"
        />
        <v-row> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import WaiverTandemmasterAssignment from "../../components/waiver/WaiverTandemmasterAssignment.vue";
import Signature from "../../components/waiver/Signature.vue";
import { mapActions } from "vuex";
import { DateTime } from "luxon";

export default {
  components: {
    WaiverTandemmasterAssignment,
    Signature,
  },
  props: {
    waiver: {
      type: Object,
      default: () => ({
        waiverCustomer: {
          firstName: "",
          lastName: "",
          tel: "",
          zip: "",
          city: "",
          street: "",
          dateOfBirth: "",
        },
        appointmentId: "",
        gdprSocial: false,
        tandemmaster: "",
      }),
    },
  },
  data() {
    return {
      dialog: false,
      hintText: "",
      hintColor: "",
      showHint: false,
      loading: false,
      editedWaiver: this.waiver,
    };
  },
  computed: {
    isMinor() {
      if (this.waiver.waiverCustomer.dateOfBirth !== "") {
        if (
          DateTime.fromISO(this.waiver.waiverCustomer.dateOfBirth).plus({
            years: 18,
          }) > DateTime.now()
        ) {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    waiver(val) {
      this.editedWaiver = val;
    },
  },
  methods: {
    ...mapActions(["updateWaiverAction"]),
    openDialog() {
      this.dialog = true;
    },
    setTandemmaster(id) {
      this.editedWaiver.tandemmaster = id;
    },
    async saveWaiver() {
      this.loading = true;

      let result = await await this.updateWaiverAction({
        waiver: this.editedWaiver,
        token: await this.$auth.getTokenSilently(),
      });

      this.loading = false;
      if (result.success) {
        this.hintText = this.$t("waiver.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("waiver.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
  },
};
</script>
