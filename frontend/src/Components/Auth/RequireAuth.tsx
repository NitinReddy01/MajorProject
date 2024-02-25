import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

interface RequireAuthProps {
  allowedRole: string;
}

export default function RequireAuth({ allowedRole }: RequireAuthProps) {
  const role = useAppSelector((state) => state.role);
  const location = useLocation();

  return role === allowedRole ? (
    <Outlet />
  ) : role ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
