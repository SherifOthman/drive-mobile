import { useMe } from "@/src/features/profile/profile-queries";
import { Spinner, Text } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useMe();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  return (
    <View
      className="flex-1 items-center justify-center gap-3"
      style={{ paddingTop: insets.top }}
    >
      <Text.Heading type="h3" weight="bold">
        مرحباً
      </Text.Heading>

      <Text.Paragraph weight="semibold">{data?.fullName}</Text.Paragraph>
      <Text.Paragraph type="body-sm" color="muted">
        {data?.email}
      </Text.Paragraph>
    </View>
  );
}
