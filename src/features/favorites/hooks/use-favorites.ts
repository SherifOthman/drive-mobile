import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "../api/favorites-api";
import type { BusinessListItem, BusinessDetails, PaginatedResponse } from "@/src/types";

type BusinessInfinite = InfiniteData<PaginatedResponse<BusinessListItem>>;

/** All list query keys that track isFavorite */
const LIST_QUERY_KEYS = ["doctors", "pharmacies", "labs", "radiology"] as const;

/** Maps a list query key to its corresponding detail query key prefix */
const DETAIL_KEY_MAP: Record<string, string> = {
  doctors: "doctor",
  pharmacies: "pharmacy",
  labs: "lab",
  radiology: "radiology-detail",
};

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (businessId: string) => {
      // Determine current favorite state by checking all list and detail caches
      let isFav = false;

      for (const key of LIST_QUERY_KEYS) {
        const listData = qc.getQueriesData<BusinessInfinite>({ queryKey: [key] });
        const foundInList = listData.some(([, data]) =>
          data?.pages.some((p) => p.items.some((i) => i.id === businessId && i.isFavorite))
        );
        if (foundInList) {
          isFav = true;
          break;
        }
      }

      if (!isFav) {
        for (const detailKey of Object.values(DETAIL_KEY_MAP)) {
          const detailData = qc.getQueryData<BusinessDetails>([detailKey, businessId]);
          if (detailData?.isFavorite === true) {
            isFav = true;
            break;
          }
        }
      }

      if (isFav) {
        await removeFavorite(businessId);
      } else {
        await addFavorite(businessId);
      }
      return { businessId, wasFavorite: isFav };
    },

    onMutate: async (businessId) => {
      // Cancel all relevant queries
      await Promise.all([
        ...LIST_QUERY_KEYS.map((key) => qc.cancelQueries({ queryKey: [key] })),
        ...Object.values(DETAIL_KEY_MAP).map((key) =>
          qc.cancelQueries({ queryKey: [key, businessId] })
        ),
      ]);

      // Snapshot previous state for rollback
      const prevLists = LIST_QUERY_KEYS.map((key) => ({
        key,
        data: qc.getQueriesData<BusinessInfinite>({ queryKey: [key] }),
      }));
      const prevDetails = Object.entries(DETAIL_KEY_MAP).map(([, detailKey]) => ({
        detailKey,
        data: qc.getQueryData<BusinessDetails>([detailKey, businessId]),
      }));

      // Optimistically flip isFavorite in all list caches
      for (const key of LIST_QUERY_KEYS) {
        qc.setQueriesData<BusinessInfinite>({ queryKey: [key] }, (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === businessId ? { ...item, isFavorite: !item.isFavorite } : item
              ),
            })),
          };
        });
      }

      // Optimistically flip in all detail caches
      for (const [, detailKey] of Object.entries(DETAIL_KEY_MAP)) {
        const prev = qc.getQueryData<BusinessDetails>([detailKey, businessId]);
        if (prev) {
          qc.setQueryData<BusinessDetails>([detailKey, businessId], {
            ...prev,
            isFavorite: !prev.isFavorite,
          });
        }
      }

      return { prevLists, prevDetails };
    },

    onError: (_err, businessId, context) => {
      if (!context) return;

      // Restore list caches
      for (const { key, data } of context.prevLists) {
        for (const [queryKey, queryData] of data) {
          qc.setQueryData(queryKey, queryData);
        }
      }

      // Restore detail caches
      for (const { detailKey, data } of context.prevDetails) {
        if (data) {
          qc.setQueryData([detailKey, businessId], data);
        }
      }
    },
  });
}
