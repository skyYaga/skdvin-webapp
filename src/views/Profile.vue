<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2>{{ $auth.user.email }}</h2>
      </v-col>
    </v-row>
    <v-row v-if="!loading && tmError">
      <v-col>
        <v-alert type="warning">
          {{ $t("tandemmaster.loadMeError") }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="!loading && !tmError && isTandemmaster"
      ><v-col
        ><TandemmasterAssignPanel
          :tandemmaster="tandemmaster"
          :self-assign="true"
          :self-assignment-mode="commonSettings.selfAssignmentMode"
        ></TandemmasterAssignPanel></v-col
    ></v-row>
    <v-row v-if="!loading && vfError"
      ><v-col>
        <v-alert type="warning">
          {{ $t("videoflyer.loadMeError") }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="!loading && !vfError && isVideoflyer"
      ><v-col
        ><VideoflyerAssignPanel
          :videoflyer="videoflyer"
          :self-assign="true"
          :self-assignment-mode="commonSettings.selfAssignmentMode"
        ></VideoflyerAssignPanel></v-col
    ></v-row>

    <v-row
      ><v-col
        ><v-card
          ><v-card-title>{{ $t("roles") }}</v-card-title
          ><v-card-text
            ><ul>
              <li
                v-for="role in $auth.user['https://skdv.in/roles']"
                :key="role"
              >
                {{ role }}
              </li>
            </ul></v-card-text
          ></v-card
        ></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
import { roleUtil } from "../shared/roles";
import { mapActions, mapState } from "vuex";
import VideoflyerAssignPanel from "../components/VideoflyerAssignPanel.vue";
import TandemmasterAssignPanel from "../components/TandemmasterAssignPanel.vue";

export default {
  components: {
    TandemmasterAssignPanel,
    VideoflyerAssignPanel,
  },
  data: () => ({
    loading: true,
    tandemmaster: {},
    tmError: false,
    videoflyer: {},
    vfError: false,
  }),
  async created() {
    if (this.isTandemmaster) {
      await this.loadTandemmaster();
    }
    if (this.isVideoflyer) {
      await this.loadVideoflyer();
    }
    this.loading = false;
  },
  methods: {
    ...mapActions(["getMeTandemmasterAction", "getMeVideoflyerAction"]),
    async loadTandemmaster() {
      let result = await this.getMeTandemmasterAction(
        await this.$auth.getTokenSilently()
      );

      if (!result.success) {
        this.tmError = true;
      } else {
        this.tandemmaster = result.payload;
      }
    },
    async loadVideoflyer() {
      let result = await this.getMeVideoflyerAction(
        await this.$auth.getTokenSilently()
      );
      if (!result.success) {
        this.vfError = true;
      } else {
        this.videoflyer = result.payload;
      }
    },
  },
  computed: {
    ...mapState(["commonSettings"]),
    isTandemmaster() {
      return roleUtil.isTandemmaster(this.$auth);
    },
    isVideoflyer() {
      return roleUtil.isVideoflyer(this.$auth);
    },
  },
};
</script>
