import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Card,
  Chip,
  PressableFeedback,
  Typography,
  useThemeColor,
} from "heroui-native";
import { Pressable, View } from "react-native";
import { formatSchedule, nameInitial } from "@/src/utils/arabic";
import type { BusinessListItem } from "@/src/types";

export type BusinessCardProps = {
  item: BusinessListItem;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  /** Rendered between name row and location/rating row — use for type-specific chips */
  extraChips?: React.ReactNode;
  /** Rendered between location row and schedule row — use for type-specific info */
  extraInfo?: React.ReactNode;
  className?: string;
};

export function BusinessCard({
  item,
  onPress,
  onToggleFavorite,
  extraChips,
  extraInfo,
  className,
}: BusinessCardProps) {
  const [dangerColor, mutedColor] = useThemeColor(["danger", "muted"]);

  const schedule = formatSchedule(
    item.nextWorkingDay,
    item.startTime,
    item.endTime,
    item.isOpen,
  );

  return (
    <PressableFeedback onPress={onPress} animation={false}>
      <PressableFeedback.Scale>
        <Card className={className}>
          <Card.Body className="gap-2 p-3">

            {/* Row 1: avatar + name + open badge */}
            <View className="flex-row-reverse gap-3">
              <Avatar size="lg">
                {item.profileImageUrl ? (
                  <Avatar.Image source={{ uri: item.profileImageUrl }} />
                ) : (
                  <Avatar.Fallback>{nameInitial(item.name)}</Avatar.Fallback>
                )}
              </Avatar>

              <View className="flex-1 gap-1">
                <Typography.Paragraph weight="bold" className="text-right">
                  {item.name}
                </Typography.Paragraph>
                <View className="flex-row-reverse gap-2 flex-wrap">
                  {extraChips}
                  {item.isOpen && (
                    <Chip size="sm" variant="soft" color="success">
                      <Chip.Label>مفتوح</Chip.Label>
                    </Chip>
                  )}
                </View>
              </View>
            </View>

            {extraInfo}

            {/* Row 2: location (right) | rating (left) */}
            <View className="flex-row-reverse items-center justify-between">
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="location-outline" size={14} color={mutedColor} />
                <Typography.Paragraph type="body-xs" color="muted">
                  {item.governorate}
                </Typography.Paragraph>
              </View>
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="star" size={12} color="#facc15" />
                <Typography.Paragraph type="body-xs" weight="semibold" className="text-yellow-500">
                  {item.averageRating.toFixed(1)}
                </Typography.Paragraph>
                <Typography.Paragraph type="body-xs" color="muted">
                  ({item.totalRatings})
                </Typography.Paragraph>
              </View>
            </View>

            {/* Row 3: schedule | heart */}
            <View className="flex-row-reverse items-center justify-between border-t border-border pt-2">
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="time-outline" size={14} color={mutedColor} />
                <Typography.Paragraph type="body-xs">{schedule}</Typography.Paragraph>
              </View>
              <View style={{ width: 22, height: 22 }} />
            </View>

          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />

      {/* Heart outside Scale so it doesn't trigger card navigation */}
      {onToggleFavorite && (
        <Pressable
          onPress={onToggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ position: "absolute", bottom: 14, left: 12 }}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={item.isFavorite ? dangerColor : mutedColor}
          />
        </Pressable>
      )}
    </PressableFeedback>
  );
}
