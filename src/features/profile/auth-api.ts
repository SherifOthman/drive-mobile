import { api } from "@/src/services/api";

type User = {
  email: string;
  fullName: string;
  imageUrl: string | null;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};
