import { formatSchedule, nameInitial } from "@/src/utils/arabic";
import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Card,
  Chip,
  PressableFeedback,
  Typography,
  useThemeColor,
} from "heroui-native";
import { View } from "react-native";
import type { DoctorResponse } from "../api/doctors-api";

export interface DoctorCardProps {
  doctor: DoctorResponse;
  onPress?: () => void;
  className?: string;
}

export function DoctorCard({ doctor, onPress, className }: DoctorCardProps) {
  const [mutedColor] = useThemeColor(["muted"]);

  const schedule = formatSchedule(
    doctor.nextWorkingDay,
    doctor.startTime,
    doctor.endTime,
    doctor.isOpen,
  );

  return (
    // PressableFeedback handles the card tap (navigate to details)
    <PressableFeedback onPress={onPress} animation={false}>
      <PressableFeedback.Scale>
        <Card className={className}>
          <Card.Body className="gap-2 ">
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
                    <Chip.Label className="text-right">
                      {doctor.specialization}
                    </Chip.Label>
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
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={mutedColor}
                  />
                  <Typography.Paragraph type="body-xs" color="muted">
                    {doctor.governorate}
                  </Typography.Paragraph>
                </View>
                {doctor.visitPrice != null && (
                  <View className="flex-row-reverse items-center gap-1">
                    <Ionicons
                      name="cash-outline"
                      size={14}
                      color={mutedColor}
                    />
                    <Typography.Paragraph type="body-xs" color="muted">
                      {doctor.visitPrice.toLocaleString("ar-EG")} ج.م
                    </Typography.Paragraph>
                  </View>
                )}
              </View>
              <View className="flex-row-reverse items-center gap-1">
                <Ionicons name="star" size={12} color="#facc15" />
                <Typography.Paragraph
                  type="body-xs"
                  weight="semibold"
                  className="text-yellow-500"
                >
                  {doctor.averageRating.toFixed(1)}
                </Typography.Paragraph>
                <Typography.Paragraph type="body-xs" color="muted">
                  ({doctor.totalRatings ?? 0})
                </Typography.Paragraph>
              </View>
            </View>

            {/* Row 3: schedule */}
            <View className="flex-row-reverse items-center border-t border-border pt-2">
              <View className="flex-row-reverse items-center gap-1">
                <Typography.Paragraph type="body-xs">
                  {schedule}
                </Typography.Paragraph>
              </View>
            </View>
          </Card.Body>
        </Card>
      </PressableFeedback.Scale>
      {/* <PressableFeedback.Ripple /> */}
    </PressableFeedback>
  );
}
