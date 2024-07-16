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
  const [sources, setSources] = useState<any>({});
  const router = useRouter();
  const { notify } = useNotification();
  const columns = ["filename", "size", "created_at"];
  const colMap = {
    filename: "Title",
    size: "Size",
    created_at: "Last trained",
  };
  const sortableColumns = ["filename", "size", "created_at"];

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async (page = 0) => {
    const result: any = await makeRequest(
      `/document?page=${page || 1}&size=${15}`,
      "GET"
    );
    result.data.forEach((s: any) => (s.size = formatFileSize(s.size)));

    setSources(result);

    if (!result.data.length) {
      router.push("/sources/create");
    }
  };

  const pageChange = (page: number) => {
    fetchSources(page);
  };

  const handleDelete = async (item: any) => {
    await makeRequest(`/document/${item.id}`, "DELETE");
    setSources({
      ...sources,
      data: sources.data.filter((s: any) => s.id !== item.id),
    });
    notify("Source deleted successfully", "success");
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {error ? (
        <div>{error}</div>
      ) : (
        sources?.data?.length && (
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
              data={sources.data}
              columns={columns}
              colMap={colMap}
              search={search}
              showCheckbox={true}
              actionsCol={["delete"]}
              sortableColumns={sortableColumns}
              onDelete={handleDelete}
              paginated={true}
              page={sources.page}
              count={sources.count}
              size={sources.size}
              onPageChange={pageChange}
            />
          </>
        )
      )}
    </div>
  );
}
