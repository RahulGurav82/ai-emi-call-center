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
  Phone,
  Languages,
  Locate,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../../store/admin/user-Slice";

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

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    language: "",
    location: "",
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

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (formData.phone_number.length < 10) {
      newErrors.phone_number = "Phone number must be 10 digits";
    }

    if (!formData.language) {
      newErrors.language = "Please select a language";
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
      dispatch(addUsers(formData)).then((data) => {
        if (data?.payload?.success) {
          const message = data?.payload?.message;
          addNotification("success", "Success!", message);
          setFormData({
            name: "",
            email: "",
            phone_number: "",
            language: "",
            location: "",
          })
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

  const languageOption = [
    {
      value: "hindi",
      label: "Hindi",
    },
    {
      value: "marathi",
      label: "Marathi",
    },
    {
      value: "english",
      label: "English",
    },
    {
      value: "gujrati",
      label: "Gujrati",
    },
  ];

  const { user } = useSelector(state => state.user)


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add New User</h1>
            <p className="text-blue-100 mt-1">Add New Users</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            User Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below to create a new user account
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
                  placeholder="Enter user full name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.phone_number
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User Mobile Number"
                />
              </div>
              {errors.phone_number && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.phone_number}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address (optional)
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
                  placeholder="Enter user email address"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* language Field */}
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                language <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleOnchange}
                  className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors appearance-none bg-white ${
                    errors.language
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  {languageOption.map((option) => (
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
              {errors.language && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.language}</span>
                </div>
              )}
            </div>

            {/* location Field */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Locate className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.location
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User location"
                />
              </div>
              {errors.location && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.location}</span>
                </div>
              )}
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
                  phone_number: "",
                  language: "",
                  location: "",
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
                  <span>Adding User...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Add User</span>
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

export default AddUser;
