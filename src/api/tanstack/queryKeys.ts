import type { JournalListParams } from "../types";

export const qk = {
  me: ["me"] as const,
  schemas: ["schemas"] as const,
  schema: (id: string) => ["schemas", id] as const,
  schemaVersions: (id: string, limit?: number) => ["schemas", id, "versions", { limit }] as const,
  schemaVersion: (id: string, version: number) => ["schemas", id, "version", version] as const,
  journal: (params?: JournalListParams) => ["journal", params ?? {}] as const,
  journalEvent: (id: string) => ["journal", id] as const,
  schemaArchive: (id: string) => ["schemas", id, "archive"] as const,
  schemaUnarchive: (id: string) => ["schemas", id, "unarchive"] as const,
};