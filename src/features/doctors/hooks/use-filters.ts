import { useQuery } from "@tanstack/react-query";
import { getGovernorates, getCities, getSpecializations } from "../api/filters-api";

export function useGovernorates(businessType?: number) {
  return useQuery({
    queryKey: ["governorates", businessType],
    queryFn: () => getGovernorates(businessType),
  });
}

export function useCities(governorateId: string | undefined, businessType?: number) {
  return useQuery({
    queryKey: ["cities", governorateId, businessType],
    queryFn: () => getCities(governorateId!, businessType),
    enabled: !!governorateId,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });
}
