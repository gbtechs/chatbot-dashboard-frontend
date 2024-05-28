import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ErrorResponse {
  message: string[] | string;
  errorCode?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://157.230.96.120:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  // withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const isProtectedRoute =
        location.pathname.includes("login") ||
        location.pathname.includes("complete-registeration");
      if (error.response.status === 401 && !isProtectedRoute) {
        localStorage.clear();
        window.location.href = "/login";
      }
      let errorMessage = "An error occurred";
      if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message || "An error occurred";
      } else if (Array.isArray(error.response.data.message)) {
        errorMessage = error.response.data.message.join("\n");
      }
      if (error.response.data.errorCode === "ERR_DUPLICATE_KEY") {
        errorMessage = "User with this email already exists";
      }
      // notify(errorMessage, "error");
    } else if (error.request) {
      // notify("No response received from the server", "error");
    } else {
      // notify("An error occurred while making the request", "error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
