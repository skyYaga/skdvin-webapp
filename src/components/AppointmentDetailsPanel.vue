<template>
  <v-row dense>
    <v-col :cols="12" :lg="3" :md="4" :sm="6">
      <v-card>
        <v-card-title>{{ $t("appointment.appointment") }}</v-card-title>
        <v-card-text>
          <div>
            <span>{{ $t("tandem.tandem") }}: {{ appointment.tandem }}</span>
          </div>
          <div>
            <span
              >{{ $t("picOrVid.picOrVid") }}: {{ appointment.picOrVid }}</span
            >
          </div>
          <div>
            <span
              >{{ $t("picAndVid.picAndVid") }}:
              {{ appointment.picAndVid }}</span
            >
          </div>
          <div>
            <span>{{ $t("handcam.handcam") }}: {{ appointment.handcam }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="12" :lg="4" :md="4" :sm="6">
      <v-card>
        <v-card-title>{{ $t("contactData") }}</v-card-title>
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
    <v-col :cols="12" :lg="4" :md="4" :sm="6" v-if="!isAdminOrModerator">
      <v-card>
        <v-card-title>{{ $t("jumperData") }}</v-card-title>
        <v-card-text>
          <ul v-for="(jumper, i) in appointment.customer.jumpers" :key="i">
            <li>
              <span>{{ jumper.firstName }} {{ jumper.lastName }}</span
              ><br />
              <span>{{
                $d(getDate(jumper.dateOfBirth), "dateYearMonthDayShort")
              }}</span>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="12" :lg="4" :md="4" :sm="6" v-if="isAdminOrModerator">
      <v-card>
        <v-card-title>{{ $t("notes") }}</v-card-title>
        <v-card-text>
          {{ appointment.note }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { roleUtil } from "../shared/roles";

export default {
  props: {
    appointment: null,
  },
  methods: {
    getDate(date) {
      return moment(date).toDate();
    },
  },
  computed: {
    isAdminOrModerator() {
      return roleUtil.isAdminOrModerator(this.$auth);
    },
  },
};
</script>
