<template>
  <v-container fluid v-if="jumpday.jumping">
    <v-row dense>
      <v-col v-for="slot in jumpday.slots" :key="slot.time">
        <v-card>
          <v-card-title v-text="slot.time"></v-card-title>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">Slots</th>
                  <th class="text-left">Frei</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tandems</td>
                  <td>{{ slot.tandemTotal }}</td>
                  <td>{{ slot.tandemAvailable }}</td>
                </tr>
                <tr>
                  <td>Foto oder Video</td>
                  <td>{{ slot.picOrVidTotal }}</td>
                  <td>{{ slot.picOrVidAvailable }}</td>
                </tr>
                <tr>
                  <td>Foto und Video</td>
                  <td>{{ slot.picAndVidTotal }}</td>
                  <td>{{ slot.picAndVidAvailable }}</td>
                </tr>
                <tr>
                  <td>Handcam</td>
                  <td>{{ slot.handcamTotal }}</td>
                  <td>{{ slot.handcamAvailable }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    jumpday: null
  }
};
</script>

<style lang="scss" scoped></style>
