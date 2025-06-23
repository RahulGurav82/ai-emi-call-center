// components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../AdminHeader'
import AdminSidebar from '../AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
        <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;