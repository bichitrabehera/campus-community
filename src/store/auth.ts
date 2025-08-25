import { create } from "zustand";
import { api } from "@/services/api";

type User = { id: number; name: string; email: string; role: string };
type State = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, any>) => Promise<void>;
  verify: (email: string, code: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.access_token);
    set({ token: data.access_token });
    const me = await api.get("/auth/me");
    localStorage.setItem("user", JSON.stringify(me.data));
    set({ user: me.data });
    window.location.href = "/dashboard";
  },
  async register(payload) {
    await api.post("/auth/register", payload);
  },
  async verify(email, code) {
    await api.post("/auth/verify", { email, code });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
    window.location.href = "/login";
  },
}));
