export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
};

// ── Shared business types ──────────────────────────────────────────────

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

/** Base fields every business type returns in a list */
export type BusinessListItem = {
  id: string;
  name: string;
  profileImageUrl: string | null;
  governorate: string;
  averageRating: number;
  totalRatings: number;
  nextWorkingDay: number;
  startTime: string | null;
  endTime: string | null;
  isOpen: boolean;
  isFavorite: boolean;
};

/** Base fields every business type returns in details */
export type BusinessDetails = {
  id: string;
  name: string;
  profileImageUrl: string | null;
  coverImageUrl: string | null;
  description: string | null;
  address: string | null;
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

export type BusinessQuery = {
  governorateId?: string;
  cityId?: string;
  name?: string;
  sortBy?: string;
  sortDirection?: string;
  page?: number;
  pageSize?: number;
};
