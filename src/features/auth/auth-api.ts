import { api } from "@/src/api";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export const loginWithGoogle = (idToken: string) =>
  api.post<AuthResponse>("/auth/google", { idToken });
