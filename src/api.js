import axios from "axios";

const API = axios.create({
  baseURL: "https://projet-01-backend-1.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

