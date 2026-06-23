import { defineStore } from "pinia";
import { api } from "@/services/api";
import type { User } from "@/types/auth";

interface LoginResponse {
  token: string;
  user: User;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(data: {
      full_name: string;
      email: string;
      password: string;
    }) {
      return api.post("/auth/register", data);
    },

    async login(data: {
      email: string;
      password: string;
    }) {
      const res = await api.post<LoginResponse>(
        "/auth/login",
        data
      );

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
    },

    logout() {
      this.token = "";
      this.user = null;

      localStorage.removeItem("token");
    },
  },
});