import { useBusinessDetails } from "@/src/features/businesses/hooks/use-business-details";
import type { PharmacyDetailsResponse } from "../api/pharmacies-api";

export type { PharmacyDetailsResponse };

export function usePharmacyDetails(id: string) {
  return useBusinessDetails<PharmacyDetailsResponse>("/pharmacies", "pharmacy", id);
}
