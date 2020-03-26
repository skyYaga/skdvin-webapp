<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-snackbar :color="hintColor" v-model="showHint" :timeout="5000">
        {{ hintText }}
        <v-btn text @click="showHint = false">
          {{ $t("ok") }}
        </v-btn>
      </v-snackbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-switch
              inset
              :label="$t('operating')"
              :input-value="jumpday.jumping"
              :disabled="hasBookedAppointments"
              @change="toggleJumping"
            ></v-switch>
          </v-row>
          <div>
            <v-row v-if="!jumpday.slots && jumpday.jumping">
              {{ $t("from") }}
              <v-col cols="2">
                <v-select
                  v-model="settings.startHour"
                  :items="hours"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="settings.startMinute"
                  :items="minutes"
                  label="MM"
                ></v-select>
              </v-col>
              {{ $t("to") }}
              <v-col cols="2">
                <v-select
                  v-model="settings.endHour"
                  :items="hours"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="settings.endMinute"
                  :items="minutes"
                  label="MM"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="settings.sequence"
                  :items="sequences"
                  :label="$t('interval')"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="jumpday.jumping && jumpday.slots">
              <v-col cols="2">
                <v-select
                  v-model="addHour"
                  :items="hours"
                  :rules="[
                    v => (!!v && v > 0) || $t('rules.timeHasToBeSelected'),
                    timeExistsRule
                  ]"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="addMinute"
                  :items="minutes"
                  :rules="[
                    v => !!v || $t('rules.timeHasToBeSelected'),
                    timeExistsRule
                  ]"
                  label="MM"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="jumpday.jumping">
              <v-col cols="3">
                <v-select
                  v-model="settings.tandem"
                  :items="counts"
                  :label="$t('tandem.tandems')"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.picOrVid"
                  :items="countsZero"
                  :label="$t('picOrVid.picOrVid')"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.picAndVid"
                  :items="countsZero"
                  :label="$t('picAndVid.picAndVid')"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.handcam"
                  :items="countsZero"
                  :label="$t('handcam.handcam')"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                class="ma-1"
                v-if="jumpday.jumping && !jumpday.slots"
                @click="saveJumpday"
                :loading="updating"
                :disabled="updating"
                >{{ $t("save") }}</v-btn
              >
              <v-btn
                class="ma-1"
                v-if="jumpday.jumping && jumpday.slots"
                color="primary"
                @click="updateJumpday"
                :loading="updating"
                :disabled="updating"
                >{{ $t("update") }}</v-btn
              ><v-btn
                class="ma-1"
                v-if="jumpday.jumping && jumpday.slots"
                @click="addSlot"
                :loading="updating"
                :disabled="updating"
                >{{ $t("slot.add") }}</v-btn
              ><v-btn
                class="ma-1"
                color="primary"
                v-if="!jumpday.jumping && jumpday.slots"
                @click="deleteJumpday"
                :loading="updating"
                :disabled="updating"
                >{{ $t("jumpday.delete") }}</v-btn
              >
            </v-row>
          </div>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    jumpday: null
  },
  data: () => ({
    settings: {},
    addHour: "8",
    addMinute: "00",
    hours: [
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ], // eslint-disable-line
    minutes: ["00", "15", "30", "45"],
    sequences: ["0:30", "1:00", "1:30", "2:00", "2:30"],
    updating: false,
    showHint: false,
    hintText: "",
    hintColor: "",
    valid: false
  }),
  created() {
    this.settings = { ...this.getSettings() };
  },
  computed: {
    ...mapGetters(["getSettings"]),
    hasBookedAppointments() {
      let count = 0;
      this.jumpday?.slots?.forEach(
        s =>
          typeof s.appointments !== "undefined" &&
          (count = count + s.appointments.length)
      );
      return count > 0;
    },
    counts() {
      return [...Array(11).keys()].filter(key => key > 0);
    },
    countsZero() {
      return [...Array(11).keys()];
    }
  },
  methods: {
    ...mapActions([
      "addJumpdayAction",
      "updateJumpdayAction",
      "deleteJumpdayAction",
      "updateSettingsAction"
    ]),
    async saveJumpday() {
      this.updating = true;

      this.updateSettingsAction(this.settings);

      let newJumpday = {
        date: this.jumpday.date,
        jumping: this.jumpday.jumping,
        slots: []
      };

      let currentTime = moment(
        this.settings.startHour + ":" + this.settings.startMinute,
        "HH:mm"
      );
      let endTime = moment(
        this.settings.endHour + ":" + this.settings.endMinute,
        "HH:mm"
      );
      let duration = moment.duration({
        hours: this.settings.sequence.split(":")[0],
        minutes: this.settings.sequence.split(":")[1]
      });

      while (currentTime.isBefore(endTime)) {
        let slot = {
          time: currentTime.format("HH:mm"),
          tandemTotal: this.settings.tandem,
          picOrVidTotal: this.settings.picOrVid,
          picAndVidTotal: this.settings.picAndVid,
          handcamTotal: this.settings.handcam
        };
        newJumpday.slots.push(slot);

        currentTime.add(duration);
      }

      let result = await this.addJumpdayAction({
        jumpday: newJumpday,
        token: await this.$auth.getTokenSilently()
      });
      this.onJumpdayChanged(result.payload.date);
      this.updating = false;
      this.handleHint(result);
    },
    onJumpdayChanged(date) {
      this.$emit("handleJumpdayChanged", date);
    },
    async updateJumpday() {
      this.updating = true;
      let result = await this.updateJumpdayAction({
        jumpday: this.jumpday,
        token: await this.$auth.getTokenSilently()
      });
      this.onJumpdayChanged(this.jumpday.date);
      this.updating = false;
      this.handleHint(result);
    },
    toggleJumping() {
      this.jumpday.jumping = !this.jumpday.jumping;
    },
    handleHint(result) {
      if (result.success) {
        this.hintText = this.$t("jumpday.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("jumpday.update.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    timeExistsRule() {
      let duplicateSlot = this.jumpday.slots.filter(
        s =>
          s.time ===
          moment(this.addHour + ":" + this.addMinute, "HH:mm").format("HH:mm")
      );
      return duplicateSlot.length === 0 || this.$t("rules.slotExists");
    },
    async addSlot() {
      if (this.$refs.form.validate()) {
        let slot = {
          time: moment(this.addHour + ":" + this.addMinute, "HH:mm").format(
            "HH:mm"
          ),
          tandemTotal: this.settings.tandem,
          picOrVidTotal: this.settings.picOrVid,
          picAndVidTotal: this.settings.picAndVid,
          handcamTotal: this.settings.handcam
        };
        this.jumpday.slots.push(slot);
      }
    },
    async deleteJumpday() {
      this.updating = true;
      let result = await this.deleteJumpdayAction({
        date: this.jumpday.date,
        token: await this.$auth.getTokenSilently()
      });
      this.onJumpdayChanged(this.jumpday.date);
      this.updating = false;
      this.handleHint(result);
    }
  }
};
</script>
