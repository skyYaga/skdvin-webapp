<template>
  <v-row dense>
    <v-col :cols="3" d-flex flex-wrap>
      <v-card>
        <v-card-title>Termin</v-card-title>
        <v-card-text>
          <div>
            <span>Tandem: {{ appointment.tandem }}</span>
          </div>
          <div>
            <span>Foto oder Video: {{ appointment.picOrVid }}</span>
          </div>
          <div>
            <span>Foto und Video: {{ appointment.picAndVid }}</span>
          </div>
          <div>
            <span>Handcam: {{ appointment.handcam }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="6" d-flex flex-wrap>
      <v-card>
        <v-card-title>Kontaktdaten</v-card-title>
        <v-card-text>
          <span
            >{{ appointment.customer.firstName }}
            {{ appointment.customer.lastName }}</span
          ><br />
          <span>{{ appointment.customer.email }}</span
          ><br />
          <span>{{ appointment.customer.tel }}</span
          ><br />
          <span
            >{{ appointment.customer.plz }}
            {{ appointment.customer.city }}</span
          >
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="4" d-flex flex-wrap>
      <v-card>
        <v-card-title>Springerdaten</v-card-title>
        <v-card-text>
          <ul v-for="(jumper, i) in appointment.customer.jumpers" :key="i">
            <li>
              <span>{{ jumper.firstName }} {{ jumper.lastName }}</span
              ><br />
              <span>{{ jumper.dateOfBirth }}, {{ jumper.weight }}kg</span>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    appointment: null
  }
};
</script>

<style lang="scss" scoped></style>
