import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { RadiologyResponse } from "./radiology-api";

export type RadiologyCardProps = {
  radiology: RadiologyResponse;
  onPress?: () => void;
  className?: string;
};

export function RadiologyCard({ radiology, onPress, className }: RadiologyCardProps) {
  return (
    <BusinessCard
      item={radiology}
      onPress={onPress}
      className={className}
    />
  );
}
