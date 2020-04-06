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
        ><h1>{{ $t("videoflyer.videoflyer") }}</h1></v-row
      >
      <v-row
        ><v-col
          ><VideoflyerList
            :loading="loading"
            :videoflyer="getVideoflyers"
            @handleAssignClick="videoflyerSelected" /></v-col
      ></v-row>
      <v-row
        ><v-col
          ><VideoflyerAssignPanel
            v-if="showAssignmentPanel"
            :videoflyer="selectedVideoflyer" /></v-col
      ></v-row>
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
import VideoflyerList from "../components/VideoflyerList";
import VideoflyerAssignPanel from "../components/VideoflyerAssignPanel";

export default {
  components: {
    VideoflyerList,
    VideoflyerAssignPanel,
  },
  data: () => ({
    menu: false,
    loading: false,
    authorized: false,
    message: "",
    selectedVideoflyer: {},
    showAssignmentPanel: false,
  }),
  async created() {
    this.loading = true;
    await this.loadVideoflyer();
    this.loading = false;
    this.authorized = true;
  },
  methods: {
    ...mapActions(["getVideoflyerAction"]),
    async loadVideoflyer() {
      await this.getVideoflyerAction(await this.$auth.getTokenSilently());
    },
    videoflyerSelected(tm) {
      this.selectedVideoflyer = tm;
      this.showAssignmentPanel = true;
    },
  },
  computed: {
    ...mapState(["videoflyers"]),
    getVideoflyers() {
      return JSON.parse(JSON.stringify(this.videoflyers));
    },
  },
};
</script>
