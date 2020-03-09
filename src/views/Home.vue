<template>
  <v-container
    fluid
    :style="{
      background:
        'center top no-repeat fixed url(' +
        require('../assets/tandem-background.jpeg') +
        ')',
      backgroundSize: 'cover',
      height: '100%'
    }"
  >
    <BookAppointment />
  </v-container>
</template>

<script>
import BookAppointment from "../components/BookAppointment";

export default {
  name: "Home",
  components: {
    BookAppointment
  }
};
</script>
