import { useAuthStore } from "@/src/stores/auth-store";
import * as WebBrowser from "expo-web-browser";
import { Button, Text } from "heroui-native";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const insets = useSafeAreaInsets();
  const setSession = useAuthStore((s) => s.setSession);

  function handleLogin() {}

  return (
    <View
      className="bg-background flex-1 px-6  items-center"
      style={{ paddingTop: insets.top }}
    >
      <Text.Heading className="font-bold mt-4 "> احجزلى</Text.Heading>

      <Image
        className=""
        source={require("@/assets/images/city-driver.png")}
        style={{ width: 300, height: 300 }}
        resizeMode="cover"
      />
      <Button
        onPress={handleLogin}
        className="w-full mt-24"
        size="md"
        variant="tertiary"
      >
        <Image
          source={require("@/assets/icons/google-icon.png")}
          style={{ width: 25, height: 25, marginLeft: 8 }}
        />
        <Button.Label className="font-bold">تسجيل الدخول بجوجل </Button.Label>
      </Button>
      {/* <ThemeToggle /> */}
    </View>
  );
}
