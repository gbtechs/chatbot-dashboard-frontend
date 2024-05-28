import { postReq } from "@/api/utils";
import { useNotification } from "@/contexts/NotificationContext";
import { AxiosResponse } from "axios";
import { useState } from "react";

const useLoginRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notify } = useNotification();

  const login = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response: AxiosResponse = await postReq("/login", {
        email,
        password,
      });

      notify("Login Successful", "success");
      return response.data;
    } catch (err: any) {
      notify(err, "error");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLoginRequest;
