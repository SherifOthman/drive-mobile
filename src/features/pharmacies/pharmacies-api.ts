import { api } from "@/src/api";
import type { BusinessDetails, BusinessListItem, BusinessQuery, PaginatedResponse } from "@/src/types";

/** Pharmacy list item — no extra fields beyond BusinessListItem */
export type PharmacyResponse = BusinessListItem;

/** Pharmacy detail — no extra fields beyond BusinessDetails */
export type PharmacyDetailsResponse = BusinessDetails;

export type PharmaciesQuery = BusinessQuery;

export const getPharmacies = async (query: PharmaciesQuery = {}): Promise<PaginatedResponse<PharmacyResponse>> => {
  const res = await api.get<PaginatedResponse<PharmacyResponse>>("/pharmacies", { params: query });
  return res.data;
};

export const getPharmacyDetails = async (id: string): Promise<PharmacyDetailsResponse> => {
  const res = await api.get<PharmacyDetailsResponse>(`/pharmacies/${id}`);
  return res.data;
};
