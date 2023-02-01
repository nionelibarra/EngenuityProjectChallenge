// THIS FUNCTION ALLOWS USER THAT HAVE SUCCESSFULLY LOGGED IN TO ACCESS THE DASHBOARD DIRECTORY AND COMPONENTS

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;