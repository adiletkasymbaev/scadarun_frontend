import { useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../../../api/store";
import LoginPage from "../../auth/pages/LoginPage";

export default function LoginRoute() {
  const { accessToken } = useAuthStore();
  const location = useLocation();

  if (accessToken) {
    const from = (location.state as any)?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  return <LoginPage />;
}