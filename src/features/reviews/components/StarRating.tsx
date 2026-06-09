import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

type Props = {
  rating: number;
  size?: number;
  color?: string;
  onChange?: (rating: number) => void;
};

const ACTIVE_COLOR = "#facc15";

export function StarRating({ rating, size = 16, color = ACTIVE_COLOR, onChange }: Props) {
  return (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={onChange ? () => onChange(star) : undefined} hitSlop={4}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color={star <= rating ? color : "#9ca3af"}
          />
        </Pressable>
      ))}
    </View>
  );
}
