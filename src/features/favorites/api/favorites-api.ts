import { api } from "@/src/services/api";

export const addFavorite = (businessId: string) =>
  api.post(`/favorites/${businessId}`);

export const removeFavorite = (businessId: string) =>
  api.delete(`/favorites/${businessId}`);
