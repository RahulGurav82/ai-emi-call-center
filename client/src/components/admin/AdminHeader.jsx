// components/layout/AdminHeader.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { logoutUser } from '../../store/auth-Slice';

const AdminHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const currentTime = format(new Date(), 'PPpp');

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-semibold text-gray-800">
          {currentTime}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;