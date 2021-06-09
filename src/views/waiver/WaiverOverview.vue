<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row dense>
        <v-alert type="info">
          <v-progress-circular indeterminate></v-progress-circular>
          {{ message }}
        </v-alert>
      </v-row>
    </div>
    <div v-if="!loading && authorized">
      <v-row dense
        ><h1>{{ $t("waiver.waiver") }}</h1></v-row
      >
      <v-row
        ><v-col
          ><WaiverList
            :loading="loading"
            :waiver="getWaivers"
            @handle-assign-click="waiverSelected" /></v-col
      ></v-row>
      <!--<v-row
        ><v-col
          ><WaiverAssignPanel
            v-if="showAssignmentPanel"
            :waiver="selectedWaiver" /></v-col
      ></v-row>-->
    </div>
    <div v-if="!loading && !authorized">
      <v-row dense>
        <v-alert type="error">{{ message }}</v-alert>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import WaiverList from "../../components/waiver/WaiverList.vue";
//import WaiverAssignPanel from "../components/WaiverAssignPanel.vue";

export default {
  components: {
    WaiverList,
    //WaiverAssignPanel,
  },
  data: () => ({
    menu: false,
    loading: false,
    authorized: false,
    message: "",
    selectedWaiver: {},
    showAssignmentPanel: false,
  }),
  computed: {
    ...mapState(["waiver"]),
    getWaivers() {
      return JSON.parse(JSON.stringify(this.waiver.waivers));
    },
  },
  async created() {
    this.loading = true;
    await this.loadWaiver();
    this.loading = false;
    this.authorized = true;
  },
  methods: {
    ...mapActions(["getWaiverAction"]),
    async loadWaiver() {
      await this.getWaiverAction(await this.$auth.getTokenSilently());
    },
    waiverSelected(tm) {
      this.selectedWaiver = tm;
      this.showAssignmentPanel = true;
    },
  },
};
</script>
