"use client";

import { AddSources } from "@/components/AddSources";
import { Table } from "@/components/Table";
import useApiRequest from "@/hooks/useApiRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sources() {
  const { loading, error, makeRequest } = useApiRequest();
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState<any>([]);
  const router = useRouter();
  const data = [
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
    {
      resource: "Chatbot scenarios",
      title: "FAQ",
      size: "11.2 KB",
      tokens: "1.924",
      "last trained": "1/6/2022 3:23:00 AM",
    },
  ];
  const columns = ["resource", "title", "size", "tokens", "last trained"];
  const sortableColumns = ["resource", "title", "size", "tokens"];

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    // const result = await makeRequest("/sources", "GET");
    setSources(data);
  };

  const handleDelete = async (item: any) => {
    // makeRequest(`/sources/${item.id}`, "DELETE");
    console.log("Delete", item);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error}</div>
      ) : sources && sources.length ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] h-[40px] text-gray-700 rounded-full input-text px-4 py-2"
            />
            <button
              className="w-[200px] h-[40px] text-center text-white rounded-full bg-orange"
              type="button"
              onClick={() => router.push("/sources/create")}
            >
              <h3>Add sources</h3>
            </button>
          </div>

          <Table
            data={sources}
            columns={columns}
            search={search}
            showCheckbox={true}
            actionsCol={["delete"]}
            sortableColumns={sortableColumns}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <AddSources></AddSources>
      )}
    </div>
  );
}
