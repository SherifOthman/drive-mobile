import { useQuery } from "@tanstack/react-query";
import { getGovernorates, getCities, getSpecializations } from "../api/filters-api";

export function useGovernorates() {
  return useQuery({
    queryKey: ["governorates"],
    queryFn: getGovernorates,
  });
}

export function useCities(governorateId: string | undefined) {
  return useQuery({
    queryKey: ["cities", governorateId],
    queryFn: () => getCities(governorateId!),
    enabled: !!governorateId,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });
}
