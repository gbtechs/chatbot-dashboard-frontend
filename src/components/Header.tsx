"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

export const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center h-[80px] bg-white header p-4">
      <div className="flex items-center">
        <img
          className="h-[40px]"
          src="/artifika-logo-blue.svg"
          alt="logo"
        ></img>
      </div>
      {session?.user && (
        <div className="">
          <UserCircleIcon className="h-[30px] w-[30px]"></UserCircleIcon>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      )}
    </header>
  );
};
