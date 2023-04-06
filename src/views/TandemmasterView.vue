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
        ><h1>{{ $t("tandemmaster.tandemmaster") }}</h1></v-row
      >
      <v-row
        ><v-col
          ><TandemmasterList
            :loading="loading"
            :tandemmaster="getTandemmasters"
            @handle-assign-click="tandemmasterSelected" /></v-col
      ></v-row>
      <v-row
        ><v-col
          ><TandemmasterAssignPanel
            v-if="showAssignmentPanel"
            :tandemmaster="selectedTandemmaster" /></v-col
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
import TandemmasterList from "../components/TandemmasterList.vue";
import TandemmasterAssignPanel from "../components/TandemmasterAssignPanel.vue";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  components: {
    TandemmasterList,
    TandemmasterAssignPanel,
  },
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    return { getAccessTokenSilently };
  },
  data: () => ({
    menu: false,
    loading: false,
    authorized: false,
    message: "",
    selectedTandemmaster: {},
    showAssignmentPanel: false,
  }),
  computed: {
    ...mapState(["tandemmaster"]),
    getTandemmasters() {
      return JSON.parse(JSON.stringify(this.tandemmaster.tandemmasters));
    },
  },
  async created() {
    this.loading = true;
    await this.loadTandemmaster();
    this.loading = false;
    this.authorized = true;
  },
  methods: {
    ...mapActions(["getTandemmasterAction"]),
    async loadTandemmaster() {
      await this.getTandemmasterAction(await this.getAccessTokenSilently());
    },
    tandemmasterSelected(tm) {
      this.selectedTandemmaster = tm;
      this.showAssignmentPanel = true;
    },
  },
};
</script>
