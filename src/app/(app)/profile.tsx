import { ThemeToggle } from "@/src/components/ThemeToggle";
import { useMe } from "@/src/features/profile/profile-queries";
import { useAuthStore } from "@/src/stores/auth-store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Button, Spinner, Text } from "heroui-native";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const logout = useAuthStore((state) => state.logout);
  const { data, isLoading } = useMe();

  const handleLogout = async () => {
    await GoogleSignin.signOut();
    await logout();
    router.replace("/(auth)/login");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  console.log(data);

  return (
    <View
      className="flex-1 items-center justify-center px-6 gap-4 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {data?.imageUrl && (
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: 96, height: 96, borderRadius: 48 }}
        />
      )}

      <View className="items-center gap-1">
        <Text.Heading type="h4" weight="bold">
          {data?.fullName}
        </Text.Heading>
        <Text.Paragraph type="body-sm" color="muted">
          {data?.email}
        </Text.Paragraph>
      </View>

      <Button
        variant="danger-soft"
        size="md"
        onPress={handleLogout}
        className="w-full mt-4"
      >
        <Button.Label>تسجيل الخروج</Button.Label>
      </Button>

      <ThemeToggle />
    </View>
  );
}
