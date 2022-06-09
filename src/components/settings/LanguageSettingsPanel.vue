<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("settings.language") }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col
              v-for="(languageSetting, index) in tmpLanguageSettings"
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
                        v-model="languageSetting.dropzone.name"
                        :label="$t('dropzone.name')"
                        @input="updateLanguageSettings()"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="languageSetting.dropzone.email"
                        :label="$t('email.email')"
                        @input="updateLanguageSettings()"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="languageSetting.dropzone.phone"
                        :label="$t('tel')"
                        @input="updateLanguageSettings()"
                      ></v-text-field></v-col
                    ><v-col cols="12"
                      ><v-text-field
                        v-model="languageSetting.dropzone.mobile"
                        :label="$t('mobile')"
                        @input="updateLanguageSettings()"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-divider class="ma-10"></v-divider>
                  <h2 class="mb-3">{{ $t("settings.system") }}</h2>
                  <v-row>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="languageSetting.dropzone.priceListUrl"
                        :label="$t('pricelist.url')"
                        @input="updateLanguageSettings()"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="
                          languageSetting.dropzone.transportationAgreementUrl
                        "
                        :label="$t('transportationAgreement.url')"
                        @input="updateLanguageSettings()"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="languageSetting.homepageHintTitle"
                        :label="$t('homepageHint.title')"
                        @input="updateLanguageSettings()"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="languageSetting.homepageHint"
                        outlined
                        rows="2"
                        auto-grow
                        :label="$t('homepageHint.hint')"
                        @input="updateLanguageSettings()"
                      ></v-textarea
                    ></v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="languageSetting.additionalReminderHint"
                        outlined
                        rows="2"
                        auto-grow
                        :label="$t('additionalReminderHint.hint')"
                        @input="updateLanguageSettings()"
                      ></v-textarea
                    ></v-col>
                  </v-row>
                  <v-divider class="ma-10"></v-divider>
                  <h2 class="mb-3">{{ $t("faq.faq") }}</h2>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(pair, faqIndex) in languageSetting.faq"
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
                              @input="updateLanguageSettings()"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="10">
                            <v-text-field
                              v-model="pair.question"
                              :label="$t('faq.question')"
                              @input="updateLanguageSettings()"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="pair.answer"
                              outlined
                              rows="3"
                              auto-grow
                              :label="$t('faq.answer')"
                              @input="updateLanguageSettings()"
                            ></v-textarea></v-col
                        ></v-row>
                        <v-row
                          ><v-spacer></v-spacer
                          ><v-icon
                            @click="deleteFaq(languageSetting.faq, faqIndex)"
                            >mdi-delete</v-icon
                          ></v-row
                        >
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-btn class="mt-3" @click="addFaq(languageSetting.faq)">{{
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
    languageSettings: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      tmpLanguageSettings: JSON.parse(JSON.stringify(this.languageSettings)),
    };
  },
  watch: {
    languageSettings(val) {
      this.tmpLanguageSettings = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    addFaq(faq) {
      faq.push({ id: "", question: "", answer: "" });
      this.updateLanguageSettings();
    },
    deleteFaq(faq, id) {
      faq.splice(id, 1);
      this.updateLanguageSettings();
    },
    updateLanguageSettings() {
      this.$emit("update-language-settings", this.tmpLanguageSettings);
    },
  },
};
</script>
