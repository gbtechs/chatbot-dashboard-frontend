"use client";

import { ChatbotPreferences } from "@/components/ChatbotIPreferences";
import { ChatbotIframe } from "@/components/ChatbotIframe";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [preferences, setPreferences] = useState<any>({});

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    const data: any = await makeRequest(
      `/conversations?page=${1}&size=${50}`,
      "GET"
    );
    setPreferences(data);
  };
  return (
    <div className="main-content flex flex-col flex-grow">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="flex">
          <main className="main flex flex-col flex-grow bg-gray -ml-128 sm:ml-0 transition-all duration-150 ease-in p-4">
            <ChatbotPreferences />
          </main>
          <aside className="sidebar w-128 h-main transform -translate-x-full sm:translate-x-0 transition-transform duration-150 ease-in pt-4 pr-2">
            <ChatbotIframe />
          </aside>
        </div>
      )}
    </div>
  );
}
