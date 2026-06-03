import { useQuery } from "@tanstack/react-query";
import { getDoctorDetails } from "../api/doctor-details-api";

export function useDoctorDetails(id: string) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorDetails(id),
    staleTime: 60_000,
    enabled: !!id,
  });
}
