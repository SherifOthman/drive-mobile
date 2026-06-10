import { api } from "@/src/api";

export type FilterOption = {
  id: string;
  name: string;
};

export type CityOption = FilterOption & {
  governorateId: string;
};

// businessType: 1=Doctor, 2=Pharmacy, 3=Laboratory, 4=Radiology
export const getGovernorates = async (businessType?: number): Promise<FilterOption[]> => {
  const res = await api.get<FilterOption[]>("/governorates", {
    params: businessType != null ? { businessType } : undefined,
  });
  return res.data;
};

export const getCities = async (
  governorateId: string,
  businessType?: number,
): Promise<CityOption[]> => {
  const res = await api.get<CityOption[]>("/cities", {
    params: {
      governorateId,
      ...(businessType != null ? { businessType } : {}),
    },
  });
  return res.data;
};

export const getSpecializations = async (businessType?: number): Promise<FilterOption[]> => {
  const res = await api.get<FilterOption[]>("/specializations", {
    params: businessType != null ? { businessType } : undefined,
  });
  return res.data;
};
