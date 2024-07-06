"use client";

import { AxiosError } from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type NotificationType = "success" | "error";

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notify: (message: any, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: any, type: NotificationType) => {
    if (type === "error" && message instanceof AxiosError) {
      const detail = message?.response?.data?.detail;
      if (Array.isArray(detail)) {
        message = message.message;
      } else {
        message = detail;
      }
    }
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <div
          className={`fixed px-4 py-2 shadow-md rounded-md text-slate-100 text-white notification ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="text-center">
            <h2 className="text-xl text-white">
              {notification.type.toLocaleUpperCase()}
            </h2>
            <p>{notification.message}</p>
          </div>
          {/* <XCircleIcon
            className="h-6 w-6 cursor-pointer"
            // onClick={notificationCtx.hideNotification}
          /> */}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
