"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import useApiRequest from "./useApiRequest";

const useLoginRequest = () => {
  const { makeRequest, loading, error } = useApiRequest();
  const { loginUser } = useAuth();
  const { notify } = useNotification();

  const login = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    const data = await makeRequest<any>("/login", "POST", {
      email,
      password,
    });

    if (data) {
      loginUser(data.access_token);
      notify("Login Successful", "success");
    }

    return data;
  };

  return { login, loading, error };
};

export default useLoginRequest;
