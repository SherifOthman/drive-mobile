import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { useAuthStore } from "@/src/features/auth/auth-store";
import { ProfileHeader } from "@/src/features/profile/components/profile-header";
import { ProfileMenu } from "@/src/features/profile/components/profile-menu";
import { useMe } from "@/src/features/profile/use-profile";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Skeleton } from "heroui-native";
import { View } from "react-native";

export default function Profile() {
  const logout = useAuthStore((state) => state.logout);
  const { data, isLoading } = useMe();

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch {}
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <ScreenWrapper
      isTabPage
      isLoading={isLoading}
      loadingView={
        <View className="items-center">
          <Skeleton className="w-28 h-28 rounded-full" />
          <Skeleton className="w-40 h-6 rounded-lg mt-6" />
          <Skeleton className="w-48 h-8 rounded-full mt-4" />
        </View>
      }
      className="px-5"
    >
      <View className="items-center gap-4">
        <ProfileHeader
          imageUrl={data?.imageUrl ?? null}
          fullName={data?.fullName}
          email={data?.email}
        />

        <ProfileMenu
          menuItems={[
            {
              icon: "heart-outline",
              label: "المفضلة",
              onPress: () => router.push("/(app)/favorites"),
            },
            {
              icon: "pencil-outline",
              label: "تعديل الملف الشخصي",
              onPress: () => router.push("/(app)/edit-profile"),
            },
            {
              icon: "settings-outline",
              label: "الإعدادات",
              onPress: () => router.push("/(app)/settings"),
            },
            { icon: "people-outline", label: "دعوة صديق" },
          ]}
          logoutItem={{ onPress: handleLogout }}
        />
      </View>
    </ScreenWrapper>
  );
}
