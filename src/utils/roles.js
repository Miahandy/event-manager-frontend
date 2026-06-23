export const ROLES = {
  ADMIN:        "admin",
  ORGANISATEUR: "organisateur",
  ETUDIANT:     "etudiant",
};

export const ROLE_LABELS = {
  admin:        "Administrateur",
  organisateur: "Organisateur",
  etudiant:     "Étudiant(e)",
};

/** Retourne le dashboard de destination selon le rôle */
export const getDashboardPath = (role) => {
  switch (role?.toLowerCase()) {
    case ROLES.ADMIN:        return "/dashboard/admin";
    case ROLES.ORGANISATEUR: return "/dashboard/organisateur";
    default:                 return "/dashboard/etudiant";
  }
};
