<template>
  <v-dialog slot="append-outer" v-model="dialog" width="300"
    ><template v-slot:activator="{ on }"
      ><v-icon v-on="on">mdi-information</v-icon></template
    ><v-card>
      <v-card-title>{{ heading }}</v-card-title>
      <v-card-text v-html="text"></v-card-text
      ><v-card-actions
        ><v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          {{ $t("ok") }}
        </v-btn></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>

<script>
export default {
  props: {
    heading: String,
    text: String
  },
  data: () => ({
    dialog: false
  })
};
</script>
