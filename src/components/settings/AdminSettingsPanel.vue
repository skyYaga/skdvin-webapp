<template>
  <v-card
    ><v-card-title>{{ $t("settings.admin") }}</v-card-title
    ><v-card-text>{{ adminSettings }}</v-card-text></v-card
  >
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
};
</script>
