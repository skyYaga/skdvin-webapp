<template>
  <v-card>
    <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="waiver"
      :search="search"
      :loading="loading"
      ><template #[`item.handcam`]="{ item }">
        <v-simple-checkbox
          v-model="item.handcam"
          disabled
        ></v-simple-checkbox> </template
      ><template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("waiver.waiver") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('search')"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <EditWaiverDialog
            ref="waiverDialog"
            :waiver="editedItem"
            @update-waiver="editedItem = $event"
          />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editWaiver(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="assignWaiver(item)">
          mdi-calendar-month
        </v-icon>
        <v-icon small class="mr-2" @click="downloadWaiver(item)">
          mdi-download
        </v-icon>
      </template></v-data-table
    >
  </v-card>
</template>

<script>
import EditWaiverDialog from "./EditWaiverDialog.vue";

export default {
  components: {
    EditWaiverDialog,
  },
  props: {
    waiver: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  data() {
    return {
      valid: false,
      hintText: "",
      hintColor: "",
      showHint: false,
      editedIndex: -1,
      editedItem: {
        waiverCustomer: {
          firstName: "",
          lastName: "",
          tel: "",
          zip: "",
          city: "",
          street: "",
          dateOfBirth: "",
        },
        state: "",
        appointmentId: "",
        gdprSocial: false,
      },
      search: "",
      headers: [
        { text: this.$t("waiver.state"), value: "state" },
        { text: this.$t("appointment.id"), value: "appointmentId" },
        { text: this.$t("firstName"), value: "waiverCustomer.firstName" },
        { text: this.$t("lastName"), value: "waiverCustomer.lastName" },
        { text: this.$t("dateOfBirth"), value: "waiverCustomer.dateOfBirth" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    editWaiver(item) {
      this.editedIndex = this.waiver.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$refs.waiverDialog.openDialog();
    },
  },
};
</script>
