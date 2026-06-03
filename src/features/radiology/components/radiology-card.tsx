import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { RadiologyResponse } from "../api/radiology-api";

export type RadiologyCardProps = {
  radiology: RadiologyResponse;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
};

export function RadiologyCard({ radiology, onPress, onToggleFavorite, className }: RadiologyCardProps) {
  return (
    <BusinessCard
      item={radiology}
      onPress={onPress}
      onToggleFavorite={onToggleFavorite}
      className={className}
    />
  );
}
