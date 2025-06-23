import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user }) => {
  const location = useLocation();

  // Redirect unauthenticated users
  if (!isAuthenticated && !location.pathname.includes("/auth/login")) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent authenticated users from accessing login page
  if (isAuthenticated && location.pathname.includes("/auth/login")) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/employee/dashboard" />
    );
  }

  // Role-based protection
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    console.log(user?.role, "roleeee")
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/employee")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Outlet />; // this renders nested child routes
};

export default CheckAuth;
