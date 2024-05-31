"use client";

import { NoDataCard } from "@/components/NoDataCard";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [conversations, setConverSations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    // const data = await makeRequest("/conversations", "GET");
    setConverSations([]);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : !conversations?.length ? (
        <div className="m-auto">
          <NoDataCard
            image="/no-conversations.png"
            title="No conversations found"
            desc="To have conversations, users or customers must interact with the chatbot. Interactions initiate sessions and enable personalized conversations."
          ></NoDataCard>
        </div>
      ) : (
        <div>Conversation List</div>
      )}
    </div>
  );
}
