<template>
  <div>
    <v-card
      ><v-card-title>{{ $t("videoflyer.available") }}</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th scope="col">{{ $t("name") }}</th>
            <th scope="col">{{ $t("picAndVid.picAndVid") }}</th>
            <th scope="col">{{ $t("allDay") }}</th>
            <th scope="col">{{ $t("from") }}</th>
            <th scope="col">{{ $t("to") }}</th>
            <th scope="col">{{ $t("note") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="videoflyer in videoflyers" :key="videoflyer.flyer.id">
            <td>
              {{ videoflyer.flyer.firstName }} {{ videoflyer.flyer.lastName }}
            </td>
            <td>
              <v-simple-checkbox
                v-model="videoflyer.flyer.picAndVid"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>
              <v-simple-checkbox
                v-model="videoflyer.allday"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>{{ videoflyer.from }}</td>
            <td>{{ videoflyer.to }}</td>
            <td>
              <v-tooltip v-if="videoflyer.note" bottom>
                <template #activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on">
                    mdi-note
                  </v-icon>
                </template>
                <span>{{ videoflyer.note }}</span>
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
    videoflyers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
