<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("settings.common") }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col
              v-for="(commonSetting, index) in commonSettings"
              :key="index"
              cols="12"
              md="6"
            >
              <v-card
                ><v-card-title>{{ index }}</v-card-title>
                <v-card-text
                  ><h2>{{ $t("dropzone.dropzone") }}</h2>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="commonSetting.dropzone.name"
                        :label="$t('dropzone.name')"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.dropzone.email"
                        :label="$t('email.email')"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.dropzone.phone"
                        :label="$t('tel')"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.dropzone.mobile"
                        :label="$t('mobile')"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-divider class="ma-10"></v-divider>
                  <h2 class="mb-3">{{ $t("settings.system") }}</h2>
                  <v-row>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.bccMail"
                        :label="$t('email.bcc')"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.dropzone.priceListUrl"
                        :label="$t('pricelist.url')"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="
                          commonSetting.dropzone.transportationAgreementUrl
                        "
                        :label="$t('transportationAgreement.url')"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="commonSetting.homepageHintTitle"
                        :label="$t('homepageHint.title')"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="commonSetting.homepageHint"
                        outlined
                        rows="2"
                        auto-grow
                        :label="$t('homepageHint.hint')"
                      ></v-textarea
                    ></v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="commonSetting.additionalReminderHint"
                        outlined
                        rows="2"
                        auto-grow
                        :label="$t('additionalReminderHint.hint')"
                      ></v-textarea
                    ></v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="commonSetting.selfAssignmentMode"
                        :label="$t('selfassignment.mode')"
                        :items="selfassignmentItems"
                      ></v-select
                    ></v-col>
                  </v-row>
                  <v-divider class="ma-10"></v-divider>
                  <h2 class="mb-3">{{ $t("faq.faq") }}</h2>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(pair, faqIndex) in commonSetting.faq"
                      :key="faqIndex"
                    >
                      <v-expansion-panel-header
                        >{{ pair.id }}.
                        {{ pair.question }}</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="2"
                            ><v-text-field
                              v-model="pair.id"
                              type="number"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="10">
                            <v-text-field
                              v-model="pair.question"
                              :label="$t('faq.question')"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="pair.answer"
                              outlined
                              rows="3"
                              auto-grow
                              :label="$t('faq.answer')"
                            ></v-textarea></v-col
                        ></v-row>
                        <v-row
                          ><v-spacer></v-spacer
                          ><v-icon
                            @click="deleteFaq(commonSetting.faq, faqIndex)"
                            >mdi-delete</v-icon
                          ></v-row
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-btn class="mt-3" @click="addFaq(commonSetting.faq)">{{
                    $t("faq.add")
                  }}</v-btn>
                </v-card-text></v-card
              >
            </v-col>
          </v-row></v-card-text
        ></v-card
      >
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    commonSettings: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      selfassignmentItems: [
        { text: this.$t("selfassignment.readonly"), value: "READONLY" },
        { text: this.$t("selfassignment.nodelete"), value: "NODELETE" },
        { text: this.$t("selfassignment.write-delete"), value: "WRITE_DELETE" },
      ],
    };
  },
  methods: {
    addFaq(faq) {
      faq.push({ id: "", question: "", answer: "" });
    },
    deleteFaq(faq, id) {
      faq.splice(id, 1);
    },
  },
};
</script>
