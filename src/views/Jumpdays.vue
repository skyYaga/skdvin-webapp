<template>
  <v-container fluid>
    <h1>Sprungtage</h1>
    <v-row dense>
      <v-col cols="5">
        <Calendar d-flex flex-wrap @handleDateSelection="loadJumpday" />
      </v-col>
      <v-col cols="7">
        <EditJumpdayPanel
          :jumpday="jumpday"
          @handleJumpdayChanged="loadJumpday"
        />
      </v-col>
    </v-row>
    <v-row>
      <div class="notification is-info" v-show="message">{{ message }}</div>
    </v-row>
    <v-row>
      <JumpdayTable :jumpday="jumpday" />
    </v-row>
  </v-container>
</template>

<script>
import Calendar from "../components/Calendar";
import JumpdayTable from "../components/JumpdayTable";
import EditJumpdayPanel from "../components/EditJumpdayPanel";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Jumpdays",
  data() {
    return {
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
      this.message = "loading jumpdays, please be patient...";
      await this.getJumpdaysAction(await this.$auth.getTokenSilently());
      this.message = "";
    },
    loadJumpday(date) {
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
        this.jumpday = loadedJumpday;
      }
    },
    nowFormatted() {
      let now = new Date();
      return (
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
      );
    }
  }
};
</script>
