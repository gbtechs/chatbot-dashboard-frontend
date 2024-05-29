"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/contexts/AuthContext";
import { DecodedToken } from "@/types";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { logoutUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        console.log("withAuth => " + token);

        if (!token) {
          router.replace("/login");
          return;
        }

        try {
          const decoded: DecodedToken = jwtDecode(token || "");
          if (decoded.exp * 1000 < Date.now()) {
            logoutUser();
          }
        } catch (error) {
          logoutUser();
        }
      }
    }, []);

    // if (!token) {
    //   return null; // Or a loading spinner or a redirect message
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
