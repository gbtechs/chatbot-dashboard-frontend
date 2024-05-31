"use client";

import { NoDataCard } from "@/components/NoDataCard";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    // const data = await makeRequest("/leads", "GET");
    setLeads([]);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : !leads?.length ? (
        <div className="m-auto">
          <NoDataCard
            image="/no-leads.png"
            title="No lead found"
            desc="To have leads, users or customers must interact with the chatbot. Interactions initiate sessions and enable personalized conversations."
          ></NoDataCard>
        </div>
      ) : (
        <div>Leads List</div>
      )}
    </div>
  );
}
