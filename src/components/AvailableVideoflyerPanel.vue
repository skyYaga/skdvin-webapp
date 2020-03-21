<template>
  <div>
    <v-card
      ><v-card-title>{{ $t("videoflyer.available") }}</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th scope="col">{{ $t("name") }}</th>
            <th scope="col">{{ $t("picAndVid.picAndVid") }}</th>
            <th scope="col">{{ $t("email") }}</th>
            <th scope="col">{{ $t("tel") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="videoflyer in videoflyers" :key="videoflyer.id">
            <td>{{ videoflyer.firstName }} {{ videoflyer.lastName }}</td>
            <td>
              <v-simple-checkbox
                v-model="videoflyer.picAndVid"
                disabled
              ></v-simple-checkbox>
            </td>
            <td>{{ videoflyer.email }}</td>
            <td>{{ videoflyer.tel }}</td>
          </tr>
        </tbody></v-simple-table
      ></v-card
    >
  </div>
</template>

<script>
export default {
  props: {
    videoflyers: Array
  }
};
</script>
