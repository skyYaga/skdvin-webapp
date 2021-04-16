<template>
  <v-container fluid>
    <v-row>
      <v-col
        ><v-alert type="success">
          <div>
            <h3>{{ $t("waiver.save.successful") }}</h3>
          </div>
        </v-alert></v-col
      >
    </v-row>

    <v-row>
      <v-col
        ><v-btn color="primary" @click="routeToWaiverPage">{{
          $t("wavier.new")
        }}</v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "WaiverConfirm",
  methods: {
    routeToWaiverPage() {
      this.$router.push({
        name: "tandem-waiver",
      });
    },
  },
};
</script>
