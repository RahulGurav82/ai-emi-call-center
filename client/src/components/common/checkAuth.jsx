import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      <Navigate to="/auth/login" />
    }
  } else {
    if (user?.role === "admin") {
      <Navigate to="/admin/dashboard" />;
    } else {
      <Navigate to="/employee/dashboard" />;
    }
  }

  if (!isAuthenticated && !location.pathname.includes("/login")) {
    return <Navigate to="/auth/login" />;
  }

  if (!isAuthenticated && location.pathname.includes("/auth/login")) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/employee/dashboard" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("employee")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return { children };
};

export default CheckAuth;
