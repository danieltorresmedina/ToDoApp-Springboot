// src/servicios/api.js
import axios from "axios";

const ConsultaToken = axios.create({
  baseURL: "http://localhost:8080/api", // ajusta si es necesario
});

ConsultaToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ConsultaToken;
