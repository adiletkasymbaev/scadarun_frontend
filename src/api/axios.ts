import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosInstance } from "axios";
import { ApiEndpoints } from "./enums";
import { useAuthStore } from "./store";
import type { TokenRefreshResponse, TokenRefreshRequest } from "./types";

// const API_BASE_URL = "http://127.0.0.1:8000";
const API_BASE_URL = "https://alissandro.pythonanywhere.com";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function getAccessToken() {
  return useAuthStore.getState().accessToken;
}
function getRefreshToken() {
  return useAuthStore.getState().refreshToken;
}

let refreshingPromise: Promise<string> | null = null;

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    // network error / no config
    if (!original) throw error;

    // if already retried, stop
    if (original._retry) throw error;

    // only for 401
    if (error.response?.status !== 401) throw error;

    const refresh = getRefreshToken();
    if (!refresh) {
      useAuthStore.getState().logout();
      throw error;
    }

    original._retry = true;

    try {
      if (!refreshingPromise) {
        refreshingPromise = (async () => {
          const { data } = await axios.post<TokenRefreshResponse>(
            `${API_BASE_URL}${ApiEndpoints.Refresh}`,
            { refresh } satisfies TokenRefreshRequest,
            { headers: { "Content-Type": "application/json" } }
          );
          useAuthStore.getState().setTokens({ access: data.access });
          return data.access;
        })().finally(() => {
          refreshingPromise = null;
        });
      }

      const newAccess = await refreshingPromise;
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api.request(original);
    } catch (e) {
      useAuthStore.getState().logout();
      throw e;
    }
  }
);