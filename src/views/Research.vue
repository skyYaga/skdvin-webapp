<template>
  <v-container fluid>
    <v-row
      ><v-col
        ><h1>{{ $t("research.research") }}</h1></v-col
      ></v-row
    ><v-row
      ><v-col
        ><v-card
          ><v-card-text>
            <ResearchForm />
            <ResearchTable />
          </v-card-text>
        </v-card> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import ResearchForm from "../components/ResearchForm";
import ResearchTable from "../components/ResearchTable";

export default {
  components: {
    ResearchForm,
    ResearchTable,
  },
};
</script>
