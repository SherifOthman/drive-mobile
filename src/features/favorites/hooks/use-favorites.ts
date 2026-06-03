import { api } from "@/src/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type FavoriteListItem = {
  id: string;
  name: string;
  profileImageUrl: string | null;
  averageRating: number;
  totalRatings: number;
};

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (businessId: string) =>
      api.post(`/favorites/${businessId}/toggle`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}
