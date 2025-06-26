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
  Locate,
  CircleDollarSign,
  Languages,
  DollarSign,
  Activity,
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
    user_name: "",
    user_email: "",
    user_phone: "",
    user_language: "",
    user_location: "",
    loan_amount: "",
    emi_amount: "",
    due_date: "",
    loan_status: "",
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { notifications, addNotification, removeNotification } =
    useNotification();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    } else if (formData.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters";
    }

    // if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
    //   newErrors.user_email = "Please enter a valid email address";
    // }

    if (!formData.user_phone) {
      newErrors.user_phone = "Phone number is required";
    } else if (formData.user_phone.length < 10) {
      newErrors.user_phone = "Phone number must be 10 digits";
    }

    if (!formData.user_language) {
      newErrors.user_language = "Please select a language";
    }
    if (!formData.user_location) {
      newErrors.user_location = "Please select a language";
    }
    if (!formData.loan_amount) {
      newErrors.loan_amount = "Please enter amount";
    }
    if (!formData.emi_amount) {
      newErrors.emi_amount = "Please enter amount";
    }
    if (!formData.due_date) {
      newErrors.due_date = "Please enter date";
    }
    if (!formData.loan_status) {
      newErrors.loan_status = "Please select a status";
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

    // Create a copy of formData and convert loan_amount and emi_amount to numbers
    const payload = {
      ...formData,
      loan_amount: Number(formData.loan_amount),
      emi_amount: Number(formData.emi_amount),
    };

    try {
      // Simulate API call
      dispatch(addUsers(payload)).then((data) => {
        if (data?.payload?.success) {
          const message = data?.payload?.message;
          addNotification("success", "Success!", message);
          setFormData({
            user_name: "",
            user_email: "",
            user_phone: "",
            user_language: "",
            user_location: "",
            loan_amount: "",
            emi_amount: "",
            due_date: "",
            loan_status: "",
          });
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

  const user_languageOption = [
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

  const loan_statusOption = [
    {
      value: "active",
      label: "active",
    },
    {
      value: "overdue",
      label: "overdue",
    },
    {
      value: "closed",
      label: "closed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <CircleDollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add Loan</h1>
            <p className="text-blue-100 mt-1">Add loan details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Loan Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below to create a new loan
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={formData.user_name}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.user_name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter user full name"
                />
              </div>
              {errors.user_name && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.user_name}</span>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="user_phone"
                  id="user_phone"
                  value={formData.user_phone}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.user_phone
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User Mobile Number"
                />
              </div>
              {errors.user_phone && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.user_phone}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address (optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  value={formData.user_email}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.user_email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter user email address"
                />
              </div>
              {errors.user_email && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.user_email}</span>
                </div>
              )}
            </div>

            {/* user_language Field */}
            <div className="space-y-2">
              <label
                htmlFor="user_language"
                className="block text-sm font-medium text-gray-700"
              >
                language <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="user_language"
                  name="user_language"
                  value={formData.user_language}
                  onChange={handleOnchange}
                  className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors appearance-none bg-white ${
                    errors.user_language
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  {user_languageOption.map((option) => (
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
              {errors.user_language && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.user_language}</span>
                </div>
              )}
            </div>

            {/* user_location Field */}
            <div className="space-y-2">
              <label
                htmlFor="user_location"
                className="block text-sm font-medium text-gray-700"
              >
                location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Locate className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="user_location"
                  id="user_location"
                  value={formData.user_location}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.user_location
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User user_location"
                />
              </div>
              {errors.user_location && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.user_location}</span>
                </div>
              )}
            </div>

            <br />
            <div className="Space-y-2">
              <h1>loan Infomation</h1>
            </div>
            <br />

            {/* loan_amount Field */}
            <div className="space-y-2">
              <label
                htmlFor="loan_amount"
                className="block text-sm font-medium text-gray-700"
              >
                loan amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="loan_amount"
                  id="loan_amount"
                  value={formData.loan_amount}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.loan_amount
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User Mobile Number"
                />
              </div>
              {errors.loan_amount && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.loan_amount}</span>
                </div>
              )}
            </div>

            {/* emi_amount Field */}
            <div className="space-y-2">
              <label
                htmlFor="emi_amount"
                className="block text-sm font-medium text-gray-700"
              >
                EMI amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="emi_amount"
                  id="emi_amount"
                  value={formData.emi_amount}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.emi_amount
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User Mobile Number"
                />
              </div>
              {errors.emi_amount && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.emi_amount}</span>
                </div>
              )}
            </div>

            {/* due_date Field */}
            <div className="space-y-2">
              <label
                htmlFor="due_date"
                className="block text-sm font-medium text-gray-700"
              >
                due date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  value={formData.due_date}
                  onChange={handleOnchange}
                  className={`outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.due_date
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter User Mobile Number"
                />
              </div>
              {errors.due_date && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.due_date}</span>
                </div>
              )}
            </div>

            {/* loan_status Field */}
            <div className="space-y-2">
              <label
                htmlFor="loan_status"
                className="block text-sm font-medium text-gray-700"
              >
                loan status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="loan_status"
                  name="loan_status"
                  value={formData.loan_status}
                  onChange={handleOnchange}
                  className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors appearance-none bg-white ${
                    errors.loan_status
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  {loan_statusOption.map((option) => (
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
              {errors.loan_status && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.loan_status}</span>
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
                  user_name: "",
                  user_email: "",
                  user_phone: "",
                  user_language: "",
                  user_location: "",
                  loan_amount: "",
                  emi_amount: "",
                  due_date: "",
                  loan_status: "",
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
