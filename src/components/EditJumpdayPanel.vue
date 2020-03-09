<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-card-text>
        <v-form>
          <v-row>
            <v-switch
              inset
              v-model="jumpday.jumping"
              label="Sprungbetrieb"
            ></v-switch>
          </v-row>
          <div v-if="!jumpday.slots && jumpday.jumping">
            <v-row>
              Von
              <v-col cols="2">
                <v-select
                  v-model="startHour"
                  :items="hours"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="startMinute"
                  :items="minutes"
                  label="MM"
                ></v-select>
              </v-col>
              Bis
              <v-col cols="2">
                <v-select
                  v-model="endHour"
                  :items="hours"
                  label="HH"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="endMinute"
                  :items="minutes"
                  label="MM"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="sequence"
                  :items="sequences"
                  label="Taktung"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="tandem"
                  :items="counts"
                  label="Tandems"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="picOrVid"
                  :items="countsZero"
                  label="Foto oder Video"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="picAndVid"
                  :items="countsZero"
                  label="Foto und Video"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="handcam"
                  :items="countsZero"
                  label="Handcam"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-btn @click="saveJumpday">Speichern</v-btn>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    jumpday: null
  },
  data: () => ({
    startHour: "9",
    startMinute: "30",
    endHour: "18",
    endMinute: "00",
    sequence: "1:30",
    tandem: "5",
    picOrVid: "0",
    picAndVid: "0",
    handcam: "0",
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
    counts: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    countsZero: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  }),
  methods: {
    ...mapActions(["addJumpdayAction"]),
    async saveJumpday() {
      let newJumpday = {
        date: this.jumpday.date,
        jumping: this.jumpday.jumping,
        slots: []
      };

      let currentTime = moment(
        this.startHour + ":" + this.startMinute,
        "HH:mm"
      );
      let endTime = moment(this.endHour + ":" + this.endMinute, "HH:mm");
      let duration = moment.duration({
        hours: this.sequence.split(":")[0],
        minutes: this.sequence.split(":")[1]
      });

      while (currentTime.isBefore(endTime)) {
        let slot = {
          time: currentTime.format("HH:mm"),
          tandemTotal: this.tandem,
          picOrVidTotal: this.picOrVid,
          picAndVidTotal: this.picAndVid,
          handcamTotal: this.handcam
        };
        newJumpday.slots.push(slot);

        currentTime.add(duration);
      }

      let auth = this.$auth;
      let token = await this.$auth.getTokenSilently();
      await this.addJumpdayAction({ jumpday: newJumpday, token });
      this.onJumpdayChanged(newJumpday.date);
    },
    onJumpdayChanged(date) {
      this.$emit("handleJumpdayChanged", date);
    }
  }
};
</script>
