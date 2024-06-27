"use client";

import { SessionType } from "@/types";
import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar: React.FC = () => {
  const { data: session } = useSession() as SessionType;
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: ChartBarSquareIcon },
    {
      href: "/conversation-history",
      label: "Conversation History",
      icon: ChatBubbleLeftRightIcon,
    },
    { href: "/leads", label: "Leads", icon: UserGroupIcon },
    { href: "/feedbacks", label: "Feedbacks", icon: StarIcon },
    { href: "/sources", label: "Sources", icon: DocumentTextIcon },
    { href: "/settings", label: "Settings / Appearance", icon: Cog6ToothIcon },
  ];

  return (
    session?.user && (
      <aside className="sidebar w-64 border-1 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in p-4">
        <div className="sidebar-header flex items-center justify-center">
          <div className="flex flex-col w-full font-primary">
            <span>Chatbot name</span>
            <input
              className="w-full rounded-full input-text px-4 py-2 mt-2"
              type="text"
              readOnly
              value={session?.user?.client.company_name || ""}
            />
          </div>
        </div>
        <div className="sidebar-content font-secondary mt-4">
          <ul className="flex flex-col w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.href}
                  className={`mt-2 rounded-full hover:bg-gray-100 ${
                    pathname.startsWith(item.href) ? "active bg-gray" : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex flex-row items-center h-10 px-3"
                  >
                    <Icon className="h-5 w-5" />
                    <h5 className="ml-3">{item.label}</h5>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    )
  );
};
