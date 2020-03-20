<template>
  <div>
    <v-card
      ><v-card-title>{{ $t("tandemmaster.available") }}</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th scope="col">{{ $t("name") }}</th>
            <th scope="col">{{ $t("handcam.handcam") }}</th>
            <th scope="col">{{ $t("email") }}</th>
            <th scope="col">{{ $t("tel") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tandemmaster in tandemmasters" :key="tandemmaster.id">
            <td>{{ tandemmaster.firstName }} {{ tandemmaster.lastName }}</td>
            <td>
              <v-simple-checkbox
                v-model="tandemmaster.handcam"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>{{ tandemmaster.email }}</td>
            <td>{{ tandemmaster.tel }}</td>
          </tr>
        </tbody></v-simple-table
      ></v-card
    >
  </div>
</template>

<script>
export default {
  props: {
    tandemmasters: Array
  }
};
</script>
