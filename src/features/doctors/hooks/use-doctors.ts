import { useInfiniteQuery } from "@tanstack/react-query";
import { getDoctors, DoctorsQuery } from "../api/doctors-api";

export function useDoctors(query: DoctorsQuery = {}) {
  return useInfiniteQuery({
    queryKey: ["doctors", query],
    queryFn: ({ pageParam = 1 }) =>
      getDoctors({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
}
