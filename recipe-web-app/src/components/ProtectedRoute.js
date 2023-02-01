// Function allows authenticated users that have sucessfully logged in to access certain components
// throughout the application

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