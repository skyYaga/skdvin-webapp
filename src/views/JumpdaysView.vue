<template>
  <v-container fluid>
    <div v-if="loading">
      <v-row dense>
        <v-alert type="info">
          <v-progress-circular indeterminate></v-progress-circular>
          {{ message }}
        </v-alert>
      </v-row>
    </div>
    <div v-if="!loading && authorized">
      <h1>{{ $t("jumpday.jumpdays") }}</h1>
      <v-row dense>
        <v-col :cols="12" :lg="4" :md="4" :sm="12">
          <CalendarPicker
            d-flex
            flex-wrap
            @handle-date-selection="loadJumpday"
            @handle-month-change="loadJumpdays"
          />
        </v-col>
        <v-col :cols="12" :lg="8" :md="8" :sm="12">
          <EditJumpdayPanel
            :jumpday="jumpday"
            @handle-jumpday-changed="loadJumpday"
            @handle-dirty-jumpday="jumpday = $event"
          />
        </v-col>
      </v-row>
      <v-row v-if="jumpday.jumping"
        ><v-col :cols="12" :md="6" :lg="6"
          ><AvailableTandemmasterPanel
            :tandemmasters="jumpday.tandemmaster" /></v-col
        ><v-col :cols="12" :md="6" :lg="6"
          ><AvailableVideoflyerPanel :videoflyers="jumpday.videoflyer" /></v-col
      ></v-row>
      <v-row>
        <v-col :cols="12">
          <v-form>
            <JumpdayTable
              :jumpday="jumpday"
              @update-jumpday="jumpday = $event"
            />
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div v-if="!loading && !authorized">
      <v-row dense>
        <v-alert type="error">{{ message }}</v-alert>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import CalendarPicker from "../components/CalendarPicker.vue";
import JumpdayTable from "../components/JumpdayTable.vue";
import EditJumpdayPanel from "../components/EditJumpdayPanel.vue";
import AvailableTandemmasterPanel from "../components/AvailableTandemmasterPanel.vue";
import AvailableVideoflyerPanel from "../components/AvailableVideoflyerPanel.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { DateTime } from "luxon";

export default {
  name: "JumpdaysView",
  components: {
    CalendarPicker,
    JumpdayTable,
    EditJumpdayPanel,
    AvailableTandemmasterPanel,
    AvailableVideoflyerPanel,
  },
  data() {
    return {
      loading: true,
      authorized: false,
      date: this.nowFormatted(),
      message: "",
      jumpday: {
        date: this.nowFormatted(),
        jumping: false,
      },
    };
  },
  computed: {
    ...mapState(["jumpdays"]),
    ...mapGetters(["getJumpdayByDate"]),
  },
  async created() {
    await this.loadJumpdays(DateTime.now().toFormat("yyyy-MM"));
    this.loadJumpday(this.date);
  },
  methods: {
    ...mapActions(["getJumpdaysAction"]),
    async loadJumpdays(yearMonth) {
      this.message = this.$t("jumpday.loading");
      let unauthorizedMessage = await this.getJumpdaysAction({
        yearMonth: yearMonth,
        token: await this.$auth0.getTokenSilently(),
      });
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
            date: this.date,
          };
        } else {
          this.jumpday = JSON.parse(JSON.stringify(loadedJumpday));
        }
      }
    },
    nowFormatted() {
      return DateTime.now().toISODate();
    },
  },
};
</script>
