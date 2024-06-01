"use client";

import { Table } from "@/components/Table";
import useApiRequest from "@/hooks/useApiRequest";
import { useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [search, setSearch] = useState("");
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

  const handleDelete = async (item: any) => {
    // makeRequest(`/sources/${item.id}`, "DELETE");
    console.log("Delete", item);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
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
        >
          <h3>Add sources</h3>
        </button>
      </div>

      <Table
        data={data}
        columns={columns}
        search={search}
        showCheckbox={true}
        actionsCol={["delete"]}
        sortableColumns={sortableColumns}
        onDelete={handleDelete}
      />
    </div>
  );
}
