import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { LabResponse } from "./labs-api";

export type LabCardProps = {
  lab: LabResponse;
  onPress?: () => void;
  className?: string;
};

export function LabCard({ lab, onPress, className }: LabCardProps) {
  return (
    <BusinessCard
      item={lab}
      onPress={onPress}
      className={className}
    />
  );
}
