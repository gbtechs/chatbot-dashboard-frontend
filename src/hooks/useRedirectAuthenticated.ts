import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "@/utils";

const useRedirectAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && validateToken(token)) {
      router.replace("/");
    }
  }, [router]);
};

export default useRedirectAuthenticated;
