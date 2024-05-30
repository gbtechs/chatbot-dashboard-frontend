import { DecodedToken } from "@/types";
import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false; // Token is expired
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const GetAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
};
