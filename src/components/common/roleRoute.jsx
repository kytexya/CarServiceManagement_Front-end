import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const profile = JSON.parse(localStorage.getItem("carserv-profile") || "{}");
  const role = profile?.roleName;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;
