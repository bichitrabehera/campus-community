import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { isAdmin } from "@/utils/roles";

export default function AdminProtected({ children }: { children: JSX.Element }) {
  const user = useAuthStore((state) => state.user);

  if (!user || !isAdmin(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
