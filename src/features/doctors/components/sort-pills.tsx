import { Button } from "heroui-native";
import { View } from "react-native";

const SORT_OPTIONS = [
  { value: "name", label: "الاسم" },
  { value: "rating", label: "التقييم" },
  { value: "price", label: "السعر" },
];

type Props = {
  sortBy: string | undefined;
  sortDirection: string | undefined;
  onChange: (sortBy: string, sortDirection: string) => void;
};

export function SortPills({ sortBy, sortDirection, onChange }: Props) {
  return (
    <View className="flex-row-reverse gap-2 mb-3">
      {SORT_OPTIONS.map((opt) => {
        const active = sortBy === opt.value;
        return (
          <Button
            key={opt.value}
            size="sm"
            variant={active ? "secondary" : "outline"}
            onPress={() => {
              if (active) {
                onChange(opt.value, sortDirection === "asc" ? "desc" : "asc");
              } else {
                onChange(opt.value, "asc");
              }
            }}
          >
            {opt.label}
            {active && sortDirection && (sortDirection === "asc" ? " ↑" : " ↓")}
          </Button>
        );
      })}
    </View>
  );
}
