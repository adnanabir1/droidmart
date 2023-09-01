import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    </div>
  );
};

export default PrivateRoutes;
