"use client";

import Dialog from "@/components/Dialog";
import { Table } from "@/components/Table";
import { useNotification } from "@/contexts/NotificationContext";
import useApiRequest from "@/hooks/useApiRequest";
import { formatFileSize } from "@/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sources() {
  const { loading, error, makeRequest } = useApiRequest();
  const [search, setSearch] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [sources, setSources] = useState<any>({});
  const [itemTodel, setItemToDel] = useState<any>(null);
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

  useEffect(() => {
    if (sources && sources.data && !sources.data.length) {
      router.push("/sources/create");
    }
  }, [sources]);

  const onItemDelete = async (item: any) => {
    setItemToDel(item);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (itemTodel) {
      await makeRequest(`/document/${itemTodel.id}`, "DELETE");
      setSources({
        ...sources,
        data: sources.data.filter((s: any) => s.id !== itemTodel.id),
      });
      setShowDeleteDialog(false);
      notify("Source deleted successfully", "success");
    }
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      {error ? (
        <div>{error}</div>
      ) : (
        !!sources?.data?.length && (
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
              showCheckbox={false}
              actionsCol={["delete"]}
              sortableColumns={sortableColumns}
              paginated={true}
              page={sources.page}
              count={sources.count}
              size={sources.size}
              onPageChange={pageChange}
              onDelete={onItemDelete}
            />
          </>
        )
      )}
      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
      >
        <div className="text-center px-4">
          <img
            className="w-16 h-16 fill-current text-red-500 mx-auto mt-2 mb-4"
            src="./trashcan.svg"
            alt="delete"
          ></img>
          <h2>Are you sure you want to</h2>
          <h2>delete the file?</h2>
          <h5 className="mt-4">
            By deleting “Chatbot Scenario” from resources,
          </h5>
          <h5>your chatbot no longer access to this file and</h5>
          <h5>forgets all the information.</h5>
          <div className="flex justify-between mt-6">
            <button
              className="bg-orange text-white rounded-full px-12 py-2"
              onClick={handleDelete}
            >
              <h3>Delete</h3>
            </button>
            <button
              className="font-primary-1 bg-white border-dark rounded-full px-12 py-2"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
