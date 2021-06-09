<template>
  <v-card class="my-4">
    <v-card-title>{{ $t("tandemmaster.assignment") }}</v-card-title>
    <v-card-text>
      <v-row
        ><v-col>
          <v-select
            :value="waiver.tandemmaster"
            :items="tandemmasters"
            @change="tandemmasterSelected"
          ></v-select> </v-col
      ></v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { DateTime } from "luxon";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  props: {
    waiver: {
      type: Object,
      default: () => ({
        tandemmaster: "",
      }),
    },
  },
  data() {
    return {
      tandemmasters: [],
    };
  },
  computed: {
    ...mapState(["jumpdays"]),
    ...mapGetters(["getJumpdayByDate"]),
  },
  async created() {
    await this.loadJumpdays();
    this.loadJumpday();
  },
  methods: {
    ...mapActions(["getJumpdaysAction"]),
    async loadJumpdays() {
      this.message = this.$t("jumpday.loading");
      let unauthorizedMessage = await this.getJumpdaysAction(
        await this.$auth.getTokenSilently()
      );
      if (unauthorizedMessage !== "") {
        this.message = this.$t("accessdenied");
        this.authorized = false;
      } else {
        this.message = "";
        this.authorized = true;
      }
      this.loading = false;
    },
    loadJumpday() {
      if (this.authorized) {
        this.date = DateTime.now().toISODate();
        let loadedJumpday = { ...this.getJumpdayByDate(this.date) };
        loadedJumpday.tandemmaster.forEach((tm) => {
          let name = tm.flyer.firstName + " " + tm.flyer.lastName;
          this.tandemmasters.push({
            text: name,
            value: tm.flyer.id,
          });
        });
      }
    },
    tandemmasterSelected(id) {
      this.$emit("tandemmaster-selected", id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
