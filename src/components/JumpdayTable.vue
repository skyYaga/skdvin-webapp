<template>
  <v-container fluid v-if="jumpday.jumping">
    <v-row dense>
      <v-col :lg="4" v-for="slot in jumpday.slots" :key="slot.time">
        <v-card>
          <v-card-title v-text="slot.time"></v-card-title>

          <v-simple-table>
            <template v-slot:default>
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
                  <td>{{ $t("tandems") }}</td>
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
                  <td>{{ $t("picOrVid") }}</td>
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
                  <td>{{ $t("picAndVid") }}</td>
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
                  <td>{{ $t("handcam") }}</td>
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
  </v-container>
</template>

<script>
export default {
  props: {
    jumpday: Object
  },
  methods: {
    calculateItems(minCount) {
      if (typeof minCount !== "undefined") {
        return [...Array(11).keys()].filter(key => key > 0 && key >= minCount);
      }
      return [...Array(11).keys()].filter(key => key > 0);
    },
    calculateItemsZero(minCount) {
      if (typeof minCount !== "undefined") {
        return [...Array(11).keys()].filter(key => key >= minCount);
      }
      return [...Array(11).keys()];
    },
    deleteSlot(slot) {
      this.jumpday.slots = this.jumpday.slots.filter(s => s.time !== slot.time);
    }
  }
};
</script>
