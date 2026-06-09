import { api } from "@/src/api";
import type { BusinessDetails, BusinessListItem, BusinessQuery, PaginatedResponse } from "@/src/types";

/** Lab list item — no extra fields beyond BusinessListItem */
export type LabResponse = BusinessListItem;

/** Lab detail — no extra fields beyond BusinessDetails */
export type LabDetailsResponse = BusinessDetails;

export type LabsQuery = BusinessQuery;

export const getLabs = async (query: LabsQuery = {}): Promise<PaginatedResponse<LabResponse>> => {
  const res = await api.get<PaginatedResponse<LabResponse>>("/labs", { params: query });
  return res.data;
};

export const getLabDetails = async (id: string): Promise<LabDetailsResponse> => {
  const res = await api.get<LabDetailsResponse>(`/labs/${id}`);
  return res.data;
};
