import { Bell, ChevronDown, LogOut, Menu, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-Slice";
import useNotification from "../../hooks/useNotification";

const AdminHeader = ({ setSidebarOpen, user }) => {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

    const { notifications, addNotification, removeNotification } =
    useNotification();
  const dispatch = useDispatch();


  const handleLogout = () => {
    try {
      dispatch(loginUser()).then((data) => {
        if (data?.payload?.success) {
          const message = data?.payload?.message;
          addNotification("success", "Success!", message);
        } else {
          const message = data?.payload?.message;
          addNotification("error", "Error!", message);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-500">{currentTime}</p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers, loans, or calls..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="cursor-pointer relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800">Welcome, {user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <div className="cursor-pointer w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <button className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <button onClick={handleLogout}  className="cursor-pointer flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <LogOut className="w-4 h-4 mr-2 inline" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
        {/* Notifications container */}
        <div className="fixed top-10 right-4 z-50 max-w-md w-full">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              isVisible={notification.isVisible}
              onClose={() => removeNotification(notification.id)}
              autoClose={true}
              autoCloseDelay={4000}
            />
          ))}
        </div>
    </header>
  );
};

export default AdminHeader;