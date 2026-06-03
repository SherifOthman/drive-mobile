import { Ionicons } from "@expo/vector-icons";
import { Avatar, Card, Chip, PressableFeedback, Typography, useThemeColor } from "heroui-native";
import { TouchableOpacity, View } from "react-native";
import type { FavoriteListItem } from "../hooks/use-favorites";

export type FavoriteCardProps = FavoriteListItem & {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress?: () => void;
  className?: string;
};

export function FavoriteCard({
  id,
  name,
  profileImageUrl,
  averageRating,
  totalRatings,
  availabilityStatus,
  isFavorite,
  onToggleFavorite,
  onPress,
  className,
}: FavoriteCardProps) {
  const fallbackChar = name.replace(/^د\.?\s*/i, "").charAt(0);
  const [dangerColor, mutedColor] = useThemeColor(["danger", "muted"]);

  const getStatusChipColor = (): "success" | "warning" | "danger" | "default" => {
    switch (availabilityStatus) {
      case "open_now":               return "success";
      case "open_later_today":       return "warning";
      case "closed_today_open_later": return "default";
      case "closed":                 return "danger";
    }
  };

  const getStatusLabel = () => {
    switch (availabilityStatus) {
      case "open_now":               return "مفتوح الآن";
      case "open_later_today":       return "يفتح اليوم";
      case "closed_today_open_later": return "مغلق اليوم";
      case "closed":                 return "مغلق";
    }
  };

  return (
    <PressableFeedback onPress={onPress} animation={false}>
      <PressableFeedback.Scale>
        <Card className={className}>
          <Card.Body className="flex-row-reverse gap-3 p-3">
            <Avatar size="lg">
              {profileImageUrl ? (
                <Avatar.Image source={{ uri: profileImageUrl }} />
              ) : (
                <Avatar.Fallback>{fallbackChar}</Avatar.Fallback>
              )}
            </Avatar>

            <View className="flex-1 gap-1">
              <View className="flex-row-reverse items-center justify-between">
                <Typography.Paragraph weight="bold">{name}</Typography.Paragraph>
                <TouchableOpacity
                  onPress={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={22}
                    color={isFavorite ? dangerColor : mutedColor}
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row-reverse items-center gap-2">
                <Chip size="sm" variant="soft" color={getStatusChipColor()}>
                  <Chip.Label>{getStatusLabel()}</Chip.Label>
                </Chip>
                <View className="flex-row-reverse items-center gap-1">
                  <Ionicons name="star" size={12} color="#facc15" />
                  <Typography.Paragraph type="body-xs" weight="semibold" className="text-yellow-500">
                    {averageRating != null ? averageRating.toFixed(1) : "0"}
                  </Typography.Paragraph>
                  <Typography.Paragraph type="body-xs" color="muted">
                    ({totalRatings ?? 0})
                  </Typography.Paragraph>
                </View>
              </View>
            </View>
          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
}
