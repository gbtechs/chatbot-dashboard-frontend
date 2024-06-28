interface Props {}

export const ChatbotIframe: React.FC<Props> = ({}) => {
  return (
    <div className="chat-container">
      <div className="iframe-container radius-1" id="iframeContainer">
        <iframe
          src="http://165.227.154.88:3001/chatbot/1"
          title="description"
          width="400"
          height="550"
        ></iframe>
      </div>

      <div className="chat-bubble">
        <img
          className="ml-auto"
          id="chatfloatingBubble"
          src="http://165.227.154.88:3001/close-icon.svg"
          alt="Chat"
        ></img>
      </div>
    </div>
  );
};
