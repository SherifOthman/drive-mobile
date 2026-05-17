import { useGoogleLogin } from "@/src/features/auth/use-google-login";
import { Button, Text } from "heroui-native";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading, error } = useGoogleLogin();

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
        onPress={signIn}
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
