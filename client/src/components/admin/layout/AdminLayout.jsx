import AdminSidebar from '../AdminSidebar'


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
import { useSelector } from "react-redux";

// Mock data for demonstration
// const mockUser = { name: 'John Admin', role: 'Super Admin' };


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/admin/dashboard');
  const { user } = useSelector(state => state.auth)

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader 
          setSidebarOpen={setSidebarOpen}
          user={user}
        />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;