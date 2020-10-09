<template>
  <v-data-table
    :headers="headers"
    :items="getGroupSlots"
    show-expand
    single-expand
  >
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-simple-table class="my-5"
          ><thead>
            <tr>
              <th scope="col">{{ $t("time") }}</th>
              <th scope="col">{{ $t("tandem.available") }}</th>
              <th scope="col">{{ $t("picOrVid.available") }}</th>
              <th scope="col">{{ $t("picAndVid.available") }}</th>
              <th scope="col">{{ $t("handcam.available") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in item.slots" :key="slot.time">
              <td>{{ slot.time }}</td>
              <td>{{ slot.tandemAvailable }}</td>
              <td>{{ slot.picOrVidAvailable }}</td>
              <td>{{ slot.picAndVidAvailable }}</td>
              <td>{{ slot.handcamAvailable }}</td>
            </tr>
          </tbody></v-simple-table
        >
      </td>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: this.$t("date"), value: "date" },
        { text: this.$t("slot.count"), value: "slots.length" },
        { text: this.$t("firstTime"), value: "firstTime" },
        { text: this.$t("lastTime"), value: "lastTime" },
        { text: this.$t("tandem.available"), value: "tandemAvailable" },
        { text: this.$t("picOrVid.available"), value: "picOrVidAvailable" },
        { text: this.$t("picAndVid.available"), value: "picAndVidAvailable" },
        { text: this.$t("handcam.available"), value: "handcamAvailable" },
      ],
    };
  },
  computed: {
    ...mapState(["groupSlots"]),
    getGroupSlots() {
      let groupSlots = JSON.parse(JSON.stringify(this.groupSlots));
      groupSlots.sort(function (a, b) {
        if (a === null) return 1;
        if (b === null) return -1;
        return new Date(a.date) - new Date(b.date);
      });
      groupSlots.forEach((slot, index) => {
        slot.date = this.$d(
          moment(slot.date).toDate(),
          "dateYearMonthDayWeekdayLong"
        );
        slot.id = index;
      });
      return groupSlots;
    },
  },
};
</script>
