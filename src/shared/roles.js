const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_MODERATOR = "ROLE_MODERATOR";
const ROLE_TANDEMMASTER = "ROLE_TANDEMMASTER";
const ROLE_VIDEOFLYER = "ROLE_VIDEOFLYER";

const hasRole = function (auth, role) {
  if (auth?.user != null && auth.user["https://skdv.in/roles"] !== null) {
    return auth.user["https://skdv.in/roles"].includes(role);
  }
  return false;
};

const isAdmin = function (auth) {
  return this.hasRole(auth, ROLE_ADMIN);
};
const isVideoflyer = function (auth) {
  return this.hasRole(auth, ROLE_VIDEOFLYER);
};
const isTandemmaster = function (auth) {
  return this.hasRole(auth, ROLE_TANDEMMASTER);
};
const isModerator = function (auth) {
  return this.hasRole(auth, ROLE_MODERATOR);
};

export const roleUtil = {
  hasRole,
  isAdmin,
  isModerator,
  isVideoflyer,
  isTandemmaster,
};
