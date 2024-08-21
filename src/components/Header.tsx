"use client";

import { SessionType } from "@/types";
import {
  ArrowRightStartOnRectangleIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Header: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession() as SessionType;
  const [showProfileBox, setShowProfileBox] = useState<boolean>(false);
  const profileDivRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileDivRef.current &&
      !profileDivRef.current.contains(event.target as Node)
    ) {
      setShowProfileBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="relative" ref={profileDivRef}>
          <img
            src="/icons/user-circle.svg"
            alt="user"
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={() => setShowProfileBox(!showProfileBox)}
          ></img>
          {showProfileBox && (
            <div className="absolute top-8 right-0 min-w-[190px] flex flex-col border-1 rounded-[15px] bg-white py-2">
              <div className="flex item-center border-b label-1 w-full py-2 px-3">
                <UserIcon className="h-[20px] w-[20px] mr-2"></UserIcon>
                <span>{session?.user?.client?.contact_name}</span>
              </div>
              <div
                className="flex item-center rounded-full cursor-pointer label-1 hover:bg-gray-100 py-1 px-2 m-1"
                onClick={() => router.push("/support")}
              >
                <QuestionMarkCircleIcon className="h-[20px] w-[20px] mr-2"></QuestionMarkCircleIcon>
                <span>Support</span>
              </div>
              <div
                className="flex item-center rounded-full cursor-pointer label-1 hover:bg-gray-100 py-1 px-2 m-1"
                onClick={() => router.push("/change-password")}
              >
                <LockClosedIcon className="h-[20px] w-[20px] mr-2"></LockClosedIcon>
                <span>Change Password</span>
              </div>
              <div
                className="flex item-center rounded-full cursor-pointer label-1 hover:bg-gray-100 py-1 px-2 m-1"
                onClick={() => signOut()}
              >
                <ArrowRightStartOnRectangleIcon className="h-[20px] w-[20px] mr-2"></ArrowRightStartOnRectangleIcon>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
