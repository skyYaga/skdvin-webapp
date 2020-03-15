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
    <v-alert
      type="success"
      v-if="typeof getMessage === 'undefined' || getMessage === ''"
    >
      <h3>{{ $t("almostdone") }}</h3>
      <p v-html="$t('appointment.confirmation.message')"></p>
    </v-alert>
    <v-alert
      type="error"
      v-if="typeof getMessage !== 'undefined' && getMessage !== ''"
    >
      <h3>{{ $t("error.occurred") }}</h3>
      {{ $t("appointment.booking.error") }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: "AppointmentConfirm",
  computed: {
    getMessage() {
      return this.$route.query.message;
    }
  }
};
</script>
