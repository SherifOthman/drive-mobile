import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/services/api";
import type { BusinessDetails } from "@/src/types";

/**
 * Generic detail hook for any business type.
 * Each feature passes its own endpoint and query key prefix.
 */
export function useBusinessDetails<TDetails extends BusinessDetails>(
  endpoint: string,
  queryKey: string,
  id: string
) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await api.get<TDetails>(`${endpoint}/${id}`);
      return res.data;
    },
    staleTime: 60_000,
    enabled: !!id,
  });
}
