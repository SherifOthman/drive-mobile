import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "../api/favorites-api";
import type { DoctorResponse, PaginatedResponse } from "../../doctors/api/doctors-api";

type DoctorsInfinite = InfiniteData<PaginatedResponse<DoctorResponse>>;

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (businessId: string) => {
      // Read current state to decide add or remove
      const current = qc.getQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] });
      const isFav = current.some(([, data]) =>
        data?.pages.some((p) => p.items.some((i) => i.id === businessId && i.isFavorite))
      );
      if (isFav) {
        await removeFavorite(businessId);
      } else {
        await addFavorite(businessId);
      }
      return { businessId, wasFavorite: isFav };
    },

    onMutate: async (businessId) => {
      await qc.cancelQueries({ queryKey: ["doctors"] });
      const prev = qc.getQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] });

      // Optimistically flip isFavorite in the doctors cache
      qc.setQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.id === businessId
                ? { ...item, isFavorite: !item.isFavorite }
                : item
            ),
          })),
        };
      });

      return { prev };
    },

    onError: (_err, _id, context) => {
      // Revert on error
      if (context?.prev) {
        for (const [key, data] of context.prev) {
          qc.setQueryData(key, data);
        }
      }
    },

    // No onSettled/invalidate — the optimistic update is the source of truth.
    // The server confirmed success so the cache is correct.
  });
}
