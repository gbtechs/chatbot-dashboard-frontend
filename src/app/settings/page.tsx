"use client";

import { ChatbotPreferences } from "@/components/ChatbotIPreferences";
import { ChatbotIframe } from "@/components/ChatbotIframe";
import useApiRequest from "@/hooks/useApiRequest";
import { useState } from "react";

export default function Settings() {
  const [preferences, setPreferences] = useState<any>({});

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <main className="main flex flex-col flex-grow bg-gray transition-all duration-150 ease-in overflow-y-auto p-4 md:mr-[405px]">
          <ChatbotPreferences onPreferencesUpdated={setPreferences} />
        </main>
        <aside className="sidebar hidden md:block w-128 h-full fixed right-0 top-[80px] pt-4 pr-2">
          <ChatbotIframe preferences={preferences} />
        </aside>
      </div>
    </div>
  );
}
