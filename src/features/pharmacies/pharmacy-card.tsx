import { BusinessCard } from "@/src/features/businesses/components/business-card";
import type { PharmacyResponse } from "./pharmacies-api";

export type PharmacyCardProps = {
  pharmacy: PharmacyResponse;
  onPress?: () => void;
  className?: string;
};

export function PharmacyCard({ pharmacy, onPress, className }: PharmacyCardProps) {
  return (
    <BusinessCard
      item={pharmacy}
      onPress={onPress}
      className={className}
    />
  );
}
