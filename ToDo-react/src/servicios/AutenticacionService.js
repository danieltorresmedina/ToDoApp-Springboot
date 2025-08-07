import axios from "axios";

const URL_BASE = "http://localhost:8080/api/auth";

export const login = async (credenciales) => {
  const response = await axios.post(`${URL_BASE}/login`, credenciales);
  const token = response.data;
  localStorage.setItem("token",token);
  return token;
};

export const register = async (datosUsuario) => {
  const response = await axios.post(`${URL_BASE}/register`, datosUsuario);
  return response.data;
};