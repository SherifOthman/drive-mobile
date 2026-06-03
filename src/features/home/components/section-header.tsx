import { Ionicons } from "@expo/vector-icons";
import { Typography, useThemeColor } from "heroui-native";
import { Pressable, View } from "react-native";

type Props = {
  title: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, onSeeAll }: Props) {
  const [accent] = useThemeColor(["accent"]);

  return (
    <View className="flex-row-reverse items-center justify-between mb-3">
      <Typography.Heading type="h5" weight="bold">
        {title}
      </Typography.Heading>
      {onSeeAll && (
        <Pressable
          onPress={onSeeAll}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          className="flex-row-reverse items-center gap-0.5"
        >
          <Ionicons name="chevron-back" size={14} color={accent} />
          <Typography.Paragraph type="body-sm" color="accent">
            عرض الكل
          </Typography.Paragraph>
        </Pressable>
      )}
    </View>
  );
}
