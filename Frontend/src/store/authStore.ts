import { create } from "zustand";
import { login, register } from "../api/authApi";
import { LoginForm, RegisterForm, AuthResponse } from "../api/responseType";
import { AuthState } from "./types/storesType";

const TOKEN_KEY = "auth_token";
const EXPIRES_KEY = "auth_expires";
const USER_ID = "user-id"

export const useAuthStore = create<AuthState>((set) => ({
  token: "",
  expiresIn: 0,
  isAuthenticated: false,
  userId: "",

  loading: false,
  error: "",
  success: false,

  login: async (data: LoginForm) => {
    set({ loading: true, error: "", success: false });

    try {
      const res: AuthResponse = await login(data);

      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(EXPIRES_KEY, res.expiresIn.toString());
      localStorage.setItem(USER_ID, res.userId);

      set({
        token: res.token,
        expiresIn: res.expiresIn,
        userId: res.userId,
        isAuthenticated: true,
        loading: false,
        success: true,
      });
    } catch (e: any) {
      set({
        error: e.message || "Login failed",
        loading: false,
      });
    }
  },

  register: async (data: RegisterForm) => {
    set({ loading: true, error: "", success: false });

    try {
      const res: AuthResponse = await register(data);

      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(EXPIRES_KEY, res.expiresIn.toString());
      localStorage.setItem(USER_ID, res.userId);

      set({
        token: res.token,
        expiresIn: res.expiresIn,
        userId: res.userId,
        isAuthenticated: true,
        loading: false,
        success: true,
      });
    } catch (e: any) {
      set({
        error: e.message || "Register failed",
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_ID);

    set({
      token: "",
      expiresIn: 0,
      isAuthenticated: false,
      error: "",
      success: false,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = localStorage.getItem(EXPIRES_KEY);
    const userId = localStorage.getItem(USER_ID);

    if (token && expires) {
      set({
        token,
        expiresIn: Number(expires),
        userId: userId ?? "",
        isAuthenticated: true,
      });
    }
  },
}));
