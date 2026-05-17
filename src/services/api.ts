import axios from "axios";
import { API_RUL } from "../config/constants";
import { useAuthStore } from "../stores/auth-store";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "android" ? "http://localhost:5170" : API_RUL || "http://localhost:5170";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const store = useAuthStore.getState();

      const res = await axios.post(`${API_URL}/auth/refresh-token`, {
        accessToken: store.accessToken,
        refreshToken: store.refreshToken,
      });

      await store.setSession(res.data.accessToken, res.data.refreshToken);

      err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return api.request(err.config);
    }
    return Promise.reject(err);
  },
);
