"use client";

import { Conversation } from "@/components/Conversation";
import { ConversationListItem } from "@/components/ConversationListItem";
import { NoDataCard } from "@/components/NoDataCard";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [conversations, setConverSations] = useState<any>([]);
  const [selectedConvo, setSelectedConvo] = useState<string>("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const data: any = await makeRequest(
      `/conversations?page=${1}&size=${50}`,
      "GET"
    );
    setConverSations(data.data);
    setSelectedConvo(data.data[0].id);
  };

  const onConversationClick = (id: string) => {
    setSelectedConvo(id);
  };

  return (
    <div className="main-content flex flex-col flex-grow">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : !conversations?.length ? (
        <div className="m-auto">
          <NoDataCard
            image="/no-conversations.png"
            title="No conversations found"
            desc="To have conversations, users or customers must interact with the chatbot. Interactions initiate sessions and enable personalized conversations."
          ></NoDataCard>
        </div>
      ) : (
        <div className="flex">
          <aside className="sidebar w-64 h-main overflow-y-auto border-1 bg-white sm:shadow transform -translate-x-full sm:translate-x-0 transition-transform duration-150 ease-in p-4">
            {conversations.map((conv: any) => {
              return (
                <div key={conv.id}>
                  <ConversationListItem
                    id={conv.id}
                    title={conv.title}
                    desc={conv.updated_at}
                    number={conv.message_count}
                    selected={selectedConvo === conv.id}
                    onSelect={() => onConversationClick(conv.id)}
                  ></ConversationListItem>
                </div>
              );
            })}
          </aside>
          <main className="main flex flex-col flex-grow bg-gray -ml-64 sm:ml-0 transition-all duration-150 ease-in">
            <Conversation id={selectedConvo} />
          </main>
        </div>
      )}
    </div>
  );
}
