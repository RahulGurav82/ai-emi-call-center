import { Bot, CreditCard, Phone, TrendingUp, UserPlus, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Loans',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AI Calls Today',
      value: '1,234',
      change: '+8.2%',
      changeType: 'increase',
      icon: Phone,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Recovery Rate',
      value: '78.9%',
      change: '+2.1%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Active Users',
      value: '892',
      change: '-1.4%',
      changeType: 'decrease',
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to EMI Recovery Dashboard</h1>
            <p className="text-blue-100">Monitor your AI-powered call center performance and manage loan recoveries efficiently.</p>
          </div>
          <div className="hidden lg:block">
            <Bot className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'increase' 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left">
              <UserPlus className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-gray-800">Add New Employee</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-left">
              <CreditCard className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-gray-800">Process New Loan</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-left">
              <Bot className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-gray-800">Start AI Campaign</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI call completed for Loan #1234</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New employee added to system</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Payment received from customer</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Recovery campaign launched</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Call System</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Services</span>
              <span className="flex items-center text-yellow-600">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Monitoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;