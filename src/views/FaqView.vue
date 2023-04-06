<template>
  <v-container
    ><v-row
      ><v-col
        ><h1>{{ $t("faq.faq") }}</h1></v-col
      ></v-row
    ><v-row
      ><v-col
        ><v-expansion-panels>
          <v-expansion-panel
            v-for="pair in faq"
            :key="pair.id"
            :title="pair.question"
            :text="pair.answer"
          >
          </v-expansion-panel> </v-expansion-panels></v-col></v-row
  ></v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFaq"]),
    faq() {
      return this.getFaq();
    },
  },
};
</script>
