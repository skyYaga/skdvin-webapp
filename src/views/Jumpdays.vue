<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row>
        <v-alert type="info">
          <v-progress-circular indeterminate></v-progress-circular>
          {{ message }}
        </v-alert>
      </v-row>
    </div>
    <div v-if="!loading && authorized">
      <h1>{{ $t("jumpday.jumpdays") }}</h1>
      <v-row dense>
        <v-col :lg="4" :md="4" :sm="12">
          <Calendar d-flex flex-wrap @handleDateSelection="loadJumpday" />
        </v-col>
        <v-col :lg="8" :md="8" :sm="12">
          <EditJumpdayPanel
            :jumpday="jumpday"
            @handleJumpdayChanged="loadJumpday"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-form>
          <JumpdayTable :jumpday="jumpday" />
        </v-form>
      </v-row>
    </div>
    <div v-if="!loading && !authorized">
      <v-row>
        <v-alert type="error">{{ message }}</v-alert>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Calendar from "../components/Calendar";
import JumpdayTable from "../components/JumpdayTable";
import EditJumpdayPanel from "../components/EditJumpdayPanel";
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Jumpdays",
  data() {
    return {
      loading: true,
      authorized: false,
      date: this.nowFormatted(),
      message: "",
      jumpday: {
        date: this.nowFormatted(),
        jumping: false
      }
    };
  },
  components: {
    Calendar,
    JumpdayTable,
    EditJumpdayPanel
  },
  async created() {
    await this.loadJumpdays();
    this.loadJumpday(this.date);
  },
  computed: {
    ...mapState(["jumpdays"]),
    ...mapGetters(["getJumpdayByDate"])
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
    loadJumpday(date) {
      if (this.authorized) {
        this.date = date;
        let loadedJumpday = { ...this.getJumpdayByDate(this.date) };

        if (
          Object.entries(loadedJumpday).length === 0 &&
          loadedJumpday.constructor === Object
        ) {
          this.jumpday = {
            jumping: false,
            date: this.date
          };
        } else {
          this.jumpday = JSON.parse(JSON.stringify(loadedJumpday));
        }
      }
    },
    nowFormatted() {
      return moment().format("YYYY-MM-DD");
    }
  }
};
</script>
