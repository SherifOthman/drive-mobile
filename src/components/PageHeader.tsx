import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Surface, Typography, useThemeColor } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  headingType?: "h4" | "h5";
  /** Optional right-side action slot */
  rightAction?: React.ReactNode;
};

export function PageHeader({ title, headingType = "h5", rightAction }: Props) {
  const insets = useSafeAreaInsets();
  const [foreground] = useThemeColor(["foreground"]);

  return (
    <Surface
      variant="default"
      className="flex-row-reverse items-center px-4 pb-3 border-b border-border"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Typography.Heading type={headingType} weight="bold" className="flex-1 text-right px-2">
        {title}
      </Typography.Heading>
      {rightAction ?? null}
      <Button variant="ghost" size="sm" isIconOnly onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color={foreground} />
      </Button>
    </Surface>
  );
}
