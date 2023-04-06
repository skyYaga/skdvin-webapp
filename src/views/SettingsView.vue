<template>
  <v-container
    ><v-row
      ><v-col
        ><h1>{{ $t("settings.settings") }}</h1></v-col
      ></v-row
    ><v-row
      ><v-col
        ><v-card
          ><v-card-text>{{ settings }}</v-card-text></v-card
        ></v-col
      ></v-row
    ></v-container
  >
</template>

<script>
import { mapActions } from "vuex";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    return { getAccessTokenSilently };
  },
  data: () => ({
    settings: {},
  }),
  async created() {
    await this.loadSettings();
  },
  methods: {
    ...mapActions(["getSettingsAction"]),
    async loadSettings() {
      let result = await this.getSettingsAction(
        await this.getAccessTokenSilently()
      );
      this.settings = result.payload;
    },
  },
};
</script>
