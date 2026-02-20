import type { AxiosError } from "axios";
import { api } from "./axios";
import { ApiEndpoints } from "./enums";
import { ep } from "./helpers";
import type { TokenObtainPairRequest, TokenObtainPairResponse, TokenRefreshRequest, TokenRefreshResponse, Profile, SchemaListItem, SchemaCreateRequest, SchemaDetail, SchemaVersionShort, SchemaVersionDetail, SchemaSaveVersionRequest, SchemaSaveVersionResponse, JournalListParams, JournalEventListItem, JournalEventDetail, JournalCreateRequest, SchemaArchiveRequest, SchemaArchiveResponse } from "./types";

export const accountsApi = {
  login: async (payload: TokenObtainPairRequest) => {
    const { data } = await api.post<TokenObtainPairResponse>(ApiEndpoints.Login, payload);
    return data;
  },
  refresh: async (payload: TokenRefreshRequest) => {
    const { data } = await api.post<TokenRefreshResponse>(ApiEndpoints.Refresh, payload);
    return data;
  },
  me: async () => {
    const { data } = await api.get<Profile>(ApiEndpoints.Me);
    return data;
  },
};

export const schemaApi = {
  list: async () => {
    const { data } = await api.get<SchemaListItem[]>(ApiEndpoints.Schemas);
    return data;
  },
  create: async (payload: SchemaCreateRequest) => {
    const { data } = await api.post<SchemaDetail>(ApiEndpoints.Schemas, payload);
    return data;
  },
  get: async (id: string) => {
    const { data } = await api.get<SchemaDetail>(ep.schemaById(id));
    return data;
  },
  versions: async (id: string, params?: { limit?: number }) => {
    const { data } = await api.get<SchemaVersionShort[]>(ep.schemaVersions(id), { params });
    return data;
  },
  versionByNumber: async (id: string, version: number) => {
    const { data } = await api.get<SchemaVersionDetail>(ep.schemaVersionByNumber(id, version));
    return data;
  },
  saveVersion: async (id: string, payload: SchemaSaveVersionRequest) => {
    try {
      const { data } = await api.post<SchemaSaveVersionResponse>(ep.schemaSave(id), payload);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 409) {
        throw err;
      }
      throw e;
    }
  },
  archive: async (id: string, payload: SchemaArchiveRequest) => {
    try {
      const { data } = await api.post<SchemaArchiveResponse>(ep.schemaArchive(id), payload);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 409) throw err;
      throw e;
    }
  },

  unarchive: async (id: string, payload: SchemaArchiveRequest) => {
    try {
      const { data } = await api.post<SchemaArchiveResponse>(ep.schemaUnarchive(id), payload);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 409) throw err;
      throw e;
    }
  },
};

export const journalApi = {
  list: async (params?: JournalListParams) => {
    const { data } = await api.get<JournalEventListItem[]>(ApiEndpoints.Journal, { params });
    return data;
  },
  get: async (id: string) => {
    const { data } = await api.get<JournalEventDetail>(ep.journalById(id));
    return data;
  },
  create: async (payload: JournalCreateRequest) => {
    const { data } = await api.post<JournalEventDetail>(ApiEndpoints.Journal, payload);
    return data;
  },
};