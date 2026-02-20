import type { ActionEnum, PositionEnum } from "./enums";

export type TokenObtainPairRequest = { username: string; password: string };
export type TokenObtainPairResponse = { access: string; refresh: string };
export type TokenRefreshRequest = { refresh: string };
export type TokenRefreshResponse = { access: string };

export type Profile = {
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  position: PositionEnum;
};

export type SchemaCurrentVersion =
  | null
  | {
      id: string;
      version: number;
      created_at: string;
    };

export type SchemaListItem = {
  id: string;
  name: string;
  slug: string;
  revision: number;
  is_archived?: boolean;
  archived_at?: string | null;
  current_version: SchemaCurrentVersion;
  updated_at: string;
};

export type SchemaVersionShort = {
  id: string;
  schema_id: string;
  version: number;
  comment: string;
  created_by: number | string | null;
  created_at: string;
  schema_revision: number;
};

export type SchemaDetail = {
  id: string;
  name: string;
  is_archived?: boolean;
  archived_at?: string | null;
  slug: string;
  revision: number;
  current_version: SchemaVersionShort | null;
  created_at: string;
  updated_at: string;
};

export type SchemaCreateRequest = { name: string; slug: string };
export type SchemaSaveVersionRequest = {
  expected_revision: number;
  snapshot: Record<string, unknown>;
  comment?: string;
};
export type SchemaSaveVersionResponse = {
  new_version_id: string;
  new_version_number: number;
  new_schema_revision: number;
};

export type SchemaVersionDetail = {
  id: string;
  schema_id: string;
  version: number;
  comment: string;
  snapshot: Record<string, unknown> | string;
  created_by: number | string | null;
  created_at: string;
  schema_revision: number;
};

export type JournalUserShort = {
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;
};

export type JournalSchemaShort = {
  id: string;
  name: string;
  slug: string;
  revision: number;
  current_version: SchemaCurrentVersion | string;
};

export type JournalSchemaVersionShort = {
  id: string;
  schema_id: string;
  version: number;
  comment: string;
  created_at: string;
};

export type JournalEventListItem = {
  id: string;
  action: ActionEnum;
  actor: JournalUserShort | null;
  schema: JournalSchemaShort;
  schema_version: JournalSchemaVersionShort | null;
  expected_revision: number | null;
  actual_revision: number | null;
  comment: string;
  created_at: string;
};

export type JournalEventDetail = JournalEventListItem & {
  meta: Record<string, unknown>;
};

export type JournalListParams = {
  schema_id?: string;
  actor_id?: string;
  action?: ActionEnum;
  date_from?: string; // ISO
  date_to?: string; // ISO
  limit?: number;
};

export type JournalCreateRequest = {
  action: ActionEnum;
  schema_id: string;
  schema_version_id?: string | null;
  expected_revision?: number | null;
  actual_revision?: number | null;
  comment?: string;
  meta?: Record<string, unknown>;
};

/* API error shape for your conflict */
export type SchemaSaveConflict =
  | {
      code: "REVISION_CONFLICT";
      message: string;
      expected_revision: number;
      actual_revision: number;
    }
  | {
      code: "CONCURRENT_SAVE";
      message: string;
    }
  | {
      code: string;
      message: string;
      expected_revision?: number;
      actual_revision?: number;
    };

export type SchemaArchiveRequest = {
  expected_revision: number;
};

export type SchemaArchiveResponse = {
  new_schema_revision: number;
  is_archived: boolean;
  archived_at: string | null;
};