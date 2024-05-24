"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  // chatBotId: Number;
}

export const Header: React.FC<Props> = () => {
  const baseURL = "http://165.227.154.88";

  return (
    <div className="flex justify-between items-center h-[80px] bg-white header p-4">
      <div className="flex items-center">
        <img
          className="h-[40px]"
          src="/artifika-logo-blue.svg"
          alt="logo"
        ></img>
      </div>
      <div className="">
        <UserCircleIcon className="h-[30px] w-[30px]"></UserCircleIcon>
      </div>
    </div>
  );
};
