import { api } from "@/src/services/api";
import type { BusinessDetails, BusinessListItem, BusinessQuery, PaginatedResponse } from "@/src/types";

/** Radiology list item — no extra fields beyond BusinessListItem */
export type RadiologyResponse = BusinessListItem;

/** Radiology detail — no extra fields beyond BusinessDetails */
export type RadiologyDetailsResponse = BusinessDetails;

export type RadiologyQuery = BusinessQuery;

export const getRadiology = async (query: RadiologyQuery = {}): Promise<PaginatedResponse<RadiologyResponse>> => {
  const res = await api.get<PaginatedResponse<RadiologyResponse>>("/radiology", { params: query });
  return res.data;
};

export const getRadiologyDetails = async (id: string): Promise<RadiologyDetailsResponse> => {
  const res = await api.get<RadiologyDetailsResponse>(`/radiology/${id}`);
  return res.data;
};
