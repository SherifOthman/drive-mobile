import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/services/api";

export type FavoriteListItem = {
  id: string;
  name: string;
  profileImageUrl: string | null;
  averageRating: number;
  totalRatings: number;
};

type FavoritesData = { favorites: FavoriteListItem[] };

const getFavorites = async (): Promise<FavoritesData> => {
  const res = await api.get<FavoritesData>("/favorites");
  return res.data;
};

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 60_000,
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ businessId, isFavorite }: { businessId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        await api.delete(`/favorites/${businessId}`);
        return { businessId, wasFavorite: true };
      } else {
        await api.post(`/favorites/${businessId}`);
        return { businessId, wasFavorite: false };
      }
    },
    onMutate: async ({ businessId, isFavorite }) => {
      await qc.cancelQueries({ queryKey: ["favorites"] });
      const prev = qc.getQueryData<FavoritesData>(["favorites"]);

      qc.setQueryData<FavoritesData>(["favorites"], (old) => {
        if (!old) return { favorites: [] };
        const favorites = old.favorites ?? [];
        if (isFavorite) {
          return { favorites: favorites.filter((d) => d.id !== businessId) };
        } else {
          return { favorites: [...favorites, { id: businessId, name: "", profileImageUrl: null, averageRating: 0, totalRatings: 0 }] };
        }
      });

      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) qc.setQueryData(["favorites"], context.prev);
    },
    onSuccess: ({ wasFavorite }) => {
      if (!wasFavorite) qc.invalidateQueries({ queryKey: ["favorites"] });
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}
