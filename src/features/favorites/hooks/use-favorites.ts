import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "../api/favorites-api";

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
    mutationFn: toggleFavorite,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}
