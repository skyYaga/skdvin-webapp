export const emailRules = (i18n) => [
  (v) => !!v || /.+@.+\..+/.test(v) || i18n.t("rules.emailValid"),
];

export const nameRules = (i18n) => [
  (v) => !!v || i18n.t("rules.fieldHasToBeFilled"),
  (v) => (v && v.length <= 40) || i18n.t("rules.max40Chars"),
];

export const telRules = (i18n) => [
  (v) =>
    !!v ||
    (v && v.length > 0 && /[0-9 +-]{6,}$/.test(v)) ||
    i18n.t("rules.telValid"),
];

export const dateOfBirthRules = (i18n) => [
  (v) => !!v || i18n.t("rules.dateOfBirthNeeded"),
];

export const zipRules = (i18n) => [
  (v) => !!v || i18n.t("rules.zipNeeded"),
  (v) => v.length === 5 || i18n.t("rules.zip5digit"),
  (v) => !isNaN(v) || i18n.t("rules.zipNumbers"),
];

export const gdprRules = (i18n) => [(v) => !!v || i18n.t("rules.gdpr")];
