import { Chip } from "heroui-native";
import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { DoctorResponse } from "../api/doctors-api";

export type DoctorCardProps = {
  doctor: DoctorResponse;
  onPress?: () => void;
  className?: string;
};

export function DoctorCard({ doctor, onPress, className }: DoctorCardProps) {
  return (
    <BusinessCard
      item={doctor}
      onPress={onPress}
      className={className}
      extraChips={
        <Chip size="sm" variant="secondary">
          <Chip.Label className="text-right">{doctor.specialization}</Chip.Label>
        </Chip>
      }
    />
  );
}
