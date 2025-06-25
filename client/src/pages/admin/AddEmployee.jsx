import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Shield,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { registerEmployee } from "../../store/admin/Employee-Slice";

// Mock notification hook
const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, title, message) => {
    const id = Date.now();
    const notification = { id, type, title, message, isVisible: true };
    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

// Notification Component
const Notification = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose,
}) => {
  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`mb-4 p-4 rounded-lg border ${bgColor} shadow-sm transition-all duration-300`}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1">
          <h4 className={`font-medium ${textColor}`}>{title}</h4>
          <p className={`text-sm ${textColor} opacity-90 mt-1`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:opacity-70 transition-opacity`}
        >
          ×
        </button>
      </div>
    </div>
  );
};

const AddEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { notifications, addNotification, removeNotification } =
    useNotification();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      dispatch(registerEmployee(formData)).then((data) => {
        console.log(data, "data")
        if (data?.payload?.success) {
          const message = data?.payload?.message;
          addNotification("success", "Success!", message);
        } else {
          const message = data?.payload;
          addNotification("error", "Error!", message);
        }
      });
    } catch (error) {
      console.log(error);
      addNotification("error", "Error!", "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: "employee",
      label: "Employee",
      description: "Standard employee access",
    },
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access",
    },
    {
      value: "manager",
      label: "Manager",
      description: "Team management access",
    },
    {
      value: "agent",
      label: "Call Agent",
      description: "Call center operations",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-50 rounded-xl flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add New Employee</h1>
            <p className="text-blue-100 mt-1">
              Create a new employee account with role-based access
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Employee Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below to create a new employee account
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter employee full name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter employee email address"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleOnchange}
                  className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors appearance-none bg-white ${
                    errors.role
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  {roleOptions.map((option) => (
                    <option
                      className=""
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.role && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.role}</span>
                </div>
              )}
            </div>
          </div>

          {/* Role Descriptions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Role Permissions:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.role === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        formData.role === option.value
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="font-medium text-sm text-gray-800">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 ml-4">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  role: "employee",
                })
              }
              className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Adding Employee...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Add Employee</span>
                </>
              )}
            </button>
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
          />
        ))}
      </div>
    </div>
  );
};

export default AddEmployee;
