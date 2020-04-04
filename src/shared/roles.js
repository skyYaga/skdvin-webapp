const ROLE_ADMIN = "ROLE_ADMIN";

const hasRole = function(auth, role) {
  if (auth?.user != null && auth.user["https://skdv.in/roles"] !== null) {
    return auth.user["https://skdv.in/roles"].includes(role);
  }
  return false;
};

const isAdmin = function(auth) {
  return this.hasRole(auth, this.ROLE_ADMIN);
};

export const roleUtil = {
  hasRole,
  isAdmin,
  ROLE_ADMIN
};
