import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNews, getNewsCategories, type NewsQuery } from "./news-api";

export function useNews(query: NewsQuery = {}) {
  const { pageSize = 10, ...rest } = query;

  return useInfiniteQuery({
    queryKey: ["news", rest],
    queryFn: async ({ pageParam = 1 }) => {
      return getNews({ ...rest, page: pageParam as number, pageSize });
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    placeholderData: (prev) => prev,
  });
}

export function useNewsCategories() {
  return useQuery({
    queryKey: ["news-categories"],
    queryFn: getNewsCategories,
    staleTime: 10 * 60 * 1000, // 10 min
  });
}
