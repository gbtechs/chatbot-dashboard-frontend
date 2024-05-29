"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { DecodedToken, User, UserRole } from "@/types";
import { jwtDecode } from "jwt-decode";
import { validateToken } from "@/utils";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  getUser: () => User | null;
  userId: string;
  token: string | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  loginUser: (user: any) => void; // TODO Fix any to proper user or token type.
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      console.log("AuthContext => " + storedToken);
      if (storedToken) {
        const isValid = validateToken(storedToken);
        if (isValid) {
          setToken(storedToken);
          // setUserInfo(getUser());
        } else {
          localStorage.removeItem("token");
        }
      }
    }
  }, []);

  const loginUser = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  const userRole = userInfo?.role || null;
  let userId = "";
  let isAuthenticated = false;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("sub") || "";
    isAuthenticated = Boolean(userId);
  }

  const getUser = () => {
    if (userInfo) {
      return userInfo;
    }
    return null;
  };

  const value: AuthContextType = {
    loginUser,
    logoutUser,
    getUser,
    token,
    userId,
    userRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
