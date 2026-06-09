import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Avatar, Button, Skeleton, Typography, useThemeColor } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { User } from "@/src/features/profile/profile-api";

type Props = {
  user: User | undefined;
  isLoading: boolean;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء النور";
}

export function GreetingHeader({ user, isLoading }: Props) {
  const insets = useSafeAreaInsets();
  const [foreground] = useThemeColor(["foreground"]);
  const fallback = user?.fullName?.charAt(0) ?? "م";

  return (
    <View
      className="flex-row-reverse items-center justify-between px-5 pb-4"
      style={{ paddingTop: insets.top + 16 }}
    >
      {/* Right: greeting + name */}
      <View className="flex-row-reverse items-center gap-3 flex-1">
        <Avatar size="md">
          {user?.imageUrl ? (
            <Avatar.Image source={{ uri: user.imageUrl }} />
          ) : (
            <Avatar.Fallback>{fallback}</Avatar.Fallback>
          )}
        </Avatar>

        <View className="gap-0.5">
          {isLoading ? (
            <>
              <Skeleton className="w-28 h-4 rounded-md" />
              <Skeleton className="w-20 h-3 rounded-md mt-1" />
            </>
          ) : (
            <>
              <Typography.Paragraph type="body-sm" color="muted" className="text-right">
                {getGreeting()}
              </Typography.Paragraph>
              <Typography.Paragraph weight="bold" className="text-right">
                {user?.fullName ?? ""}
              </Typography.Paragraph>
            </>
          )}
        </View>
      </View>

      {/* Left: notification bell */}
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={() => router.push("/(app)/settings" as any)}
      >
        <Ionicons name="settings-outline" size={22} color={foreground} />
      </Button>
    </View>
  );
}
