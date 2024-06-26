"use client";

import { AddSources } from "@/components/AddSources";
import { Table } from "@/components/Table";
import { useNotification } from "@/contexts/NotificationContext";
import useApiRequest from "@/hooks/useApiRequest";
import { formatFileSize } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sources() {
  const { loading, error, makeRequest } = useApiRequest();
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState<any>([]);
  const router = useRouter();
  const { notify } = useNotification();
  const columns = ["filename", "size", "created_at"];
  const colMap = {
    filename: "Title",
    size: "Size",
    created_at: "Last trained",
  };
  const sortableColumns = ["title", "size"];

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    const result: any = await makeRequest("/document", "GET");
    result.data.forEach((s: any) => (s.size = formatFileSize(s.size)));

    setSources(result.data);

    if (!result.data.length) {
      router.push("/sources/create");
    }
  };

  const handleDelete = async (item: any) => {
    await makeRequest(`/document/${item.id}`, "DELETE");
    setSources(sources.filter((s: any) => s.id !== item.id));
    notify("Source deleted successfully", "success");
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {error ? (
        <div>{error}</div>
      ) : (
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
            colMap={colMap}
            search={search}
            showCheckbox={true}
            actionsCol={["delete"]}
            sortableColumns={sortableColumns}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
