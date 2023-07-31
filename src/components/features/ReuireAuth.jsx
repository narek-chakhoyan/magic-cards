import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "store/redux/slices/usersSlice";

const RequireAuth = () => {
  const auth = useSelector(getAuthUser);
  const location = useLocation();

  return auth?.email ? (
    // return true ? (

    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
