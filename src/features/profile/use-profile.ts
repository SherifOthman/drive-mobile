import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe } from "./profile-api";

const meKey = ["me"];

export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: getMe,
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      queryClient.setQueryData(meKey, data);
    },
  });
}

export function useRefreshMe() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: meKey });
}
