<template>
  <v-container
    fluid
    :style="{
      background:
        'center top no-repeat fixed url(' +
        require('../assets/tandem-background.jpeg') +
        ')',
      backgroundSize: 'cover',
      height: '100%',
    }"
  >
    <HomepageHint />
    <BookAppointment />
  </v-container>
</template>

<script>
import BookAppointment from "../components/BookAppointment";
import HomepageHint from "../components/HomepageHint";

export default {
  name: "Home",
  components: {
    HomepageHint,
    BookAppointment,
  },
};
</script>
