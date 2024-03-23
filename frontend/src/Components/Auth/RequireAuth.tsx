import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

interface RequireAuthProps {
  allowedRole: string;
}

export default function RequireAuth({ allowedRole }: RequireAuthProps) {
  const role = useAppSelector((state) => state.role);
  return role === allowedRole ? (
    <Outlet />
  ) : role ? (
    <Navigate to="/unauthorized" state={{ from: `/${role}` }} replace />
  ) : (
    <Navigate to="/login" state={{ from: `/${role}` }} replace />
  );
}
