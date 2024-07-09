"use client";

import { NoDataCard } from "@/components/NoDataCard";
import { Table } from "@/components/Table";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function Leads() {
  const { loading, error, makeRequest } = useApiRequest();
  const [leads, setLeads] = useState<any>({});
  const columns = ["name", "email", "phone", "created_at"];
  const colMap = {
    name: "User Name",
    email: "Email",
    phone: "Phone number",
    created_at: "Time",
  };
  const sortableColumns: string[] = [];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async (page = 0) => {
    const data: any = await makeRequest(
      `/leads?page=${page || 1}&size=${15}`,
      "GET"
    );
    setLeads(data);
  };

  const pageChange = (page: number) => {
    fetchLeads(page);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {error ? (
        <div>Error</div>
      ) : !leads?.data?.length ? (
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
            data={leads.data}
            columns={columns}
            sortableColumns={sortableColumns}
            colMap={colMap}
            paginated={true}
            page={leads.page}
            size={leads.size}
            count={leads.count}
            onPageChange={pageChange}
          />
        </>
      )}
    </div>
  );
}
