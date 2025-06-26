import React, { use, useState } from 'react';
import { Eye, EyeOff, Shield, Phone, Bot, Moon, Sun, AlertCircle, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../store/auth-Slice';
import useNotification from '../../hooks/useNotification';
import Notification from '../../components/ui/Notification';


// Custom Button Component
const Button = ({ children, variant = 'primary', size = 'default', disabled, loading, className = '', ...props }) => {
  const baseClasses = 'cursor-pointer inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
  };
  
  const sizes = {
    default: 'px-6 py-3 text-sm',
    sm: 'px-3 py-2 text-xs',
    lg: 'px-8 py-4 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

// Custom Input Field Component
const InputField = ({ label, type = 'text', error, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`outline-none w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    className="cursor-pointer p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    aria-label="Toggle theme"
  >
    {isDark ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
  </button>
);

// Main Login Component
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
    const {
    notifications,
    addNotification,
    removeNotification
  } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear login error
    if (loginError) {
      setLoginError('');
    }

  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      // Simulate API call
      dispatch(loginUser(formData)).then((data) => {
        if(data?.payload?.success) {
          addNotification('success', 'Success!', 'Login Success.')
        } else {
          const message = data?.payload?.message
          addNotification('error', 'Error!', message)
        }
      });

    } catch (error) {

      setLoginError('Login failed. Please check your connection and try again.');

    } finally {
      setIsLoading(false);
    }
  };

  const containerClasses = isDarkMode 
    ? 'min-h-screen bg-gray-900 text-white' 
    : 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50';

  return (
    <div className={containerClasses}>
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="flex flex-col justify-center items-center w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-12">
            <div className="max-w-md text-center space-y-8">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Phone className="w-8 h-8" />
                </div>
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Bot className="w-8 h-8" />
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  AI EMI Recovery
                </h1>
                <h2 className="text-xl font-semibold text-blue-100 mb-6">
                  Call Center Platform
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  Streamline your EMI recovery operations with AI-powered call management, 
                  automated workflows, and comprehensive analytics for maximum efficiency.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Enterprise Ready</span>
                </div>
              </div>

            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Theme Toggle */}
            <div className="flex justify-end mb-8">
              <ThemeToggle 
                isDark={isDarkMode} 
                onToggle={() => setIsDarkMode(!isDarkMode)} 
              />
            </div>

            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">AI EMI Recovery</h1>
              </div>
              <p className="text-gray-600">Call Center Platform</p>
            </div>

            {/* Login Card */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-2xl border p-8`}>
              <div className="text-center mb-8">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Welcome Back
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />

                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  error={errors.password}
                />

                {loginError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Demo credentials: admin@emirecovery.com / password
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                © 2025 AI EMI Recovery Call Center. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Notifications container */}
        <div className="fixed top-4 right-4 z-50 max-w-md w-full">
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
    </div>
  );
};

export default Login;