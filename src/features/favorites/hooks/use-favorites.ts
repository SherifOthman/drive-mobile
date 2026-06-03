import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "../api/favorites-api";
import type { DoctorResponse, PaginatedResponse } from "../../doctors/api/doctors-api";
import type { DoctorDetailsResponse } from "../../doctors/api/doctor-details-api";

type DoctorsInfinite = InfiniteData<PaginatedResponse<DoctorResponse>>;

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (businessId: string) => {
      // Read current state from list cache first, then details cache
      const listData = qc.getQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] });
      const isFavInList = listData.some(([, data]) =>
        data?.pages.some((p) => p.items.some((i) => i.id === businessId && i.isFavorite))
      );
      const detailData = qc.getQueryData<DoctorDetailsResponse>(["doctor", businessId]);
      const isFav = isFavInList || detailData?.isFavorite === true;

      if (isFav) {
        await removeFavorite(businessId);
      } else {
        await addFavorite(businessId);
      }
      return { businessId, wasFavorite: isFav };
    },

    onMutate: async (businessId) => {
      await qc.cancelQueries({ queryKey: ["doctors"] });
      await qc.cancelQueries({ queryKey: ["doctor", businessId] });

      const prevList = qc.getQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] });
      const prevDetail = qc.getQueryData<DoctorDetailsResponse>(["doctor", businessId]);

      // Flip in doctors list cache
      qc.setQueriesData<DoctorsInfinite>({ queryKey: ["doctors"] }, (old) => {
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

      // Flip in doctor details cache if loaded
      if (prevDetail) {
        qc.setQueryData<DoctorDetailsResponse>(["doctor", businessId], {
          ...prevDetail,
          isFavorite: !prevDetail.isFavorite,
        });
      }

      return { prevList, prevDetail };
    },

    onError: (_err, businessId, context) => {
      if (context?.prevList) {
        for (const [key, data] of context.prevList) {
          qc.setQueryData(key, data);
        }
      }
      if (context?.prevDetail) {
        qc.setQueryData(["doctor", businessId], context.prevDetail);
      }
    },
  });
}
