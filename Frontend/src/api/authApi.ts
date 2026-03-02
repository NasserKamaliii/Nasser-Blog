import { api } from "./axiosInstance";
import { AuthResponse, LoginForm, RegisterForm } from "./responseType";

export const register = async (data:RegisterForm): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/v1/auth/register",data);
  return res.data;
};

export const login = async (data:LoginForm): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/v1/auth/login",data);
  return res.data;
};