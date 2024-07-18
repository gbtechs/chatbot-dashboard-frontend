"use client";

import useApiRequest from "@/hooks/useApiRequest";
import { format24HourTime, formatDate, linkifyString } from "@/utils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
  scrollToId?: string;
}

export const Conversation: React.FC<Props> = ({ id, scrollToId }) => {
  const [messages, setMessages] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const { loading, error, makeRequest } = useApiRequest();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<any>([]);

  useEffect(() => {
    if (id) {
      setPage(1);
      setMessages([]);
      fetchMessages(1);
    }
  }, [id]);

  const fetchMessages = async (p = 0) => {
    const res: any = await makeRequest(
      `/conversations/${id}?page=${p || page}&size=${scrollToId ? 200 : 30}`,
      "GET"
    );

    setPage(p ? p + 1 : page + 1);
    setMessages((prevData: any) => {
      if (!prevData?.data) {
        scroll();
        return res;
      } else {
        return {
          ...res,
          data: [...res.data, ...prevData.data],
        };
      }
    });
  };

  const scroll = () => {
    setTimeout(() => {
      if (scrollToId) {
        const messageElement = messageRefs.current[scrollToId];
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col flex-grow bg-gray">
      <div className="h-main overflow-y-auto px-4">
        {messages?.data && messages?.count > messages?.data?.length && (
          <div className="flex justify-center mt-4">
            <ArrowPathIcon
              className="h-8 w-8 cursor-pointer"
              title="Load more"
              onClick={() => fetchMessages()}
            ></ArrowPathIcon>
          </div>
        )}
        {messages?.data &&
          messages.data.map((message: any) => {
            return (
              <div
                key={message.message_pair_id}
                ref={(el: any) =>
                  (messageRefs.current[message.message_pair_id] = el)
                }
                className="flex flex-col"
              >
                {message.user.message && (
                  <div className="relative max-w-[500px] flex items-center self-end bg-white msg-bubble-right px-4 pt-4 pb-6 mb-2">
                    <div
                      className="font-primary-1"
                      dangerouslySetInnerHTML={{
                        __html: linkifyString(message.user.message),
                      }}
                    ></div>
                    <span className="absolute bottom-1 right-2 font-secondary">
                      {format24HourTime(message.created_at)}
                    </span>
                  </div>
                )}
                <div className="flex items-center self-start mb-2">
                  <div className="flex">
                    <img
                      className="self-end h-[30px] w-[30px] mr-1"
                      src="/bot-icon-2.svg"
                      alt="bot"
                    ></img>
                    <div className="relative max-w-[500px] bg-white msg-bubble-left font-primary-1 px-4 pt-4 pb-6">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: linkifyString(
                            message.ai.message.split("@@SPLIT@@")[0]
                          ),
                        }}
                      ></span>
                      <span className="absolute bottom-1 right-4 font-secondary">
                        {format24HourTime(message.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                {message.ai.message
                  .split("@@SPLIT@@")
                  .slice(1)
                  .map((msg: string, index: number, array: string[]) => {
                    let last = index === array.length - 1;
                    return (
                      <div
                        key={index}
                        className={`max-w-[500px] bg-white msg-bubble-left font-primary-1 p-4 ml-[34px] mb-2 ${
                          last ? "bubble-last" : "bubble-mid"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: linkifyString(msg),
                        }}
                      ></div>
                    );
                  })}
              </div>
            );
          })}
        <div ref={messagesEndRef} className="h-4" />{" "}
      </div>
    </div>
  );
};
