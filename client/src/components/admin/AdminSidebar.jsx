import {  
  X, 
  LayoutGrid, 
  UserPlus, 
  Users, 
  CreditCard, 
  Phone, 
  TrendingUp, 
  Settings, 
  Bot,
  Activity,
  BookUser
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({user, sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: LayoutGrid,
      description: 'Overview & Analytics'
    },
    { 
      path: '/admin/add-employee', 
      label: 'Add Employee', 
      icon: UserPlus,
      description: 'Manage Staff'
    },
    { 
      path: '/admin/add-loan', 
      label: 'Add Loan', 
      icon: CreditCard,
      description: 'Loan Processing'
    },
    { 
      path: '/admin/users', 
      label: 'All User', 
      icon: BookUser ,
      description: 'users details with loan'
    },
    { 
      path: '/admin/ai-calls',
      label: 'AI Call Center', 
      icon: Bot,
      description: 'Automated Recovery'
    },
    { 
      path: '/admin/analytics', 
      label: 'Analytics', 
      icon: TrendingUp,
      description: 'Performance Metrics'
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'System Configuration'
    }
  ];

  const navigate = useNavigate();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
      transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EMI Recovery</h1>
              <p className="text-xs text-slate-400">AI Call Center</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden cursor-pointer text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2  scroll-smooth overflow-y-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  setActiveTab(item.path);
                  setSidebarOpen(false);
                  navigate(item.path);
                }}
                className={`
                  w-full flex items-center p-3 rounded-xl transition-all duration-200 cursor-pointer group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default AdminSidebar;