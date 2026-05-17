import { useMe } from "@/src/features/profile/profile-queries";
import { useAuthStore } from "@/src/stores/auth-store";
import { Button, Spinner, Text } from "heroui-native";
import { router } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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

  return (
    <View
      className="flex-1 items-center justify-center px-6 gap-4"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {data?.ImageUrl && (
        <Image
          source={{ uri: data.ImageUrl }}
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
    </View>
  );
}
