import { useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../../../api/store";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthStore();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}