"use client";

import { Conversation } from "@/components/Conversation";
import { ConversationListItem } from "@/components/ConversationListItem";
import { ConversationSearch } from "@/components/ConversationSearch";
import Modal from "@/components/Modal";
import { NoDataCard } from "@/components/NoDataCard";
import useApiRequest from "@/hooks/useApiRequest";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ConversationHistory() {
  const { loading, error, makeRequest } = useApiRequest();
  const [conversations, setConverSations] = useState<any>([]);
  const [selectedConvo, setSelectedConvo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const res: any = await makeRequest(
      `/conversations?page=${page || 1}&size=${20}`,
      "GET"
    );

    setPage(page + 1);
    setConverSations((prevData: any) => {
      if (!prevData?.data) {
        setSelectedConvo(res.data[0]?.id);
        return res;
      } else {
        return {
          ...res,
          data: [...prevData.data, ...res.data],
        };
      }
    });
  };

  const searchConversations = () => {
    if (!search || !search.trim()) {
      return;
    }

    setShowModal(true);
  };

  const onConversationClick = (id: string) => {
    setSelectedConvo(id);
  };

  return (
    <div className="main-content flex flex-col flex-grow">
      {error ? (
        <div>{error}</div>
      ) : !conversations?.data?.length ? (
        !loading && (
          <div className="m-auto">
            <NoDataCard
              image="/no-conversations.png"
              title="No conversations found"
              desc="To have conversations, users or customers must interact with the chatbot. Interactions initiate sessions and enable personalized conversations."
            ></NoDataCard>
          </div>
        )
      ) : (
        <div className="flex">
          <aside className="sidebar w-64 h-main overflow-y-auto border-1 bg-white sm:shadow transform -translate-x-full sm:translate-x-0 transition-transform duration-150 ease-in p-4">
            <div className="w-full relative mb-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full input-text text-sm py-2 px-3"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && searchConversations()
                }
              />
              <MagnifyingGlassIcon
                className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                onClick={searchConversations}
              />
            </div>

            {conversations.data.map((conv: any) => {
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

            {conversations.count > conversations.data.length && (
              <div className="flex justify-center mt-2">
                <button
                  className="rounded-full bg-orange py-2 px-3"
                  onClick={() => fetchConversations}
                >
                  <span className="text-white text-sm">Load more</span>
                </button>
              </div>
            )}
          </aside>
          <main className="main flex flex-col flex-grow bg-gray -ml-64 sm:ml-0 transition-all duration-150 ease-in">
            <Conversation id={selectedConvo} />
          </main>
        </div>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ConversationSearch search={search} />
      </Modal>
    </div>
  );
}
