import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import EmplDashboard from "./pages/employee/Dashboard";
import UnAuthPage from "./pages/common/UnAuthPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import { checkAuth } from "./store/auth-Slice";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("isAuthenticated", isAuthenticated, "user", user)
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/auth"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      >
        <Route path="login" element={<Login />} />
      </Route>

      {/* Unauth & Not Found Pages */}
      <Route path="/unauth-page" element={<UnAuthPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Root Route - redirect based on role */}
      <Route
        path="/"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      >
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Employee Routes */}
      <Route
        path="/employee"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      >
        <Route path="dashboard" element={<EmplDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
