<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("settings.admin") }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col cols="2">
              <v-text-field
                :value="tmpAdminSettings.tandemsFrom"
                :label="$t('from')"
                placeholder="HH:MM"
                @input="updateAdminSettings()"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                :value="tmpAdminSettings.tandemsTo"
                :label="$t('to')"
                placeholder="HH:MM"
                @input="updateAdminSettings()"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="tmpAdminSettings.interval"
                :items="sequences"
                :label="$t('interval')"
                @change="updateAdminSettings()"
              ></v-select>
            </v-col> </v-row
          ><v-row>
            <v-col cols="3">
              <v-select
                v-model="tmpAdminSettings.tandemCount"
                :items="counts"
                :label="$t('tandem.tandems')"
                :rules="[lessVideoThanTandemRule]"
                @change="updateAdminSettings()"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="tmpAdminSettings.picOrVidCount"
                :items="countsZero"
                :label="$t('picOrVid.picOrVid')"
                :rules="[
                  lessVideoThanTandemRule,
                  lessPicAndVidThanPicOrVidRule,
                ]"
                @change="updateAdminSettings()"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="tmpAdminSettings.picAndVidCount"
                :items="countsZero"
                :label="$t('picAndVid.picAndVid')"
                :rules="[
                  lessVideoThanTandemRule,
                  lessPicAndVidThanPicOrVidRule,
                ]"
                @change="updateAdminSettings()"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="tmpAdminSettings.handcamCount"
                :items="countsZero"
                :label="$t('handcam.handcam')"
                :rules="[lessVideoThanTandemRule]"
                @change="updateAdminSettings()"
              ></v-select>
            </v-col>
            <v-col cols="12"
              ><v-text-field
                v-model="tmpAdminSettings.bccMail"
                :label="$t('email.bcc')"
                @input="updateAdminSettings()"
              ></v-text-field></v-col></v-row></v-card-text
      ></v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    adminSettings: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      sequences: ["0:30", "1:00", "1:30", "2:00", "2:30"],
      tmpAdminSettings: JSON.parse(JSON.stringify(this.adminSettings)),
    };
  },
  computed: {
    counts() {
      return [...Array(11).keys()].filter((key) => key > 0);
    },
    countsZero() {
      return [...Array(11).keys()];
    },
  },
  watch: {
    adminSettings(val) {
      this.tmpAdminSettings = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    updateAdminSettings() {
      this.$emit("update-admin-settings", this.tmpAdminSettings);
    },
    lessVideoThanTandemRule() {
      if (
        this.tmpAdminSettings.tandem < this.tmpAdminSettings.picOrVid ||
        this.tmpAdminSettings.tandem < this.tmpAdminSettings.picAndVid ||
        this.tmpAdminSettings.tandem < this.tmpAdminSettings.handcam
      ) {
        return this.$t("rules.moreVideoThanTandemSlots");
      }
      return true;
    },
    lessPicAndVidThanPicOrVidRule() {
      if (this.tmpAdminSettings.picOrVid < this.tmpAdminSettings.picAndVid) {
        return this.$t("rules.morePicAndVidThanPicOrVidSlots");
      }
      return true;
    },
  },
};
</script>
