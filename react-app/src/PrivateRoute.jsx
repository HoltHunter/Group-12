import { useContext } from "react";
import { AccountContext } from "./AccountStatus";

const { Outlet, Navigate } = require("react-router");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;