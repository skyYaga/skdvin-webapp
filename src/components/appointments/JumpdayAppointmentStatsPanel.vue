<template>
  <div>
    <v-card>
      <!-- <v-card class="d-inline-block mx-auto"> -->
      <v-card-title>{{ $t("statistics.header") }}</v-card-title>
      <v-container>
        <v-card-text>
          <v-row>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("tandems.booked") }}</h5>
                <h2>{{ tandemsBooked }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("picOrVid.booked") }}</h5>
                <h2>{{ picOrVidBooked }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("picAndVid.booked") }}</h5>
                <h2>{{ picAndVidBooked }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("handcam.booked") }}</h5>
                <h2>{{ handcamBooked }}</h2>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("tandems.available") }}</h5>
                <h2>{{ tandemsAvailable }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("picOrVid.available") }}</h5>
                <h2>{{ picOrVidAvailable }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("picAndVid.available") }}</h5>
                <h2>{{ picAndVidAvailable }}</h2>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <h5>{{ $t("handcam.available") }}</h5>
                <h2>{{ handcamAvailable }}</h2>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    jumpday: {
      type: Object,
      default: () => ({ slots: [] }),
    },
  },
  computed: {
    tandemsBooked() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.tandemBooked));
      return sum;
    },
    picOrVidBooked() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.picOrVidBooked));
      return sum;
    },
    picAndVidBooked() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.picAndVidBooked));
      return sum;
    },
    handcamBooked() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.handcamBooked));
      return sum;
    },
    tandemsAvailable() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.tandemAvailable));
      return sum;
    },
    picOrVidAvailable() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.picOrVidAvailable));
      return sum;
    },
    picAndVidAvailable() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.picAndVidAvailable));
      return sum;
    },
    handcamAvailable() {
      let sum = 0;
      this.jumpday.slots.forEach((j) => (sum += j.handcamAvailable));
      return sum;
    },
  },
};
</script>
