<template>
  <div v-if="jumpday.jumping" fluid>
    <v-row dense>
      <v-col v-for="slot in jumpday.slots" :key="slot.time" :lg="4" :md="6">
        <v-card>
          <v-card-title v-text="slot.time"></v-card-title>

          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th scope="col" class="text-left"></th>
                  <th scope="col" class="text-left">Slots</th>
                  <th scope="col" class="text-left">Gebucht</th>
                  <th scope="col" class="text-left">Frei</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t("tandem.tandems") }}</td>
                  <td>
                    <v-select
                      v-model="slot.tandemTotal"
                      :items="calculateItems(slot.tandemBooked)"
                    ></v-select>
                  </td>
                  <td>{{ slot.tandemBooked }}</td>
                  <td>{{ slot.tandemAvailable }}</td>
                </tr>
                <tr>
                  <td>{{ $t("picOrVid.picOrVid") }}</td>
                  <td>
                    <v-select
                      v-model="slot.picOrVidTotal"
                      :items="calculateItemsZero(slot.picOrVidBooked)"
                    ></v-select>
                  </td>
                  <td>{{ slot.picOrVidBooked }}</td>
                  <td>{{ slot.picOrVidAvailable }}</td>
                </tr>
                <tr>
                  <td>{{ $t("picAndVid.picAndVid") }}</td>
                  <td>
                    <v-select
                      v-model="slot.picAndVidTotal"
                      :items="calculateItemsZero(slot.picAndVidBooked)"
                    ></v-select>
                  </td>
                  <td>{{ slot.picAndVidBooked }}</td>
                  <td>{{ slot.picAndVidAvailable }}</td>
                </tr>
                <tr>
                  <td>{{ $t("handcam.handcam") }}</td>
                  <td>
                    <v-select
                      v-model="slot.handcamTotal"
                      :items="calculateItemsZero(slot.handcamBooked)"
                    ></v-select>
                  </td>
                  <td>{{ slot.handcamBooked }}</td>
                  <td>{{ slot.handcamAvailable }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions
            ><v-spacer></v-spacer
            ><v-icon
              v-if="
                typeof slot.tandemBooked !== 'undefined' &&
                slot.tandemBooked === 0
              "
              @click="deleteSlot(slot)"
            >
              mdi-trash-can
            </v-icon></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    jumpday: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    calculateItems(minCount) {
      if (typeof minCount !== "undefined") {
        return [...Array(11).keys()].filter(
          (key) => key > 0 && key >= minCount
        );
      }
      return [...Array(11).keys()].filter((key) => key > 0);
    },
    calculateItemsZero(minCount) {
      if (typeof minCount !== "undefined") {
        return [...Array(11).keys()].filter((key) => key >= minCount);
      }
      return [...Array(11).keys()];
    },
    deleteSlot(slot) {
      let tmpJumpday = JSON.parse(JSON.stringify(this.jumpday));
      tmpJumpday.slots = tmpJumpday.slots.filter((s) => s.time !== slot.time);
      this.$emit("update-jumpday", tmpJumpday);
    },
  },
};
</script>
