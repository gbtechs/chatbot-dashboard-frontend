import { useEffect, useState } from "react";

interface Props {
  preferences: any;
}

export const ChatbotIframe: React.FC<Props> = ({ preferences }) => {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey((prevKey) => prevKey + 1); // Increment key to force iframe reload
  }, [preferences]);

  return (
    preferences && (
      <div className="chat-container">
        <div
          className="iframe-container"
          id="iframeContainer"
          style={{
            backgroundColor: preferences.background_color,
            borderRadius: preferences.corner_radius + "px",
            boxShadow: preferences.shadow
              ? `0 0 10px ${preferences.shadow}`
              : "",
            border: preferences.stroke
              ? `1px solid ${preferences.stroke}`
              : +"",
          }}
        >
          <iframe
            key={iframeKey}
            src="http://165.227.154.88:3001/chatbot/1"
            title="description"
            width="400"
            height="540"
          ></iframe>
        </div>

        <div
          className="chat-bubble rounded-full w-[40px] h-[40px] flex items-center justify-center bg-orange ml-auto mt-4"
          style={{ backgroundColor: preferences.secondary_color }}
        >
          <img
            id="chatfloatingBubble"
            src="http://165.227.154.88:3001/close-icon.svg"
            alt="Chat"
          ></img>
        </div>
      </div>
    )
  );
};
