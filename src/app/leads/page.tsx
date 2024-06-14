"use client";

import { NoDataCard } from "@/components/NoDataCard";
import { Table } from "@/components/Table";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [leads, setLeads] = useState([]);
  const columns = ["name", "email", "created_at"];
  const sortableColumns: string[] = [];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data: any = await makeRequest("/leads", "GET");
    setLeads(data.data);
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
        <>
          <Table
            data={leads}
            columns={columns}
            sortableColumns={sortableColumns}
          />
        </>
      )}
    </div>
  );
}
