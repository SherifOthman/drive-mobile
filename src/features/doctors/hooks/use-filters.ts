import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/services/api";

export type FilterOption = {
  id: string;
  name: string;
};

export type CityOption = FilterOption & {
  governorateId: string;
};

export function useGovernorates() {
  return useQuery({
    queryKey: ["governorates"],
    queryFn: async (): Promise<FilterOption[]> => {
      const res = await api.get<FilterOption[]>("/governorates");
      return res.data;
    },
  });
}

export function useCities(governorateId: string | undefined) {
  return useQuery({
    queryKey: ["cities", governorateId],
    queryFn: async (): Promise<CityOption[]> => {
      const res = await api.get<CityOption[]>("/cities", {
        params: { governorateId },
      });
      return res.data;
    },
    enabled: !!governorateId,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: async (): Promise<FilterOption[]> => {
      const res = await api.get<FilterOption[]>("/specializations");
      return res.data;
    },
  });
}
