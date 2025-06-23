import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import EmplDashboard from "./pages/employee/Dashboard";
import UnAuthPage from "./pages/common/UnAuthPage";
import NotFoundPage from "./pages/common/NotFoundPage";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/unauth-page" element={<UnAuthPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Protected Route: Root path */}
      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }
      >
        <Route path="dashboard" element={<EmplDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;