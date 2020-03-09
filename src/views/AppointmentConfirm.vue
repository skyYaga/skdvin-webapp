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
      <h3>Fast geschafft!</h3>
      Wir haben Ihnen eine E-Mail mit ihren Termindaten geschickt!<br />Bitte
      bestätigen Sie ihren Termin durch einen Klick auf den Link in der
      E-Mail!<br />
      Unbestätigte Termine werden automatisch nach 24 Stunden storniert.
    </v-alert>
    <v-alert
      type="error"
      v-if="typeof getMessage !== 'undefined' && getMessage !== ''"
    >
      <h3>Ein Fehler ist aufgetreten</h3>
      Leider ist bei der Buchung ein Fehler aufgetreten.<br />
      Bitte versuchen sie es später erneut.<br />
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
