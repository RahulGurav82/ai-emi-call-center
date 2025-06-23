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
import AddUser from "./pages/admin/AddUser";
import AddLoan from "./pages/admin/AddLoan";
import AddEmployee from "./pages/admin/AddEmployee";
import AdminLayout from './components/admin/layout/AdminLayout'

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
        <Route path="add-user" element={<AddUser />} ></Route>
        <Route path="add-loan" element={<AddLoan />} ></Route>
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