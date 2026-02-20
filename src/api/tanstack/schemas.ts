import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { schemaApi } from "../services";
import type { SchemaArchiveRequest, SchemaSaveVersionRequest } from "../types";
import { qk } from "./queryKeys";

export function useSchemasQuery() {
  return useQuery({
    queryKey: qk.schemas,
    queryFn: schemaApi.list,
  });
}

export function useSchemaQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: qk.schema(id),
    queryFn: () => schemaApi.get(id),
    enabled: !!id && enabled,
  });
}

export function useSchemaVersionsQuery(id: string, limit?: number, enabled = true) {
  return useQuery({
    queryKey: qk.schemaVersions(id, limit),
    queryFn: () => schemaApi.versions(id, { limit }),
    enabled: !!id && enabled,
  });
}

export function useSchemaVersionQuery(id: string, version: number, enabled = true) {
  return useQuery({
    queryKey: qk.schemaVersion(id, version),
    queryFn: () => schemaApi.versionByNumber(id, version),
    enabled: !!id && !!version && enabled,
  });
}

export function useCreateSchemaMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: schemaApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.schemas }),
  });
}

export function useSaveSchemaVersionMutation(schemaId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SchemaSaveVersionRequest) => schemaApi.saveVersion(schemaId, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.schema(schemaId) });
      await qc.invalidateQueries({ queryKey: qk.schemaVersions(schemaId) });
      await qc.invalidateQueries({ queryKey: qk.schemas });
      await qc.invalidateQueries({ queryKey: ["journal"] });
    },
  });
}

export function useArchiveSchemaMutation(schemaId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SchemaArchiveRequest) => schemaApi.archive(schemaId, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.schema(schemaId) });
      await qc.invalidateQueries({ queryKey: qk.schemas });
      await qc.invalidateQueries({ queryKey: ["journal"] });
    },
  });
}

export function useUnarchiveSchemaMutation(schemaId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SchemaArchiveRequest) => schemaApi.unarchive(schemaId, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.schema(schemaId) });
      await qc.invalidateQueries({ queryKey: qk.schemas });
      await qc.invalidateQueries({ queryKey: ["journal"] });
    },
  });
}
