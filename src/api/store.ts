import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Profile } from "./types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  profile: Profile | null;

  isHydrated: boolean;

  setTokens: (t: { access: string; refresh?: string }) => void;
  setProfile: (p: Profile | null) => void;
  logout: () => void;
  setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      profile: null,
      isHydrated: false,

      setTokens: (t) =>
        set((s) => ({
          accessToken: t.access,
          refreshToken: t.refresh ?? s.refreshToken,
        })),

      setProfile: (p) => set({ profile: p }),

      logout: () => set({ accessToken: null, refreshToken: null, profile: null }),

      setHydrated: (v) => set({ isHydrated: v }),
    }),
    {
      name: "scada-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        profile: s.profile,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);