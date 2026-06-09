import { Ionicons } from "@expo/vector-icons";
import { Button, Typography, useThemeColor } from "heroui-native";
import { View } from "react-native";

type Props = {
  isFiltered: boolean;
  onClearFilter: () => void;
};

export function DoctorsEmptyState({ isFiltered, onClearFilter }: Props) {
  const [mutedColor] = useThemeColor(["muted"]);

  return (
    <View className="items-center justify-center pt-20 gap-3">
      <Ionicons name="search-outline" size={52} color={mutedColor} />
      <Typography.Paragraph weight="semibold">
        لا توجد نتائج
      </Typography.Paragraph>
      <Typography.Paragraph
        type="body-sm"
        color="muted"
        className="text-center px-8"
      >
        {isFiltered
          ? "لم يتم العثور على أطباء بهذه المعايير. جرب تغيير الفلتر."
          : "لا يوجد أطباء متاحون حالياً."}
      </Typography.Paragraph>
      {isFiltered && (
        <Button variant="outline" size="sm" onPress={onClearFilter}>
          <Button.Label>إلغاء الفلتر </Button.Label>
        </Button>
      )}
    </View>
  );
}
