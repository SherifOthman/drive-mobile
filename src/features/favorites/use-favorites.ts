import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "./favorites-api";

export function useGetFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleFavorite(id),
    onSuccess: (_data, businessId) => {
      // Invalidate both the specific detail cache and the favorites list
      queryClient.invalidateQueries({ queryKey: ["doctor",           businessId] });
      queryClient.invalidateQueries({ queryKey: ["pharmacy",         businessId] });
      queryClient.invalidateQueries({ queryKey: ["lab",              businessId] });
      queryClient.invalidateQueries({ queryKey: ["radiology-detail", businessId] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
