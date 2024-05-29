import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, logoutUser } = useAuth();
  const { notify } = useNotification();

  const makeRequest = async <T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    const config: AxiosRequestConfig = {
      url: "http://157.230.96.120:8000/api" + url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const isProtectedRoute =
          location.pathname.includes("login") ||
          location.pathname.includes("complete-registeration");
        if (axiosError.response.status === 401 && !isProtectedRoute) {
          logoutUser();
        }
        // setError(axiosError?.response?.data?.message || "Request failed");
      } else {
        setError(axiosError.message);
      }

      notify(error, "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, makeRequest };
};

export default useApiRequest;
