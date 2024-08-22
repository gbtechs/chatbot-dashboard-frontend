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
    try {
      if (type === "error" && message instanceof AxiosError) {
        const detail = message?.response?.data?.detail;
        if (Array.isArray(detail)) {
          message = message.message;
        } else {
          message = detail;
        }
      }
      setNotification({ message, type });
    } catch (error) {
      console.error(error);
      setNotification({ message: "Something went wrong", type: "error" });
    }
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
          className={`fixed top-[10px] left-1/2 transform -translate-x-1/2 flex justify-center items-center px-8 py-2 shadow-md rounded-[50px] text-slate-100 text-white notification${
            notification.type === "success" ? " bg-green" : " bg-red-500"
          }${!location.pathname.startsWith("/auth") ? " ml-32" : ""}`}
        >
          <h3>{notification.message}</h3>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
