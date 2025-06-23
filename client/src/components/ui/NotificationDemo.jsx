import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';

const Notification = ({ 
  type = 'success', 
  title, 
  message, 
  isVisible = true, 
  onClose,
  autoClose = true,
  autoCloseDelay = 5000 
}) => {
  const [show, setShow] = useState(isVisible);

  React.useEffect(() => {
    if (autoClose && show) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, show, onClose]);

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  const getNotificationConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700',
          closeColor: 'text-green-500 hover:text-green-600'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700',
          closeColor: 'text-red-500 hover:text-red-600'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700',
          closeColor: 'text-yellow-500 hover:text-yellow-600'
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700',
          closeColor: 'text-green-500 hover:text-green-600'
        };
    }
  };

  const config = getNotificationConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`max-w-md w-full ${config.bgColor} border rounded-lg shadow-lg p-4 mb-4`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <div className="ml-3 flex-1">
              {title && (
                <h3 className={`text-sm font-medium ${config.titleColor}`}>
                  {title}
                </h3>
              )}
              {message && (
                <p className={`text-sm ${config.messageColor} ${title ? 'mt-1' : ''}`}>
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className={`inline-flex rounded-md ${config.closeColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Demo component to showcase the notifications
const NotificationDemo = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, title, message) => {
    const id = Date.now();
    const newNotification = {
      id,
      type,
      title,
      message,
      isVisible: true
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notification Component Demo</h1>
        
        {/* Control buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => addNotification('success', 'Success!', 'Your action was completed successfully.')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Show Success
          </button>
          <button
            onClick={() => addNotification('error', 'Error!', 'Something went wrong. Please try again.')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Show Error
          </button>
          <button
            onClick={() => addNotification('warning', 'Warning!', 'Please review your settings before continuing.')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Show Warning
          </button>
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
    </div>
  );
};

export default NotificationDemo;