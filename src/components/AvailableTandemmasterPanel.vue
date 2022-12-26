<template>
  <div>
    <v-card
      ><v-card-title>{{ $t("tandemmaster.available") }}</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th scope="col">{{ $t("name") }}</th>
            <th scope="col">{{ $t("handcam.handcam") }}</th>
            <th scope="col">{{ $t("allDay") }}</th>
            <th scope="col">{{ $t("from") }}</th>
            <th scope="col">{{ $t("to") }}</th>
            <th scope="col">{{ $t("note") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tandemmaster in tandemmasters" :key="tandemmaster.id">
            <td>
              {{ tandemmaster.flyer.firstName }}
              {{ tandemmaster.flyer.lastName }}
            </td>
            <td>
              <v-checkbox-btn
                v-model="tandemmaster.flyer.handcam"
                disabled
              ></v-checkbox-btn>
            </td>
            <td>
              <v-checkbox-btn
                v-model="tandemmaster.allday"
                disabled
              ></v-checkbox-btn>
            </td>
            <td>{{ tandemmaster.from }}</td>
            <td>{{ tandemmaster.to }}</td>
            <td>
              <v-tooltip v-if="tandemmaster.note" location="bottom">
                <template #activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on">
                    mdi-note
                  </v-icon>
                </template>
                <span>{{ tandemmaster.note }}</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody></v-simple-table
      ></v-card
    >
  </div>
</template>

<script>
export default {
  props: {
    tandemmasters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
