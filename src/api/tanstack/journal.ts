import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { journalApi } from "../services";
import type { JournalListParams } from "../types";
import { qk } from "./queryKeys";

export function useJournalQuery(params?: JournalListParams) {
  return useQuery({
    queryKey: qk.journal(params),
    queryFn: () => journalApi.list(params),
  });
}

export function useJournalEventQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: qk.journalEvent(id),
    queryFn: () => journalApi.get(id),
    enabled: !!id && enabled,
  });
}

export function useCreateJournalEventMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: journalApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal"] }),
  });
}