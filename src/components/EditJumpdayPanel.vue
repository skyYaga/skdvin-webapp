<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-snackbar v-model="showHint" :color="hintColor" :timeout="5000">
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
                    (v) => (!!v && v > 0) || $t('rules.timeHasToBeSelected'),
                    timeExistsRule,
                  ]"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="addMinute"
                  :items="minutes"
                  :rules="[
                    (v) => !!v || $t('rules.timeHasToBeSelected'),
                    timeExistsRule,
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
                  :rules="[lessVideoThanTandemRule]"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.picOrVid"
                  :items="countsZero"
                  :label="$t('picOrVid.picOrVid')"
                  :rules="[
                    lessVideoThanTandemRule,
                    lessPicAndVidThanPicOrVidRule,
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.picAndVid"
                  :items="countsZero"
                  :label="$t('picAndVid.picAndVid')"
                  :rules="[
                    lessVideoThanTandemRule,
                    lessPicAndVidThanPicOrVidRule,
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="settings.handcam"
                  :items="countsZero"
                  :label="$t('handcam.handcam')"
                  :rules="[lessVideoThanTandemRule]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                v-if="jumpday.jumping && !jumpday.slots"
                class="ma-1"
                :loading="updating"
                :disabled="updating"
                @click="saveJumpday"
                >{{ $t("save") }}</v-btn
              >
              <v-btn
                v-if="jumpday.jumping && jumpday.slots"
                class="ma-1"
                color="primary"
                :loading="updating"
                :disabled="updating"
                @click="updateJumpday"
                >{{ $t("update") }}</v-btn
              ><v-btn
                v-if="jumpday.jumping && jumpday.slots"
                class="ma-1"
                :loading="updating"
                :disabled="updating"
                @click="addSlot"
                >{{ $t("slot.add") }}</v-btn
              ><v-btn
                v-if="!jumpday.jumping && jumpday.slots"
                class="ma-1"
                color="primary"
                :loading="updating"
                :disabled="updating"
                @click="deleteJumpday"
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
import { DateTime, Duration } from "luxon";

export default {
  props: {
    jumpday: {
      type: Object,
      default: function () {
        return { jumping: false };
      },
    },
  },
  data: () => ({
    settings: {},
    addHour: "08",
    addMinute: "00",
    hours: [
      "08",
      "09",
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
      "20",
    ], // eslint-disable-line
    minutes: ["00", "15", "30", "45"],
    sequences: ["0:30", "1:00", "1:30", "2:00", "2:30"],
    updating: false,
    showHint: false,
    hintText: "",
    hintColor: "",
    valid: false,
  }),
  computed: {
    ...mapGetters(["getSettings"]),
    hasBookedAppointments() {
      let count = 0;
      this.jumpday?.slots?.forEach(
        (s) =>
          typeof s.appointments !== "undefined" &&
          (count = count + s.appointments.length)
      );
      return count > 0;
    },
    counts() {
      return [...Array(11).keys()].filter((key) => key > 0);
    },
    countsZero() {
      return [...Array(11).keys()];
    },
  },
  created() {
    this.settings = JSON.parse(JSON.stringify(this.getSettings()));
  },
  methods: {
    ...mapActions([
      "addJumpdayAction",
      "updateJumpdayAction",
      "deleteJumpdayAction",
      "updateLocalSettingsAction",
    ]),
    async saveJumpday() {
      this.updating = true;

      this.updateLocalSettingsAction(this.settings);

      let newJumpday = {
        date: this.jumpday.date,
        jumping: this.jumpday.jumping,
        slots: [],
      };

      let currentTime = DateTime.fromISO(
        this.settings.startHour + ":" + this.settings.startMinute
      );
      let endTime = DateTime.fromISO(
        this.settings.endHour + ":" + this.settings.endMinute
      );
      let duration = Duration.fromObject({
        hours: this.settings.sequence.split(":")[0],
        minutes: this.settings.sequence.split(":")[1],
      });

      while (currentTime < endTime) {
        let slot = {
          time: currentTime.toFormat("HH:mm"),
          tandemTotal: this.settings.tandem,
          picOrVidTotal: this.settings.picOrVid,
          picAndVidTotal: this.settings.picAndVid,
          handcamTotal: this.settings.handcam,
        };
        newJumpday.slots.push(slot);

        currentTime = currentTime.plus(duration);
      }

      let result = await this.addJumpdayAction({
        jumpday: newJumpday,
        token: await this.$auth.getTokenSilently(),
      });
      if (result.success) {
        this.onJumpdayChanged(result.payload.date);
      }
      this.updating = false;
      this.handleHint(result);
    },
    onJumpdayChanged(date) {
      this.$emit("handle-jumpday-changed", date);
    },
    async updateJumpday() {
      this.updating = true;
      let result = await this.updateJumpdayAction({
        jumpday: this.jumpday,
        token: await this.$auth.getTokenSilently(),
      });
      this.onJumpdayChanged(this.jumpday.date);
      this.updating = false;
      this.handleHint(result);
    },
    toggleJumping() {
      let localJumpday = JSON.parse(JSON.stringify(this.jumpday));
      localJumpday.jumping = !localJumpday.jumping;
      this.$emit("handle-dirty-jumpday", localJumpday);
    },
    handleHint(result) {
      if (result.success) {
        this.hintText = this.$t("jumpday.update.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("jumpday.update.error", {
          message: result.message,
        });
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    timeExistsRule() {
      let duplicateSlot = this.jumpday.slots.filter(
        (s) =>
          s.time ===
          DateTime.fromISO(this.addHour + ":" + this.addMinute).toFormat(
            "HH:mm"
          )
      );
      return duplicateSlot.length === 0 || this.$t("rules.slotExists");
    },
    lessVideoThanTandemRule() {
      if (
        this.settings.tandem < this.settings.picOrVid ||
        this.settings.tandem < this.settings.picAndVid ||
        this.settings.tandem < this.settings.handcam
      ) {
        return this.$t("rules.moreVideoThanTandemSlots");
      }
      return true;
    },
    lessPicAndVidThanPicOrVidRule() {
      if (this.settings.picOrVid < this.settings.picAndVid) {
        return this.$t("rules.morePicAndVidThanPicOrVidSlots");
      }
      return true;
    },
    async addSlot() {
      if (this.$refs.form.validate()) {
        let slot = {
          time: DateTime.fromISO(this.addHour + ":" + this.addMinute).toFormat(
            "HH:mm"
          ),
          tandemTotal: this.settings.tandem,
          picOrVidTotal: this.settings.picOrVid,
          picAndVidTotal: this.settings.picAndVid,
          handcamTotal: this.settings.handcam,
        };
        let localJumpday = JSON.parse(JSON.stringify(this.jumpday));
        localJumpday.slots.push(slot);
        this.$emit("handle-dirty-jumpday", localJumpday);
      }
    },
    async deleteJumpday() {
      this.updating = true;
      let result = await this.deleteJumpdayAction({
        date: this.jumpday.date,
        token: await this.$auth.getTokenSilently(),
      });
      this.onJumpdayChanged(this.jumpday.date);
      this.updating = false;
      this.handleHint(result);
    },
  },
};
</script>
