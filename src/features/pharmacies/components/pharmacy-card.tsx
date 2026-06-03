import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { PharmacyResponse } from "../api/pharmacies-api";

export type PharmacyCardProps = {
  pharmacy: PharmacyResponse;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
};

export function PharmacyCard({ pharmacy, onPress, onToggleFavorite, className }: PharmacyCardProps) {
  return (
    <BusinessCard
      item={pharmacy}
      onPress={onPress}
      onToggleFavorite={onToggleFavorite}
      className={className}
    />
  );
}
