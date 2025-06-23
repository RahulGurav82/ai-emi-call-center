import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users
  if (!isAuthenticated && !location.pathname.includes("/auth/login")) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent authenticated users from accessing login page
  if (isAuthenticated && location.pathname.includes("/auth/login")) {
     if(user?.role === "admin") { 
      return <Navigate to="/admin/dashboard" />
     } else {
      return <Navigate to="/employee/dashboard" />
    }
  }

  // Role-based protection
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/employee")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

    return <>{children}</>
 // this renders nested child routes
};

export default CheckAuth;
