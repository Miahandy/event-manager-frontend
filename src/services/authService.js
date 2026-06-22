import api from "./api";

/**
 * Inscription d'un nouvel utilisateur
 * @param {{ nom: string, prenom: string, email: string, mot_de_passe: string, role: string }} data
 */
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

/**
 * Connexion d'un utilisateur existant
 * @param {{ email: string, mot_de_passe: string }} data
 * @returns {{ access_token: string, user: object }}
 */
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

/**
 * Récupère le profil de l'utilisateur connecté
 */
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export default register;