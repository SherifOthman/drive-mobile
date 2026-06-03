import { Ionicons } from "@expo/vector-icons";
import { Chip, Typography, useThemeColor } from "heroui-native";
import { View } from "react-native";
import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { DoctorResponse } from "../api/doctors-api";

export type DoctorCardProps = {
  doctor: DoctorResponse;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
};

export function DoctorCard({ doctor, onPress, onToggleFavorite, className }: DoctorCardProps) {
  const [mutedColor] = useThemeColor(["muted"]);

  return (
    <BusinessCard
      item={doctor}
      onPress={onPress}
      onToggleFavorite={onToggleFavorite}
      className={className}
      // Specialization chip — doctor-specific
      extraChips={
        <Chip size="sm" variant="secondary">
          <Chip.Label className="text-right">{doctor.specialization}</Chip.Label>
        </Chip>
      }
      // Price row — doctor-specific
      extraInfo={
        doctor.visitPrice != null ? (
          <View className="flex-row-reverse items-center gap-1">
            <Ionicons name="cash-outline" size={14} color={mutedColor} />
            <Typography.Paragraph type="body-xs" color="muted">
              {doctor.visitPrice.toLocaleString("ar-EG")} ج.م
            </Typography.Paragraph>
          </View>
        ) : undefined
      }
    />
  );
}
