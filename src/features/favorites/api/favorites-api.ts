import { api } from "@/src/services/api";

export const toggleFavorite = (businessId: string) =>
  api.post(`/favorites/${businessId}/toggle`);
