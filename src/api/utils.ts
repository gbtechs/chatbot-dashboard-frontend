import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { ErrorResponse } from "../types";

const postUtil = <T>(url: string, data: T) => axiosInstance.post(url, data);

const postReq = <T>(url: string, data: T) => axiosInstance.post(url, data);

const deleteReq = <T>(url: string): Promise<T> => axiosInstance.delete(url);

const patchReq = <T>(url: string, data: T): Promise<T> =>
  axiosInstance.patch(url, data);

const putReq = <T>(url: string, data: T): Promise<T> =>
  axiosInstance.put(url, data);

const getReq = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url);
  return response.data;
};

const makeErrorMsg = (error: AxiosError<ErrorResponse>): string | null => {
  if (error?.response) {
    let errorMessage = "An error occurred";
    if (typeof error?.response?.data?.message === "string") {
      errorMessage = error?.response?.data?.message || "An error occurred";
    } else if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error?.response?.data?.message?.join("\n");
    }
    return errorMessage;
  } else if (error?.request) {
    return "No response received from the server";
  } else {
    return null;
  }
};

export { deleteReq, getReq, postReq, postUtil, patchReq, putReq, makeErrorMsg };
