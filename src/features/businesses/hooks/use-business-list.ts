import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/src/services/api";
import type { BusinessListItem, BusinessQuery, PaginatedResponse } from "@/src/types";

/**
 * Generic paginated list hook for any business type.
 * Each feature (doctors, pharmacies, labs) passes its own endpoint and query key.
 */
export function useBusinessList<TItem extends BusinessListItem>(
  endpoint: string,
  queryKey: string,
  query: BusinessQuery & Record<string, unknown> = {}
) {
  const { pageSize = 10, ...rest } = query;

  return useInfiniteQuery({
    queryKey: [queryKey, rest],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<PaginatedResponse<TItem>>(endpoint, {
        params: { ...rest, page: pageParam, pageSize },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });
}
