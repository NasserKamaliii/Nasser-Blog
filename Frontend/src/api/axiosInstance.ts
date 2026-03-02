import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = "https://blog-backend-3qc5.onrender.com";
export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});