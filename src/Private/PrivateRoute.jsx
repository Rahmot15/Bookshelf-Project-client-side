import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation()
  if (loading) {
    return (
      <span className="loading loading-dots loading-xl mt-20 mr-[50%]"></span>
    );
  }
  if (user && user.email) {
    return <div>{children}</div>;
  }
  return <Navigate to={'/auth/login'} state={{from: location}} replace ></Navigate>
};

export default PrivateRoute;
