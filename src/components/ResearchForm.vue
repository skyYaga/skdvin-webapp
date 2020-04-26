<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="6" md="3" lg="2"
        ><v-select
          v-model="tandemCount"
          :items="items"
          :label="$t('tandem.count')"
          type="number"
          required
        ></v-select
      ></v-col>
      <v-col cols="12" sm="6" md="3" lg="2"
        ><v-btn
          color="primary"
          @click="searchGroupSlots()"
          :disabled="loading"
          :loading="loading"
          >{{ $t("search") }}</v-btn
        ></v-col
      ></v-row
    >
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    tandemCount: 1,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  }),
  methods: {
    ...mapActions(["getGroupSlotsAction"]),
    async searchGroupSlots() {
      this.loading = true;
      await this.getGroupSlotsAction({
        query: { tandem: this.tandemCount },
        token: await this.$auth.getTokenSilently(),
      });
      this.loading = false;
    },
  },
};
</script>
