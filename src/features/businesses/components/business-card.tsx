import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Card,
  Chip,
  PressableFeedback,
  Surface,
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
  const [dangerColor, mutedColor, accentColor] = useThemeColor(["danger", "muted", "accent"]);

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
          <Card.Body className="gap-3 p-4">

            {/* Row 1: avatar + name + chips */}
            <View className="flex-row-reverse gap-3 items-start">
              <Avatar size="lg">
                {item.profileImageUrl ? (
                  <Avatar.Image source={{ uri: item.profileImageUrl }} />
                ) : (
                  <Avatar.Fallback>{nameInitial(item.name)}</Avatar.Fallback>
                )}
              </Avatar>

              <View className="flex-1 gap-1.5">
                <Typography.Paragraph weight="bold" className="text-right text-base">
                  {item.name}
                </Typography.Paragraph>
                <View className="flex-row-reverse gap-1.5 flex-wrap items-center">
                  {extraChips}
                  {item.isOpen && (
                    <Chip size="sm" variant="soft" color="success">
                      <View className="w-1.5 h-1.5 rounded-full bg-success mr-0.5" />
                      <Chip.Label>مفتوح</Chip.Label>
                    </Chip>
                  )}
                </View>
              </View>
            </View>

            {extraInfo}

            {/* Row 2: location + rating */}
            <Surface variant="secondary" className="flex-row-reverse items-center justify-between rounded-xl px-3 py-2">
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="location-outline" size={13} color={mutedColor} />
                <Typography.Paragraph type="body-xs" color="muted">
                  {item.governorate}
                </Typography.Paragraph>
              </View>
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="star" size={12} color="#f59e0b" />
                <Typography.Paragraph type="body-xs" weight="bold" className="text-amber-500">
                  {item.averageRating.toFixed(1)}
                </Typography.Paragraph>
                <Typography.Paragraph type="body-xs" color="muted">
                  ({item.totalRatings})
                </Typography.Paragraph>
              </View>
            </Surface>

            {/* Row 3: schedule */}
            <View className="flex-row-reverse items-center gap-1.5">
              <Ionicons name="time-outline" size={13} color={mutedColor} />
              <Typography.Paragraph type="body-xs" color="muted">
                {schedule}
              </Typography.Paragraph>
            </View>

          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />

      {/* Heart — outside Scale so it doesn't trigger card navigation */}
      {onToggleFavorite && (
        <Pressable
          onPress={onToggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ position: "absolute", top: 14, left: 14 }}
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
