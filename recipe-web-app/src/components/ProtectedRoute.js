//Function allows authenticated users to access certain components e.g Dashboard

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();


  //DELETE CONSOLE LOG LATER
  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;