import { Ionicons } from "@expo/vector-icons";
import { Avatar, Card, Chip, PressableFeedback, Typography, useThemeColor } from "heroui-native";
import { Pressable, View } from "react-native";
import { formatSchedule, nameInitial } from "@/src/utils/arabic";
import type { DoctorResponse } from "../api/doctors-api";

export interface DoctorCardProps {
  doctor: DoctorResponse;
  onToggleFavorite: () => void;
  onPress?: () => void;
  className?: string;
}

export function DoctorCard({ doctor, onToggleFavorite, onPress, className }: DoctorCardProps) {
  const [dangerColor, mutedColor] = useThemeColor(["danger", "muted"]);

  const schedule = formatSchedule(
    doctor.nextWorkingDay,
    doctor.startTime,
    doctor.endTime,
    doctor.isOpen,
  );

  return (
    <PressableFeedback onPress={onPress} animation={false}>
      <PressableFeedback.Scale>
        <Card className={className}>
          <Card.Body className="gap-2 p-3">

            {/* Row 1: avatar + name + specialization + open badge */}
            <View className="flex-row-reverse gap-3">
              <Avatar size="lg">
                {doctor.profileImageUrl ? (
                  <Avatar.Image source={{ uri: doctor.profileImageUrl }} />
                ) : (
                  <Avatar.Fallback>{nameInitial(doctor.name)}</Avatar.Fallback>
                )}
              </Avatar>

              <View className="flex-1 gap-1">
                <Typography.Paragraph weight="bold" className="text-right">
                  {doctor.name}
                </Typography.Paragraph>
                <View className="flex-row-reverse gap-2">
                  <Chip size="sm" variant="secondary">
                    <Chip.Label className="text-right">{doctor.specialization}</Chip.Label>
                  </Chip>
                  {doctor.isOpen && (
                    <Chip size="sm" variant="soft" color="success">
                      <Chip.Label>مفتوح</Chip.Label>
                    </Chip>
                  )}
                </View>
              </View>
            </View>

            {/* Row 2: location + price (right) | rating (left) */}
            <View className="flex-row-reverse items-center justify-between">
              <View className="flex-row-reverse items-center gap-2">
                <View className="flex-row-reverse items-center gap-1">
                  <Ionicons name="location-outline" size={14} color={mutedColor} />
                  <Typography.Paragraph type="body-xs" color="muted">{doctor.governorate}</Typography.Paragraph>
                </View>
                {doctor.visitPrice != null && (
                  <View className="flex-row-reverse items-center gap-1">
                    <Ionicons name="cash-outline" size={14} color={mutedColor} />
                    <Typography.Paragraph type="body-xs" color="muted">
                      {doctor.visitPrice.toLocaleString("ar-EG")} ج.م
                    </Typography.Paragraph>
                  </View>
                )}
              </View>
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="star" size={12} color="#facc15" />
                <Typography.Paragraph type="body-xs" weight="semibold" className="text-yellow-500">
                  {doctor.averageRating.toFixed(1)}
                </Typography.Paragraph>
                <Typography.Paragraph type="body-xs" color="muted">
                  ({doctor.totalRatings ?? 0})
                </Typography.Paragraph>
              </View>
            </View>

            {/* Row 3: schedule (right) | heart button (left) — border top */}
            <View className="flex-row-reverse items-center justify-between border-t border-border pt-2">
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="time-outline" size={14} color={mutedColor} />
                <Typography.Paragraph type="body-xs">{schedule}</Typography.Paragraph>
              </View>
              {/* stopPropagation prevents this press from triggering PressableFeedback.onPress */}
              <Pressable
                onPress={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={doctor.isFavorite ? "heart" : "heart-outline"}
                  size={22}
                  color={doctor.isFavorite ? dangerColor : mutedColor}
                />
              </Pressable>
            </View>

          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      <PressableFeedback.Ripple />
    </PressableFeedback>
  );
}
