// components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        <div>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/add-employee"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            Add Employee
          </NavLink>
          <NavLink
            to="/admin/add-user"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="/admin/add-loan"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            Add Loan
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;