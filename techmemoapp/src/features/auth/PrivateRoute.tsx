import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  // ロード中
  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
