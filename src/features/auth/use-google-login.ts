import { env } from "@/src/config/env";
import { useAuthStore } from "@/src/stores/auth-store";
import { router } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { loginWithGoogle } from "./auth-api";

GoogleSignin.configure({
  webClientId: env.googleWebClientId,
  iosClientId: env.googleIosClientId,
  offlineAccess: true,
});

export function useGoogleLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.signOut();
  }, []);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      if (signInResult.type !== "success" || !signInResult.data.idToken) {
        throw new Error("Sign in failed or no ID token received");
      }

      const res = await loginWithGoogle(signInResult.data.idToken);
      await setSession(res.data.accessToken, res.data.refreshToken);
      router.replace("/(app)/home");
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled sign in");
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in already in progress");
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Google Play Services not available");
      } else {
        console.error("Sign in error:", err);
        setError(err?.response?.data?.message || err?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, [setSession]);

  return { signIn, isLoading, error };
}
