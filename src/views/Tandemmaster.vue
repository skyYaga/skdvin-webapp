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
            :tandemmaster="getTandemmasters"/></v-col
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
import TandemmasterList from "../components/TandemmasterList";

export default {
  components: {
    TandemmasterList
  },
  data: () => ({
    menu: false,
    loading: false,
    authorized: false,
    message: ""
  }),
  async created() {
    this.loading = true;
    await this.loadTandemmaster();
    this.loading = false;
    this.authorized = true;
  },
  methods: {
    ...mapActions(["getTandemmasterAction"]),
    async loadTandemmaster() {
      await this.getTandemmasterAction(await this.$auth.getTokenSilently());
    }
  },
  computed: {
    ...mapState(["tandemmasters"]),
    getTandemmasters() {
      return JSON.parse(JSON.stringify(this.tandemmasters));
    }
  }
};
</script>
