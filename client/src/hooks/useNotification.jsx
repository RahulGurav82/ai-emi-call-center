import { useState } from 'react';

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, title, message, options = {}) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type,
      title,
      message,
      isVisible: true,
      ...options
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

export default useNotification;