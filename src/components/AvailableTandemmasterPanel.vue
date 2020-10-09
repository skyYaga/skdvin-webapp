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
          </tr>
        </thead>
        <tbody>
          <tr v-for="tandemmaster in tandemmasters" :key="tandemmaster.id">
            <td>
              {{ tandemmaster.flyer.firstName }}
              {{ tandemmaster.flyer.lastName }}
            </td>
            <td>
              <v-simple-checkbox
                v-model="tandemmaster.flyer.handcam"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>
              <v-simple-checkbox
                v-model="tandemmaster.allday"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>{{ tandemmaster.from }}</td>
            <td>{{ tandemmaster.to }}</td>
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
