import { useBusinessList } from "@/src/features/businesses/hooks/use-business-list";
import type { DoctorResponse, DoctorsQuery } from "../api/doctors-api";

export type { DoctorResponse, DoctorsQuery };

export function useDoctors(query: DoctorsQuery = {}) {
  return useBusinessList<DoctorResponse>("/doctors", "doctors", query);
}
