<template>
  <div>
    <v-container>
      <v-row>
        <AppointmentDetailsPanel
          :appointment="appointment"
        ></AppointmentDetailsPanel
      ></v-row>
      <v-divider class="my-10"></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row class="mb-3"><h2>Sprungbestimmungen</h2></v-row>
        <v-row>
          <ul>
            <li>
              Fallschirmspringen ist in hohem Maße vom Wetter abhängig. Deshalb
              liegt aus Sicherheitsgründen die letzte <b>Entscheidung</b>, ob
              gesprungen wird oder nicht, <b>beim Tandempiloten</b>.
            </li>
            <li>
              Nehmen Sie sich für Ihren Sprung
              <b>mindestens 2 – 3 Stunden Zeit</b>, da die Sprungreihenfolge und
              der Sprungbetrieb von vielen Faktoren abhängt (Wetter, …). In
              Ausnahmefällen kann es auch länger dauern.<br />
              Der ausgemachte Termin ist lediglich als <b>Richtwert</b> zu
              verstehen. Es lohnt sich auch, den ganzen Tag zu bleiben.
            </li>
            <li>
              Unbedingt zu beachten sind <b>Mindest- und Höchstmaße</b> für
              Passagiere. Bei Nichteinhaltung besteht kein Anspruch auf den
              Sprung.
              <ul>
                <li>Mindestgröße: 140 cm</li>
                <li>Maximalgröße: 190 cm</li>
                <li>Maximalgewicht (mit Kleidung!): 90 kg</li>
                <li>
                  Mindestalter: 14 Jahre (bei Minderjährigen wird die
                  Unterschrift <b>beider Erziehungsberechtigten</b> benötigt.
                  Der Beförderungsvertrag kann dazu auch im Vorfeld ausgefüllt
                  werden.)
                </li>
              </ul>
            </li>
            <li>
              Sie sollten <b>keine schweren Knochenverletzungen</b> innerhalb
              der letzten 12 Monate vorweisen.
            </li>
            <li>
              Am Sprungtag ist jeglicher Einfluss von
              <b>Drogen oder Alkohol tabu</b>.
            </li>
            <li>Es darf <b>keine Schwangerschaft vorliegen</b>.</li>
            <li>
              Bitte bringen Sie <b>bequeme Kleidung und Turnschuhe</b> (ohne
              Haken und Ösen) mit.
            </li>
            <li>
              Das Aufnehmen des Sprungs mit Ihrer <b>Ausrüstung</b> (GoPro,
              Smartphone, etc.) ist aus Sicherheitsgründen nicht möglich. Wenn
              Sie Video/Fotos möchten, buchen Sie bitte diese Option mit.
            </li>
          </ul>
          <v-checkbox
            :rules="[
              v => !!v || 'Sie müssen die Sprungbestimmungen akzeptieren'
            ]"
            label="Die obenstehenden Sprungbestimmungen habe ich gelesen und
            akzeptiert."
          ></v-checkbox>
          <v-checkbox
            :rules="[
              v => !!v || 'Sie müssen die Datenschutzbestimmungen akzeptieren'
            ]"
            label="Ich akzeptiere die Datenschutzbestimmungen."
          ></v-checkbox>
        </v-row>
        <v-row
          ><v-btn
            class="mr-4 mt-3"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="saveJumpday"
            >Reservieren</v-btn
          ></v-row
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppointmentDetailsPanel from "./AppointmentDetailsPanel";

export default {
  props: {
    appointment: null
  },
  components: {
    AppointmentDetailsPanel
  },
  data: () => ({
    valid: false,
    loading: false
  }),
  methods: {
    ...mapActions(["addAppointmentAction"]),
    async saveJumpday() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        let message = await this.addAppointmentAction(this.appointment);
        this.onAppointmentSaved(message);
      }
      this.loading = false;
    },
    onAppointmentSaved(message) {
      this.$router.push({
        name: "appointment-confirm",
        query: { message: message }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
