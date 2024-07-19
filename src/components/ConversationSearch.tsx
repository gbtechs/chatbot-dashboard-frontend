import useApiRequest from "@/hooks/useApiRequest";
import { ConversationListItem } from "./ConversationListItem";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils";
import { Conversation } from "./Conversation";
import { NoDataCard } from "./NoDataCard";

interface Props {
  search: string;
}

export const ConversationSearch: React.FC<Props> = ({ search }) => {
  const { loading, error, makeRequest } = useApiRequest();
  const [conversations, setConversations] = useState<any>({});
  const [selectedConvo, setSelectedConvo] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const regex = new RegExp(`(\\b\\w+\\b\\W*)?(${search})(.*)`, "i");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const res: any = await makeRequest(
      `/conversations/search/${search}?page=${page || 1}&size=${20}`,
      "GET"
    );

    setPage(page + 1);
    setConversations((prevData: any) => {
      if (!prevData?.data) {
        setSelectedConvo(0);
        return res;
      } else {
        return {
          ...res,
          data: [...prevData.data, ...res.data],
        };
      }
    });
  };

  const onConversationClick = (index: number) => {
    setSelectedConvo(index);
  };

  return (
    <div className="main-content flex flex-col flex-grow">
      {conversations && conversations.data && !conversations.data.length && (
        <div className="m-auto">
          <NoDataCard
            image="/no-conversations.png"
            title="No match"
            desc="No messages found matching your query. Please check your spellings or try searching for something else"
          ></NoDataCard>
        </div>
      )}

      {!!conversations?.data?.length && (
        <div className="flex">
          <aside className="sidebar w-64 h-main overflow-y-auto border-1 bg-white sm:shadow transform -translate-x-full sm:translate-x-0 transition-transform duration-150 ease-in p-4">
            {conversations.data.map((conv: any, index: number) => {
              let match = conv.message_pair.user.message.match(regex);
              match = match || conv.message_pair.ai.message.match(regex);

              const before = match[1] ? `${match[1]} ` : "";
              const highlighted = match[2];
              const after = match[3] ? `${match[3]}` : "";

              return (
                <div
                  key={conv.message_pair_id}
                  className={`flex justify-between items-center radius-1 w-full cursor-pointer hover:bg-gray-100 p-4 ${
                    selectedConvo === index && "bg-gray"
                  }`}
                  onClick={() => onConversationClick(index)}
                >
                  <div className="flex flex-col pr-4">
                    <h5 className="line-clamp-1">
                      {before && <span>{before}</span>}
                      <mark className="bg-yellow-300">{highlighted}</mark>
                      {after && <span>{after}</span>}
                    </h5>
                    <span className="font-secondary">
                      {formatDate(conv.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}

            {conversations.count > conversations.data.length && (
              <div className="flex justify-center mt-2">
                <button
                  className="rounded-full bg-orange py-2 px-3"
                  onClick={fetchConversations}
                >
                  <span className="text-white text-sm">Load more</span>
                </button>
              </div>
            )}
          </aside>
          <main className="main flex flex-col flex-grow bg-gray -ml-64 sm:ml-0 transition-all duration-150 ease-in">
            <Conversation
              id={conversations.data[selectedConvo]?.id}
              scrollToId={conversations.data[selectedConvo]?.message_pair_id}
              search={search}
            />
          </main>
        </div>
      )}
    </div>
  );
};
