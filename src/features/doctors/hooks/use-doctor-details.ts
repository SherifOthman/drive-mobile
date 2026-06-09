import { useBusinessDetails } from "@/src/features/businesses/hooks/use-business-details";
import type { DoctorDetailsResponse } from "../api/doctor-details-api";

export type { DoctorDetailsResponse };

export function useDoctorDetails(id: string) {
  return useBusinessDetails<DoctorDetailsResponse>("/doctors", "doctor", id);
}
