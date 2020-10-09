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
    <v-alert
      v-if="typeof getMessage === 'undefined' || getMessage === ''"
      type="success"
    >
      <div v-if="!noEmail">
        <h3>{{ $t("almostdone") }}</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="$t('appointment.confirmation.message')"></p>
      </div>
      <div v-if="noEmail">
        <h3>{{ $t("appointment.booking.success") }}</h3>
      </div>
    </v-alert>
    <v-alert
      v-if="typeof getMessage !== 'undefined' && getMessage !== ''"
      type="error"
    >
      <h3>{{ $t("error.occurred") }}</h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="$t('appointment.booking.error')"></p>
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: "AppointmentConfirm",
  computed: {
    noEmail() {
      return this.$route.query.noemail;
    },
    getMessage() {
      return this.$route.query.message;
    },
  },
};
</script>
