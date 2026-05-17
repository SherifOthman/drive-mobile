import { env } from "@/src/config/env";
import { api } from "@/src/services/api";
import { useAuthStore } from "@/src/stores/auth-store";
import { router } from "expo-router";
import { Button, Text } from "heroui-native";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: env.googleWebClientId,
  iosClientId: env.googleIosClientId,
  offlineAccess: true,
});

export default function Login() {
  const insets = useSafeAreaInsets();
  const setSession = useAuthStore((s) => s.setSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      if (signInResult.type !== "success" || !signInResult.data.idToken) {
        throw new Error("Sign in failed or no ID token received");
      }

      const res = await api.post("/auth/google", {
        idToken: signInResult.data.idToken,
      });
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
  };

  useEffect(() => {
    GoogleSignin.signOut();
  }, []);

  return (
    <View
      className="bg-background flex-1 px-6 items-center"
      style={{ paddingTop: insets.top }}
    >
      <Text.Heading className="font-bold mt-4 ">احجزلى</Text.Heading>

      <Image
        source={require("@/assets/images/city-driver.png")}
        style={{ width: 300, height: 300 }}
        resizeMode="cover"
      />

      <Button
        isDisabled={isLoading}
        onPress={handleGoogleSignIn}
        className="w-full mt-24"
        size="md"
        variant="tertiary"
      >
        <Image
          source={require("@/assets/icons/google-icon.png")}
          style={{ width: 25, height: 25, marginRight: 8 }}
        />
        <Button.Label className="font-bold">تسجيل الدخول بجوجل</Button.Label>
      </Button>

      {error && (
        <Text className="text-danger mt-4 text-center">{error}</Text>
      )}
    </View>
  );
}
