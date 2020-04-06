export const emailRules = (i18n) => [
  (v) => !v || /.+@.+\..+/.test(v) || i18n.t("rules.emailValid"),
];

export const nameRules = (i18n) => [
  (v) => !!v || i18n.t("rules.fieldHasToBeFilled"),
  (v) => (v && v.length <= 40) || i18n.t("rules.max40Chars"),
];

export const telRules = (i18n) => [
  (v) =>
    !v ||
    (v && v.length > 0 && /[0-9 +-]{6,}$/.test(v)) ||
    i18n.t("rules.telValid"),
];
