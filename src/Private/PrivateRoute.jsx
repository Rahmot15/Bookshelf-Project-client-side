import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation()
  if (loading) {
    return (
      <Loading/>
    );
  }
  if (user && user.email) {
    return <div>{children}</div>;
  }
  return <Navigate to={'/auth/login'} state={{from: location}} replace ></Navigate>
};

export default PrivateRoute;
