import type { AxiosError } from "axios";
import { ApiEndpoints } from "./enums";
import type { SchemaSaveConflict } from "./types";

export const ep = {
  schemaById: (id: string) => ApiEndpoints.SchemaById.replace("{id}", id),
  schemaSave: (id: string) => ApiEndpoints.SchemaSave.replace("{id}", id),
  schemaVersions: (id: string) => ApiEndpoints.SchemaVersions.replace("{id}", id),
  schemaArchive: (id: string) => ApiEndpoints.SchemaArchive.replace("{id}", id),
  schemaUnarchive: (id: string) => ApiEndpoints.SchemaUnarchive.replace("{id}", id),
  schemaVersionByNumber: (id: string, version: number) =>
    ApiEndpoints.SchemaVersionByNumber.replace("{id}", id).replace("{version}", String(version)),
  journalById: (id: string) => ApiEndpoints.JournalById.replace("{id}", id),
} as const;

export function parseSchemaSaveConflict(err: unknown): SchemaSaveConflict | null {
  const e = err as AxiosError;
  if (e?.response?.status !== 409) return null;
  if (typeof e.response.data === "object" && e.response.data) {
    return e.response.data as SchemaSaveConflict;
  }
  return { code: "CONFLICT", message: "Conflict" };
}