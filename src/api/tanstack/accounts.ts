import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "./queryKeys";
import { accountsApi } from "../services";
import { useAuthStore } from "../store";

export function useMeQuery(enabled = true) {
  return useQuery({
    queryKey: qk.me,
    queryFn: accountsApi.me,
    enabled,
  });
}

export function useLoginMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: accountsApi.login,
    onSuccess: async (tokens) => {
      useAuthStore.getState().setTokens(tokens);
      const profile = await accountsApi.me();
      useAuthStore.getState().setProfile(profile);
      qc.setQueryData(qk.me, profile);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    useAuthStore.getState().logout();
    qc.clear();
  };
}