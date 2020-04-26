<template>
  <v-container fluid>
    <v-form>
      <v-card
        ><v-card-title>{{ $t("settings.common") }}</v-card-title
        ><v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6"
              v-for="(commonSetting, index) in commonSettings"
              :key="index"
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
                        v-model="commonSetting.dropzone.email"
                        :label="$t('email')"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-divider class="ma-10"></v-divider>
                  <h2 class="mb-3">{{ $t("faq.faq") }}</h2>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(pair, index) in commonSetting.faq"
                      :key="index"
                    >
                      <v-expansion-panel-header
                        >{{ pair.id }}.
                        {{ pair.question }}</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="2"
                            ><v-text-field
                              type="number"
                              v-model="pair.id"
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
                              outlined
                              rows="3"
                              auto-grow
                              v-model="pair.answer"
                              :label="$t('faq.answer')"
                            ></v-textarea></v-col
                        ></v-row>
                        <v-row
                          ><v-spacer></v-spacer
                          ><v-icon @click="deleteFaq(commonSetting.faq, index)"
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
    commonSettings: Object,
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
