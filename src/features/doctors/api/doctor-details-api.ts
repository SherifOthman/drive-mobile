import { api } from "@/src/services/api";

export type WorkingDayDetail = {
  day: number;        // 0=Sunday … 6=Saturday
  startTime: string;  // "HH:mm"
  endTime: string;    // "HH:mm"
};

export type PhoneNumberDetail = {
  number: string;
  type: string | null;
};

export type BranchDetail = {
  id: string;
  name: string;
  address: string | null;
  profileImageUrl: string | null;
  phoneNumbers: PhoneNumberDetail[];
  workingDays: WorkingDayDetail[];
};

export type DoctorDetailsResponse = {
  id: string;
  name: string;
  specialization: string;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  description: string | null;
  address: string | null;
  visitPrice: number | null;
  governorate: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  totalRatings: number;
  isFavorite: boolean;
  workingDays: WorkingDayDetail[];
  phoneNumbers: PhoneNumberDetail[];
  branches: BranchDetail[];
};

export const getDoctorDetails = async (id: string): Promise<DoctorDetailsResponse> => {
  const res = await api.get<DoctorDetailsResponse>(`/doctors/${id}`);
  return res.data;
};
