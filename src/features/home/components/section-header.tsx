import { Button, Typography } from "heroui-native";
import { View } from "react-native";

type Props = {
  title: string;
  onSeeAll?: () => void;
};

export function SectionHeader({ title, onSeeAll }: Props) {
  return (
    <View className="flex-row-reverse items-center justify-between mb-3">
      <Typography.Heading type="h5" weight="bold">
        {title}
      </Typography.Heading>
      {onSeeAll && (
        <Button variant="ghost" size="sm" onPress={onSeeAll}>
          <Button.Label>عرض الكل</Button.Label>
        </Button>
      )}
    </View>
  );
}
