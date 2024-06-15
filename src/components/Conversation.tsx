"use client";

import useApiRequest from "@/hooks/useApiRequest";
import { format24HourTime, formatDate, linkifyString } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface Props {
  id: string;
}

export const Conversation: React.FC<Props> = ({ id }) => {
  const [messages, setMessages] = useState<any>();
  const { loading, error, makeRequest } = useApiRequest();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setMessages([]);
      fetchMessages();
    }
  }, [id]);

  const fetchMessages = async () => {
    const data: any = await makeRequest(`/conversations/${id}`, "GET");
    setMessages(data.data);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    console.log("Messages: ", data);
  };

  return (
    <div className="flex flex-col flex-grow bg-gray">
      <div className="h-main overflow-y-auto px-4">
        {messages &&
          messages.map((message: any) => {
            return (
              <div key={message.ai.id} className="flex flex-col">
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
                        className={`max-w-[500px] bg-white msg-bubble-left font-primary-1 p-4 ml-[30px] mb-2 ${
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
