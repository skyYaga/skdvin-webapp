<template>
  <v-container fluid>
    <v-snackbar
      v-model="showHint"
      :color="hintColor"
      :timeout="5000"
    >
      {{ hintText }}
      <v-btn
        text
        @click="showHint = false"
      >
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <div v-if="authorized">
      <v-row dense>
        <h1>{{ $t("voucher.legacy-vouchers") }}</h1>
      </v-row>
      <v-row dense>
        <v-col
          :cols="12"
          :lg="4"
          :md="4"
          :sm="12"
        >
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="voucherId"
                :label="$t('voucher.number')"
              /><v-btn
                :loading="loading"
                :disabled="loading"
                @click="searchLegacyVoucher"
              >
                {{ $t("search") }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col><v-col
          v-if="voucherData != null"
          :cols="12"
          :lg="8"
          :md="8"
          :sm="12"
        >
          <v-card>
            <v-card-title>{{ $t("voucher.details") }}</v-card-title>
            <v-card-text>
              <div class="px-3 pb-3">
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.number") }}: </span><span>{{ voucherData.id }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.id") }}: </span><span>{{ voucherData.voucherId }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.paid") }}: </span>
                  <v-icon v-if="voucherData.paid">
                    mdi-check-bold
                  </v-icon>
                  <v-icon
                    v-if="!voucherData.paid"
                    color="error"
                  >
                    mdi-close-box
                  </v-icon>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.redeemed") }}: </span>
                  <v-icon v-if="voucherData.redeemed">
                    mdi-check-bold
                  </v-icon>
                  <v-icon
                    v-if="!voucherData.redeemed"
                  >
                    mdi-close-box
                  </v-icon>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.redeemDate") }}: </span><span>{{ voucherData.redeemDate }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.validUntil") }}: </span><span>{{ voucherData.validUntil }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.productDescription") }}: </span><span>{{ voucherData.productDescription }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.value") }}: </span><span>{{ voucherData.value }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.tax") }}: </span><span>{{ voucherData.tax }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.paymentProvider") }}: </span><span>{{ voucherData.paymentProvider }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.transactionId") }}: </span><span>{{ voucherData.transactionId }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.buyDate") }}: </span><span>{{ voucherData.buyDate }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("voucher.salutation") }}: </span><span>{{ voucherData.salutation }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("firstName") }}: </span><span>{{ voucherData.firstName }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("lastName") }}: </span><span>{{ voucherData.lastName }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("street") }}: </span><span>{{ voucherData.street }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("zip") }}: </span><span>{{ voucherData.zipCode }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("city") }}: </span><span>{{ voucherData.city }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("phone") }}: </span><span>{{ voucherData.phone }}</span>
                </v-row>
                <v-row>
                  <span class="font-weight-bold">{{ $t("email.email") }}: </span><span>{{ voucherData.email }}</span>
                </v-row>
                <v-row>
                  <v-alert
                    v-if="!voucherData.redeemed && voucherData.paid && expiredYears > 0"
                    type="warning"
                  >
                    {{
                      $t("voucher.back-payment", {
                        years: expiredYears,
                        backPayment: backPayment,
                      })
                    }}
                  </v-alert>
                </v-row>
                <v-row>
                  <v-btn
                    v-if="!voucherData.redeemed && voucherData.paid"
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="redeemVoucher"
                  >
                    {{ $t("voucher.redeem") }}
                  </v-btn>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="!loading && !authorized">
      <v-row dense>
        <v-alert type="error">
          {{ message }}
        </v-alert>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { DateTime } from "luxon";

export default {
  data: () => ({
    loading: false,
    authorized: false,
    message: "",
    voucherId: null,
    voucherData: null,
    hintText: "",
    hintColor: "",
    showHint: false,
  }),
  computed: {
    expiredYears: function () {
      if (this.voucherData !== null) {
        let validUntilDateTime = DateTime.fromFormat(
          this.voucherData.validUntil,
          "dd.MM.yyyy"
        );
        let diffInYears = DateTime.now()
          .diff(validUntilDateTime, "years")
          .toObject().years;
        if (diffInYears > 0) {
          return Math.ceil(diffInYears);
        }
      }
      return 0;
    },
    backPayment: function () {
      return this.expiredYears * 15;
    },
  },
  async created() {
    this.loading = true;
    this.loading = false;
    this.authorized = true;
  },
  methods: {
    ...mapActions(["getLegacyVoucherAction", "redeemLegacyVoucherAction"]),
    async searchLegacyVoucher() {
      this.loading = true;
      let result = await this.getLegacyVoucherAction({
        id: this.voucherId,
        token: await this.$auth.getTokenSilently(),
      });
      this.voucherData = result.payload;
      this.loading = false;
    },
    async redeemVoucher() {
      this.loading = true;
      let result = await this.redeemLegacyVoucherAction({
        id: this.voucherId,
        token: await this.$auth.getTokenSilently(),
      });
      this.voucherData = result.payload;

      if (result.success) {
        this.hintText = this.$t("voucher.redeem-successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("voucher.redeem-error");
        this.hintColor = "red";
      }
      this.showHint = true;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
