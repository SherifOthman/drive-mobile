import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Typography, useThemeColor } from "heroui-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  headingType?: "h4" | "h5";
};

export function PageHeader({ title, headingType = "h5" }: Props) {
  const insets = useSafeAreaInsets();
  const [foreground] = useThemeColor(["foreground"]);

  return (
    <View
      className="flex-row-reverse items-center px-5 pb-4 border-b border-border"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Typography.Heading type={headingType} weight="bold">
        {title}
      </Typography.Heading>
      <View className="flex-1" />
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={20} color={foreground} />
      </Button>
    </View>
  );
}
