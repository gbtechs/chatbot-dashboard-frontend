"use client";

import { useSession } from "next-auth/react";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
  const path = usePathname();

  return (
    <>
      {path === "/auth/login" ? (
        <div className="flex flex-row min-h-full pt-[80px]">
          <main className="main flex flex-col flex-grow bg-gray -ml-64 md:ml-0 transition-all duration-150 ease-in">
            {children}
          </main>
        </div>
      ) : (
        status !== "loading" &&
        session?.user && (
          <div className="flex flex-row min-h-full pt-[80px]">
            <Sidebar />

            <main className="main flex flex-col flex-grow bg-gray -ml-64 md:ml-0 transition-all duration-150 ease-in">
              {children}
            </main>
          </div>
        )
      )}
    </>
  );
};
