import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = (props) => {
  const { user } = useAuth();
  if (props.roleRequired) {
    return user ? (
      props.roleRequired === user.userInfo.role ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
