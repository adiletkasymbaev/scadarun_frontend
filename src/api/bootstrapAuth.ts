import { accountsApi } from "./services";
import { useAuthStore } from "./store";

export async function bootstrapAuth() {
  const { accessToken, refreshToken } = useAuthStore.getState();

  if (!accessToken && !refreshToken) return;

  try {
    const profile = await accountsApi.me();
    useAuthStore.getState().setProfile(profile);
  } catch (e) {
    console.error(e)
  }
}