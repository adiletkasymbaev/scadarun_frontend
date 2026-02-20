export enum ApiEndpoints {
  // accounts
  Login = "/api/accounts/login/",
  Refresh = "/api/accounts/refresh/",
  Me = "/api/accounts/me/",

  // schema
  Schemas = "/api/schema/",
  SchemaById = "/api/schema/{id}/",
  SchemaSave = "/api/schema/{id}/save/",
  SchemaVersions = "/api/schema/{id}/versions/",
  SchemaVersionByNumber = "/api/schema/{id}/versions/{version}/",
  SchemaArchive = "/api/schema/{id}/archive/",
  SchemaUnarchive = "/api/schema/{id}/unarchive/",

  // journal
  Journal = "/api/journal/",
  JournalById = "/api/journal/{id}/",
}

export type PositionEnum =
  | "DISPATCHER"
  | "DUTY_ENGINEER"
  | "SUBSTATION_OPERATOR"
  | "RPA_ENGINEER"
  | "SCADA_ENGINEER"
  | "LINE_CREW_LEAD"
  | "ELECTRICIAN"
  | "METERING_SPECIALIST"
  | "SAFETY_ENGINEER"
  | "CHIEF_ENGINEER"
  | "HEAD_OF_RES";

export type ActionEnum =
  | "SCHEMA_CREATED"
  | "SCHEMA_RENAMED"
  | "VERSION_SAVED"
  | "VERSION_ROLLBACK"
  | "VERSION_VIEWED";