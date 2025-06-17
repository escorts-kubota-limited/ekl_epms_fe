import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  // if (!token) {
  //   const localToken = localStorage.getItem("token");
  //   if(localToken){
      
  //   }
    
  // }

  return token ? <>{children}</> : <Navigate to="/login" />;
  // return token ? <>{children}</> : <Navigate to="/timelog" />;
};

export default ProtectedRoute;
