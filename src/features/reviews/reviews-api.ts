import { api } from "@/src/api";
import type { PaginatedResponse, TestimonialItem } from "@/src/types";

export const createReview = (businessId: string, rating: number, text: string) =>
  api.post<TestimonialItem>("/reviews", { businessId, rating, text });

export const getReviews = async (
  businessId: string,
  page = 1,
  pageSize = 20,
): Promise<PaginatedResponse<TestimonialItem>> => {
  const res = await api.get<PaginatedResponse<TestimonialItem>>(
    `/businesses/${businessId}/reviews`,
    { params: { page, pageSize } },
  );
  return res.data;
};
