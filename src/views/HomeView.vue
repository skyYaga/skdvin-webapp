<template>
  <v-container
    fluid
    :style="{
      background: `center top no-repeat fixed url( ${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100%',
    }"
  >
    <HomepageHint />
    <BookAppointment />
  </v-container>
</template>

<script>
import BookAppointment from "../components/BookAppointment.vue";
import HomepageHint from "../components/HomepageHint.vue";
import backgroundImage from "@/assets/tandem-background.jpeg";

export default {
  name: "HomeView",
  components: {
    HomepageHint,
    BookAppointment,
  },
  computed: {
    backgroundImage() {
      return backgroundImage;
    },
  },
};
</script>
