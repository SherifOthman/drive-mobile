import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { LabResponse } from "../api/labs-api";

export type LabCardProps = {
  lab: LabResponse;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
};

export function LabCard({ lab, onPress, onToggleFavorite, className }: LabCardProps) {
  return (
    <BusinessCard
      item={lab}
      onPress={onPress}
      onToggleFavorite={onToggleFavorite}
      className={className}
    />
  );
}
