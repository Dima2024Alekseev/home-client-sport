import React, { createContext, useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const showNotification = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Toaster position="bottom-right" />
    </NotificationContext.Provider>
  );
};
