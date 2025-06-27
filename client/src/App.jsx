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
import AddLoan from "./pages/admin/AddLoan";
import AddEmployee from "./pages/admin/AddEmployee";
import AdminLayout from './components/admin/layout/AdminLayout'
import CallCenter from "./pages/admin/CallCenter";
import Analytics from "./pages/admin/Analytics";
import Setting from "./pages/admin/Setting";
import Pay from "./pages/users/Pay";
import UsersPage from "./pages/admin/UsersPage";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      >
      </Route>

      <Route path="/auth/login" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><Login /> </CheckAuth>} />
      <Route path="/pay" element={<Pay />} />

      {/* Unauth & Not Found Pages */}
      <Route path="/unauth-page" element={<UnAuthPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Root Route - redirect based on role */}
      <Route
        path="/"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      />

      {/* Admin Routes with Layout */}
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="dashboard" element={<Dashboard />} ></Route>
        <Route path="add-employee" element={<AddEmployee />} ></Route>
        <Route path="add-loan" element={<AddLoan />} ></Route>
        <Route path="users" element={<UsersPage />} ></Route>
        <Route path="ai-calls" element={<CallCenter />} ></Route>
        <Route path="analytics" element={<Analytics />} ></Route>
        <Route path="settings" element={<Setting />} ></Route>
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