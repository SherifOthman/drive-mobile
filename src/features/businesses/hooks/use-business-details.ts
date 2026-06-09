import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/api";
import type { BusinessDetails } from "@/src/types";

/**
 * Generic detail hook for any business type.
 * Returns the query result AND the exact queryKey used,
 * so callers can pass it to BusinessDetailScreen for precise invalidation.
 */
export function useBusinessDetails<TDetails extends BusinessDetails>(
  endpoint: string,
  queryKeyPrefix: string,
  id: string,
) {
  const queryKey = [queryKeyPrefix, id] as const;

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await api.get<TDetails>(`${endpoint}/${id}`);
      return res.data;
    },
    staleTime: 60_000,
    enabled: !!id,
  });

  return { ...query, queryKey };
}
